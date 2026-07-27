import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import '../(frontend)/globals.css'

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap', style: ['normal', 'italic'] })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const metadata: Metadata = {
  title: 'Studio · Canvasworks Designs',
  robots: { index: false, follow: false },
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`} style={{ ['--font-eb-garamond' as string]: 'Georgia, serif' }}>
      <body className="bg-parchment font-sans text-ink antialiased">{children}</body>
    </html>
  )
}
