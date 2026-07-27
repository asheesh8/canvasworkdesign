/**
 * One-time migration scraper for canvasworksdesigns.com (Lisa's own site).
 * Crawls project + gallery pages, downloads full-size originals into
 * public/uploads, and writes a manifest to src/content/scraped.json.
 *
 * Run: node scripts/scrape.mjs
 */
import { mkdir, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const ROOT = 'https://canvasworksdesigns.com'
const dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.resolve(dirname, '../public/uploads')
await mkdir(outDir, { recursive: true })

const SKIP = /(logo|favicon|cropped-|icon|placeholder|sprite|avatar|gravatar|1x1|spacer)/i

const CURATED = [
  { url: `${ROOT}/`, cat: 'featured' },
  { url: `${ROOT}/murals/mural-gallery/`, cat: 'mural' },
  { url: `${ROOT}/murals/`, cat: 'mural' },
  { url: `${ROOT}/art/paintings-gallery/`, cat: 'painting' },
  { url: `${ROOT}/art/`, cat: 'painting' },
  { url: `${ROOT}/art/weekly-paintings/`, cat: 'painting' },
  { url: `${ROOT}/art/fireboards/`, cat: 'painting' },
  { url: `${ROOT}/theorem-paintings/`, cat: 'painting' },
  { url: `${ROOT}/foxhuntinglife/`, cat: 'painting' },
  { url: `${ROOT}/about-canvasworks/`, cat: 'about' },
  { url: `${ROOT}/news-and-media/`, cat: 'press' },
  { url: `${ROOT}/classes/`, cat: 'class' },
  { url: `${ROOT}/shop/prints/`, cat: 'print' },
]

async function fetchText(url) {
  try {
    const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 CanvasworksMigration/1.0' } })
    if (!res.ok) return ''
    return await res.text()
  } catch {
    return ''
  }
}

function toOriginal(u) {
  let url = u.startsWith('//') ? 'https:' + u : u
  url = url.split('?')[0]
  // strip WordPress size suffix e.g. -300x200 before extension
  url = url.replace(/-\d+x\d+(?=\.(jpg|jpeg|png|webp)$)/i, '')
  return url
}

function extractImages(html) {
  const urls = new Set()
  const re = /(?:src|data-src|data-lazy-src|href|content)=["']([^"']+\.(?:jpg|jpeg|png|webp))["']/gi
  let m
  while ((m = re.exec(html))) {
    let u = m[1]
    if (!u.includes('/wp-content/uploads/')) continue
    if (SKIP.test(u)) continue
    urls.add(toOriginal(u))
  }
  // also srcset
  const reSet = /srcset=["']([^"']+)["']/gi
  while ((m = reSet.exec(html))) {
    for (const part of m[1].split(',')) {
      const u = part.trim().split(/\s+/)[0]
      if (u && u.includes('/wp-content/uploads/') && /\.(jpg|jpeg|png|webp)$/i.test(u.split('?')[0]) && !SKIP.test(u)) {
        urls.add(toOriginal(u))
      }
    }
  }
  return [...urls]
}

function extractTitle(html) {
  const og = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i)
  if (og) return decodeEntities(og[1]).replace(/\s*[-|–]\s*Canvasworks.*$/i, '').trim()
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)
  if (h1) return decodeEntities(h1[1].replace(/<[^>]+>/g, '')).trim()
  const t = html.match(/<title>([^<]+)<\/title>/i)
  if (t) return decodeEntities(t[1]).replace(/\s*[-|–]\s*Canvasworks.*$/i, '').trim()
  return ''
}

function decodeEntities(s) {
  return s
    .replace(/&#8217;|&#039;|&#39;/g, '’')
    .replace(/&#8216;/g, '‘')
    .replace(/&#8211;|&#8212;/g, '–')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
}

function titleFromSlug(url) {
  const slug = url.replace(/\/$/, '').split('/').pop() || ''
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

async function download(url) {
  const name = decodeURIComponent(url.split('/').pop() || '')
  if (!name) return null
  const dest = path.join(outDir, name)
  if (existsSync(dest)) return name
  try {
    const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0' } })
    if (!res.ok) return null
    const buf = Buffer.from(await res.arrayBuffer())
    if (buf.length < 3000) return null // skip tiny
    await writeFile(dest, buf)
    return name
  } catch {
    return null
  }
}

async function pool(items, worker, concurrency = 6) {
  const results = []
  let idx = 0
  await Promise.all(
    Array.from({ length: concurrency }, async () => {
      while (idx < items.length) {
        const i = idx++
        results[i] = await worker(items[i], i)
      }
    }),
  )
  return results
}

// ---- gather targets ----
const projSitemap = await fetchText(`${ROOT}/project-sitemap.xml`)
const projectUrls = [...projSitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => m[1])
  .filter((u) => u.includes('/project/') && !u.endsWith('/project/') && !u.includes('auto-draft'))
  .map((url) => ({ url, cat: 'mural' }))

const targets = [...CURATED, ...projectUrls]
console.log(`Crawling ${targets.length} pages…`)

// image url -> { title, cat, page }
const imageMap = new Map()
let pageCount = 0
await pool(
  targets,
  async (t) => {
    const html = await fetchText(t.url)
    if (!html) return
    pageCount++
    const isProject = t.url.includes('/project/')
    const pageTitle = isProject ? extractTitle(html) || titleFromSlug(t.url) : ''
    const imgs = extractImages(html)
    // For project pages, first image is the featured piece → give it the title.
    imgs.forEach((u, i) => {
      if (!imageMap.has(u)) {
        imageMap.set(u, {
          title: isProject && i === 0 ? pageTitle : '',
          cat: t.cat,
          page: t.url,
        })
      }
    })
  },
  6,
)

const allImages = [...imageMap.entries()]
console.log(`Found ${allImages.length} unique images. Downloading…`)

const manifest = []
await pool(
  allImages,
  async ([url, meta]) => {
    const file = await download(url)
    if (file) {
      manifest.push({
        file: `/uploads/${file}`,
        title: meta.title || titleFromSlug(url).replace(/\.(jpg|jpeg|png|webp)$/i, ''),
        cat: meta.cat,
        source: meta.page,
      })
    }
  },
  6,
)

// de-dupe manifest by file
const seen = new Set()
const clean = manifest.filter((m) => (seen.has(m.file) ? false : (seen.add(m.file), true)))

await writeFile(path.resolve(dirname, '../src/content/scraped.json'), JSON.stringify(clean, null, 2))
console.log(`\n✅ Downloaded ${clean.length} images across ${pageCount} pages → public/uploads`)
const byCat = clean.reduce((a, m) => ((a[m.cat] = (a[m.cat] || 0) + 1), a), {})
console.log('By category:', byCat)
