import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gizlilik Politikasi | Multilimit",
  description: "Multilimit gizlilik politikasi ve kisisel verilerin korunmasi hakkinda bilgiler.",
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Gizlilik Politikasi</h1>
          <p className="text-muted-foreground mb-8">Son guncelleme: 1 Ocak 2024</p>

          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Giris</h2>
              <p className="text-muted-foreground leading-relaxed">
                Multilimit olarak, gizliliginize saygi duyuyoruz ve kisisel verilerinizi korumaya kararliyiz. 
                Bu gizlilik politikasi, web sitemizi ziyaret ettiginizde veya hizmetlerimizi kullandiginizda 
                hangi bilgileri topladigimizi, nasil kullandigimizi ve korudugumuzu aciklar.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Topladigimiz Bilgiler</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Asagidaki turde bilgileri toplayabiliriz:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Kimlik bilgileri (ad, soyad)</li>
                <li>Iletisim bilgileri (e-posta adresi, telefon numarasi, adres)</li>
                <li>Odeme bilgileri (kredi karti bilgileri guvenli odeme saglayicilari araciligiyla islenir)</li>
                <li>Siparis gecmisi ve alisveris tercihleri</li>
                <li>Web sitesi kullanim verileri (cerezler araciligiyla)</li>
                <li>Iletisim kayitlari (musteri hizmetleri gorusmeleri)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Bilgileri Nasil Kullaniyoruz</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Topladigimiz bilgileri asagidaki amaclarla kullaniyoruz:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Siparislerinizi islemek ve teslim etmek</li>
                <li>Hesabinizi yonetmek</li>
                <li>Musteri hizmetleri saglamak</li>
                <li>Pazarlama iletisimleri gondermek (izin verdiginiz takdirde)</li>
                <li>Web sitemizi ve hizmetlerimizi gelistirmek</li>
                <li>Yasal yukumluluklerimizi yerine getirmek</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Bilgi Paylasimi</h2>
              <p className="text-muted-foreground leading-relaxed">
                Kisisel bilgilerinizi ucuncu taraflarla satmiyoruz. Ancak, asagidaki durumlarda 
                bilgilerinizi paylasabiliriz:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
                <li>Kargo ve lojistik sirketleri (siparis teslimati icin)</li>
                <li>Odeme islemcileri (guvenli odeme islemi icin)</li>
                <li>Yasal zorunluluklar geregi yetkili kurumlar</li>
                <li>Acik izniniz dahilinde diger taraflar</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Cerezler</h2>
              <p className="text-muted-foreground leading-relaxed">
                Web sitemiz, kullanici deneyimini iyilestirmek icin cerezler kullanmaktadir. 
                Cerezler, tercihlerinizi hatirlamak, site analitigini saglamak ve kisisellestirilmis 
                icerik sunmak icin kullanilir. Tarayici ayarlarinizdan cerezleri yonetebilirsiniz.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Veri Guvenligi</h2>
              <p className="text-muted-foreground leading-relaxed">
                Kisisel verilerinizi korumak icin endustri standartlarinda guvenlik onlemleri 
                uygulamaktayiz. SSL sifreleme, guvenli sunucular ve erisim kontrolleri kullaniyoruz. 
                Ancak, internet uzerinden hicbir veri iletiminin %100 guvenli olmadigini unutmayin.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Haklariniz</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                KVKK kapsaminda asagidaki haklara sahipsiniz:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Kisisel verilerinizin islenip islenmedigini ogrenme</li>
                <li>Islenmisse buna iliskin bilgi talep etme</li>
                <li>Islenme amacini ve amacina uygun kullanilip kullanilmadigini ogrenme</li>
                <li>Eksik veya yanlis islenmisse duzeltilmesini isteme</li>
                <li>Silinmesini veya yok edilmesini isteme</li>
                <li>Itiraz etme hakki</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Iletisim</h2>
              <p className="text-muted-foreground leading-relaxed">
                Gizlilik politikamiz hakkinda sorulariniz veya talepleriniz icin bizimle iletisime gecebilirsiniz:
              </p>
              <ul className="list-none text-muted-foreground space-y-2 mt-4">
                <li>E-posta: privacy@multilimit.com.tr</li>
                <li>Telefon: +90 (212) 123 45 67</li>
                <li>Adres: Levent, Istanbul, Turkiye</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Degisiklikler</h2>
              <p className="text-muted-foreground leading-relaxed">
                Bu gizlilik politikasini zaman zaman guncelleyebiliriz. Onemli degisikliklerde 
                sizi e-posta veya web sitemiz araciligiyla bilgilendirecegiz. Politikayi duzenli 
                olarak gozden gecirmenizi oneririz.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
