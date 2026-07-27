import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import { getCollection } from '@/studio/config'
import { deleteDoc } from '@/app/(studio)/studio/actions'
import { formatDate } from '@/lib/utils'

type Params = { params: Promise<{ collection: string }> }

function cell(value: any) {
  if (value === true) return <span className="text-forest">✓</span>
  if (value === false || value == null || value === '') return <span className="text-stone/50">—</span>
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) return formatDate(value)
  return String(value)
}

export default async function CollectionListPage({ params }: Params) {
  const { collection } = await params
  const col = getCollection(collection)
  if (!col) notFound()

  let docs: any[] = []
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({ collection: col.slug as any, depth: 1, limit: 200, sort: 'order' })
    docs = res.docs
  } catch {
    docs = []
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold">{col.group}</p>
          <h1 className="mt-2 font-display text-4xl text-ink">{col.label}</h1>
          <p className="mt-1 text-sm text-stone">{docs.length} {docs.length === 1 ? 'entry' : 'entries'}</p>
        </div>
        <Link href={`/studio/${col.slug}/new`} className="rounded-full bg-ink px-6 py-3 text-sm text-ivory hover:bg-espresso">
          + New {col.singular.toLowerCase()}
        </Link>
      </div>

      {docs.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-ink/15 p-12 text-center">
          <p className="text-cocoa">No {col.label.toLowerCase()} yet.</p>
          <Link href={`/studio/${col.slug}/new`} className="mt-4 inline-block rounded-full bg-gold px-6 py-2.5 text-sm text-ivory hover:bg-[#9c7936]">
            Add the first one
          </Link>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-2xl border border-ink/10 bg-cream">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-ink/10 text-xs uppercase tracking-[0.12em] text-stone">
                <th className="px-4 py-3 font-medium">{col.singular}</th>
                {col.listColumns.map((c) => (
                  <th key={c.name} className="hidden px-4 py-3 font-medium sm:table-cell">{c.label}</th>
                ))}
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {docs.map((d) => {
                const img = col.imageField ? d[col.imageField] : null
                return (
                  <tr key={d.id} className="border-b border-ink/5 last:border-0 hover:bg-ivory/60">
                    <td className="px-4 py-3">
                      <Link href={`/studio/${col.slug}/${d.id}`} className="flex items-center gap-3">
                        <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-lg bg-sand">
                          {img?.url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={img.url} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <span className="text-xs text-stone">—</span>
                          )}
                        </span>
                        <span>
                          <span className="block font-display text-base text-ink">{d[col.titleField] || 'Untitled'}</span>
                          {col.subtitleField && d[col.subtitleField] != null && d[col.subtitleField] !== '' && (
                            <span className="block text-xs text-stone">{String(d[col.subtitleField])}</span>
                          )}
                        </span>
                      </Link>
                    </td>
                    {col.listColumns.map((c) => (
                      <td key={c.name} className="hidden px-4 py-3 text-cocoa sm:table-cell">{cell(d[c.name])}</td>
                    ))}
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link href={`/studio/${col.slug}/${d.id}`} className="text-ink/60 hover:text-ink">Edit</Link>
                        <form action={deleteDoc.bind(null, col.slug, String(d.id))}>
                          <button className="text-stone hover:text-terracotta" aria-label="Delete">Delete</button>
                        </form>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
