'use client'

import { useState } from 'react'
import { useCart } from './CartProvider'
import { usd } from '@/lib/utils'
import { cn } from '@/lib/utils'

export type PrintProduct = {
  id: string
  title: string
  image: string
  sizes: { label: string; price: number }[]
}

export function PrintCard({ product }: { product: PrintProduct }) {
  const { add } = useCart()
  const [sizeIdx, setSizeIdx] = useState(0)
  const size = product.sizes[sizeIdx]

  return (
    <div className="group flex flex-col">
      <div className="relative overflow-hidden rounded-2xl bg-sand ring-1 ring-ink/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-3 rounded-xl ring-1 ring-ivory/20" />
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-3">
        <h3 className="font-display text-xl leading-tight text-ink">{product.title}</h3>
        <span className="font-sans text-sm text-stone">{usd(size.price)}</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {product.sizes.map((s, i) => (
          <button
            key={s.label}
            onClick={() => setSizeIdx(i)}
            className={cn(
              'rounded-full px-3 py-1 font-sans text-xs transition-colors',
              i === sizeIdx ? 'bg-ink text-ivory' : 'bg-ink/5 text-ink/70 hover:bg-ink/10',
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <button
        onClick={() =>
          add({
            id: `${product.id}-${size.label}`,
            title: product.title,
            size: size.label,
            price: size.price,
            image: product.image,
          })
        }
        className="mt-4 w-full rounded-full bg-gold py-3 font-sans text-sm font-medium text-ivory transition-colors hover:bg-[#9c7936]"
      >
        Add to bag — {usd(size.price)}
      </button>
    </div>
  )
}
