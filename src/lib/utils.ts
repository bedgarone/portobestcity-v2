import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const FALLBACK_TEAM_COLOR = '#6B7280'

const HEX_RE = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i

// Normalise a hex colour to #RRGGBB, or return the neutral fallback
export function normalizeHex(input: string | null | undefined): string {
  if (!input) return FALLBACK_TEAM_COLOR
  const m = input.trim().match(HEX_RE)
  if (!m) return FALLBACK_TEAM_COLOR
  let h = m[1] ?? ''
  if (h.length === 3) {
    h = h
      .split('')
      .map((c) => c + c)
      .join('')
  }
  return `#${h.toUpperCase()}`
}

function luminance(hex: string): number {
  const n = normalizeHex(hex).slice(1)
  const [r = 0, g = 0, b = 0] = [0, 2, 4].map((i) => {
    const c = parseInt(n.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function contrastRatio(a: string, b: string): number {
  const [l1 = 0, l2 = 0] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (l1 + 0.05) / (l2 + 0.05)
}

// Pick near-black or white text, whichever contrasts more with the background
export function readableForeground(bg: string): '#111111' | '#FFFFFF' {
  const c = normalizeHex(bg)
  return contrastRatio(c, '#111111') >= contrastRatio(c, '#FFFFFF') ? '#111111' : '#FFFFFF'
}
