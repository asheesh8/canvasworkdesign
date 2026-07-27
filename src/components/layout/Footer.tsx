import Link from 'next/link'
import { NAV, SITE } from '@/content/site'
import { getSiteSettings } from '@/lib/queries'
import { LogoMark } from './Logo'
import { NewsletterForm } from '@/components/ui/NewsletterForm'

export default async function Footer() {
  const s = await getSiteSettings()
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-espresso text-ivory">
      <div className="grain absolute inset-0" />

      <div className="relative mx-auto max-w-[1400px] px-5 pb-10 pt-20 sm:px-8 lg:pt-28">
        {/* newsletter */}
        <div className="grid gap-10 border-b border-ivory/10 pb-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <p className="label text-gilt">Newsletter</p>
            <h2 className="mt-4 max-w-md font-display text-4xl leading-[1.02] sm:text-5xl">
              {s.newsletterHeading}
            </h2>
            <p className="mt-4 max-w-md font-sans text-sm text-ivory/60">{s.newsletterBlurb}</p>
          </div>
          <div className="flex items-end">
            <NewsletterForm />
          </div>
        </div>

        {/* columns */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 text-gilt">
              <LogoMark className="h-8 w-8" />
              <span className="font-display text-2xl lowercase text-ivory">canvasworks</span>
            </div>
            <p className="mt-5 font-sans text-sm leading-relaxed text-ivory/55">{s.footerBlurb}</p>
          </div>

          {NAV.filter((n) => n.children).map((col) => (
            <div key={col.label}>
              <p className="label text-ivory/40">{col.label}</p>
              <ul className="mt-4 space-y-2.5">
                {col.children!.map((c) => (
                  <li key={c.href}>
                    <Link href={c.href} className="font-sans text-[0.95rem] text-ivory/75 transition-colors hover:text-gilt">
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="label text-ivory/40">Studio</p>
            <ul className="mt-4 space-y-2.5 font-sans text-[0.95rem] text-ivory/75">
              <li>{s.location}</li>
              <li>
                <a href={`mailto:${s.email}`} className="transition-colors hover:text-gilt">
                  {s.email}
                </a>
              </li>
              <li className="flex gap-4 pt-2">
                <a href={s.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gilt">
                  Instagram
                </a>
                <a href={s.pinterest} target="_blank" rel="noopener noreferrer" className="hover:text-gilt">
                  Pinterest
                </a>
                <a href={s.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-gilt">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* giant wordmark */}
        <div className="select-none overflow-hidden pt-6">
          <div className="font-display text-[19vw] leading-[0.8] tracking-tight text-ivory/[0.06] lg:text-[15vw]">
            {SITE.artist.toLowerCase()}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-ivory/10 pt-8 font-sans text-xs text-ivory/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}. All work © Lisa Curry Mair.
          </p>
          <div className="flex items-center gap-5">
            <span>{SITE.photoCredit}</span>
            <Link href="/privacy" className="hover:text-ivory/70">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
