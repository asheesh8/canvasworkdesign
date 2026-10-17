import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { MURALS, PAINTINGS, PRINTS, CLASSES, POSTS, PRESS, SITE } from '../content/site'

// The first admin's login comes from the environment so no password lives in
// this public repo. Only used when the users collection is empty.
const ADMIN = {
  name: 'Lisa Curry Mair',
  email: process.env.SEED_ADMIN_EMAIL || 'admin@canvasworks.test',
  password: process.env.SEED_ADMIN_PASSWORD || '',
}

async function run() {
  const payload = await getPayload({ config })

  // ---- Admin user ----
  const existingUsers = await payload.count({ collection: 'users' })
  if (existingUsers.totalDocs === 0) {
    if (ADMIN.password.length < 12) {
      throw new Error('Set SEED_ADMIN_PASSWORD (12+ characters) to create the first admin.')
    }
    await payload.create({
      collection: 'users',
      data: { ...ADMIN, role: 'admin' },
    })
    console.log(`✔ Admin user created — ${ADMIN.email}`)
  } else {
    console.log('• Users already exist, skipping admin creation')
  }

  // ---- Globals ----
  await payload.updateGlobal({
    slug: 'home-hero',
    data: {
      heroWord: 'canvas',
      headline: 'Painting for the age of taste and craft',
      subheadline:
        'Three decades of hand-painted murals and original work on canvas, made for the homes they live in.',
      ctaLabel: 'Start a commission',
      ctaHref: '/contact',
    },
  })
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      email: SITE.email,
      location: SITE.location,
      instagram: SITE.socials.instagram,
      pinterest: SITE.socials.pinterest,
      facebook: SITE.socials.facebook,
    },
  })
  console.log('✔ Globals updated')

  // ---- Collections (only if empty) ----
  const seedCollection = async (
    slug: 'murals' | 'paintings' | 'prints' | 'classes' | 'posts' | 'press',
    rows: Record<string, unknown>[],
  ) => {
    const count = await payload.count({ collection: slug })
    if (count.totalDocs > 0) {
      console.log(`• ${slug}: already has ${count.totalDocs} docs, skipping`)
      return
    }
    let i = 0
    for (const row of rows) {
      await payload.create({ collection: slug, data: { order: i, ...row } as any })
      i++
    }
    console.log(`✔ ${slug}: created ${rows.length}`)
  }

  await seedCollection(
    'murals',
    MURALS.map((m) => ({
      title: m.title,
      slug: m.slug,
      location: m.location,
      year: m.year,
      category: m.category,
      excerpt: m.excerpt,
      featured: !!m.featured,
    })),
  )

  await seedCollection(
    'paintings',
    PAINTINGS.map((m) => ({
      title: m.title,
      slug: m.slug,
      medium: m.medium,
      dimensions: m.dimensions,
      year: m.year,
      price: m.price,
      category: m.category,
      available: m.available,
      featured: !!m.featured,
    })),
  )

  await seedCollection(
    'prints',
    PRINTS.map((m) => ({
      title: m.title,
      slug: m.slug,
      fromPrice: m.fromPrice,
      description: m.description,
      externalUrl: m.externalUrl,
    })),
  )

  await seedCollection(
    'classes',
    CLASSES.map((m) => ({
      title: m.title,
      slug: m.slug,
      summary: m.summary,
      format: m.format,
      level: m.level,
      duration: m.duration,
      price: m.price,
    })),
  )

  await seedCollection(
    'posts',
    POSTS.map((m) => ({
      title: m.title,
      slug: m.slug,
      excerpt: m.excerpt,
      publishedDate: new Date(m.date).toISOString(),
      published: true,
      author: SITE.artist,
    })),
  )

  await seedCollection(
    'press',
    PRESS.map((m) => ({
      title: m.title,
      outlet: m.outlet,
      date: new Date(m.date).toISOString(),
      excerpt: m.excerpt,
      url: m.url,
    })),
  )

  console.log('\n✅ Seed complete.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
