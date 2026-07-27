import { Reveal, RevealGroup, RevealItem, SplitWords } from '@/components/ui/Reveal'
import { ArtTile } from '@/components/ui/ArtTile'
import { ArrowButton, TextLink } from '@/components/ui/Button'
import type { ArtCard, PostCard } from '@/lib/queries'
import { SITE, STATS } from '@/content/site'
import { formatDate } from '@/lib/utils'

/* --------------------------------------------------------------- */
function SectionHeader({
  eyebrow,
  title,
  href,
  linkLabel,
  align = 'left',
}: {
  eyebrow: string
  title: string
  href?: string
  linkLabel?: string
  align?: 'left' | 'center'
}) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-6 ${align === 'center' ? 'flex-col text-center' : ''}`}>
      <div className={align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl'}>
        <Reveal>
          <p className="label text-gold">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 font-display text-4xl leading-[1.02] text-ink sm:text-5xl lg:text-6xl">{title}</h2>
        </Reveal>
      </div>
      {href && linkLabel && (
        <Reveal delay={0.1}>
          <TextLink href={href} className="text-ink">
            {linkLabel}
          </TextLink>
        </Reveal>
      )}
    </div>
  )
}

/* --------- Statement: cream panel overlapping the hero --------- */
export function Statement({ disciplines }: { disciplines: ArtCard[] }) {
  return (
    <section className="relative z-10 -mt-[7vh] rounded-t-[2.5rem] bg-cream pt-20 sm:pt-28">
      <div className="grain absolute inset-x-0 top-0 h-full" />
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="label text-gold">Canvasworks Designs · est. 1993</p>
          </Reveal>
          <h2 className="mt-6 font-display text-[2.75rem] leading-[1.03] text-ink sm:text-6xl lg:text-[4.5rem]">
            <SplitWords text="Made by hand, for the" />{' '}
            <span className="italic text-gold">
              <SplitWords text="age of taste" />
            </span>{' '}
            <SplitWords text="and craft." />
          </h2>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-7 max-w-2xl font-serif text-lg leading-relaxed text-cocoa sm:text-xl">
              {SITE.tagline}
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-16 grid gap-5 sm:grid-cols-3">
          {disciplines.map((d) => (
            <RevealItem key={d.title}>
              <ArtTile card={d} aspect="aspect-[4/5]" />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

/* ------------------------- Featured murals ------------------------- */
export function FeaturedMurals({ murals }: { murals: ArtCard[] }) {
  const [lead, ...rest] = murals
  if (!lead) return null
  return (
    <section className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeader
          eyebrow="Murals"
          title="Walls that hold a whole landscape"
          href="/murals/gallery"
          linkLabel="View all murals"
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <Reveal className="lg:row-span-2">
            <ArtTile card={lead} aspect="aspect-[4/5] lg:aspect-[3/4]" showExcerpt eager />
          </Reveal>
          <div className="grid gap-5">
            {rest.slice(0, 2).map((m, i) => (
              <Reveal key={m.slug} delay={i * 0.08}>
                <ArtTile card={m} aspect="aspect-[16/10]" showExcerpt />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------- Paintings rail ------------------------- */
export function PaintingsRail({ paintings }: { paintings: ArtCard[] }) {
  return (
    <section className="relative overflow-hidden bg-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeader
          eyebrow="Originals on canvas"
          title="Paintings, made to live with"
          href="/paintings/gallery"
          linkLabel="Browse the gallery"
        />
      </div>
      <div className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:px-8">
        {paintings.map((p) => (
          <div key={p.slug} className="w-[75vw] shrink-0 snap-start sm:w-[42vw] lg:w-[24rem]">
            <ArtTile card={p} aspect="aspect-[4/5]" />
            <div className="mt-3 flex items-baseline justify-between gap-3">
              <p className="font-serif text-base text-ink">{p.title}</p>
              {typeof (p.extra as any)?.price === 'number' && (
                <p className="font-sans text-sm text-stone">
                  {(p.extra as any).available ? `$${(p.extra as any).price}` : 'Sold'}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ------------------------- Stats strip ------------------------- */
export function StatsStrip() {
  return (
    <section className="border-y border-ink/10 bg-cream">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 divide-x divide-y divide-ink/10 sm:grid-cols-4 sm:divide-y-0">
        {STATS.map((s) => (
          <Reveal key={s.label} className="px-6 py-12 text-center sm:py-16">
            <div className="font-display text-5xl text-gold sm:text-6xl">{s.value}</div>
            <div className="mt-2 font-sans text-xs uppercase tracking-[0.18em] text-stone">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ------------------------- Classes band ------------------------- */
export function ClassesBand({ classes }: { classes: ArtCard[] }) {
  return (
    <section className="relative overflow-hidden bg-espresso py-24 text-ivory sm:py-32">
      <div className="grain absolute inset-0" />
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
          <div>
            <Reveal>
              <p className="label text-gilt">Classes & workshops</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-4xl leading-[1.02] sm:text-5xl lg:text-6xl">
                Learn to paint the way I do
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-md font-serif text-lg text-ivory/70">
                Small classes and hands-on workshops in decorative painting, murals and floorcloths — for every level, in
                the studio or online.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-8">
                <ArrowButton href="/classes" variant="gold">
                  See all classes
                </ArrowButton>
              </div>
            </Reveal>
          </div>

          <RevealGroup className="grid gap-4 sm:grid-cols-2">
            {classes.slice(0, 4).map((c) => (
              <RevealItem
                key={c.slug}
                className="group rounded-2xl bg-ivory/5 p-5 ring-1 ring-ivory/10 transition-colors hover:bg-ivory/10"
              >
                <div className="flex items-center justify-between">
                  <span className="label text-gilt/80">{(c.extra as any)?.format ?? 'Class'}</span>
                  {typeof (c.extra as any)?.price === 'number' && (
                    <span className="font-sans text-sm text-ivory/60">${(c.extra as any).price}</span>
                  )}
                </div>
                <h3 className="mt-4 font-display text-2xl leading-tight">{c.title}</h3>
                <p className="mt-2 font-serif text-sm text-ivory/60">{c.excerpt}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}

/* ------------------------- Press strip ------------------------- */
export function PressStrip({ covers }: { covers: ArtCard[] }) {
  return (
    <section className="bg-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeader
          eyebrow="News & media"
          title="Seen on This Old House & beyond"
          href="/news"
          linkLabel="All press"
        />
        <div className="mt-8 max-w-2xl">
          <Reveal>
            <p className="font-serif text-lg leading-relaxed text-cocoa">
              Lisa’s murals and paintings have been featured on PBS’ This Old House and across the pages of Yankee, The
              Boston Globe Magazine, Old House Journal, Early American Homes and The Chronicle of the Horse.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {covers.slice(0, 12).map((c, i) => (
            <RevealItem key={c.slug + i}>
              <div className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-sand ring-1 ring-ink/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image}
                  alt={c.title || 'Press feature'}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

/* ------------------------- Journal preview ------------------------- */
export function JournalPreview({ posts }: { posts: PostCard[] }) {
  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeader eyebrow="From the studio" title="The journal" href="/blog" linkLabel="Read the journal" />
        <RevealGroup className="mt-14 grid gap-8 sm:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <RevealItem key={post.slug}>
              <ArtTile card={post} aspect="aspect-[3/2]" />
              <p className="mt-4 font-sans text-xs uppercase tracking-[0.15em] text-stone">{formatDate(post.date)}</p>
              <h3 className="mt-2 font-display text-2xl leading-tight text-ink">{post.title}</h3>
              {post.excerpt && <p className="mt-2 font-serif text-[0.95rem] text-cocoa">{post.excerpt}</p>}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

/* ------------------------- Commission CTA ------------------------- */
export function CommissionCTA() {
  return (
    <section className="relative overflow-hidden bg-gold text-ivory">
      <div className="grain absolute inset-0" />
      <div className="relative mx-auto max-w-[1400px] px-5 py-28 text-center sm:px-8 sm:py-40">
        <Reveal>
          <p className="label text-ivory/70">Commissions open</p>
        </Reveal>
        <h2 className="mx-auto mt-6 max-w-4xl font-display text-[2.75rem] leading-[1.0] sm:text-6xl lg:text-7xl">
          Let’s paint something for your walls.
        </h2>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-xl font-serif text-lg text-ivory/80">
            Every mural begins with a conversation. Tell me about your space and I’ll show you what’s possible.
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="mt-10 flex justify-center">
            <ArrowButton href="/contact" variant="dark">
              Start a commission
            </ArrowButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
