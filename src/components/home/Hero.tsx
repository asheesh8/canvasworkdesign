'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowButton } from '@/components/ui/Button'

type HeroProps = {
  heroWord: string
  headline: string
  subheadline: string
  ctaLabel: string
  ctaHref: string
  poster?: string
}

export default function Hero({ heroWord, headline, subheadline, ctaLabel, ctaHref, poster = '/img/hero-poster.svg' }: HeroProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.35])
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const wordY = useTransform(scrollYProgress, [0, 1], [0, -160])
  const wordScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const wordOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.28, 0.62])

  return (
    <section ref={ref} className="relative h-[100svh] w-full overflow-hidden bg-espresso">
      {/* zooming media */}
      <motion.div style={{ scale: mediaScale, y: mediaY }} className="absolute inset-0 will-change-transform">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          preload="auto"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
        <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-espresso" />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/40 via-transparent to-espresso/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream/95 via-transparent to-transparent" />
      </motion.div>

      {/* giant word behind everything */}
      <motion.div
        style={{ y: wordY, scale: wordScale, opacity: wordOpacity }}
        className="pointer-events-none absolute inset-x-0 top-[13vh] z-10 flex justify-center"
      >
        <span className="select-none font-display text-[26vw] leading-none tracking-tighter text-ivory/85 mix-blend-soft-light lg:text-[24vw]">
          {heroWord}
        </span>
      </motion.div>

      {/* bottom content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="absolute inset-x-0 bottom-0 z-20 px-5 pb-[7vh] sm:px-8"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="label text-ivory/70"
            >
              Lisa Curry Mair · Vermont
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 font-display text-[2.5rem] leading-[0.98] text-ivory sm:text-6xl"
            >
              {headline}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.9 }}
              className="mt-5 max-w-lg font-serif text-lg text-ivory/75"
            >
              {subheadline}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.9 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <ArrowButton href={ctaHref} variant="gold">
                {ctaLabel}
              </ArrowButton>
              <ArrowButton href="/murals/gallery" variant="ghost">
                See the murals
              </ArrowButton>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute bottom-6 right-6 z-20 hidden items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-ivory/60 sm:flex"
      >
        Scroll
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="inline-block"
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  )
}
