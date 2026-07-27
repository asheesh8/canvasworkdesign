import type { CollectionConfig } from 'payload'
import { formatSlug } from '../lib/formatSlug'

export const Murals: CollectionConfig = {
  slug: 'murals',
  labels: { singular: 'Mural', plural: 'Murals' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'location', 'year', 'featured'],
    group: 'Portfolio',
  },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: { position: 'sidebar', description: 'Auto-generated from the title if left blank.' },
      hooks: { beforeValidate: [formatSlug('title')] },
    },
    {
      type: 'row',
      fields: [
        { name: 'location', type: 'text', admin: { width: '50%' } },
        { name: 'year', type: 'number', admin: { width: '50%' } },
      ],
    },
    {
      name: 'category',
      type: 'select',
      defaultValue: 'residential',
      options: [
        { label: 'Residential', value: 'residential' },
        { label: 'Commercial', value: 'commercial' },
        { label: 'Ceiling', value: 'ceiling' },
        { label: 'Floorcloth', value: 'floorcloth' },
        { label: 'Historic', value: 'historic' },
      ],
    },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'excerpt', type: 'textarea', admin: { description: 'One-line summary shown on cards.' } },
    { name: 'description', type: 'richText' },
    {
      name: 'gallery',
      type: 'array',
      labels: { singular: 'Image', plural: 'Gallery images' },
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Lower numbers appear first.' },
    },
  ],
}
