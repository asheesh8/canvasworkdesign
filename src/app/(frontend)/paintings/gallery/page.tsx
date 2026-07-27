import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/PageHero'
import { MasonryGallery } from '@/components/ui/MasonryGallery'
import { CommissionCTA } from '@/components/home/Sections'
import { paintingGallery } from '@/lib/gallery'

export const metadata: Metadata = {
  title: 'Gallery of Original Paintings',
  description: 'Original paintings on canvas — Vermont barns, animals and landscapes by Lisa Curry Mair.',
}

export default function PaintingGalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Paintings · Gallery"
        title="Originals on canvas"
        intro="Barns, animals and the quiet corners of Vermont — original paintings made to live with. Click any piece to view it larger, then get in touch for availability."
      />
      <section className="bg-ivory pb-24 pt-10 sm:pb-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <MasonryGallery items={paintingGallery} />
        </div>
      </section>
      <CommissionCTA />
    </>
  )
}
