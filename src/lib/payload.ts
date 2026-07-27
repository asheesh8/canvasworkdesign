import { getPayload } from 'payload'
import config from '@payload-config'

/**
 * Returns the Payload Local API instance. Payload maintains its own internal
 * global cache, so calling this repeatedly is cheap and returns the same
 * instance. (Do NOT cache it on `globalThis._payload` — that key collides
 * with Payload's own internal cache and yields the wrong object.)
 */
export function getPayloadClient() {
  return getPayload({ config })
}

type MediaLike = { url?: string | null; alt?: string | null; sizes?: Record<string, { url?: string | null }> } | null | undefined

/** Resolve a usable image URL from a populated media relationship. */
export function mediaUrl(media: MediaLike, size?: 'card' | 'feature' | 'thumbnail'): string | null {
  if (!media || typeof media !== 'object') return null
  if (size && media.sizes?.[size]?.url) return media.sizes[size]!.url ?? null
  return media.url ?? null
}
