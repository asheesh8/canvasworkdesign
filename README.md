# Canvasworks Designs — Lisa Curry Mair

A full redesign of [canvasworksdesigns.com](https://canvasworksdesigns.com) — immersive, editorial, and CMS-driven.

Built with **Next.js 16** (App Router) · **Payload CMS 3** (SQLite) · **Tailwind CSS v4** · **Motion** (motion.dev) · **Lenis** smooth scroll.

---

## Quick start

```bash
npm install
npm run dev            # http://localhost:3000
```

The site is seeded and ready. To reset/re-seed content:

```bash
npm run seed
```

### Admin — two ways in

**Studio (our own, branded admin)** — the one Lisa uses: **http://localhost:3000/studio**
A bespoke, on-brand dashboard built on top of Payload's API: friendly login, dashboard with live counts, and simple editors for every collection (murals, paintings, prints, classes, journal, news), a media library with drag-free upload, and the Home Hero + Site Settings. Long text uses a plain textarea (converted to/from Payload rich text automatically).

**Payload panel (power-user fallback)** — **http://localhost:3000/admin**
The full Payload CMS for advanced fields (galleries, arrays, versions).

Both use the same login:
```
Email:    admin@canvasworks.test
Password: canvasworks
```

> Change these before going live (Studio → not yet; use /admin → Users, or create a new admin and delete this one).

**Studio internals:** `src/app/(studio)` (routes), `src/components/studio/*` (UI), `src/studio/config.ts` (field config that drives every editor), `src/app/(studio)/studio/actions.ts` (server actions over Payload's Local API).

---

## What's here

### Front of house (`src/app/(frontend)`)
- **Immersive home** — background video hero with scroll-driven zoom, giant display type, statement panel, featured murals, paintings rail, press wall, journal, and a closing commission CTA. All section reveals are Motion + Lenis.
- **Murals** — about, full masonry **gallery** with lightbox, and a step-by-step **process** page.
- **Paintings** — about, full gallery with lightbox.
- **Prints shop** — product grid with size selection, a slide-in **cart** (persists to localStorage). Checkout is stubbed with a Stripe note — see “Next steps”.
- **Classes**, **Journal** (list + post), **About**, **News & media** (press wall), **Contact** (commission enquiry form), **Privacy**.

### Back of house — Payload CMS (`src/collections`, `src/globals`)
Editable in `/admin`, grouped in the sidebar:
- **Portfolio:** Murals, Paintings
- **Shop:** Prints
- **Teaching:** Classes
- **Journal:** Blog posts, News & media
- **Library:** Media (image uploads, auto-resized)
- **Content:** Home Hero · **Settings:** Site Settings, Users

Every page reads from the CMS with a graceful fallback to seed content, so the site is never blank.

### Content migration
All imagery was migrated from the current WordPress site into `public/uploads` (≈138 images) via `scripts/scrape.mjs`, with a manifest at `src/content/scraped.json`. The galleries render these real photos today.

---

## Next steps (documented, not yet wired)
1. **Stripe checkout** — the cart + product model are ready; wire the checkout button to Stripe (the workspace already has Stripe connected).
2. **Newsletter + contact** — forms are complete UI; point them at Mailchimp/Buttondown and a Payload email endpoint (`TODO` markers in `NewsletterForm.tsx` and `ContactForm.tsx`).
3. **Media library import** — optionally bulk-import `public/uploads` into the Payload Media collection and attach to Mural/Painting entries so galleries are 100% CMS-driven.
4. **Swap the hero video / poster** and edit the hero copy in `/admin → Home Hero`.

## Handy commands
```bash
npm run dev              # dev server
npm run generate:types   # regenerate Payload TS types after schema changes
npm run seed             # (re)seed content + admin user
node scripts/scrape.mjs  # re-run the image migration
npx tsc --noEmit         # type-check
```
