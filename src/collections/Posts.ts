import type { CollectionConfig } from 'payload'
import { formatSlug } from '../lib/formatSlug'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Blog Post', plural: 'Blog' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedDate', 'published'],
    group: 'Journal',
  },
  access: {
    read: ({ req }) => {
      // Public sees only published posts; authenticated editors see all.
      if (req.user) return true
      return { published: { equals: true } }
    },
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: { position: 'sidebar' },
      hooks: { beforeValidate: [formatSlug('title')] },
    },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'excerpt', type: 'textarea', admin: { description: 'Short teaser shown in the blog list.' } },
    { name: 'content', type: 'richText' },
    {
      name: 'author',
      type: 'text',
      defaultValue: 'Lisa Curry Mair',
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedDate',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'tags',
      type: 'array',
      admin: { position: 'sidebar' },
      fields: [{ name: 'tag', type: 'text' }],
    },
  ],
}
