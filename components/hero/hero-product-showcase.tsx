import React from "react"

/** Hero sağdaki ürün görseli — `public/paket multilimit.png` */
const PACK_SRC = "/paket-multilimit.webp"

/**
 * Genişlik hero’daki sağ grid sütununa bağlıdır (50/50 iken üstteki dev max-w işe yaramaz).
 * Sütun oranı + hafif scale ile görsel büyütülür.
 */
export function HeroProductShowcase() {
  return (
    <div className="relative w-full">
      <div className="w-full origin-center lg:origin-right lg:scale-[1.07] xl:scale-[1.1]">
        <img
          src={PACK_SRC}
          alt="Multilimit ürün paketi"
          className="h-auto w-full max-w-full rounded-xl object-contain sm:rounded-2xl max-h-[min(88svh,720px)] sm:max-h-[min(90svh,820px)] lg:max-h-[min(92svh,920px)] xl:max-h-[min(94svh,1020px)] [filter:drop-shadow(0_20px_40px_rgba(0,0,0,0.5))_drop-shadow(0_0_40px_rgba(212,164,55,0.18))]"
          width={1600}
          height={1600}
          decoding="async"
        />
      </div>
    </div>
  )
}
