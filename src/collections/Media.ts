import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Library',
  },
  access: {
    read: () => true,
  },
  upload: {
    focalPoint: true,
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'thumbnail', width: 480, position: 'centre' },
      { name: 'card', width: 900, position: 'centre' },
      { name: 'feature', width: 1600, position: 'centre' },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Describe the image for screen readers and SEO.',
      },
    },
    {
      name: 'credit',
      type: 'text',
      admin: {
        description: 'Optional photo credit (e.g. "Photo: Mike Casey").',
      },
    },
  ],
}
