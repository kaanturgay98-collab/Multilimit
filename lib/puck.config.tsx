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
    Hero: { ...HeroConfig, label: "Hero" },
    Benefits: { ...BenefitsConfig, label: "Avantajlar" },
    Ingredients: { ...IngredientsConfig, label: "Bileşenler" },
    WhyMultilimit: { ...WhyMultilimitConfig, label: "Neden Multilimit" },
    HowItWorks: { ...HowItWorksConfig, label: "Nasıl Çalışır" },
    TrustBadges: { ...TrustBadgesConfig, label: "Güven Rozetleri" },
    Testimonials: { ...TestimonialsConfig, label: "Müşteri Yorumları" },
    FAQ: { ...FAQConfig, label: "Sıkça Sorulan Sorular" },
    BlogPreview: { ...BlogPreviewConfig, label: "Blog Yazıları" },
    WhatsappSupport: { ...WhatsappSupportConfig, label: "WhatsApp Destek" },
    
    Stats: { ...StatsConfig, label: "İstatistikler" },
    BrandStory: { ...BrandStoryConfig, label: "Marka Hikayesi" },
    MissionVision: { ...MissionVisionConfig, label: "Misyon ve Vizyon" },
    QualityApproach: { ...QualityApproachConfig, label: "Kalite Yaklaşımı" },
    Team: { ...TeamConfig, label: "Ekibimiz" },
    DetailedIngredients: { ...DetailedIngredientsConfig, label: "Detaylı İçerikler" },
    FormulaSynergy: { ...FormulaSynergyConfig, label: "Formül Sinerjisi" },
    ProductHero: { ...ProductHeroConfig, label: "Ürün Tanıtımı" },
    ProductFeatures: { ...ProductFeaturesConfig, label: "Ürün Özellikleri" },

    TextSection: {
      label: "Metin Alanı",
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
        <section className={`py-16 px-6 lg:px-8 bg-background relative overflow-hidden ${align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left"}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-navy-light/20" />
          <div className="max-w-3xl mx-auto space-y-4 relative z-10">
            {title && (
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {title}
              </h2>
            )}
            {content && (
              <p className="text-lg leading-8 text-muted-foreground">
                {content}
              </p>
            )}
          </div>
        </section>
      ),
    },

    CTA: {
      label: "CTA",
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
        title: "Hemen Trendyol'dan Satın Alın",
        description: "Multilimit kalitesine Trendyol güvencesiyle sahip olun. Stoklar tükenmeden harekete geçin.",
        buttonText: "Trendyol'da İncele",
        buttonLink: "https://www.trendyol.com/multilimit/alkol-sonrasi-detoks-destegi-saglayan-gida-takviyesi-p-1116265098?boutiqueId=61&merchantId=1239513",
        theme: "primary",
      },
      render: ({ title, description, buttonText, buttonLink, theme }) => {
        const themeStyles = {
          primary: "bg-primary text-primary-foreground",
          dark: "bg-navy-dark text-white",
          light: "bg-background text-foreground",
        };

        const buttonStyles = {
          primary: "bg-[#f27a1a] text-white hover:bg-[#d66512] shadow-lg hover:shadow-[#f27a1a]/20",
          dark: "bg-[#f27a1a] text-white hover:bg-[#d66512]",
          light: "bg-[#f27a1a] text-white hover:bg-[#d66512]",
        };

        return (
          <section className={`py-20 px-6 sm:px-12 lg:px-16 ${themeStyles[theme]} rounded-3xl mx-4 my-12 shadow-xl overflow-hidden relative border border-border/50`}>
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-tl from-background/40 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 blur-3xl opacity-30 pointer-events-none">
              <div className="w-[300px] h-[300px] bg-primary/5 rounded-full"></div>
            </div>

            <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                {title}
              </h2>
              <p className="text-lg opacity-90 leading-8 text-muted-foreground">
                {description}
              </p>
              <div className="pt-4 flex justify-center">
                <a
                  href={buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center px-10 py-4 text-base font-bold transition-all rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 ${buttonStyles[theme]}`}
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
      label: "Başlık",
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
        <div className={`px-6 py-12 bg-background relative overflow-hidden ${align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left"}`}>
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <h2 className="text-4xl font-bold text-foreground tracking-tight relative z-10">{title}</h2>
        </div>
      ),
    },
  },
};
