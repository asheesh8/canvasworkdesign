import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPost, getPosts } from '@/lib/queries'
import { formatDate } from '@/lib/utils'
import { ArrowButton } from '@/components/ui/Button'

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Journal' }
  return { title: post.title, description: post.excerpt }
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const image = post.image || post.coverImage?.url

  return (
    <article className="bg-cream">
      <div className="mx-auto max-w-3xl px-5 pt-36 sm:pt-44">
        <Link href="/blog" className="font-sans text-sm text-stone hover:text-ink">
          ← Back to the journal
        </Link>
        <p className="mt-8 label text-gold">{formatDate(post.publishedDate)}</p>
        <h1 className="mt-4 font-display text-[2.5rem] leading-[1.02] text-ink sm:text-6xl">{post.title}</h1>
        <p className="mt-4 font-sans text-sm text-stone">By {post.author || 'Lisa Curry Mair'}</p>
      </div>

      {image && (
        <div className="mx-auto mt-10 max-w-4xl px-5">
          <div className="overflow-hidden rounded-2xl ring-1 ring-ink/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={post.title} className="aspect-[16/9] w-full object-cover" />
          </div>
        </div>
      )}

      <div className="mx-auto max-w-3xl px-5 py-14">
        <div className="space-y-6 font-serif text-lg leading-relaxed text-espresso">
          <p className="text-xl leading-relaxed">{post.excerpt}</p>
          <p>
            This is a place for Lisa to write — the full article lives in the Payload editor, where she can add rich
            text, images and galleries. What you’re reading now is the published excerpt.
          </p>
          <p>
            Every post you write in the admin appears here automatically, styled to match the rest of the site. Drafts
            stay hidden until you tick “published”.
          </p>
        </div>

        <div className="mt-12 border-t border-ink/10 pt-10">
          <p className="font-serif text-lg text-cocoa">Enjoyed this? There’s always something new on the easel.</p>
          <div className="mt-5">
            <ArrowButton href="/contact" variant="dark">
              Get in touch
            </ArrowButton>
          </div>
        </div>
      </div>
    </article>
  )
}
