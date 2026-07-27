import type { CollectionConfig } from 'payload'
import { formatSlug } from '../lib/formatSlug'

export const Prints: CollectionConfig = {
  slug: 'prints',
  labels: { singular: 'Print', plural: 'Prints' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'fromPrice', 'featured'],
    group: 'Shop',
  },
  access: { read: () => true },
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
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'description', type: 'textarea' },
    {
      name: 'fromPrice',
      type: 'number',
      label: 'Starting price (USD)',
      admin: { description: 'Shown as "from $X".' },
    },
    {
      name: 'sizes',
      type: 'array',
      labels: { singular: 'Size option', plural: 'Size options' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text', required: true, admin: { width: '60%', placeholder: '11 × 14 in' } },
            { name: 'price', type: 'number', required: true, admin: { width: '40%' } },
          ],
        },
      ],
    },
    {
      name: 'externalUrl',
      type: 'text',
      label: 'Fulfilment link (Pixels / Fine Art America)',
      admin: { description: 'Where "Buy print" currently sends the customer.' },
    },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
