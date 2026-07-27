'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export function NewsletterForm({ dark = true }: { dark?: boolean }) {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    // TODO: wire to Mailchimp / Buttondown / Payload endpoint.
    setDone(true)
  }

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {done ? (
          <motion.p
            key="done"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={dark ? 'font-serif text-lg text-ivory' : 'font-serif text-lg text-ink'}
          >
            Thank you — I’ll be in touch from the studio. ✦
          </motion.p>
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            className={`flex items-center gap-2 rounded-full p-1.5 ${
              dark ? 'bg-ivory/10 ring-1 ring-ivory/20' : 'bg-ink/5 ring-1 ring-ink/10'
            }`}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className={`w-full bg-transparent px-4 py-2 font-sans text-sm outline-none placeholder:text-current/40 ${
                dark ? 'text-ivory placeholder:text-ivory/40' : 'text-ink placeholder:text-ink/40'
              }`}
            />
            <button
              type="submit"
              className={`shrink-0 rounded-full px-5 py-2.5 font-sans text-sm font-medium transition-colors ${
                dark ? 'bg-gilt text-espresso hover:bg-brass' : 'bg-ink text-ivory hover:bg-espresso'
              }`}
            >
              Subscribe
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
