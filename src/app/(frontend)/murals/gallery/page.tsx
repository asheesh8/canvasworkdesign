import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/PageHero'
import { MasonryGallery } from '@/components/ui/MasonryGallery'
import { CommissionCTA } from '@/components/home/Sections'
import { muralGallery } from '@/lib/gallery'

export const metadata: Metadata = {
  title: 'Mural Gallery',
  description: 'Selected hand-painted murals, floorcloths and decorative work by Lisa Curry Mair.',
}

export default function MuralGalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Murals · Gallery"
        title="A gallery of painted walls"
        intro="Three decades of commissions — landscapes, floorcloths, ceilings and decorative work, painted by hand for homes across the country. Click any piece to view it larger."
      />
      <section className="bg-cream pb-24 pt-10 sm:pb-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <MasonryGallery items={muralGallery} />
        </div>
      </section>
      <CommissionCTA />
    </>
  )
}
