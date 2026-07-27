import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/ui/PageHero'
import { ArtTile } from '@/components/ui/ArtTile'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { ArrowButton, TextLink } from '@/components/ui/Button'
import { CommissionCTA } from '@/components/home/Sections'
import { heroFeaturedMurals, muralGallery } from '@/lib/gallery'

export const metadata: Metadata = {
  title: 'Murals',
  description: 'Hand-painted murals for homes and businesses — Lisa Curry Mair’s approach to painting on walls and canvas.',
}

export default function MuralsPage() {
  return (
    <>
      <PageHero
        eyebrow="Murals"
        title="Walls that hold a whole landscape"
        intro="A mural turns a room into a place. For more than thirty years I’ve painted murals on canvas in my Vermont studio and installed them in homes around the globe — so the work travels, and your walls stay yours."
      />

      {/* intro split */}
      <section className="bg-cream pb-20 pt-10">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="overflow-hidden rounded-2xl ring-1 ring-ink/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={heroFeaturedMurals[0].image} alt="Westford farmhouse mural" className="aspect-[4/3] w-full object-cover" />
            </div>
          </Reveal>
          <div className="flex flex-col justify-center">
            <Reveal>
              <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">Painted on canvas, installed like wallpaper</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-5 space-y-4 font-serif text-lg leading-relaxed text-cocoa">
                <p>
                  Working on canvas means I can paint your mural in the studio, refine every detail, and bring it to
                  life on your wall in a fraction of the time — with none of the mess of painting in place.
                </p>
                <p>
                  Every commission is designed around your room, your light and your story. From sweeping Vermont
                  landscapes to grisaille architecture and folk-art florals, no two are alike.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <ArrowButton href="/murals/process" variant="dark">
                  See the process
                </ArrowButton>
                <TextLink href="/murals/gallery" className="text-ink">
                  Browse the full gallery
                </TextLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* featured tiles */}
      <section className="bg-cream pb-24 sm:pb-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="flex items-end justify-between gap-6">
            <Reveal>
              <h2 className="font-display text-3xl text-ink sm:text-4xl">Selected commissions</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <TextLink href="/murals/gallery" className="text-ink">
                All murals
              </TextLink>
            </Reveal>
          </div>
          <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[...heroFeaturedMurals, ...muralGallery.slice(0, 3)].slice(0, 6).map((c, i) => (
              <RevealItem key={c.image + i}>
                <Link href="/murals/gallery">
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
