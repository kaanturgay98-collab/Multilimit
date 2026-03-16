import { Metadata } from "next"
import { Truck, Clock, Package, MapPin, Check, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Kargo Bilgileri | Multilimit",
  description: "Multilimit kargo ve teslimat bilgileri. Turkiye genelinde ucretsiz kargo.",
}

export default function ShippingInfoPage() {
  const features = [
    {
      icon: Truck,
      title: "Ucretsiz Kargo",
      description: "Turkiye genelinde tum siparislerinizde kargo ucretsiztir.",
    },
    {
      icon: Clock,
      title: "Ayni Gun Kargo",
      description: "Saat 14:00'e kadar verilen siparisler ayni gun kargoya verilir.",
    },
    {
      icon: Package,
      title: "Guvenli Paketleme",
      description: "Urunleriniz ozel koruyucu ambalajlarla guvenle paketlenir.",
    },
    {
      icon: MapPin,
      title: "Adrese Teslim",
      description: "Siparisleriniz belirttiginiz adrese teslim edilir.",
    },
  ]

  const deliveryTimes = [
    { region: "Istanbul", time: "1 is gunu" },
    { region: "Marmara Bolgesi", time: "1-2 is gunu" },
    { region: "Ege ve Akdeniz Bolgesi", time: "2-3 is gunu" },
    { region: "Ic Anadolu Bolgesi", time: "2-3 is gunu" },
    { region: "Karadeniz Bolgesi", time: "2-3 is gunu" },
    { region: "Dogu ve Guneydogu Anadolu", time: "3-4 is gunu" },
  ]

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Truck className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Kargo ve <span className="text-primary">Teslimat</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Turkiye genelinde ucretsiz kargo ile siparislerinizi hizla ve guvenle adresinize teslim ediyoruz.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Times */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-4">Tahmini Teslimat Sureleri</h2>
            <p className="text-muted-foreground text-center mb-8">
              Siparisler hafta ici is gunlerinde kargoya verilir. Teslimat sureleri tahmini olup, 
              kargo yogunluguna bagli olarak degisebilir.
            </p>
            <div className="bg-background border border-border rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-semibold text-foreground">Bolge</th>
                    <th className="text-right p-4 font-semibold text-foreground">Teslimat Suresi</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveryTimes.map((item, index) => (
                    <tr key={index} className="border-b border-border last:border-0">
                      <td className="p-4 text-muted-foreground">{item.region}</td>
                      <td className="p-4 text-right text-primary font-medium">{item.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Partners */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-8">Kargo Ortaklarimiz</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Yurtici Kargo", "Aras Kargo", "MNG Kargo", "Surat Kargo"].map((company, index) => (
                <div key={index} className="bg-card border border-border rounded-xl p-6 flex items-center justify-center">
                  <span className="text-muted-foreground font-medium">{company}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-8">Kargo Hakkinda Sikca Sorulan Sorular</h2>

            <div className="space-y-4">
              {[
                {
                  q: "Siparisimi nasil takip edebilirim?",
                  a: "Siparisiniz kargoya verildikten sonra e-posta ile takip numarasi gonderilir. Bu numara ile kargo sirketinin web sitesinden veya uygulamasindan siparisizin durumunu takip edebilirsiniz."
                },
                {
                  q: "Teslimat saatini secebilir miyim?",
                  a: "Kargo sirketleri genellikle 09:00-18:00 saatleri arasinda teslimat yapar. Spesifik saat secimi yapilamamaktadir, ancak kargo sirketiyle iletisime gecerek tercihlerinizi bildirebilirsiniz."
                },
                {
                  q: "Farkli adrese teslimat yapilabilir mi?",
                  a: "Evet, siparis sirasinda istediginiz teslimat adresini girebilirsiniz. Fatura adresi ve teslimat adresi farkli olabilir."
                },
                {
                  q: "Kargo hasarli gelirse ne yapmaliyim?",
                  a: "Kargo geldiginde paketin disarisini kontrol edin. Hasar varsa, kurye yanindayken tutanak tutturun ve fotograf cekin. Ardindan musteri hizmetlerimize ulasin."
                },
                {
                  q: "Kapida odeme yapabilir miyim?",
                  a: "Evet, kapida nakit veya kredi karti ile odeme seceneklerimiz mevcuttur."
                },
              ].map((item, index) => (
                <div key={index} className="bg-background border border-border rounded-xl p-6">
                  <h3 className="font-semibold text-foreground mb-2">{item.q}</h3>
                  <p className="text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4 bg-card border border-border rounded-xl p-4">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Sigortalı Kargo</p>
                  <p className="text-sm text-muted-foreground">Tum gonderiler sigorta kapsaminda</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-card border border-border rounded-xl p-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Ozel Paketleme</p>
                  <p className="text-sm text-muted-foreground">Guvenli ve ozenli ambalaj</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-card border border-border rounded-xl p-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Gizlilik</p>
                  <p className="text-sm text-muted-foreground">Dis ambalajda urun bilgisi yok</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
