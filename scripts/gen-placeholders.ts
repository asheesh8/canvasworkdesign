/**
 * Generates warm, painterly SVG placeholder tiles for every artwork key.
 * Run: npx tsx scripts/gen-placeholders.ts
 * Lisa replaces these with real photos in the /admin media library.
 */
import { mkdirSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'
import { MURALS, PAINTINGS, PRINTS, CLASSES, POSTS } from '../src/content/site'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.resolve(dirname, '../public/img')
mkdirSync(outDir, { recursive: true })

type Palette = { from: string; to: string; glow: string }
const TONES: Record<string, Palette> = {
  gold: { from: '#e2c481', to: '#8a6a2f', glow: '#f6e4b0' },
  sage: { from: '#b3c0a2', to: '#54654a', glow: '#dfe6ce' },
  terracotta: { from: '#dda283', to: '#933f27', glow: '#f2c9b0' },
  dusk: { from: '#aebccb', to: '#516274', glow: '#dce6f0' },
  plum: { from: '#bd9aa7', to: '#5f3f4d', glow: '#e6cdd6' },
  forest: { from: '#93a889', to: '#2c3f28', glow: '#cfdcc4' },
}

function tile(key: string, tone: string, title: string, w = 1200, h = 1500) {
  const p = TONES[tone] ?? TONES.gold
  const seed = Array.from(key).reduce((a, c) => a + c.charCodeAt(0), 0) % 100
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <radialGradient id="g" cx="34%" cy="28%" r="90%">
      <stop offset="0%" stop-color="${p.glow}"/>
      <stop offset="42%" stop-color="${p.from}"/>
      <stop offset="100%" stop-color="${p.to}"/>
    </radialGradient>
    <filter id="paint" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="3" seed="${seed}" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="46" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="g"/>
      <feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.06 0"/>
    </filter>
  </defs>

  <rect width="${w}" height="${h}" fill="url(#g)"/>

  <!-- painterly strokes -->
  <g filter="url(#paint)" opacity="0.55">
    <ellipse cx="${w * 0.32}" cy="${h * 0.30}" rx="${w * 0.42}" ry="${h * 0.24}" fill="${p.glow}" opacity="0.4"/>
    <ellipse cx="${w * 0.72}" cy="${h * 0.66}" rx="${w * 0.40}" ry="${h * 0.30}" fill="${p.to}" opacity="0.5"/>
    <path d="M0 ${h * 0.72} Q ${w * 0.5} ${h * 0.58} ${w} ${h * 0.78} L ${w} ${h} L 0 ${h} Z" fill="${p.to}" opacity="0.55"/>
  </g>

  <!-- vignette -->
  <rect width="${w}" height="${h}" fill="url(#g)" opacity="0.0"/>
  <rect width="${w}" height="${h}" fill="black" opacity="0.10" style="mix-blend-mode:multiply"/>
  <rect width="${w}" height="${h}" filter="url(#grain)"/>

  <!-- gilt frame -->
  <rect x="26" y="26" width="${w - 52}" height="${h - 52}" fill="none" stroke="#f3e6c4" stroke-opacity="0.55" stroke-width="2"/>

  <!-- monogram -->
  <text x="${w - 60}" y="110" text-anchor="end" font-family="Georgia, 'Times New Roman', serif" font-size="70" font-style="italic" fill="#fbf6ec" fill-opacity="0.5">M</text>

  <!-- title -->
  <text x="60" y="${h - 70}" font-family="Georgia, 'Times New Roman', serif" font-size="52" fill="#fbf6ec" fill-opacity="0.92">${escapeXml(
    title,
  )}</text>
</svg>`
}

function escapeXml(s: string) {
  return s.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]!))
}

const items = [
  ...MURALS.map((m) => ({ key: m.key, tone: m.tone, title: m.title })),
  ...PAINTINGS.map((m) => ({ key: m.key, tone: m.tone, title: m.title })),
  ...PRINTS.map((m) => ({ key: m.key, tone: m.tone, title: m.title })),
  ...CLASSES.map((m) => ({ key: m.key, tone: m.tone, title: m.title })),
  ...POSTS.map((m) => ({ key: m.key, tone: m.tone, title: m.title })),
]

let count = 0
for (const it of items) {
  writeFileSync(path.join(outDir, `${it.key}.svg`), tile(it.key, it.tone, it.title))
  count++
}

// A warm wide poster for the hero, shown before the video loads.
writeFileSync(path.join(outDir, 'hero-poster.svg'), tile('hero-poster', 'gold', '', 2000, 1200))

console.log(`Generated ${count + 1} placeholder tiles → public/img`)
