import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Murals } from './collections/Murals'
import { Paintings } from './collections/Paintings'
import { Prints } from './collections/Prints'
import { Classes } from './collections/Classes'
import { Posts } from './collections/Posts'
import { Press } from './collections/Press'
import { SiteSettings } from './globals/SiteSettings'
import { HomeHero } from './globals/HomeHero'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '· Canvasworks Designs',
    },
  },
  collections: [Murals, Paintings, Prints, Classes, Posts, Press, Media, Users],
  globals: [HomeHero, SiteSettings],
  editor: lexicalEditor(),
  // Signs admin auth tokens. The fallback is for local development only — set
  // PAYLOAD_SECRET in production or anyone can forge an admin session.
  secret: process.env.PAYLOAD_SECRET || 'canvasworks-dev-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // Payload stores content in a SQLite/libSQL database. A local file is fine for
  // development, but a serverless host gives no durable disk, so production needs
  // DATABASE_URI pointed at a hosted libSQL database (e.g. Turso).
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./canvasworks.db',
    },
  }),
  sharp,
})
