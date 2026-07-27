'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useCart } from './CartProvider'
import { usd } from '@/lib/utils'

export function ShopCart() {
  const { items, remove, setQty, count, subtotal, open, setOpen } = useCart()

  return (
    <>
      {/* floating bag button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full bg-ink px-5 py-3.5 text-ivory shadow-[0_18px_40px_-16px_rgba(33,27,18,0.6)] transition-transform hover:scale-[1.03]"
      >
        <span className="font-sans text-sm font-medium">Bag</span>
        <span className="grid h-6 min-w-6 place-items-center rounded-full bg-gilt px-1.5 font-sans text-xs font-semibold text-espresso">
          {count}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-espresso/40 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-ivory"
            >
              <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
                <h2 className="font-display text-2xl text-ink">Your bag</h2>
                <button onClick={() => setOpen(false)} className="text-ink/50 hover:text-ink" aria-label="Close">
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4">
                {items.length === 0 ? (
                  <p className="mt-10 text-center font-serif text-cocoa">Your bag is empty.</p>
                ) : (
                  <ul className="space-y-5">
                    {items.map((it) => (
                      <li key={it.id} className="flex gap-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={it.image} alt={it.title} className="h-20 w-16 rounded-lg object-cover ring-1 ring-ink/10" />
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between gap-2">
                            <span className="font-display text-lg leading-tight text-ink">{it.title}</span>
                            <button onClick={() => remove(it.id)} className="text-xs text-stone hover:text-ink">
                              Remove
                            </button>
                          </div>
                          <span className="font-sans text-xs text-stone">{it.size}</span>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center rounded-full ring-1 ring-ink/15">
                              <button onClick={() => setQty(it.id, it.qty - 1)} className="px-3 py-1 text-ink/60">–</button>
                              <span className="px-1 font-sans text-sm">{it.qty}</span>
                              <button onClick={() => setQty(it.id, it.qty + 1)} className="px-3 py-1 text-ink/60">+</button>
                            </div>
                            <span className="font-sans text-sm text-ink">{usd(it.price * it.qty)}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="border-t border-ink/10 px-6 py-5">
                <div className="flex items-center justify-between font-sans">
                  <span className="text-sm text-stone">Subtotal</span>
                  <span className="text-lg text-ink">{usd(subtotal)}</span>
                </div>
                <button
                  disabled={items.length === 0}
                  className="mt-4 w-full rounded-full bg-ink py-3.5 font-sans text-sm font-medium text-ivory transition-colors hover:bg-espresso disabled:opacity-40"
                >
                  Checkout
                </button>
                <p className="mt-3 text-center font-sans text-xs text-stone">
                  Secure checkout with Stripe — coming soon. Prints currently ship via Fine Art America.
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
