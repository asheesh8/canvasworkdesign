'use client'

import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

const base: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  as?: 'div' | 'span' | 'li' | 'section'
}

export function Reveal({ children, className, delay = 0, y = 28, as = 'div' }: RevealProps) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      variants={{
        hidden: { opacity: 0, y, filter: 'blur(6px)' },
        show: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
        },
      }}
    >
      {children}
    </MotionTag>
  )
}

/** Staggered container — children use <RevealItem/> */
export function RevealGroup({
  children,
  className,
  stagger = 0.09,
}: {
  children: ReactNode
  className?: string
  stagger?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
      variants={{ show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={base}>
      {children}
    </motion.div>
  )
}

/** Word-by-word rising headline. */
export function SplitWords({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ')
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-15% 0px' }}
      variants={{ show: { transition: { staggerChildren: 0.06 } } }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden>
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%' },
              show: { y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
