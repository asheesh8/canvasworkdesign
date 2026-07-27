import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/PageHero'
import { CartProvider } from '@/components/shop/CartProvider'
import { ShopCart } from '@/components/shop/ShopCart'
import { PrintCard, type PrintProduct } from '@/components/shop/PrintCard'
import { paintingGallery } from '@/lib/gallery'

export const metadata: Metadata = {
  title: 'Prints',
  description: 'Fine-art prints of Lisa Curry Mair’s paintings — framed or unframed, in a range of sizes.',
}

const SIZES = [
  { label: '8 × 10 in', price: 28 },
  { label: '11 × 14 in', price: 42 },
  { label: '18 × 24 in', price: 78 },
  { label: '24 × 36 in', price: 120 },
]

const products: PrintProduct[] = paintingGallery.slice(0, 12).map((p, i) => ({
  id: p.slug || `print-${i}`,
  title: p.title || 'Untitled study',
  image: p.image,
  sizes: SIZES.map((s, j) => ({ label: s.label, price: s.price + ((i * 3 + j) % 5) })),
}))

export default function PrintsPage() {
  return (
    <CartProvider>
      <PageHero
        eyebrow="Shop · Prints"
        title="Take a piece of it home"
        intro="Fine-art prints of favourite paintings and murals, reproduced on museum-grade paper. Choose your size and add it to your bag — framed options available on request."
      />

      <section className="bg-ivory pb-24 pt-8 sm:pb-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl bg-cream px-6 py-4 font-sans text-sm text-cocoa ring-1 ring-ink/5">
            <span className="font-medium text-ink">✦ Archival giclée</span>
            <span>✦ Ships in 5–7 days</span>
            <span>✦ Framed or unframed</span>
            <span>✦ Every sale supports the studio</span>
          </div>

          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <PrintCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <ShopCart />
    </CartProvider>
  )
}
