import type { GlobalConfig } from 'payload'

export const HomeHero: GlobalConfig = {
  slug: 'home-hero',
  label: 'Home Hero',
  admin: { group: 'Content' },
  access: { read: () => true },
  fields: [
    {
      name: 'heroWord',
      type: 'text',
      defaultValue: 'canvas',
      admin: { description: 'The giant word layered behind the hero image.' },
    },
    {
      name: 'headline',
      type: 'text',
      defaultValue: 'Painting for the age of taste and craft',
    },
    {
      name: 'subheadline',
      type: 'textarea',
      defaultValue:
        'Three decades of hand-painted murals and original work on canvas, made for the homes they live in.',
    },
    {
      name: 'poster',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional still shown before the background video loads.' },
    },
    {
      type: 'row',
      fields: [
        { name: 'ctaLabel', type: 'text', defaultValue: 'Start a commission', admin: { width: '50%' } },
        { name: 'ctaHref', type: 'text', defaultValue: '/contact', admin: { width: '50%' } },
      ],
    },
  ],
}
