'use client'

import { useEffect, useState } from 'react'

const TAILWIND_BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
}

type Breakpoint = keyof typeof TAILWIND_BREAKPOINTS

export function useBreakpoint(breakpoint: Breakpoint, initialValue = false): boolean {
  const [isMatch, setIsMatch] = useState(initialValue)

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${TAILWIND_BREAKPOINTS[breakpoint]}px)`)
    setIsMatch(mq.matches)

    const onChange = (e: MediaQueryListEvent) => setIsMatch(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [breakpoint])

  return isMatch
}
