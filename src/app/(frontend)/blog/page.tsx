import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { getPosts } from '@/lib/queries'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Notes from the Vermont studio of Lisa Curry Mair — murals, paintings, classes and life on canvas.',
}

export default async function BlogPage() {
  const posts = await getPosts()
  const [lead, ...rest] = posts

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Notes from the studio"
        intro="Long light, wet paint and the stories behind the work — occasional writing from my Vermont studio."
      />

      <section className="bg-cream pb-24 pt-8 sm:pb-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          {lead && (
            <Reveal>
              <Link href={lead.href!} className="group mb-14 grid gap-8 lg:grid-cols-2 lg:items-center">
                <div className="overflow-hidden rounded-2xl ring-1 ring-ink/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={lead.image} alt={lead.title} className="aspect-[16/11] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <div>
                  <p className="label text-gold">{formatDate(lead.date)}</p>
                  <h2 className="mt-4 font-display text-4xl leading-[1.02] text-ink sm:text-5xl">{lead.title}</h2>
                  <p className="mt-4 max-w-lg font-serif text-lg text-cocoa">{lead.excerpt}</p>
                  <span className="mt-6 inline-block font-sans text-sm text-ink link-underline">Read the story →</span>
                </div>
              </Link>
            </Reveal>
          )}

          <RevealGroup className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <RevealItem key={post.slug}>
                <Link href={post.href!} className="group block">
                  <div className="overflow-hidden rounded-2xl ring-1 ring-ink/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.image} alt={post.title} loading="lazy" className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  </div>
                  <p className="mt-4 label text-stone">{formatDate(post.date)}</p>
                  <h3 className="mt-2 font-display text-2xl leading-tight text-ink">{post.title}</h3>
                  <p className="mt-2 font-serif text-[0.95rem] text-cocoa">{post.excerpt}</p>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  )
}
