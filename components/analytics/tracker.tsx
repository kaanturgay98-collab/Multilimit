"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

function send(type: "page_view" | "click", payload: { path: string; name?: string }) {
  const body = JSON.stringify({
    type,
    path: payload.path,
    name: payload.name,
    referrer: typeof document !== "undefined" ? document.referrer : undefined,
  })

  if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
    const blob = new Blob([body], { type: "application/json" })
    navigator.sendBeacon("/api/track", blob)
    return
  }

  void fetch("/api/track", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
    keepalive: true,
  })
}

export function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname) return
    send("page_view", { path: pathname })
  }, [pathname])

  return null
}

export function trackClick(name: string, path?: string) {
  send("click", { path: path ?? (typeof location !== "undefined" ? location.pathname : "/"), name })
}

