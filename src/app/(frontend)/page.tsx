import Hero from '@/components/home/Hero'
import { Marquee } from '@/components/home/Marquee'
import {
  Statement,
  FeaturedMurals,
  PaintingsRail,
  StatsStrip,
  ClassesBand,
  PressStrip,
  JournalPreview,
  CommissionCTA,
} from '@/components/home/Sections'
import { getHomeHero, getClasses, getPosts } from '@/lib/queries'
import { heroFeaturedMurals, heroFeaturedPaintings, disciplines, pressCovers } from '@/lib/gallery'

export default async function HomePage() {
  const [hero, classes, posts] = await Promise.all([getHomeHero(), getClasses(), getPosts()])

  return (
    <>
      <Hero
        heroWord={hero.heroWord}
        headline={hero.headline}
        subheadline={hero.subheadline}
        ctaLabel={hero.ctaLabel}
        ctaHref={hero.ctaHref}
        poster={heroFeaturedMurals[1]?.image ?? '/img/hero-poster.svg'}
      />

      <Statement disciplines={disciplines} />

      <div className="bg-cream">
        <div className="mx-auto max-w-[1400px] border-y border-ink/10">
          <Marquee items={['Murals', 'Paintings', 'Floorcloths', 'Commissions', 'Classes']} />
        </div>
      </div>

      <FeaturedMurals murals={heroFeaturedMurals} />
      <PaintingsRail paintings={heroFeaturedPaintings} />
      <StatsStrip />
      <ClassesBand classes={classes} />
      <PressStrip covers={pressCovers} />
      <JournalPreview posts={posts} />
      <CommissionCTA />
    </>
  )
}
