/**
 * Canonical content for Canvasworks Designs.
 *
 * This is the single source of truth used to (a) seed Payload and
 * (b) render the site as a graceful fallback whenever the CMS has no
 * entries yet. Lisa can override any of it from the /admin panel.
 */

export const SITE = {
  name: 'Canvasworks Designs',
  artist: 'Lisa Curry Mair',
  shortName: 'Canvasworks',
  tagline:
    'With more than three decades of experience creating work on canvas for homes around the globe, I continue to revel in the joy of painting.',
  location: 'Vermont, USA',
  email: 'lisa@canvasworksdesigns.com',
  socials: {
    instagram: 'https://instagram.com/vtcanvas',
    pinterest: 'https://pinterest.com/Lisa_Curry_Mair',
    facebook: 'https://facebook.com/CanvasworksVT',
  },
  photoCredit: 'Photography by Mike Casey',
}

export type NavChild = { label: string; href: string; blurb?: string }
export type NavItem = { label: string; href: string; children?: NavChild[] }

export const NAV: NavItem[] = [
  {
    label: 'Murals',
    href: '/murals',
    children: [
      { label: 'About the murals', href: '/murals', blurb: 'Lisa’s approach to painting on walls & canvas' },
      { label: 'Mural gallery', href: '/murals/gallery', blurb: 'Selected commissions from around the globe' },
      { label: 'The process', href: '/murals/process', blurb: 'From first sketch to final varnish' },
    ],
  },
  {
    label: 'Paintings',
    href: '/paintings',
    children: [
      { label: 'About the art', href: '/paintings', blurb: 'Original work on canvas' },
      { label: 'Gallery of originals', href: '/paintings/gallery', blurb: 'Available & archived paintings' },
      { label: 'Prints', href: '/prints', blurb: 'Fine-art prints, framed or unframed' },
    ],
  },
  { label: 'Classes', href: '/classes' },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'About Lisa', href: '/about', blurb: 'Three decades at the easel' },
      { label: 'News & media', href: '/news', blurb: 'Press, PBS & features' },
    ],
  },
  { label: 'Journal', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export type Tone = 'gold' | 'sage' | 'terracotta' | 'dusk' | 'plum' | 'forest'

export type MuralSeed = {
  key: string
  title: string
  slug: string
  location: string
  year: number
  category: string
  excerpt: string
  featured?: boolean
  tone: Tone
}

export const MURALS: MuralSeed[] = [
  {
    key: 'mural-westford',
    title: 'Westford Farmhouse Panorama',
    slug: 'westford-farmhouse-panorama',
    location: 'Westford, Vermont',
    year: 2019,
    category: 'historic',
    excerpt: 'A wraparound landscape for the modern farmhouse featured on PBS’ This Old House.',
    featured: true,
    tone: 'forest',
  },
  {
    key: 'mural-barharbor',
    title: 'Bar Harbor Harborside',
    slug: 'bar-harbor-harborside',
    location: 'Bar Harbor, Maine',
    year: 2021,
    category: 'residential',
    excerpt: 'Coastal light and rigging, hand-painted across a stairwell in soft greys and gold.',
    featured: true,
    tone: 'dusk',
  },
  {
    key: 'mural-brook',
    title: 'Navigating the Brook',
    slug: 'navigating-the-brook',
    location: 'Stowe, Vermont',
    year: 2020,
    category: 'residential',
    excerpt: 'A dining-room panorama that follows a mountain brook through four seasons.',
    featured: true,
    tone: 'sage',
  },
  {
    key: 'mural-roby',
    title: 'Roby House Commission',
    slug: 'roby-house-commission',
    location: 'Concord, New Hampshire',
    year: 2018,
    category: 'residential',
    excerpt: 'A grisaille garden folly wrapping an entry hall in warm monochrome.',
    tone: 'gold',
  },
  {
    key: 'mural-grisaille',
    title: 'Dining Room Grisaille',
    slug: 'dining-room-grisaille',
    location: 'Woodstock, Vermont',
    year: 2022,
    category: 'residential',
    excerpt: 'Classical architecture rendered in candle-lit tones of stone and shadow.',
    tone: 'plum',
  },
  {
    key: 'mural-ceiling',
    title: 'Garden Folly Ceiling',
    slug: 'garden-folly-ceiling',
    location: 'Manchester, Vermont',
    year: 2017,
    category: 'ceiling',
    excerpt: 'An open sky and climbing roses painted overhead for a sunroom retreat.',
    tone: 'terracotta',
  },
]

export type PaintingSeed = {
  key: string
  title: string
  slug: string
  medium: string
  dimensions: string
  year: number
  price?: number
  category: string
  available: boolean
  featured?: boolean
  tone: Tone
}

export const PAINTINGS: PaintingSeed[] = [
  { key: 'p-hounds', title: 'Walking Hounds', slug: 'walking-hounds', medium: 'Acrylic on canvas', dimensions: '30 × 40 in', year: 2022, price: 2400, category: 'animals', available: true, featured: true, tone: 'gold' },
  { key: 'p-brook', title: 'Navigating the Brook (study)', slug: 'navigating-the-brook-study', medium: 'Oil on linen', dimensions: '18 × 24 in', year: 2020, price: 1200, category: 'landscape', available: true, featured: true, tone: 'sage' },
  { key: 'p-greenriver', title: 'Green River Morning', slug: 'green-river-morning', medium: 'Oil on canvas', dimensions: '24 × 36 in', year: 2021, price: 1800, category: 'landscape', available: true, tone: 'forest' },
  { key: 'p-redbarn', title: 'The Red Barn', slug: 'the-red-barn', medium: 'Acrylic on panel', dimensions: '16 × 20 in', year: 2019, price: 950, category: 'landscape', available: false, tone: 'terracotta' },
  { key: 'p-pears', title: 'Still Life with Pears', slug: 'still-life-with-pears', medium: 'Oil on panel', dimensions: '12 × 16 in', year: 2023, price: 780, category: 'still-life', available: true, featured: true, tone: 'gold' },
  { key: 'p-crows', title: 'Two Crows', slug: 'two-crows', medium: 'Acrylic on canvas', dimensions: '20 × 20 in', year: 2022, price: 900, category: 'animals', available: true, tone: 'dusk' },
  { key: 'p-hillside', title: 'Vermont Hillside', slug: 'vermont-hillside', medium: 'Oil on canvas', dimensions: '24 × 30 in', year: 2021, price: 1500, category: 'landscape', available: true, tone: 'sage' },
  { key: 'p-birches', title: 'Winter Birches', slug: 'winter-birches', medium: 'Oil on linen', dimensions: '18 × 24 in', year: 2020, price: 1100, category: 'landscape', available: false, tone: 'plum' },
]

export type PrintSeed = {
  key: string
  title: string
  slug: string
  fromPrice: number
  description: string
  externalUrl: string
  tone: Tone
}

export const PRINTS: PrintSeed[] = [
  { key: 'pr-hounds', title: 'Walking Hounds', slug: 'walking-hounds-print', fromPrice: 28, description: 'Archival giclée, framed or unframed.', externalUrl: 'https://lisa-curry-mair.pixels.com', tone: 'gold' },
  { key: 'pr-greenriver', title: 'Green River Morning', slug: 'green-river-morning-print', fromPrice: 32, description: 'Reproduced on museum-grade cotton rag.', externalUrl: 'https://lisa-curry-mair.pixels.com', tone: 'forest' },
  { key: 'pr-redbarn', title: 'The Red Barn', slug: 'the-red-barn-print', fromPrice: 28, description: 'A Vermont classic, in three sizes.', externalUrl: 'https://lisa-curry-mair.pixels.com', tone: 'terracotta' },
  { key: 'pr-birches', title: 'Winter Birches', slug: 'winter-birches-print', fromPrice: 30, description: 'Quiet greys for a calm corner.', externalUrl: 'https://lisa-curry-mair.pixels.com', tone: 'plum' },
]

export type ClassSeed = {
  key: string
  title: string
  slug: string
  summary: string
  format: string
  level: string
  duration: string
  price: number
  tone: Tone
}

export const CLASSES: ClassSeed[] = [
  { key: 'c-foundations', title: 'Foundations of Decorative Painting', slug: 'foundations-of-decorative-painting', summary: 'Colour mixing, brushwork and confidence for the wall — a warm place to begin.', format: 'in-person', level: 'all', duration: '3 evening sessions', price: 340, tone: 'gold' },
  { key: 'c-mural', title: 'Mural Techniques Intensive', slug: 'mural-techniques-intensive', summary: 'Scale, perspective and trompe-l’œil across two studio days.', format: 'workshop', level: 'intermediate', duration: '2 days', price: 525, tone: 'sage' },
  { key: 'c-floorcloth', title: 'Floorcloth Studio', slug: 'floorcloth-studio', summary: 'Design, paint and seal a canvas floorcloth to take home.', format: 'in-person', level: 'all', duration: '1 day', price: 185, tone: 'terracotta' },
  { key: 'c-landscape', title: 'Painting the Vermont Landscape', slug: 'painting-the-vermont-landscape', summary: 'A self-paced online course in light, season and place.', format: 'online', level: 'all', duration: 'Self-paced', price: 95, tone: 'forest' },
]

export type PostSeed = {
  key: string
  title: string
  slug: string
  excerpt: string
  date: string
  tone: Tone
}

export const POSTS: PostSeed[] = [
  { key: 'b-canvas', title: 'Why I still paint on canvas after thirty years', slug: 'why-i-still-paint-on-canvas', excerpt: 'The tooth of the cloth, the smell of the ground — a few reasons the old way still wins.', date: '2026-05-18', tone: 'gold' },
  { key: 'b-westford', title: 'Behind the Westford mural', slug: 'behind-the-westford-mural', excerpt: 'What it took to wrap a modern farmhouse in painted Vermont, on camera for This Old House.', date: '2026-03-02', tone: 'forest' },
  { key: 'b-floorcloth', title: 'A floorcloth, from sketch to seal', slug: 'a-floorcloth-from-sketch-to-seal', excerpt: 'The humble, hard-wearing art form I keep coming back to.', date: '2026-01-20', tone: 'terracotta' },
  { key: 'b-summer', title: 'Notes from the summer studio', slug: 'notes-from-the-summer-studio', excerpt: 'Long light, open windows, and the paintings that come out of it.', date: '2025-08-11', tone: 'sage' },
]

export type PressSeed = {
  key: string
  title: string
  outlet: string
  date: string
  excerpt: string
  url?: string
}

export const PRESS: PressSeed[] = [
  { key: 'press-toh-1', title: 'A hand-painted farmhouse landscape', outlet: 'PBS — This Old House', date: '2019-10-24', excerpt: 'Lisa paints a wraparound mural for the Westford modern farmhouse project.', url: 'https://www.thisoldhouse.com' },
  { key: 'press-toh-2', title: 'Finishing the Westford mural', outlet: 'PBS — This Old House', date: '2019-11-07', excerpt: 'The mural comes to life as the season’s build wraps up.', url: 'https://www.thisoldhouse.com' },
  { key: 'press-vt', title: 'The muralist of the Green Mountains', outlet: 'Vermont Magazine', date: '2021-06-01', excerpt: 'A studio visit with Lisa Curry Mair on a life spent painting on canvas.' },
]

/** Values that appear in the homepage marquee / stats strip. */
export const STATS = [
  { value: '30+', label: 'Years painting' },
  { value: '300+', label: 'Commissions delivered' },
  { value: 'PBS', label: 'This Old House feature' },
  { value: '∞', label: 'Coats of varnish' },
]

export const img = (key: string) => `/img/${key}.svg`
