/**
 * Field configuration that powers the custom Studio admin. Mirrors the
 * Payload collections but describes only the fields we expose in the UI.
 */

export type FieldType =
  | 'text'
  | 'textarea'
  | 'richtext'
  | 'number'
  | 'checkbox'
  | 'select'
  | 'date'
  | 'upload'

export type AdminField = {
  name: string
  label: string
  type: FieldType
  required?: boolean
  placeholder?: string
  help?: string
  options?: { label: string; value: string }[]
  half?: boolean
}

export type AdminCollection = {
  slug: string
  label: string // plural
  singular: string
  group: string
  icon: string // emoji
  titleField: string
  subtitleField?: string
  imageField?: string
  listColumns: { name: string; label: string }[]
  fields: AdminField[]
}

const orderField: AdminField = {
  name: 'order',
  label: 'Sort order',
  type: 'number',
  help: 'Lower numbers appear first.',
  half: true,
}

export const COLLECTIONS: AdminCollection[] = [
  {
    slug: 'murals',
    label: 'Murals',
    singular: 'Mural',
    group: 'Portfolio',
    icon: '🖼️',
    titleField: 'title',
    subtitleField: 'location',
    imageField: 'coverImage',
    listColumns: [
      { name: 'location', label: 'Location' },
      { name: 'year', label: 'Year' },
      { name: 'featured', label: 'Featured' },
    ],
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'slug', label: 'Slug', type: 'text', help: 'Leave blank to auto-generate from the title.', half: true },
      { name: 'category', label: 'Category', type: 'select', half: true, options: [
        { label: 'Residential', value: 'residential' },
        { label: 'Commercial', value: 'commercial' },
        { label: 'Ceiling', value: 'ceiling' },
        { label: 'Floorcloth', value: 'floorcloth' },
        { label: 'Historic', value: 'historic' },
      ] },
      { name: 'location', label: 'Location', type: 'text', half: true },
      { name: 'year', label: 'Year', type: 'number', half: true },
      { name: 'coverImage', label: 'Cover image', type: 'upload' },
      { name: 'excerpt', label: 'Short summary', type: 'textarea', help: 'One line shown on cards.' },
      { name: 'description', label: 'Description', type: 'richtext' },
      { name: 'featured', label: 'Feature on homepage', type: 'checkbox', half: true },
      orderField,
    ],
  },
  {
    slug: 'paintings',
    label: 'Paintings',
    singular: 'Painting',
    group: 'Portfolio',
    icon: '🎨',
    titleField: 'title',
    subtitleField: 'medium',
    imageField: 'image',
    listColumns: [
      { name: 'medium', label: 'Medium' },
      { name: 'year', label: 'Year' },
      { name: 'available', label: 'Available' },
    ],
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'slug', label: 'Slug', type: 'text', half: true },
      { name: 'category', label: 'Category', type: 'select', half: true, options: [
        { label: 'Landscape', value: 'landscape' },
        { label: 'Animals', value: 'animals' },
        { label: 'Still Life', value: 'still-life' },
        { label: 'Figurative', value: 'figurative' },
        { label: 'Abstract', value: 'abstract' },
      ] },
      { name: 'image', label: 'Image', type: 'upload' },
      { name: 'medium', label: 'Medium', type: 'text', placeholder: 'Acrylic on canvas', half: true },
      { name: 'dimensions', label: 'Dimensions', type: 'text', placeholder: '24 × 36 in', half: true },
      { name: 'year', label: 'Year', type: 'number', half: true },
      { name: 'price', label: 'Price (USD)', type: 'number', half: true, help: 'Leave blank if not for sale.' },
      { name: 'description', label: 'Description', type: 'richtext' },
      { name: 'available', label: 'Available for sale', type: 'checkbox', half: true },
      { name: 'featured', label: 'Feature on homepage', type: 'checkbox', half: true },
      orderField,
    ],
  },
  {
    slug: 'prints',
    label: 'Prints',
    singular: 'Print',
    group: 'Shop',
    icon: '🛍️',
    titleField: 'title',
    subtitleField: 'fromPrice',
    imageField: 'image',
    listColumns: [
      { name: 'fromPrice', label: 'From' },
      { name: 'featured', label: 'Featured' },
    ],
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'slug', label: 'Slug', type: 'text', half: true },
      { name: 'fromPrice', label: 'Starting price (USD)', type: 'number', half: true },
      { name: 'image', label: 'Image', type: 'upload' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'externalUrl', label: 'Fulfilment link', type: 'text', help: 'Pixels / Fine Art America URL.' },
      { name: 'featured', label: 'Feature on homepage', type: 'checkbox', half: true },
      orderField,
    ],
  },
  {
    slug: 'classes',
    label: 'Classes',
    singular: 'Class',
    group: 'Teaching',
    icon: '✏️',
    titleField: 'title',
    subtitleField: 'format',
    imageField: 'image',
    listColumns: [
      { name: 'format', label: 'Format' },
      { name: 'level', label: 'Level' },
      { name: 'price', label: 'Price' },
    ],
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'slug', label: 'Slug', type: 'text', half: true },
      { name: 'image', label: 'Image', type: 'upload' },
      { name: 'summary', label: 'Summary', type: 'textarea', help: 'Shown on the class card.' },
      { name: 'description', label: 'Description', type: 'richtext' },
      { name: 'format', label: 'Format', type: 'select', half: true, options: [
        { label: 'In person', value: 'in-person' },
        { label: 'Online', value: 'online' },
        { label: 'Workshop', value: 'workshop' },
      ] },
      { name: 'level', label: 'Level', type: 'select', half: true, options: [
        { label: 'All levels', value: 'all' },
        { label: 'Beginner', value: 'beginner' },
        { label: 'Intermediate', value: 'intermediate' },
        { label: 'Advanced', value: 'advanced' },
      ] },
      { name: 'duration', label: 'Duration', type: 'text', placeholder: '3 hours', half: true },
      { name: 'price', label: 'Price (USD)', type: 'number', half: true },
      { name: 'nextDate', label: 'Next date', type: 'date', half: true },
      { name: 'signupUrl', label: 'Registration link', type: 'text', half: true },
      orderField,
    ],
  },
  {
    slug: 'posts',
    label: 'Journal',
    singular: 'Post',
    group: 'Journal',
    icon: '📝',
    titleField: 'title',
    subtitleField: 'author',
    imageField: 'coverImage',
    listColumns: [
      { name: 'publishedDate', label: 'Published' },
      { name: 'published', label: 'Live' },
    ],
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'slug', label: 'Slug', type: 'text', half: true },
      { name: 'author', label: 'Author', type: 'text', half: true },
      { name: 'coverImage', label: 'Cover image', type: 'upload' },
      { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
      { name: 'content', label: 'Content', type: 'richtext' },
      { name: 'publishedDate', label: 'Published date', type: 'date', half: true },
      { name: 'published', label: 'Published (visible)', type: 'checkbox', half: true },
    ],
  },
  {
    slug: 'press',
    label: 'News & Media',
    singular: 'Press item',
    group: 'Journal',
    icon: '📰',
    titleField: 'title',
    subtitleField: 'outlet',
    imageField: 'image',
    listColumns: [
      { name: 'outlet', label: 'Outlet' },
      { name: 'date', label: 'Date' },
    ],
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'outlet', label: 'Outlet', type: 'text', placeholder: 'PBS — This Old House', half: true },
      { name: 'date', label: 'Date', type: 'date', half: true },
      { name: 'image', label: 'Image', type: 'upload' },
      { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
      { name: 'url', label: 'Link', type: 'text' },
      { name: 'featured', label: 'Featured', type: 'checkbox', half: true },
      orderField,
    ],
  },
]

export type AdminGlobal = {
  slug: string
  label: string
  icon: string
  fields: AdminField[]
}

export const GLOBALS: AdminGlobal[] = [
  {
    slug: 'home-hero',
    label: 'Home Hero',
    icon: '✦',
    fields: [
      { name: 'heroWord', label: 'Giant word', type: 'text', half: true, help: 'The word layered behind the hero.' },
      { name: 'ctaLabel', label: 'Button label', type: 'text', half: true },
      { name: 'ctaHref', label: 'Button link', type: 'text', half: true },
      { name: 'headline', label: 'Headline', type: 'text' },
      { name: 'subheadline', label: 'Sub-headline', type: 'textarea' },
      { name: 'poster', label: 'Poster image', type: 'upload', help: 'Shown before the video loads.' },
    ],
  },
  {
    slug: 'site-settings',
    label: 'Site Settings',
    icon: '⚙︎',
    fields: [
      { name: 'email', label: 'Email', type: 'text', half: true },
      { name: 'phone', label: 'Phone', type: 'text', half: true },
      { name: 'location', label: 'Location', type: 'text', half: true },
      { name: 'instagram', label: 'Instagram URL', type: 'text', half: true },
      { name: 'pinterest', label: 'Pinterest URL', type: 'text', half: true },
      { name: 'facebook', label: 'Facebook URL', type: 'text', half: true },
      { name: 'newsletterHeading', label: 'Newsletter heading', type: 'text' },
      { name: 'newsletterBlurb', label: 'Newsletter blurb', type: 'textarea' },
      { name: 'footerBlurb', label: 'Footer blurb', type: 'textarea' },
    ],
  },
]

export const getCollection = (slug: string) => COLLECTIONS.find((c) => c.slug === slug)
export const getGlobal = (slug: string) => GLOBALS.find((g) => g.slug === slug)
