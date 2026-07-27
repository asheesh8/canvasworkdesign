import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import { getCollection } from '@/studio/config'
import { toFormValues } from '@/studio/values'
import { StudioForm } from '@/components/studio/StudioForm'
import { saveDoc } from '@/app/(studio)/studio/actions'

type Params = { params: Promise<{ collection: string; id: string }> }

export default async function EditDocPage({ params }: Params) {
  const { collection, id } = await params
  const col = getCollection(collection)
  if (!col) notFound()

  let doc: any = null
  try {
    const payload = await getPayloadClient()
    doc = await payload.findByID({ collection: col.slug as any, id, depth: 1 })
  } catch {
    doc = null
  }
  if (!doc) notFound()

  const values = toFormValues(col.fields, doc)

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href={`/studio/${col.slug}`} className="text-sm text-stone hover:text-ink">← {col.label}</Link>
        {col.imageField && doc[col.imageField]?.url && (
          <span className="text-xs text-stone">Editing “{doc[col.titleField]}”</span>
        )}
      </div>
      <h1 className="mt-3 font-display text-4xl text-ink">{doc[col.titleField] || `Edit ${col.singular.toLowerCase()}`}</h1>
      <div className="mt-8">
        <StudioForm
          fields={col.fields}
          values={values}
          action={saveDoc.bind(null, col.slug, String(id))}
          cancelHref={`/studio/${col.slug}`}
          submitLabel="Save changes"
        />
      </div>
    </div>
  )
}
