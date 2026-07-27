import { getPayloadClient } from '@/lib/payload'
import { getGlobal } from '@/studio/config'
import { toFormValues } from '@/studio/values'
import { StudioForm } from '@/components/studio/StudioForm'
import { saveGlobal } from '@/app/(studio)/studio/actions'

export default async function SiteSettingsPage() {
  const g = getGlobal('site-settings')!
  let doc: any = {}
  try {
    const payload = await getPayloadClient()
    doc = await payload.findGlobal({ slug: 'site-settings', depth: 0 })
  } catch {
    doc = {}
  }
  const values = toFormValues(g.fields, doc)

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-gold">Settings</p>
      <h1 className="mt-2 font-display text-4xl text-ink">Site settings</h1>
      <p className="mt-1 max-w-xl text-sm text-stone">Contact details, social links and the words in your footer & newsletter.</p>
      <div className="mt-8">
        <StudioForm
          fields={g.fields}
          values={values}
          action={saveGlobal.bind(null, 'site-settings', '/studio/settings')}
          cancelHref="/studio"
          submitLabel="Save settings"
        />
      </div>
    </div>
  )
}
