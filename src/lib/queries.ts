import { getPayloadClient, mediaUrl } from './payload'
import {
  MURALS,
  PAINTINGS,
  PRINTS,
  CLASSES,
  POSTS,
  PRESS,
  SITE,
  img,
  type Tone,
} from '@/content/site'

/* ---- View models the frontend renders ---- */
export type ArtCard = {
  title: string
  slug: string
  image: string
  meta?: string
  excerpt?: string
  href?: string
  extra?: Record<string, unknown>
}

const keyBySlug = new Map<string, { key: string; tone: string }>()
;[...MURALS, ...PAINTINGS, ...PRINTS, ...CLASSES, ...POSTS].forEach((i) =>
  keyBySlug.set(i.slug, { key: i.key, tone: (i as { tone: Tone }).tone }),
)

function fallbackImage(slug: string) {
  const hit = keyBySlug.get(slug)
  return hit ? img(hit.key) : img('mural-westford')
}

/* Helper: run a Payload find, fall back to static on any error/empty. */
async function safeFind<T>(fn: (payload: Awaited<ReturnType<typeof getPayloadClient>>) => Promise<T[]>, fallback: T[]): Promise<T[]> {
  try {
    const payload = await getPayloadClient()
    const res = await fn(payload)
    return res && res.length ? res : fallback
  } catch {
    return fallback
  }
}

/* ---------------- Murals ---------------- */
export async function getMurals(): Promise<ArtCard[]> {
  const staticCards: ArtCard[] = MURALS.map((m) => ({
    title: m.title,
    slug: m.slug,
    image: img(m.key),
    meta: `${m.location} · ${m.year}`,
    excerpt: m.excerpt,
    href: '/murals/gallery',
    extra: { featured: m.featured, category: m.category },
  }))
  const docs = await safeFind(
    (p) => p.find({ collection: 'murals', depth: 1, limit: 50, sort: 'order' }).then((r) => r.docs as any[]),
    [],
  )
  if (!docs.length) return staticCards
  return docs.map((d) => ({
    title: d.title,
    slug: d.slug,
    image: mediaUrl(d.coverImage, 'card') ?? fallbackImage(d.slug),
    meta: [d.location, d.year].filter(Boolean).join(' · '),
    excerpt: d.excerpt,
    href: '/murals/gallery',
    extra: { featured: d.featured, category: d.category },
  }))
}

export async function getFeaturedMurals(): Promise<ArtCard[]> {
  const all = await getMurals()
  const feat = all.filter((c) => (c.extra as any)?.featured)
  return (feat.length ? feat : all).slice(0, 3)
}

/* ---------------- Paintings ---------------- */
export async function getPaintings(): Promise<ArtCard[]> {
  const staticCards: ArtCard[] = PAINTINGS.map((m) => ({
    title: m.title,
    slug: m.slug,
    image: img(m.key),
    meta: `${m.medium} · ${m.dimensions}`,
    href: '/paintings/gallery',
    extra: { available: m.available, price: m.price, featured: m.featured, category: m.category, year: m.year },
  }))
  const docs = await safeFind(
    (p) => p.find({ collection: 'paintings', depth: 1, limit: 60, sort: 'order' }).then((r) => r.docs as any[]),
    [],
  )
  if (!docs.length) return staticCards
  return docs.map((d) => ({
    title: d.title,
    slug: d.slug,
    image: mediaUrl(d.image, 'card') ?? fallbackImage(d.slug),
    meta: [d.medium, d.dimensions].filter(Boolean).join(' · '),
    href: '/paintings/gallery',
    extra: { available: d.available, price: d.price, featured: d.featured, category: d.category, year: d.year },
  }))
}

export async function getFeaturedPaintings(): Promise<ArtCard[]> {
  const all = await getPaintings()
  const feat = all.filter((c) => (c.extra as any)?.featured)
  return (feat.length ? feat : all).slice(0, 4)
}

/* ---------------- Prints ---------------- */
export async function getPrints(): Promise<ArtCard[]> {
  const staticCards: ArtCard[] = PRINTS.map((m) => ({
    title: m.title,
    slug: m.slug,
    image: img(m.key),
    meta: `from $${m.fromPrice}`,
    excerpt: m.description,
    href: m.externalUrl,
    extra: { fromPrice: m.fromPrice },
  }))
  const docs = await safeFind(
    (p) => p.find({ collection: 'prints', depth: 1, limit: 40, sort: 'order' }).then((r) => r.docs as any[]),
    [],
  )
  if (!docs.length) return staticCards
  return docs.map((d) => ({
    title: d.title,
    slug: d.slug,
    image: mediaUrl(d.image, 'card') ?? fallbackImage(d.slug),
    meta: d.fromPrice ? `from $${d.fromPrice}` : undefined,
    excerpt: d.description,
    href: d.externalUrl || '/prints',
    extra: { fromPrice: d.fromPrice },
  }))
}

/* ---------------- Classes ---------------- */
export async function getClasses(): Promise<ArtCard[]> {
  const staticCards: ArtCard[] = CLASSES.map((m) => ({
    title: m.title,
    slug: m.slug,
    image: img(m.key),
    meta: `${m.format} · ${m.duration}`,
    excerpt: m.summary,
    href: '/classes',
    extra: { price: m.price, level: m.level, format: m.format },
  }))
  const docs = await safeFind(
    (p) => p.find({ collection: 'classes', depth: 1, limit: 30, sort: 'order' }).then((r) => r.docs as any[]),
    [],
  )
  if (!docs.length) return staticCards
  return docs.map((d) => ({
    title: d.title,
    slug: d.slug,
    image: mediaUrl(d.image, 'card') ?? fallbackImage(d.slug),
    meta: [d.format, d.duration].filter(Boolean).join(' · '),
    excerpt: d.summary,
    href: d.signupUrl || '/classes',
    extra: { price: d.price, level: d.level, format: d.format },
  }))
}

/* ---------------- Blog ---------------- */
export type PostCard = ArtCard & { date: string }
export async function getPosts(): Promise<PostCard[]> {
  const staticCards: PostCard[] = POSTS.map((m) => ({
    title: m.title,
    slug: m.slug,
    image: img(m.key),
    excerpt: m.excerpt,
    date: m.date,
    href: `/blog/${m.slug}`,
  }))
  const docs = await safeFind(
    (p) =>
      p
        .find({ collection: 'posts', depth: 1, limit: 40, sort: '-publishedDate', where: { published: { equals: true } } })
        .then((r) => r.docs as any[]),
    [],
  )
  if (!docs.length) return staticCards
  return docs.map((d) => ({
    title: d.title,
    slug: d.slug,
    image: mediaUrl(d.coverImage, 'card') ?? fallbackImage(d.slug),
    excerpt: d.excerpt,
    date: d.publishedDate,
    href: `/blog/${d.slug}`,
  }))
}

export async function getPost(slug: string): Promise<any | null> {
  try {
    const payload = await getPayloadClient()
    const r = await payload.find({ collection: 'posts', depth: 1, limit: 1, where: { slug: { equals: slug } } })
    if (r.docs.length) return r.docs[0]
  } catch {
    /* fall through */
  }
  const s = POSTS.find((p) => p.slug === slug)
  if (!s) return null
  return { title: s.title, slug: s.slug, excerpt: s.excerpt, publishedDate: s.date, author: SITE.artist, image: img(s.key) }
}

/* ---------------- Press ---------------- */
export async function getPress() {
  try {
    const payload = await getPayloadClient()
    const r = await payload.find({ collection: 'press', depth: 1, limit: 30, sort: 'order' })
    if (r.docs.length) return r.docs as any[]
  } catch {
    /* fall through */
  }
  return PRESS
}

/* ---------------- Globals ---------------- */
export async function getHomeHero() {
  const fallback = {
    heroWord: 'canvas',
    headline: 'Painting for the age of taste and craft',
    subheadline:
      'Three decades of hand-painted murals and original work on canvas, made for the homes they live in.',
    ctaLabel: 'Start a commission',
    ctaHref: '/contact',
    poster: null as any,
  }
  try {
    const payload = await getPayloadClient()
    const g: any = await payload.findGlobal({ slug: 'home-hero', depth: 1 })
    return {
      heroWord: g?.heroWord || fallback.heroWord,
      headline: g?.headline || fallback.headline,
      subheadline: g?.subheadline || fallback.subheadline,
      ctaLabel: g?.ctaLabel || fallback.ctaLabel,
      ctaHref: g?.ctaHref || fallback.ctaHref,
      poster: g?.poster ?? null,
    }
  } catch {
    return fallback
  }
}

export async function getSiteSettings() {
  const fallback = {
    email: SITE.email,
    location: SITE.location,
    instagram: SITE.socials.instagram,
    pinterest: SITE.socials.pinterest,
    facebook: SITE.socials.facebook,
    newsletterHeading: 'Stay in the studio',
    newsletterBlurb:
      'Occasional notes on new murals, paintings, classes and studio life — never more than a few times a year.',
    footerBlurb:
      'Hand-painted murals and original paintings for homes around the globe, from the Vermont studio of Lisa Curry Mair.',
  }
  try {
    const payload = await getPayloadClient()
    const g: any = await payload.findGlobal({ slug: 'site-settings', depth: 0 })
    return {
      ...fallback,
      email: g?.email || fallback.email,
      location: g?.location || fallback.location,
      instagram: g?.instagram || fallback.instagram,
      pinterest: g?.pinterest || fallback.pinterest,
      facebook: g?.facebook || fallback.facebook,
      newsletterHeading: g?.newsletterHeading || fallback.newsletterHeading,
      newsletterBlurb: g?.newsletterBlurb || fallback.newsletterBlurb,
      footerBlurb: g?.footerBlurb || fallback.footerBlurb,
    }
  } catch {
    return fallback
  }
}
