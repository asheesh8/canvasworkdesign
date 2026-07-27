'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'

const PROJECTS = ['Mural', 'Painting', 'Floorcloth', 'Class', 'Something else']

export function ContactForm() {
  const [project, setProject] = useState('Mural')
  const [sent, setSent] = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: wire to Payload endpoint / email service.
    setSent(true)
  }

  const field =
    'w-full rounded-xl border border-ink/15 bg-ivory px-4 py-3 font-sans text-[0.95rem] text-ink outline-none transition-colors placeholder:text-stone/70 focus:border-gold'

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.div
          key="ok"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-gold/30 bg-ivory p-10 text-center"
        >
          <div className="font-display text-4xl text-ink">Thank you ✦</div>
          <p className="mx-auto mt-4 max-w-md font-serif text-lg text-cocoa">
            Your note is on its way to the studio. I read every message myself and will be in touch soon.
          </p>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={submit} exit={{ opacity: 0 }} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="label mb-2 block text-stone">Name</label>
              <input required placeholder="Your name" className={field} />
            </div>
            <div>
              <label className="label mb-2 block text-stone">Email</label>
              <input required type="email" placeholder="you@email.com" className={field} />
            </div>
          </div>

          <div>
            <label className="label mb-2 block text-stone">I’m interested in</label>
            <div className="flex flex-wrap gap-2">
              {PROJECTS.map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setProject(p)}
                  className={cn(
                    'rounded-full px-4 py-2 font-sans text-sm transition-colors',
                    project === p ? 'bg-ink text-ivory' : 'bg-ink/5 text-ink/70 hover:bg-ink/10',
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="label mb-2 block text-stone">Location</label>
              <input placeholder="City, State" className={field} />
            </div>
            <div>
              <label className="label mb-2 block text-stone">Timeframe</label>
              <input placeholder="e.g. this spring" className={field} />
            </div>
          </div>

          <div>
            <label className="label mb-2 block text-stone">Tell me about your space</label>
            <textarea
              required
              rows={5}
              placeholder="Room, dimensions, the feeling you’re after…"
              className={cn(field, 'resize-none')}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-gold py-4 font-sans text-sm font-medium text-ivory transition-colors hover:bg-[#9c7936] sm:w-auto sm:px-10"
          >
            Send my enquiry
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
