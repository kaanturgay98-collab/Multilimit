"use client"

import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type RevealProps = {
  children: ReactNode
  className?: string
  delayMs?: number
  durationMs?: number
  once?: boolean
  y?: number
}

export function Reveal({
  children,
  className,
  delayMs = 0,
  durationMs = 600,
  once = true,
  y = 16,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold: 0.12 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [once])

  return (
    <div
      ref={ref}
      className={cn('reveal-base', isVisible ? 'reveal-visible' : 'reveal-hidden', className)}
      style={
        {
          '--reveal-delay': `${delayMs}ms`,
          '--reveal-duration': `${durationMs}ms`,
          '--reveal-y': `${y}px`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  )
}
