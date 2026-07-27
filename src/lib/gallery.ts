import scrapedRaw from '@/content/scraped.json'
import type { ArtCard } from '@/lib/queries'
import { slugify } from '@/lib/formatSlug'

type Scraped = { file: string; title: string; cat: string; source: string }
const scraped = scrapedRaw as Scraped[]

/* Tidy up messy WordPress filenames into human titles. */
function cleanTitle(raw: string): string {
  return raw
    .replace(/\s*[-–|]\s*Lisa Curry Mair.*$/i, '')
    .replace(/\s*[-–|]\s*Canvasworks.*$/i, '')
    .replace(/\.(jpe?g|png|webp)$/i, '')
    .replace(/[_]+/g, ' ')
    .replace(/\brev\d*\b/gi, '')
    .replace(/\bthumb\b/gi, '')
    .replace(/\s*\d+$/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/* Blank out labels that are just camera codes, so the image speaks for itself. */
function isCode(t: string): boolean {
  if (!t || t.length < 3) return true
  return /^(img|dsc|nik|fullsizerender|canvasworks nik|full ?size|pxl|screenshot|e1\d{6,})/i.test(t)
}

function toCard(s: Scraped, hrefBase?: string): ArtCard {
  const title = cleanTitle(s.title)
  const label = isCode(title) ? '' : title
  return {
    title: label,
    slug: slugify(label || s.file.split('/').pop() || 'work'),
    image: s.file,
    href: hrefBase,
  }
}

const pick = (cat: string) => scraped.filter((s) => s.cat === cat)
const byFile = (name: string) => scraped.find((s) => s.file.toLowerCase().includes(name.toLowerCase()))

/* ------------------------------------------------------------------ */
/* Curated homepage selections (real, recognisable pieces).           */
/* ------------------------------------------------------------------ */
function feature(file: string, title: string, meta?: string, href = '/murals/gallery'): ArtCard {
  const hit = byFile(file)
  return { title, slug: slugify(title), image: hit?.file ?? file, meta, href }
}

export const heroFeaturedMurals: ArtCard[] = [
  feature('Westford-mural-This_old_house', 'Westford Farmhouse Mural', 'Featured on PBS · This Old House'),
  feature('Navigating-the-Brook', 'Navigating the Brook', 'Dining-room panorama'),
  feature('Bar-Harbor-Mural-Sketch', 'Bar Harbor', 'Coastal stairwell mural'),
]

export const disciplines: ArtCard[] = [
  feature('Navigating-the-Brook', 'Murals', 'Hand-painted walls & ceilings', '/murals'),
  feature('Walking-Hounds-1', 'Paintings', 'Original work on canvas', '/paintings'),
  feature('florclothmagic', 'Classes', 'Workshops & online courses', '/classes'),
]

export const heroFeaturedPaintings: ArtCard[] = [
  'Walking-Hounds-1',
  'Peaceable-Vermont-II',
  'Morning-Chores',
  'Summer-Farmhouse',
  'Spring-Meadow',
  'Vermont-Farm-Animals',
  'Mutual-Respect',
  'Rusty-Barn-Rusty-Horse',
]
  .map((f) => byFile(f))
  .filter(Boolean)
  .map((s) => ({ ...toCard(s as Scraped, '/paintings/gallery') }))

/* ------------------------------------------------------------------ */
/* Full galleries                                                     */
/* ------------------------------------------------------------------ */
export const muralGallery: ArtCard[] = [...pick('mural'), ...pick('featured').filter((s) => /mural|brook|westford|harbor|roby/i.test(s.file))]
  .map((s) => toCard(s, undefined))
  // de-dupe by file
  .filter((c, i, arr) => arr.findIndex((x) => x.image === c.image) === i)

export const paintingGallery: ArtCard[] = pick('painting')
  .map((s) => toCard(s, undefined))
  .filter((c, i, arr) => arr.findIndex((x) => x.image === c.image) === i)

export const pressCovers: ArtCard[] = pick('press').map((s) => ({
  title: cleanTitle(s.title),
  slug: slugify(s.title),
  image: s.file,
}))

export const aboutImage = pick('about')[0]?.file ?? byFile('Canvasworks-NIK_33154')?.file ?? heroFeaturedMurals[0].image
export const classImages: string[] = pick('class').map((s) => s.file)
export const withLisaImage = byFile('LCM-at-Westford-Mural')?.file ?? byFile('Kevin-and-me')?.file ?? aboutImage
export const framedPrintsImage = byFile('framed-prints')?.file
