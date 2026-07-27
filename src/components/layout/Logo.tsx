import Link from 'next/link'
import { cn } from '@/lib/utils'

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden>
      {/* a woven-canvas diamond */}
      <rect x="4.5" y="4.5" width="23" height="23" rx="3" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M16 6.5 L25.5 16 L16 25.5 L6.5 16 Z"
        stroke="currentColor"
        strokeWidth="1.1"
        opacity="0.7"
      />
      <path d="M6.5 16 H25.5 M16 6.5 V25.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
      <circle cx="16" cy="16" r="2.1" fill="currentColor" />
    </svg>
  )
}

export function Logo({ className, tone = 'ink' }: { className?: string; tone?: 'ink' | 'ivory' }) {
  return (
    <Link
      href="/"
      className={cn('group inline-flex items-center gap-2.5', tone === 'ivory' ? 'text-ivory' : 'text-ink', className)}
    >
      <LogoMark className="h-7 w-7 text-gold transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-90" />
      <span className="font-display text-[1.35rem] leading-none tracking-tight lowercase">canvasworks</span>
    </Link>
  )
}
