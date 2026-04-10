export type PublicSiteSettings = {
  phone: string
  email: string
  whatsapp: string
  instagramUrl: string
  facebookUrl: string
  youtubeUrl: string
  xUrl: string
}

// Temporary mock values for production until admin save works reliably.
export const MOCK_SITE_SETTINGS: PublicSiteSettings = {
  phone: "+90 850 000 00 00",
  email: "info@mltlimit.com",
  whatsapp: "905444575629",
  instagramUrl: "https://www.instagram.com/multi.limit/",
  facebookUrl: "https://www.facebook.com/multi.limit/",
  youtubeUrl: "https://www.youtube.com/",
  xUrl: "https://x.com/",
}

