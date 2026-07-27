'use client'

import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { ArtCard } from '@/lib/queries'

export function MasonryGallery({ items }: { items: ArtCard[] }) {
  const [open, setOpen] = useState<number | null>(null)

  const close = useCallback(() => setOpen(null), [])
  const go = useCallback(
    (dir: number) => setOpen((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  )

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close, go])

  return (
    <>
      <div className="columns-2 gap-4 [column-fill:_balance] sm:columns-3 lg:columns-4">
        {items.map((c, i) => (
          <button
            key={c.image + i}
            onClick={() => setOpen(i)}
            className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl bg-sand text-left ring-1 ring-ink/10"
          >
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.image}
                alt={c.title || 'Artwork by Lisa Curry Mair'}
                loading="lazy"
                className="w-full object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
              />
              <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-espresso/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {c.title && <span className="p-4 font-display text-lg text-ivory">{c.title}</span>}
              </div>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-espresso/92 p-4 backdrop-blur-sm sm:p-10"
          >
            <button onClick={close} className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-ivory/10 text-ivory hover:bg-ivory/20" aria-label="Close">
              ✕
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); go(-1) }}
              className="absolute left-3 grid h-12 w-12 place-items-center rounded-full bg-ivory/10 text-ivory hover:bg-ivory/20 sm:left-8"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); go(1) }}
              className="absolute right-3 grid h-12 w-12 place-items-center rounded-full bg-ivory/10 text-ivory hover:bg-ivory/20 sm:right-8"
              aria-label="Next"
            >
              ›
            </button>
            <motion.figure
              key={open}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-full max-w-4xl flex-col items-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={items[open].image}
                alt={items[open].title || 'Artwork by Lisa Curry Mair'}
                className="max-h-[80vh] w-auto rounded-lg object-contain shadow-2xl"
              />
              {items[open].title && (
                <figcaption className="mt-4 font-display text-xl text-ivory">{items[open].title}</figcaption>
              )}
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
