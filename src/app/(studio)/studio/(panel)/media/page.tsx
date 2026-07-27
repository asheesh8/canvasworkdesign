import { getPayloadClient } from '@/lib/payload'
import { MediaUpload } from '@/components/studio/MediaUpload'
import { deleteMedia } from '@/app/(studio)/studio/actions'

export default async function MediaPage() {
  let docs: any[] = []
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({ collection: 'media', depth: 0, limit: 200, sort: '-createdAt' })
    docs = res.docs
  } catch {
    docs = []
  }

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-gold">Library</p>
      <h1 className="mt-2 font-display text-4xl text-ink">Media library</h1>
      <p className="mt-1 text-sm text-stone">{docs.length} images. Upload here, then pick them when editing your work.</p>

      <div className="mt-8">
        <MediaUpload />
      </div>

      {docs.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {docs.map((m) => (
            <div key={m.id} className="group relative overflow-hidden rounded-xl border border-ink/10 bg-sand">
              <div className="aspect-square">
                {m.url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.sizes?.thumbnail?.url || m.url} alt={m.alt || ''} className="h-full w-full object-cover" />
                )}
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-espresso/80 px-3 py-2 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="truncate text-xs text-ivory/80">{m.alt || m.filename}</span>
                <form action={deleteMedia.bind(null, String(m.id))}>
                  <button className="text-xs text-ivory/70 hover:text-terracotta" aria-label="Delete">Delete</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
