import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { ArrowButton } from '@/components/ui/Button'
import { CommissionCTA } from '@/components/home/Sections'
import { getClasses } from '@/lib/queries'
import { classImages } from '@/lib/gallery'
import { usd } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Classes',
  description: 'Decorative painting, mural and floorcloth classes and workshops with Lisa Curry Mair — in person and online.',
}

export default async function ClassesPage() {
  const classes = await getClasses()
  return (
    <>
      <PageHero
        eyebrow="Classes & workshops"
        title="Learn to paint the way I do"
        intro="For years I’ve loved teaching almost as much as painting. Join a small in-person class in Vermont, book a hands-on workshop, or learn at your own pace online."
      />

      <section className="bg-cream pb-10 pt-8">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <RevealGroup className="grid gap-6 lg:grid-cols-2">
            {classes.map((c, i) => (
              <RevealItem key={c.slug}>
                <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-ivory ring-1 ring-ink/10 sm:flex-row">
                  <div className="relative sm:w-2/5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={classImages[i % classImages.length] || c.image}
                      alt={c.title}
                      loading="lazy"
                      className="h-48 w-full object-cover sm:h-full"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2">
                      <span className="label rounded-full bg-gold/10 px-2.5 py-1 text-gold">
                        {(c.extra as any)?.format ?? 'Class'}
                      </span>
                      <span className="label text-stone">{(c.extra as any)?.level ?? 'all levels'}</span>
                    </div>
                    <h2 className="mt-4 font-display text-2xl leading-tight text-ink">{c.title}</h2>
                    <p className="mt-2 font-serif text-[0.98rem] leading-relaxed text-cocoa">{c.excerpt}</p>
                    <div className="mt-auto flex items-center justify-between pt-6">
                      <span className="font-display text-2xl text-ink">
                        {typeof (c.extra as any)?.price === 'number' ? usd((c.extra as any).price) : ''}
                      </span>
                      <ArrowButton href="/contact" variant="dark">
                        Reserve a spot
                      </ArrowButton>
                    </div>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-cream pb-24 pt-14 sm:pb-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <div className="rounded-2xl border border-ink/10 bg-ivory p-8 text-center sm:p-12">
              <h2 className="mx-auto max-w-2xl font-display text-3xl leading-tight text-ink sm:text-4xl">
                Hosting a group or guild?
              </h2>
              <p className="mx-auto mt-4 max-w-xl font-serif text-lg text-cocoa">
                I travel for workshops and love teaching guilds, schools and private groups. Tell me what you have in
                mind and we’ll build a session around it.
              </p>
              <div className="mt-8 flex justify-center">
                <ArrowButton href="/contact" variant="gold">
                  Enquire about a workshop
                </ArrowButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
