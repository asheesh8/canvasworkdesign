import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: { group: 'Settings' },
  access: { read: () => true },
  fields: [
    {
      type: 'collapsible',
      label: 'Contact',
      fields: [
        { name: 'email', type: 'text', defaultValue: 'lisa@canvasworksdesigns.com' },
        { name: 'phone', type: 'text' },
        { name: 'location', type: 'text', defaultValue: 'Vermont, USA' },
      ],
    },
    {
      type: 'collapsible',
      label: 'Social',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'instagram', type: 'text', admin: { width: '33%' }, defaultValue: 'https://instagram.com/vtcanvas' },
            { name: 'pinterest', type: 'text', admin: { width: '33%' }, defaultValue: 'https://pinterest.com/Lisa_Curry_Mair' },
            { name: 'facebook', type: 'text', admin: { width: '34%' }, defaultValue: 'https://facebook.com/CanvasworksVT' },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Newsletter',
      fields: [
        { name: 'newsletterHeading', type: 'text', defaultValue: 'Stay in the studio' },
        {
          name: 'newsletterBlurb',
          type: 'textarea',
          defaultValue:
            'Occasional notes on new murals, paintings, classes and studio life — never more than a few times a year.',
        },
      ],
    },
    {
      name: 'footerBlurb',
      type: 'textarea',
      defaultValue:
        'Hand-painted murals and original paintings for homes around the globe, from the Vermont studio of Lisa Curry Mair.',
    },
  ],
}
