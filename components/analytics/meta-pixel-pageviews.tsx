"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

export function MetaPixelPageViews() {
  const pathname = usePathname()
  const isFirst = useRef(true)

  useEffect(() => {
    if (!pathname) return
    if (isFirst.current) {
      isFirst.current = false
      return
    }
    window.fbq?.("track", "PageView")
  }, [pathname])

  return null
}
