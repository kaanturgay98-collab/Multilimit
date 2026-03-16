import { redirect } from "next/navigation"

export default function SiparisPage() {
  // En basit akış: direkt ödeme ekranına geçir.
  redirect("/odeme")
}

