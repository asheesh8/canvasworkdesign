import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { ArtCard } from '@/lib/queries'

type ArtTileProps = {
  card: ArtCard
  className?: string
  aspect?: string
  showExcerpt?: boolean
  eager?: boolean
}

export function ArtTile({ card, className, aspect = 'aspect-[4/5]', showExcerpt = false, eager = false }: ArtTileProps) {
  const external = card.href?.startsWith('http')
  const Wrapper: any = card.href ? (external ? 'a' : Link) : 'div'
  const wrapperProps = card.href
    ? external
      ? { href: card.href, target: '_blank', rel: 'noopener noreferrer' }
      : { href: card.href }
    : {}

  return (
    <Wrapper {...wrapperProps} className={cn('group block', className)}>
      <div className={cn('relative overflow-hidden rounded-2xl bg-sand ring-1 ring-ink/5', aspect)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={card.image}
          alt={card.title || 'Artwork by Lisa Curry Mair'}
          loading={eager ? 'eager' : 'lazy'}
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/55 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
        {/* gilt frame */}
        <div className="pointer-events-none absolute inset-3 rounded-xl ring-1 ring-ivory/25" />

        {(card.title || card.meta) && (
          <div className="absolute inset-x-0 bottom-0 p-5">
            {card.title && <h3 className="font-display text-xl leading-tight text-ivory">{card.title}</h3>}
            {card.meta && <p className="mt-1 font-sans text-[0.78rem] tracking-tight text-ivory/70">{card.meta}</p>}
          </div>
        )}

        {card.href && (
          <div className="absolute right-4 top-4 grid h-9 w-9 translate-y-1 place-items-center rounded-full bg-ivory/90 text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>

      {showExcerpt && card.excerpt && (
        <p className="mt-3 max-w-sm font-serif text-[0.95rem] leading-relaxed text-cocoa">{card.excerpt}</p>
      )}
    </Wrapper>
  )
}
