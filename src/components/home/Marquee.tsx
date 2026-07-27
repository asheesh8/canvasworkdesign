import { cn } from '@/lib/utils'

export function Marquee({
  items,
  className,
  duration = 40,
}: {
  items: string[]
  className?: string
  duration?: number
}) {
  const row = [...items, ...items]
  return (
    <div className={cn('relative flex overflow-hidden py-6', className)}>
      <div className="flex shrink-0 animate-marquee items-center gap-10" style={{ ['--marquee-duration' as string]: `${duration}s` }}>
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-3xl tracking-tight sm:text-4xl">
            {t}
            <span className="text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
