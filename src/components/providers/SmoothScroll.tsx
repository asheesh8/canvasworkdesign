'use client'

import { ReactLenis } from 'lenis/react'
import type { ReactNode } from 'react'

/**
 * Buttery smooth scrolling for the whole site. Motion's `useScroll`
 * hooks read the same scroll position, so scroll-linked animations
 * (hero zoom, parallax) stay perfectly in sync.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      }}
    >
      {children}
    </ReactLenis>
  )
}
