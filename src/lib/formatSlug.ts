import type { FieldHook } from 'payload'

export const slugify = (val: string): string =>
  val
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, '-and-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/**
 * beforeValidate hook that derives a slug from `sourceField`
 * when the slug is empty. Editors can still override it by hand.
 */
export const formatSlug =
  (sourceField = 'title'): FieldHook =>
  ({ data, operation, value }) => {
    if (typeof value === 'string' && value.length > 0) return slugify(value)
    if (operation === 'create' || !value) {
      const source = data?.[sourceField]
      if (typeof source === 'string' && source.length > 0) return slugify(source)
    }
    return value
  }
