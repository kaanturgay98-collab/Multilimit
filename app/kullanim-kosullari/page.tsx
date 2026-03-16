import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kullanim Kosullari | Multilimit",
  description: "Multilimit web sitesi ve hizmetleri kullanim kosullari.",
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Kullanim Kosullari</h1>
          <p className="text-muted-foreground mb-8">Son guncelleme: 1 Ocak 2024</p>

          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Genel Hukumler</h2>
              <p className="text-muted-foreground leading-relaxed">
                Bu web sitesini (multilimit.com.tr) kullanarak, asagidaki kullanim kosullarini kabul etmis 
                sayilirsiniz. Bu kosullari kabul etmiyorsaniz, lutfen sitemizi kullanmayin. Multilimit, 
                bu kosullari onceden bildirimde bulunmaksizin degistirme hakkini sakli tutar.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Hizmet Tanimi</h2>
              <p className="text-muted-foreground leading-relaxed">
                Multilimit, premium saglik takviyeleri satan bir e-ticaret platformudur. Sunulan 
                urunler saglik takviyesi niteliginde olup, ilac degildir. Herhangi bir saglik 
                durumu icin tedavi amacli kullanilmamalidir.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Hesap Olusturma</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Sitemizden alisveris yapabilmek icin hesap olusturmaniz gerekebilir. Hesap olustururken:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Dogru ve guncel bilgiler vermeyi kabul edersiniz</li>
                <li>Hesap bilgilerinizi gizli tutmakla yukumlusunuz</li>
                <li>Hesabinizla yapilan tum islemlerden siz sorumlusunuz</li>
                <li>18 yasindan buyuk olmaniz gerekmektedir</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Siparis ve Odeme</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Siparis verdiginizde:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Gosterilen fiyatlar TL cinsinden olup KDV dahildir</li>
                <li>Siparis onayi e-posta ile gonderilecektir</li>
                <li>Odeme islemi tamamlanana kadar siparis kesinlesmez</li>
                <li>Stok durumuna gore siparisler iptal edilebilir</li>
                <li>Fiyatlar onceden bildirilmeksizin degistirilebilir</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Teslimat</h2>
              <p className="text-muted-foreground leading-relaxed">
                Siparisler ayni gun kargoya verilir ve 1-3 is gunu icinde teslim edilir. Teslimat 
                sureleri tahmini olup, kargo sirketinin isleyisine bagli olarak degisebilir. Kargo 
                Turkiye genelinde ucretsiztir.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Iade Politikasi</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                30 gun icinde kosulsuz iade hakkiniz bulunmaktadir:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Acilamis urunler de iade edilebilir</li>
                <li>Iade kargo ucreti tarafimizca karsilanir</li>
                <li>Para iadesi 3-5 is gunu icinde yapilir</li>
                <li>Iade talebi icin musteri hizmetlerimizle iletisime gecin</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Urun Bilgileri ve Sorumluluk Reddi</h2>
              <p className="text-muted-foreground leading-relaxed">
                Sitemizdeki urun bilgileri bilgilendirme amacidir ve tip tavsiyesi niteliginde degildir. 
                Urunlerimiz hastalik tedavisi veya onleme amacli degildir. Herhangi bir saglik sorununuz 
                varsa veya ilac kullaniyorsaniz, urunlerimizi kullanmadan once mutlaka doktorunuza danisin. 
                Hamilelik ve emzirme doneminde kullanim icin doktor kontrolu sart.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Fikri Mulkiyet</h2>
              <p className="text-muted-foreground leading-relaxed">
                Bu sitedeki tum icerik, tasarim, logo, metin, grafik ve diger materyaller Multilimit 
                mulkiyetindedir ve telif hakki ile korunmaktadir. Yazili izin olmadan kopyalanamaz, 
                dagitilmaz veya ticari amacla kullanilamaz.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Sinirli Sorumluluk</h2>
              <p className="text-muted-foreground leading-relaxed">
                Multilimit, sitedeki bilgilerin dogrulugu veya eksiksizligi konusunda garanti vermez. 
                Sitenin veya urunlerin kullanimindan kaynaklanan dogrudan veya dolayli zararlardan 
                sorumlu tutulamaz. Sorumlulugumuz, odenen urun bedeliyle sinirlidir.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Uygulanacak Hukuk</h2>
              <p className="text-muted-foreground leading-relaxed">
                Bu kosullar Turkiye Cumhuriyeti kanunlarina tabidir. Uyusmazlik halinde Istanbul 
                Mahkemeleri ve Icra Daireleri yetkilidir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Iletisim</h2>
              <p className="text-muted-foreground leading-relaxed">
                Kullanim kosullari hakkinda sorulariniz icin:
              </p>
              <ul className="list-none text-muted-foreground space-y-2 mt-4">
                <li>E-posta: legal@multilimit.com.tr</li>
                <li>Telefon: +90 (212) 123 45 67</li>
                <li>Adres: Levent, Istanbul, Turkiye</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
