import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { CommissionCTA } from '@/components/home/Sections'
import { pressCovers, withLisaImage } from '@/lib/gallery'

export const metadata: Metadata = {
  title: 'News & Media',
  description: 'Press, features and media — Lisa Curry Mair on PBS’ This Old House and in print.',
}

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News & media"
        title="In print & on screen"
        intro="A selection of the features, articles and broadcasts that have followed the work over the years."
      />

      {/* This Old House highlight */}
      <section className="bg-cream pb-16 pt-4">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <div className="grid items-center gap-8 overflow-hidden rounded-2xl bg-espresso text-ivory lg:grid-cols-2">
              <div className="p-8 sm:p-12">
                <p className="label text-gilt">PBS · This Old House</p>
                <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">
                  A hand-painted mural for the Westford farmhouse
                </h2>
                <p className="mt-4 font-serif text-lg text-ivory/75">
                  Featured across two episodes of the long-running series, as Lisa paints and installs a wraparound
                  Vermont landscape for the modern farmhouse build.
                </p>
              </div>
              <div className="h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={withLisaImage} alt="Lisa at the Westford mural for This Old House" className="h-full min-h-64 w-full object-cover" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* press wall */}
      <section className="bg-cream pb-24 sm:pb-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">Featured in</h2>
          </Reveal>
          <RevealGroup className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {pressCovers.map((c, i) => (
              <RevealItem key={c.slug + i}>
                <div className="group overflow-hidden rounded-xl bg-sand ring-1 ring-ink/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.image}
                    alt={c.title || 'Press feature'}
                    loading="lazy"
                    className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CommissionCTA />
    </>
  )
}
