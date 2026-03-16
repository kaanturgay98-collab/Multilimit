"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function AdminLogoutButton() {
  const router = useRouter()

  return (
    <Button
      variant="outline"
      onClick={async () => {
        await fetch("/api/admin/auth/logout", { method: "POST" })
        router.replace("/admin/login")
        router.refresh()
      }}
    >
      Cikis
    </Button>
  )
}

