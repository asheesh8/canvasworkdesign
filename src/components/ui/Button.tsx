'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

function ArrowCircle({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'grid h-8 w-8 place-items-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[360deg]',
        className,
      )}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

type Variant = 'dark' | 'gold' | 'ghost' | 'outline'

const variants: Record<Variant, string> = {
  dark: 'bg-ink text-ivory hover:bg-espresso',
  gold: 'bg-gold text-ivory hover:bg-[#9c7936]',
  ghost: 'bg-ivory/70 text-ink backdrop-blur hover:bg-ivory',
  outline: 'bg-transparent text-ink ring-1 ring-inset ring-ink/25 hover:ring-ink/50',
}

const circleTint: Record<Variant, string> = {
  dark: 'bg-ivory/15 text-ivory',
  gold: 'bg-ivory/20 text-ivory',
  ghost: 'bg-ink/10 text-ink',
  outline: 'bg-ink text-ivory',
}

export function ArrowButton({
  href,
  children,
  variant = 'dark',
  className,
}: {
  href: string
  children: ReactNode
  variant?: Variant
  className?: string
}) {
  const external = href.startsWith('http')
  const inner = (
    <motion.span
      whileTap={{ scale: 0.97 }}
      className={cn(
        'group inline-flex items-center gap-3 rounded-full py-2 pl-6 pr-2 font-sans text-sm font-medium tracking-tight transition-colors duration-300',
        variants[variant],
        className,
      )}
    >
      <span>{children}</span>
      <ArrowCircle className={circleTint[variant]} />
    </motion.span>
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    )
  }
  return <Link href={href}>{inner}</Link>
}

/** Understated text link with an animated underline + arrow. */
export function TextLink({
  href,
  children,
  className,
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  const external = href.startsWith('http')
  const Comp: any = external ? 'a' : Link
  const props = external ? { href, target: '_blank', rel: 'noopener noreferrer' } : { href }
  return (
    <Comp
      {...props}
      className={cn('group inline-flex items-center gap-1.5 font-sans text-sm tracking-tight', className)}
    >
      <span className="link-underline">{children}</span>
      <svg
        width="13"
        height="13"
        viewBox="0 0 14 14"
        fill="none"
        className="transition-transform duration-300 group-hover:translate-x-0.5"
        aria-hidden
      >
        <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Comp>
  )
}
