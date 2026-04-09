import React from "react"

type MultilimitHeroBackgroundProps = {
  bgImageUrl?: string
  /** Sabit ürün vitrini kullanıldığında sol metin okunurluğu için overlay */
  withFixedProduct?: boolean
}

export function MultilimitHeroBackground({
  bgImageUrl,
  withFixedProduct,
}: MultilimitHeroBackgroundProps) {
  const bgImage = bgImageUrl || "/multilimit-hero-bg.png"
  const isCustomImage = !!bgImageUrl && bgImageUrl !== "/multilimit-hero-bg.png"

  return (
    <div className="ml-hero-bg absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="ml-hero-bg__base absolute inset-0" />

      <img
        src={bgImage}
        alt=""
        className="ml-hero-bg__photo absolute inset-0 w-full h-full object-cover object-[70%_80%]"
        style={isCustomImage ? { filter: "blur(0px) saturate(1.1)", opacity: 0.8 } : {}}
      />

      <svg
        className="ml-hero-bg__waves absolute inset-x-0 bottom-[-8%] h-[70%] w-full opacity-70"
        viewBox="0 0 1440 420"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="mlGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4A437" stopOpacity="0.05" />
            <stop offset="35%" stopColor="#D4A437" stopOpacity="0.18" />
            <stop offset="55%" stopColor="#C99A2E" stopOpacity="0.28" />
            <stop offset="75%" stopColor="#D4A437" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#D4A437" stopOpacity="0.06" />
          </linearGradient>
          <linearGradient id="mlGoldHot" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4A437" stopOpacity="0.0" />
            <stop offset="45%" stopColor="#D4A437" stopOpacity="0.32" />
            <stop offset="55%" stopColor="#C99A2E" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#D4A437" stopOpacity="0.0" />
          </linearGradient>
          <filter id="mlGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.9 0"
              result="glow"
            />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="ml-hero-bg__waveGroup">
          <path
            d="M0,240 C180,190 300,250 480,220 C660,190 780,120 960,150 C1140,180 1260,120 1440,150 L1440,420 L0,420 Z"
            fill="url(#mlGold)"
          />
          <path
            d="M0,270 C210,230 360,290 540,260 C720,230 840,160 1020,190 C1200,220 1290,170 1440,195 L1440,420 L0,420 Z"
            fill="url(#mlGoldHot)"
            filter="url(#mlGlow)"
            opacity="0.75"
          />
        </g>
      </svg>

      <div className="ml-hero-bg__streaks absolute inset-0" />
      <div className="ml-hero-bg__particles absolute inset-0" />

      <div
        className={
          withFixedProduct
            ? "ml-hero-bg__overlay ml-hero-bg__overlay--product absolute inset-0"
            : "ml-hero-bg__overlay absolute inset-0"
        }
      />
    </div>
  )
}
