import type { Config } from "@measured/puck";
import { HeroConfig, HeroProps } from "@/components/puck/Hero";
import { BenefitsConfig, BenefitsProps } from "@/components/puck/Benefits";
import { IngredientsConfig, IngredientsProps } from "@/components/puck/Ingredients";
import { WhyMultilimitConfig, WhyMultilimitProps } from "@/components/puck/WhyMultilimit";
import { HowItWorksConfig, HowItWorksProps } from "@/components/puck/HowItWorks";
import { TrustBadgesConfig, TrustBadgesProps } from "@/components/puck/TrustBadges";
import { TestimonialsConfig, TestimonialsProps } from "@/components/puck/Testimonials";
import { FAQConfig, FAQProps } from "@/components/puck/FAQ";
import { BlogPreviewConfig, BlogPreviewProps } from "@/components/puck/BlogPreview";
import { WhatsappSupportConfig, WhatsappSupportProps } from "@/components/puck/WhatsappSupport";
import { StatsConfig, StatsProps } from "@/components/puck/Stats";
import { BrandStoryConfig, BrandStoryProps } from "@/components/puck/BrandStory";
import { MissionVisionConfig, MissionVisionProps } from "@/components/puck/MissionVision";
import { QualityApproachConfig, QualityApproachProps } from "@/components/puck/QualityApproach";
import { TeamConfig, TeamProps } from "@/components/puck/Team";
import { DetailedIngredientsConfig, DetailedIngredientsProps } from "@/components/puck/DetailedIngredients";
import { FormulaSynergyConfig, FormulaSynergyProps } from "@/components/puck/FormulaSynergy";
import { ProductHeroConfig, ProductHeroProps } from "@/components/puck/ProductHero";
import { ProductFeaturesConfig, ProductFeaturesProps } from "@/components/puck/ProductFeatures";

// Define the shape of all component props
type Props = {
  Hero: HeroProps;
  Benefits: BenefitsProps;
  Ingredients: IngredientsProps;
  WhyMultilimit: WhyMultilimitProps;
  HowItWorks: HowItWorksProps;
  TrustBadges: TrustBadgesProps;
  Testimonials: TestimonialsProps;
  FAQ: FAQProps;
  BlogPreview: BlogPreviewProps;
  WhatsappSupport: WhatsappSupportProps;
  
  Stats: StatsProps;
  BrandStory: BrandStoryProps;
  MissionVision: MissionVisionProps;
  QualityApproach: QualityApproachProps;
  Team: TeamProps;
  DetailedIngredients: DetailedIngredientsProps;
  FormulaSynergy: FormulaSynergyProps;
  ProductHero: ProductHeroProps;
  ProductFeatures: ProductFeaturesProps;

  TextSection: { title: string; content: string; align: "left" | "center" | "right" };
  CTA: { title: string; description: string; buttonText: string; buttonLink: string; theme: "primary" | "dark" | "light" };
  Heading: { title: string; align: "left" | "center" | "right" };
};

export const config: Config<Props> = {
  components: {
    Hero: HeroConfig,
    Benefits: BenefitsConfig,
    Ingredients: IngredientsConfig,
    WhyMultilimit: WhyMultilimitConfig,
    HowItWorks: HowItWorksConfig,
    TrustBadges: TrustBadgesConfig,
    Testimonials: TestimonialsConfig,
    FAQ: FAQConfig,
    BlogPreview: BlogPreviewConfig,
    WhatsappSupport: WhatsappSupportConfig,
    
    Stats: StatsConfig,
    BrandStory: BrandStoryConfig,
    MissionVision: MissionVisionConfig,
    QualityApproach: QualityApproachConfig,
    Team: TeamConfig,
    DetailedIngredients: DetailedIngredientsConfig,
    FormulaSynergy: FormulaSynergyConfig,
    ProductHero: ProductHeroConfig,
    ProductFeatures: ProductFeaturesConfig,

    TextSection: {
      fields: {
        title: { type: "text" },
        content: { type: "textarea" },
        align: {
          type: "radio",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ],
        },
      },
      defaultProps: {
        title: "Neden Bizi Seçmelisiniz?",
        content: "Kaliteden ödün vermeyen yapımız ve müşteri memnuniyeti odaklı çalışmalarımız ile sektörde öncü olmaya devam ediyoruz.",
        align: "center",
      },
      render: ({ title, content, align }) => (
        <section className={`py-16 px-6 lg:px-8 relative overflow-hidden ${align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left"}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-navy-light/20" />
          <div className="max-w-3xl mx-auto space-y-4 relative z-10">
            {title && (
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {title}
              </h2>
            )}
            {content && (
              <p className="text-lg leading-8 text-slate-600">
                {content}
              </p>
            )}
          </div>
        </section>
      ),
    },

    CTA: {
      fields: {
        title: { type: "text" },
        description: { type: "textarea" },
        buttonText: { type: "text" },
        buttonLink: { type: "text" },
        theme: {
          type: "radio",
          options: [
            { label: "Primary", value: "primary" },
            { label: "Dark", value: "dark" },
            { label: "Light", value: "light" },
          ],
        },
      },
      defaultProps: {
        title: "Hemen Sipariş Verin",
        description: "İlk siparişinize özel %10 indirim fırsatını kaçırmayın. Stoklar tükenmeden harekete geçin.",
        buttonText: "Sipariş Oluştur",
        buttonLink: "/siparis",
        theme: "primary",
      },
      render: ({ title, description, buttonText, buttonLink, theme }) => {
        const themeStyles = {
          primary: "bg-primary text-white",
          dark: "bg-slate-900 text-white",
          light: "bg-slate-100 text-slate-900",
        };

        const buttonStyles = {
          primary: "border-primary/50 text-foreground hover:bg-primary/10",
          dark: "bg-primary text-white hover:bg-primary/90",
          light: "bg-primary text-white hover:bg-primary/90",
        };

        return (
          <section className={`py-20 px-6 sm:px-12 lg:px-16 ${themeStyles[theme]} rounded-3xl mx-4 my-12 shadow-xl overflow-hidden relative border border-border/50`}>
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-tl from-background/40 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 blur-3xl opacity-30 pointer-events-none">
              <div className="w-[300px] h-[300px] bg-primary/5 rounded-full"></div>
            </div>

            <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {title}
              </h2>
              <p className="text-lg opacity-90 leading-8">
                {description}
              </p>
              <div className="pt-4 flex justify-center">
                <a
                  href={buttonLink}
                  className={`inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold transition-all rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 ${buttonStyles[theme]}`}
                >
                  {buttonText}
                </a>
              </div>
            </div>
          </section>
        );
      },
    },

    Heading: {
      fields: {
        title: { type: "text" },
        align: {
          type: "radio",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ],
        },
      },
      defaultProps: {
        title: "Bölüm Başlığı",
        align: "left",
      },
      render: ({ title, align }) => (
        <div className={`px-6 py-12 relative overflow-hidden ${align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left"}`}>
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <h2 className="text-4xl font-bold text-foreground tracking-tight relative z-10">{title}</h2>
        </div>
      ),
    },
  },
};
