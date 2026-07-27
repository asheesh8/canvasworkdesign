import { headers as nextHeaders } from 'next/headers'
import { getPayloadClient } from './payload'

export type StudioUser = { id: number | string; email: string; name?: string; role?: string }

/** Returns the currently authenticated Payload user (via the payload-token cookie), or null. */
export async function getStudioUser(): Promise<StudioUser | null> {
  try {
    const payload = await getPayloadClient()
    const incoming = await nextHeaders()
    // Payload's auth may write to the headers object, so hand it a mutable copy
    // (next/headers() is read-only and would throw).
    const mutable = new Headers()
    incoming.forEach((value, key) => mutable.append(key, value))
    const { user } = await payload.auth({ headers: mutable })
    return (user as StudioUser) ?? null
  } catch {
    return null
  }
}
