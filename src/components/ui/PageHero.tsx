import { Reveal, SplitWords } from '@/components/ui/Reveal'

export function PageHero({
  eyebrow,
  title,
  intro,
  align = 'left',
}: {
  eyebrow: string
  title: string
  intro?: string
  align?: 'left' | 'center'
}) {
  const centered = align === 'center'
  return (
    <section className="relative overflow-hidden bg-cream pb-6 pt-36 sm:pt-44">
      <div className="grain absolute inset-0" />
      <div className={`relative mx-auto max-w-[1400px] px-5 sm:px-8 ${centered ? 'text-center' : ''}`}>
        <Reveal>
          <p className="label text-gold">{eyebrow}</p>
        </Reveal>
        <h1 className={`mt-5 font-display text-[3rem] leading-[0.98] text-ink sm:text-7xl lg:text-8xl ${centered ? 'mx-auto max-w-4xl' : 'max-w-4xl'}`}>
          <SplitWords text={title} />
        </h1>
        {intro && (
          <Reveal delay={0.15}>
            <p className={`mt-7 font-serif text-lg leading-relaxed text-cocoa sm:text-xl ${centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>
              {intro}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
