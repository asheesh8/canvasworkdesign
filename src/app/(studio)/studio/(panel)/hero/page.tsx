import { getPayloadClient } from '@/lib/payload'
import { getGlobal } from '@/studio/config'
import { toFormValues } from '@/studio/values'
import { StudioForm } from '@/components/studio/StudioForm'
import { saveGlobal } from '@/app/(studio)/studio/actions'

export default async function HeroSettingsPage() {
  const g = getGlobal('home-hero')!
  let doc: any = {}
  try {
    const payload = await getPayloadClient()
    doc = await payload.findGlobal({ slug: 'home-hero', depth: 1 })
  } catch {
    doc = {}
  }
  const values = toFormValues(g.fields, doc)

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-gold">Content</p>
      <h1 className="mt-2 font-display text-4xl text-ink">Homepage hero</h1>
      <p className="mt-1 max-w-xl text-sm text-stone">The big first impression — headline, giant word behind it, and the button.</p>
      <div className="mt-8">
        <StudioForm
          fields={g.fields}
          values={values}
          action={saveGlobal.bind(null, 'home-hero', '/studio/hero')}
          cancelHref="/studio"
          submitLabel="Save hero"
        />
      </div>
    </div>
  )
}
