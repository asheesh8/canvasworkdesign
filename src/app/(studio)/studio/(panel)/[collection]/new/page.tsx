import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCollection } from '@/studio/config'
import { toFormValues } from '@/studio/values'
import { StudioForm } from '@/components/studio/StudioForm'
import { saveDoc } from '@/app/(studio)/studio/actions'

type Params = { params: Promise<{ collection: string }> }

export default async function NewDocPage({ params }: Params) {
  const { collection } = await params
  const col = getCollection(collection)
  if (!col) notFound()

  const values = toFormValues(col.fields, {})

  return (
    <div>
      <Link href={`/studio/${col.slug}`} className="text-sm text-stone hover:text-ink">← {col.label}</Link>
      <h1 className="mt-3 font-display text-4xl text-ink">New {col.singular.toLowerCase()}</h1>
      <div className="mt-8">
        <StudioForm
          fields={col.fields}
          values={values}
          action={saveDoc.bind(null, col.slug, null)}
          cancelHref={`/studio/${col.slug}`}
          submitLabel={`Create ${col.singular.toLowerCase()}`}
        />
      </div>
    </div>
  )
}
