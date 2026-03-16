import { HeroSection } from '@/components/home/hero-section'
import { BenefitsSection } from '@/components/home/benefits-section'
import { IngredientsPreview } from '@/components/home/ingredients-preview'
import { WhyMultilimit } from '@/components/home/why-multilimit'
import { HowItWorks } from '@/components/home/how-it-works'
import { TrustBadges } from '@/components/home/trust-badges'
import { TestimonialsPreview } from '@/components/home/testimonials-preview'
import { FaqPreview } from '@/components/home/faq-preview'
import { BlogPreview } from '@/components/home/blog-preview'
import { WhatsappSupport } from '@/components/home/whatsapp-support'
import { AdminOverlay } from '@/components/public/admin-overlay'

export default function HomePage() {
  return (
    <>
      <AdminOverlay slug="ana-sayfa" />
      <HeroSection />
      <BenefitsSection />
      <IngredientsPreview />
      <WhyMultilimit />
      <HowItWorks />
      <TrustBadges />
      <TestimonialsPreview />
      <FaqPreview />
      <BlogPreview />
      <WhatsappSupport />
    </>
  )
}
