import type { CollectionConfig } from 'payload'

export const Press: CollectionConfig = {
  slug: 'press',
  labels: { singular: 'Press Item', plural: 'News & Media' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'outlet', 'date'],
    group: 'Journal',
  },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'outlet', type: 'text', admin: { width: '60%', placeholder: 'PBS — This Old House' } },
        { name: 'date', type: 'date', admin: { width: '40%', date: { pickerAppearance: 'dayOnly' } } },
      ],
    },
    { name: 'excerpt', type: 'textarea' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'url', type: 'text', label: 'Link' },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
