'use client'

import { useActionState, useRef } from 'react'
import { uploadMedia, type ActionState } from '@/app/(studio)/studio/actions'

export function MediaUpload() {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(uploadMedia, {})
  const ref = useRef<HTMLFormElement>(null)

  return (
    <form
      ref={ref}
      action={async (fd) => {
        await formAction(fd)
        ref.current?.reset()
      }}
      className="rounded-2xl border border-dashed border-ink/20 bg-cream p-6"
    >
      <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-stone">Image file</label>
          <input
            type="file"
            name="file"
            accept="image/*"
            required
            className="block w-full text-sm text-cocoa file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-ivory hover:file:bg-espresso"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-stone">Description (alt text)</label>
          <input name="alt" placeholder="What's in the image?" className="w-full rounded-xl border border-ink/15 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-gold" />
        </div>
        <button
          disabled={pending}
          className="h-11 rounded-full bg-gold px-6 text-sm font-medium text-ivory hover:bg-[#9c7936] disabled:opacity-50"
        >
          {pending ? 'Uploading…' : 'Upload'}
        </button>
      </div>
      {state.error && <p className="mt-3 text-sm text-terracotta">{state.error}</p>}
      {state.ok && <p className="mt-3 text-sm text-forest">Uploaded ✦</p>}
    </form>
  )
}
