'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { COLLECTIONS, GLOBALS } from '@/studio/config'
import { LogoMark } from '@/components/layout/Logo'
import { logout } from '@/app/(studio)/studio/actions'
import { cn } from '@/lib/utils'

type NavEntry = { href: string; label: string; icon: string }

export function StudioShell({ user, children }: { user: { name?: string; email: string }; children: React.ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const groups: Record<string, NavEntry[]> = {}
  for (const c of COLLECTIONS) {
    groups[c.group] ??= []
    groups[c.group].push({ href: `/studio/${c.slug}`, label: c.label, icon: c.icon })
  }

  const isActive = (href: string) =>
    href === '/studio' ? pathname === '/studio' : pathname.startsWith(href)

  const NavLink = ({ href, label, icon }: NavEntry) => (
    <Link
      href={href}
      onClick={() => setOpen(false)}
      className={cn(
        'flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.95rem] transition-colors',
        isActive(href) ? 'bg-ink text-ivory' : 'text-ink/70 hover:bg-ink/5 hover:text-ink',
      )}
    >
      <span className="w-5 text-center">{icon}</span>
      {label}
    </Link>
  )

  return (
    <div className="flex min-h-screen">
      {/* sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-ink/10 bg-cream transition-transform lg:static lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <Link href="/studio" className="flex items-center gap-2.5 px-6 py-6">
          <LogoMark className="h-7 w-7 text-gold" />
          <span className="font-display text-xl lowercase text-ink">canvasworks</span>
          <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[0.6rem] uppercase tracking-widest text-gold">studio</span>
        </Link>

        <nav className="flex-1 space-y-6 overflow-y-auto px-4 pb-6">
          <NavLink href="/studio" label="Dashboard" icon="◈" />
          {Object.entries(groups).map(([group, entries]) => (
            <div key={group}>
              <p className="px-3 pb-1.5 text-[0.65rem] uppercase tracking-[0.2em] text-stone">{group}</p>
              <div className="space-y-0.5">
                {entries.map((e) => (
                  <NavLink key={e.href} {...e} />
                ))}
              </div>
            </div>
          ))}
          <div>
            <p className="px-3 pb-1.5 text-[0.65rem] uppercase tracking-[0.2em] text-stone">Library & Settings</p>
            <div className="space-y-0.5">
              <NavLink href="/studio/media" label="Media library" icon="🖼" />
              {GLOBALS.map((g) => (
                <NavLink key={g.slug} href={`/studio/${g.slug === 'home-hero' ? 'hero' : 'settings'}`} label={g.label} icon={g.icon} />
              ))}
            </div>
          </div>
        </nav>

        <div className="border-t border-ink/10 p-4">
          <div className="mb-3 px-2">
            <p className="text-sm font-medium text-ink">{user.name || 'Signed in'}</p>
            <p className="truncate text-xs text-stone">{user.email}</p>
          </div>
          <div className="flex gap-2">
            <a href="/" target="_blank" className="flex-1 rounded-lg border border-ink/15 px-3 py-2 text-center text-xs text-ink/70 hover:bg-ink/5">
              View site ↗
            </a>
            <form action={logout} className="flex-1">
              <button className="w-full rounded-lg border border-ink/15 px-3 py-2 text-xs text-ink/70 hover:bg-ink/5">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </aside>

      {open && <div onClick={() => setOpen(false)} className="fixed inset-0 z-30 bg-espresso/40 lg:hidden" />}

      {/* main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-ink/10 bg-parchment/90 px-5 py-3.5 backdrop-blur lg:hidden">
          <button onClick={() => setOpen(true)} className="rounded-lg border border-ink/15 px-3 py-1.5 text-sm" aria-label="Menu">
            ☰
          </button>
          <span className="font-display text-lg">Studio</span>
        </header>
        <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-8 sm:px-8 sm:py-12">{children}</main>
      </div>
    </div>
  )
}
