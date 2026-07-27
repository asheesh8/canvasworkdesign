'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import type { AdminField } from '@/studio/config'
import type { ActionState } from '@/app/(studio)/studio/actions'
import { cn } from '@/lib/utils'

const inputCls =
  'w-full rounded-xl border border-ink/15 bg-ivory px-4 py-2.5 text-[0.95rem] text-ink outline-none transition-colors focus:border-gold placeholder:text-stone/60'

function UploadField({ field, value }: { field: AdminField; value: any }) {
  const [preview, setPreview] = useState<string | null>(value?.url ?? null)
  return (
    <div>
      <div className="flex items-center gap-4">
        <div className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-xl border border-ink/10 bg-sand">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="text-xs text-stone">No image</span>
          )}
        </div>
        <div className="flex-1">
          <input type="hidden" name={`${field.name}__id`} defaultValue={value?.id ?? ''} />
          <input
            type="file"
            name={`${field.name}__file`}
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files?.[0]
              setPreview(f ? URL.createObjectURL(f) : value?.url ?? null)
            }}
            className="block w-full text-sm text-cocoa file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-ivory hover:file:bg-espresso"
          />
          <p className="mt-1.5 text-xs text-stone">Upload a new image to replace the current one.</p>
        </div>
      </div>
    </div>
  )
}

function Field({ field, value }: { field: AdminField; value: any }) {
  const common = { name: field.name, id: field.name, placeholder: field.placeholder }
  return (
    <div className={cn(field.half ? 'sm:col-span-1' : 'sm:col-span-2')}>
      {field.type !== 'checkbox' && (
        <label htmlFor={field.name} className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-stone">
          {field.label}
          {field.required && <span className="text-terracotta"> *</span>}
        </label>
      )}

      {field.type === 'text' && <input {...common} type="text" required={field.required} defaultValue={value ?? ''} className={inputCls} />}

      {field.type === 'number' && <input {...common} type="number" step="any" defaultValue={value ?? ''} className={inputCls} />}

      {field.type === 'date' && <input {...common} type="date" defaultValue={value ?? ''} className={inputCls} />}

      {field.type === 'textarea' && <textarea {...common} rows={3} defaultValue={value ?? ''} className={cn(inputCls, 'resize-y')} />}

      {field.type === 'richtext' && <textarea {...common} rows={8} defaultValue={value ?? ''} className={cn(inputCls, 'resize-y font-serif')} />}

      {field.type === 'select' && (
        <select {...common} defaultValue={value ?? ''} className={inputCls}>
          <option value="">— select —</option>
          {field.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      )}

      {field.type === 'checkbox' && (
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-ink/10 bg-ivory px-4 py-3">
          <input type="checkbox" name={field.name} defaultChecked={!!value} className="h-4 w-4 accent-gold" />
          <span className="text-[0.95rem] text-ink">{field.label}</span>
        </label>
      )}

      {field.type === 'upload' && <UploadField field={field} value={value} />}

      {field.help && <p className="mt-1.5 text-xs text-stone">{field.help}</p>}
    </div>
  )
}

export function StudioForm({
  fields,
  values,
  action,
  cancelHref,
  submitLabel = 'Save',
}: {
  fields: AdminField[]
  values: Record<string, any>
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>
  cancelHref: string
  submitLabel?: string
}) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(action, {})

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
        {fields.map((f) => (
          <Field key={f.name} field={f} value={values[f.name]} />
        ))}
      </div>

      {state.error && <p className="rounded-lg bg-terracotta/10 px-4 py-2.5 text-sm text-terracotta">{state.error}</p>}
      {state.ok && <p className="rounded-lg bg-forest/10 px-4 py-2.5 text-sm text-forest">Saved ✦</p>}

      <div className="sticky bottom-0 -mx-1 flex items-center gap-3 border-t border-ink/10 bg-parchment/90 px-1 py-4 backdrop-blur">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-gold px-8 py-3 text-sm font-medium text-ivory transition-colors hover:bg-[#9c7936] disabled:opacity-50"
        >
          {pending ? 'Saving…' : submitLabel}
        </button>
        <Link href={cancelHref} className="rounded-full border border-ink/15 px-6 py-3 text-sm text-ink hover:bg-ink/5">
          Cancel
        </Link>
      </div>
    </form>
  )
}
