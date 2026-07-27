import type { CollectionConfig } from 'payload'
import { formatSlug } from '../lib/formatSlug'

export const Paintings: CollectionConfig = {
  slug: 'paintings',
  labels: { singular: 'Painting', plural: 'Paintings' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'medium', 'year', 'available', 'featured'],
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
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      type: 'row',
      fields: [
        { name: 'medium', type: 'text', admin: { width: '50%', placeholder: 'Acrylic on canvas' } },
        { name: 'dimensions', type: 'text', admin: { width: '50%', placeholder: '24 × 36 in' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'year', type: 'number', admin: { width: '50%' } },
        { name: 'price', type: 'number', admin: { width: '50%', description: 'USD. Leave blank if not for sale.' } },
      ],
    },
    {
      name: 'category',
      type: 'select',
      defaultValue: 'landscape',
      options: [
        { label: 'Landscape', value: 'landscape' },
        { label: 'Animals', value: 'animals' },
        { label: 'Still Life', value: 'still-life' },
        { label: 'Figurative', value: 'figurative' },
        { label: 'Abstract', value: 'abstract' },
      ],
    },
    { name: 'description', type: 'richText' },
    {
      type: 'row',
      fields: [
        { name: 'available', type: 'checkbox', defaultValue: true, label: 'Available for sale' },
        { name: 'featured', type: 'checkbox', defaultValue: false },
      ],
    },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
