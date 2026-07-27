import type { CollectionConfig } from 'payload'
import { formatSlug } from '../lib/formatSlug'

export const Classes: CollectionConfig = {
  slug: 'classes',
  labels: { singular: 'Class', plural: 'Classes' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'format', 'level', 'nextDate'],
    group: 'Teaching',
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
    { name: 'summary', type: 'textarea', admin: { description: 'Shown on the class card.' } },
    { name: 'description', type: 'richText' },
    {
      type: 'row',
      fields: [
        {
          name: 'format',
          type: 'select',
          admin: { width: '50%' },
          defaultValue: 'in-person',
          options: [
            { label: 'In person', value: 'in-person' },
            { label: 'Online', value: 'online' },
            { label: 'Workshop', value: 'workshop' },
          ],
        },
        {
          name: 'level',
          type: 'select',
          admin: { width: '50%' },
          defaultValue: 'all',
          options: [
            { label: 'All levels', value: 'all' },
            { label: 'Beginner', value: 'beginner' },
            { label: 'Intermediate', value: 'intermediate' },
            { label: 'Advanced', value: 'advanced' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'duration', type: 'text', admin: { width: '33%', placeholder: '3 hours' } },
        { name: 'price', type: 'number', admin: { width: '33%', description: 'USD' } },
        { name: 'nextDate', type: 'date', admin: { width: '34%', date: { pickerAppearance: 'dayOnly' } } },
      ],
    },
    { name: 'signupUrl', type: 'text', label: 'Registration link' },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
