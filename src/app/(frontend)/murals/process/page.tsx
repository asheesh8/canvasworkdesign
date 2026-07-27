import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { CommissionCTA } from '@/components/home/Sections'
import { muralGallery } from '@/lib/gallery'

export const metadata: Metadata = {
  title: 'The Mural Process',
  description: 'How a Canvasworks mural comes to life — from first conversation to final varnish.',
}

const STEPS = [
  { n: '01', title: 'Conversation', body: 'We start by talking about your space, your light and the feeling you want in the room. Photos and measurements help me understand the wall.' },
  { n: '02', title: 'Design & sketch', body: 'I develop a scaled sketch and colour direction for your approval — a clear picture of the finished mural before a brush touches canvas.' },
  { n: '03', title: 'Studio painting', body: 'Your mural is painted by hand on canvas in my Vermont studio, where I can refine every detail in controlled light and take the time it deserves.' },
  { n: '04', title: 'Installation', body: 'The finished canvas is adhered to your wall like a fine wallpaper — a clean, quick installation with none of the mess of painting in place.' },
  { n: '05', title: 'Varnish & finish', body: 'A final protective varnish seals the work, and touch-ups on site make the mural feel as though it grew from the wall itself.' },
]

export default function MuralProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Murals · Process"
        title="From first sketch to final varnish"
        intro="Painting on canvas gives us the best of both worlds — the artistry of a hand-painted mural, delivered with the ease and cleanliness of an installed piece."
      />

      <section className="bg-cream pb-10 pt-8">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <RevealGroup className="divide-y divide-ink/10 border-y border-ink/10">
            {STEPS.map((s) => (
              <RevealItem key={s.n}>
                <div className="grid gap-4 py-10 sm:grid-cols-[auto_1fr] sm:gap-12 sm:py-14">
                  <div className="font-display text-5xl text-gold sm:text-7xl">{s.n}</div>
                  <div className="max-w-2xl">
                    <h2 className="font-display text-3xl text-ink sm:text-4xl">{s.title}</h2>
                    <p className="mt-3 font-serif text-lg leading-relaxed text-cocoa">{s.body}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-cream pb-24 sm:pb-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <RevealGroup className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {muralGallery.slice(0, 4).map((c, i) => (
              <RevealItem key={c.image + i}>
                <div className="overflow-hidden rounded-xl ring-1 ring-ink/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.image} alt={c.title || 'Mural detail'} loading="lazy" className="aspect-[3/4] w-full object-cover" />
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
