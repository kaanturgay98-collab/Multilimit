"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/siparis")
  }, [router])

  return null
}
