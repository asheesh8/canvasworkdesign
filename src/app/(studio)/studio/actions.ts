'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { getPayloadClient } from '@/lib/payload'
import { getStudioUser } from '@/lib/studioAuth'
import { textToLexical } from '@/lib/lexical'
import { getCollection, getGlobal, type AdminField } from '@/studio/config'

export type ActionState = { error?: string; ok?: boolean }

const COOKIE = 'payload-token'

/* ----------------------------- Auth ----------------------------- */
export async function login(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const email = String(formData.get('email') || '')
  const password = String(formData.get('password') || '')
  if (!email || !password) return { error: 'Please enter your email and password.' }

  try {
    const payload = await getPayloadClient()
    const res = await payload.login({ collection: 'users', data: { email, password } })
    if (!res?.token) return { error: 'Invalid email or password.' }
    const jar = await cookies()
    jar.set(COOKIE, res.token, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
    })
  } catch {
    return { error: 'Invalid email or password.' }
  }
  redirect('/studio')
}

export async function logout() {
  const jar = await cookies()
  jar.delete(COOKIE)
  redirect('/studio/login')
}

/* -------------------------- Build data -------------------------- */
async function buildData(payload: any, fields: AdminField[], formData: FormData, titleField: string) {
  const data: Record<string, unknown> = {}

  for (const f of fields) {
    switch (f.type) {
      case 'text': {
        const v = String(formData.get(f.name) ?? '').trim()
        if (f.name === 'slug') {
          if (v) data[f.name] = v // blank slug → let the collection hook handle it
        } else {
          data[f.name] = v || null
        }
        break
      }
      case 'textarea': {
        const v = String(formData.get(f.name) ?? '').trim()
        data[f.name] = v || null
        break
      }
      case 'richtext': {
        const v = String(formData.get(f.name) ?? '').trim()
        data[f.name] = v ? textToLexical(v) : null
        break
      }
      case 'number': {
        const raw = String(formData.get(f.name) ?? '').trim()
        if (raw === '') {
          if (f.name === 'order') data[f.name] = 0
          else data[f.name] = null
        } else {
          data[f.name] = Number(raw)
        }
        break
      }
      case 'checkbox': {
        data[f.name] = formData.get(f.name) === 'on'
        break
      }
      case 'select': {
        const v = String(formData.get(f.name) ?? '').trim()
        data[f.name] = v || null
        break
      }
      case 'date': {
        const v = String(formData.get(f.name) ?? '').trim()
        data[f.name] = v ? new Date(v).toISOString() : null
        break
      }
      case 'upload': {
        const file = formData.get(`${f.name}__file`) as File | null
        if (file && typeof file === 'object' && file.size > 0) {
          const alt = String(formData.get(titleField) || f.label)
          const media = await payload.create({
            collection: 'media',
            data: { alt },
            file: {
              data: Buffer.from(await file.arrayBuffer()),
              mimetype: file.type,
              name: file.name,
              size: file.size,
            },
          })
          data[f.name] = media.id
        } else {
          const existing = String(formData.get(`${f.name}__id`) || '')
          data[f.name] = existing ? Number(existing) : null
        }
        break
      }
    }
  }
  return data
}

/* ------------------------ Collection CRUD ------------------------ */
export async function saveDoc(slug: string, id: string | null, _prev: ActionState, formData: FormData): Promise<ActionState> {
  const user = await getStudioUser()
  if (!user) return { error: 'Your session has expired — please sign in again.' }
  const col = getCollection(slug)
  if (!col) return { error: 'Unknown collection.' }

  try {
    const payload = await getPayloadClient()
    const data = await buildData(payload, col.fields, formData, col.titleField)
    if (id) await payload.update({ collection: slug as any, id, data })
    else await payload.create({ collection: slug as any, data })
  } catch (e: any) {
    return { error: e?.message || 'Could not save. Please check the fields and try again.' }
  }
  revalidatePath('/', 'layout')
  redirect(`/studio/${slug}`)
}

export async function deleteDoc(slug: string, id: string) {
  const user = await getStudioUser()
  if (!user) redirect('/studio/login')
  try {
    const payload = await getPayloadClient()
    await payload.delete({ collection: slug as any, id })
  } catch {
    /* ignore */
  }
  revalidatePath('/', 'layout')
  redirect(`/studio/${slug}`)
}

/* --------------------------- Globals ---------------------------- */
export async function saveGlobal(slug: string, returnPath: string, _prev: ActionState, formData: FormData): Promise<ActionState> {
  const user = await getStudioUser()
  if (!user) return { error: 'Your session has expired — please sign in again.' }
  const g = getGlobal(slug)
  if (!g) return { error: 'Unknown settings group.' }

  try {
    const payload = await getPayloadClient()
    const data = await buildData(payload, g.fields, formData, g.fields[0]?.name || 'title')
    await payload.updateGlobal({ slug: slug as any, data })
  } catch (e: any) {
    return { error: e?.message || 'Could not save settings.' }
  }
  revalidatePath('/', 'layout')
  return { ok: true, ...(returnPath ? {} : {}) }
}

/* ----------------------------- Media ---------------------------- */
export async function uploadMedia(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const user = await getStudioUser()
  if (!user) return { error: 'Not authenticated.' }
  const file = formData.get('file') as File | null
  if (!file || file.size === 0) return { error: 'Choose an image to upload.' }
  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'media',
      data: { alt: String(formData.get('alt') || file.name) },
      file: {
        data: Buffer.from(await file.arrayBuffer()),
        mimetype: file.type,
        name: file.name,
        size: file.size,
      },
    })
  } catch (e: any) {
    return { error: e?.message || 'Upload failed.' }
  }
  revalidatePath('/studio/media')
  return { ok: true }
}

export async function deleteMedia(id: string) {
  const user = await getStudioUser()
  if (!user) redirect('/studio/login')
  try {
    const payload = await getPayloadClient()
    await payload.delete({ collection: 'media', id })
  } catch {
    /* ignore */
  }
  revalidatePath('/studio/media')
}
