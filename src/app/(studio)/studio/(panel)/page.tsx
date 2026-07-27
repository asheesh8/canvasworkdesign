import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { getStudioUser } from '@/lib/studioAuth'
import { COLLECTIONS } from '@/studio/config'

async function counts() {
  try {
    const payload = await getPayloadClient()
    const entries = await Promise.all(
      COLLECTIONS.map(async (c) => {
        try {
          const r = await payload.count({ collection: c.slug as any })
          return [c.slug, r.totalDocs] as const
        } catch {
          return [c.slug, 0] as const
        }
      }),
    )
    return Object.fromEntries(entries) as Record<string, number>
  } catch {
    return {}
  }
}

export default async function Dashboard() {
  const [user, totals] = await Promise.all([getStudioUser(), counts()])
  const firstName = user?.name?.split(' ')[0] || 'there'

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-gold">Dashboard</p>
      <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
        Welcome back, {firstName}.
      </h1>
      <p className="mt-3 max-w-xl text-cocoa">
        Everything on your website lives here. Add work, write journal entries, update your details — changes go live
        the moment you save.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COLLECTIONS.map((c) => (
          <Link
            key={c.slug}
            href={`/studio/${c.slug}`}
            className="group rounded-2xl border border-ink/10 bg-cream p-5 transition-colors hover:border-gold/40"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">{c.icon}</span>
              <span className="font-display text-3xl text-ink">{totals[c.slug] ?? 0}</span>
            </div>
            <p className="mt-3 font-display text-xl text-ink">{c.label}</p>
            <p className="mt-1 text-sm text-stone group-hover:text-gold">Manage {c.label.toLowerCase()} →</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-ink/10 bg-cream p-6">
        <h2 className="font-display text-2xl text-ink">Quick actions</h2>
        <div className="mt-4 flex flex-wrap gap-2.5">
          <Link href="/studio/murals/new" className="rounded-full bg-ink px-5 py-2.5 text-sm text-ivory hover:bg-espresso">
            + Add a mural
          </Link>
          <Link href="/studio/paintings/new" className="rounded-full bg-ink px-5 py-2.5 text-sm text-ivory hover:bg-espresso">
            + Add a painting
          </Link>
          <Link href="/studio/posts/new" className="rounded-full bg-ink px-5 py-2.5 text-sm text-ivory hover:bg-espresso">
            + Write a journal post
          </Link>
          <Link href="/studio/media" className="rounded-full border border-ink/15 px-5 py-2.5 text-sm text-ink hover:bg-ink/5">
            Upload images
          </Link>
          <Link href="/studio/hero" className="rounded-full border border-ink/15 px-5 py-2.5 text-sm text-ink hover:bg-ink/5">
            Edit homepage hero
          </Link>
        </div>
      </div>
    </div>
  )
}
