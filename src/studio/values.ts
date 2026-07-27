import { lexicalToText } from '@/lib/lexical'
import type { AdminField } from './config'

export type UploadValue = { id?: number | string; url?: string; alt?: string } | null

/** Flatten a Payload document into input-ready values for the Studio form. */
export function toFormValues(fields: AdminField[], doc: Record<string, any> | null | undefined) {
  const out: Record<string, any> = {}
  for (const f of fields) {
    const v = doc?.[f.name]
    switch (f.type) {
      case 'richtext':
        out[f.name] = v ? lexicalToText(v) : ''
        break
      case 'upload':
        out[f.name] = v && typeof v === 'object' ? { id: v.id, url: v.url, alt: v.alt } : null
        break
      case 'date':
        out[f.name] = v ? String(v).slice(0, 10) : ''
        break
      case 'checkbox':
        out[f.name] = !!v
        break
      case 'number':
        out[f.name] = v ?? ''
        break
      default:
        out[f.name] = v ?? ''
    }
  }
  return out
}
