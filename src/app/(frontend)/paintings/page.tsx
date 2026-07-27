import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/ui/PageHero'
import { ArtTile } from '@/components/ui/ArtTile'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { ArrowButton, TextLink } from '@/components/ui/Button'
import { CommissionCTA } from '@/components/home/Sections'
import { heroFeaturedPaintings, paintingGallery } from '@/lib/gallery'

export const metadata: Metadata = {
  title: 'Paintings',
  description: 'Original paintings on canvas by Lisa Curry Mair — Vermont barns, animals and landscapes.',
}

export default function PaintingsPage() {
  const feature = heroFeaturedPaintings[0] ?? paintingGallery[0]
  return (
    <>
      <PageHero
        eyebrow="Paintings"
        title="Original work on canvas"
        intro="When I’m not on a wall, I’m at the easel. My paintings gather up the things I love most about rural life — old barns, working animals, and the changing Vermont light."
      />

      <section className="bg-ivory pb-20 pt-10">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="flex flex-col justify-center lg:order-2">
            <Reveal>
              <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">A lifetime of looking</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-5 space-y-4 font-serif text-lg leading-relaxed text-cocoa">
                <p>
                  Each painting begins the same way a mural does — with careful looking. I paint in oil and acrylic on
                  canvas, panel and linen, at a scale that feels right for the subject.
                </p>
                <p>
                  Available originals are listed in the gallery. If a piece has already found a home, I’m always happy
                  to talk about a commission or a fine-art print.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <ArrowButton href="/paintings/gallery" variant="dark">
                  View the gallery
                </ArrowButton>
                <TextLink href="/prints" className="text-ink">
                  Shop prints
                </TextLink>
              </div>
            </Reveal>
          </div>
          <Reveal className="lg:order-1">
            <div className="overflow-hidden rounded-2xl ring-1 ring-ink/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={feature?.image} alt={feature?.title || 'Painting by Lisa Curry Mair'} className="aspect-[4/5] w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory pb-24 sm:pb-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="flex items-end justify-between gap-6">
            <Reveal>
              <h2 className="font-display text-3xl text-ink sm:text-4xl">Recent paintings</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <TextLink href="/paintings/gallery" className="text-ink">
                All paintings
              </TextLink>
            </Reveal>
          </div>
          <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {(heroFeaturedPaintings.length ? heroFeaturedPaintings : paintingGallery).slice(0, 8).map((c, i) => (
              <RevealItem key={c.image + i}>
                <Link href="/paintings/gallery">
                  <ArtTile card={{ ...c, href: undefined }} aspect="aspect-[4/5]" />
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CommissionCTA />
    </>
  )
}
