import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { ContactForm } from '@/components/ContactForm'
import { getSiteSettings } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start a mural or painting commission, book a class, or just say hello to Lisa Curry Mair.',
}

export default async function ContactPage() {
  const s = await getSiteSettings()
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s start a conversation"
        intro="Every commission begins with a note. Tell me about your space or your idea, and I’ll get back to you personally — there’s no obligation, and I love talking through possibilities."
      />

      <section className="bg-cream pb-24 pt-6 sm:pb-32">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 sm:px-8 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <Reveal>
            <div className="rounded-2xl border border-ink/10 bg-cream p-6 sm:p-8">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-8">
              <div>
                <p className="label text-gold">Studio</p>
                <p className="mt-3 font-serif text-lg text-cocoa">{s.location}</p>
              </div>
              <div>
                <p className="label text-gold">Email</p>
                <a href={`mailto:${s.email}`} className="mt-3 block font-serif text-lg text-ink link-underline w-fit">
                  {s.email}
                </a>
              </div>
              <div>
                <p className="label text-gold">Follow along</p>
                <div className="mt-3 flex flex-col gap-1.5 font-serif text-lg">
                  <a href={s.instagram} target="_blank" rel="noopener noreferrer" className="text-ink link-underline w-fit">
                    Instagram — @vtcanvas
                  </a>
                  <a href={s.pinterest} target="_blank" rel="noopener noreferrer" className="text-ink link-underline w-fit">
                    Pinterest — Lisa Curry Mair
                  </a>
                  <a href={s.facebook} target="_blank" rel="noopener noreferrer" className="text-ink link-underline w-fit">
                    Facebook — CanvasworksVT
                  </a>
                </div>
              </div>
              <div className="rounded-2xl bg-espresso p-6 text-ivory">
                <p className="font-display text-2xl leading-tight">Prefer to talk it through?</p>
                <p className="mt-2 font-serif text-ivory/70">
                  Mention a good time in your message and I’ll happily set up a call.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
