'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'
import { NAV } from '@/content/site'
import { Logo } from './Logo'
import { ArrowButton } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false) // mobile menu
  const [hover, setHover] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <div
          className={cn(
            'flex w-full max-w-[1400px] items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-5',
            scrolled
              ? 'bg-ivory/80 shadow-[0_10px_40px_-24px_rgba(33,27,18,0.55)] ring-1 ring-ink/5 backdrop-blur-xl'
              : 'bg-transparent',
          )}
        >
          <Logo />

          {/* desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setHover(null)}>
            {NAV.map((item) => (
              <div key={item.label} className="relative" onMouseEnter={() => setHover(item.label)}>
                <Link
                  href={item.href}
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full px-3.5 py-2 font-sans text-[0.9rem] tracking-tight text-ink/80 transition-colors hover:text-ink',
                    pathname === item.href && 'text-ink',
                  )}
                >
                  {item.label}
                  {item.children && (
                    <svg width="10" height="10" viewBox="0 0 10 10" className="mt-0.5 opacity-50" aria-hidden>
                      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                    </svg>
                  )}
                </Link>

                <AnimatePresence>
                  {item.children && hover === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-0 top-full w-72 pt-3"
                    >
                      <div className="grain relative overflow-hidden rounded-2xl bg-ivory p-2 shadow-[0_24px_60px_-30px_rgba(33,27,18,0.6)] ring-1 ring-ink/5">
                        {item.children.map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            className="group block rounded-xl px-4 py-3 transition-colors hover:bg-cream"
                          >
                            <span className="font-display text-lg leading-tight text-ink">{c.label}</span>
                            {c.blurb && <span className="mt-0.5 block font-sans text-[0.78rem] text-stone">{c.blurb}</span>}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <ArrowButton href="/contact" variant="dark">
                Start a commission
              </ArrowButton>
            </div>
            {/* mobile toggle */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Open menu"
              className="grid h-11 w-11 place-items-center rounded-full bg-ink text-ivory lg:hidden"
            >
              <div className="space-y-1.5">
                <span className={cn('block h-px w-5 bg-current transition-transform', open && 'translate-y-[3px] rotate-45')} />
                <span className={cn('block h-px w-5 bg-current transition-transform', open && '-translate-y-[3px] -rotate-45')} />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 grain overflow-y-auto bg-espresso px-6 pb-16 pt-28 text-ivory lg:hidden"
          >
            <nav className="mx-auto flex max-w-md flex-col divide-y divide-ivory/10">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="py-4"
                >
                  <Link href={item.href} className="font-display text-4xl tracking-tight">
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="mt-2 flex flex-col gap-1.5">
                      {item.children.map((c) => (
                        <Link key={c.href} href={c.href} className="font-sans text-[0.95rem] text-ivory/60">
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              <div className="pt-8">
                <ArrowButton href="/contact" variant="gold">
                  Start a commission
                </ArrowButton>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
