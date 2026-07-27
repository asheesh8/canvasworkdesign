import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { CommissionCTA } from '@/components/home/Sections'
import { STATS } from '@/content/site'
import { aboutImage, withLisaImage } from '@/lib/gallery'

export const metadata: Metadata = {
  title: 'About Lisa',
  description: 'Lisa Curry Mair has painted murals and original work on canvas for more than three decades from her Vermont studio.',
}

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title="Three decades at the easel" />

      <section className="bg-cream pb-20 pt-4">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <div className="overflow-hidden rounded-2xl ring-1 ring-ink/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={aboutImage} alt="Lisa Curry Mair in her studio" className="aspect-[4/5] w-full object-cover" />
            </div>
          </Reveal>
          <div className="flex flex-col justify-center">
            <Reveal>
              <p className="font-serif text-2xl leading-relaxed text-espresso sm:text-3xl">
                “With more than three decades of experience creating work on canvas for homes around the globe, I
                continue to revel in the joy of painting.”
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 space-y-4 font-serif text-lg leading-relaxed text-cocoa">
                <p>
                  I’m Lisa Curry Mair, a muralist and painter working from my studio in Vermont. What began as a love
                  of decorative painting has grown into a lifetime of commissions — murals, floorcloths, theorem
                  paintings and original work on canvas, made for homes across the country and beyond.
                </p>
                <p>
                  Painting on canvas has always been at the heart of what I do. It lets me bring the studio to your
                  wall, and lets your walls carry a landscape, a folk-art border, or a whole painted room.
                </p>
                <p>
                  My work has been featured on PBS’ This Old House and in publications from Yankee to The Boston Globe
                  Magazine — but the part I love most is still the quiet hours with a brush in hand.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* stats */}
      <section className="border-y border-ink/10 bg-cream">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 divide-x divide-y divide-ink/10 sm:grid-cols-4 sm:divide-y-0">
          {STATS.map((s) => (
            <Reveal key={s.label} className="px-6 py-12 text-center">
              <div className="font-display text-5xl text-gold">{s.value}</div>
              <div className="mt-2 font-sans text-xs uppercase tracking-[0.18em] text-stone">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">On camera for This Old House</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 font-serif text-lg leading-relaxed text-cocoa">
                When the This Old House team built the Westford modern farmhouse, they asked me to paint a wraparound
                mural of the Vermont landscape — captured across two episodes, and one of the projects I’m proudest of.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.05}>
            <div className="overflow-hidden rounded-2xl ring-1 ring-ink/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={withLisaImage} alt="Lisa at the Westford mural" className="aspect-[4/3] w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <CommissionCTA />
    </>
  )
}
