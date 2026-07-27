import React from 'react'
import type { Metadata } from 'next'
import { Fraunces, EB_Garamond, Inter } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/providers/SmoothScroll'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  style: ['normal', 'italic'],
})
const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-eb-garamond',
  display: 'swap',
  style: ['normal', 'italic'],
})
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://canvasworksdesigns.com'),
  title: {
    default: 'Canvasworks Designs — Lisa Curry Mair | Murals & Paintings',
    template: '%s · Canvasworks Designs',
  },
  description:
    'Hand-painted murals and original paintings for homes around the globe, from the Vermont studio of Lisa Curry Mair. Three decades of work on canvas.',
  openGraph: {
    title: 'Canvasworks Designs — Lisa Curry Mair',
    description: 'Hand-painted murals and original paintings for homes around the globe.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${ebGaramond.variable} ${inter.variable}`}>
      <body className="bg-cream text-ink antialiased">
        <SmoothScroll>
          <Nav />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
