import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/PageHero'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Canvasworks Designs handles your information.',
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy policy" />
      <section className="bg-cream pb-24 pt-4">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="space-y-5 font-serif text-lg leading-relaxed text-cocoa">
            <p>
              Canvasworks Designs collects only the information you choose to share — your name, email and the details
              of your enquiry — and uses it solely to respond to you and, if you opt in, to send occasional studio
              news.
            </p>
            <p>We never sell or share your information with third parties for marketing purposes.</p>
            <p>
              You can unsubscribe from the newsletter at any time, and you may ask us to delete your details by writing
              to the studio. This page is a placeholder to be finalised with Lisa’s preferred wording.
            </p>
            <p className="text-sm text-stone">Last updated {new Date().getFullYear()}.</p>
          </div>
        </div>
      </section>
    </>
  )
}
