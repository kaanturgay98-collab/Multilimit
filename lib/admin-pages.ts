export const ADMIN_PAGES = [
  { slug: "ana-sayfa", title: "Ana Sayfa", route: "/" },
  { slug: "hakkimizda", title: "Hakkimizda", route: "/hakkimizda" },
  { slug: "urun", title: "Urun", route: "/urun" },
  { slug: "nasil-kullanilir", title: "Nasil Kullanilir", route: "/nasil-kullanilir" },
  { slug: "icerikler", title: "Icerikler", route: "/icerikler" },
  { slug: "sss", title: "SSS", route: "/sss" },
  { slug: "yorumlar", title: "Yorumlar", route: "/yorumlar" },
  { slug: "blog", title: "Blog", route: "/blog" },
  { slug: "iletisim", title: "Iletisim", route: "/iletisim" },
] as const

export type AdminPageSlug = (typeof ADMIN_PAGES)[number]["slug"]

