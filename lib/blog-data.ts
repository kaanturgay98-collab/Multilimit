export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  date: string
  readTime: string
  tags: string[]
}

export const categories = [
  { name: 'Tum Yazilar', slug: 'all' },
  { name: 'Saglikli Yasam', slug: 'saglikli-yasam' },
  { name: 'Gunluk Rutin', slug: 'gunluk-rutin' },
  { name: 'Wellness', slug: 'wellness' },
  { name: 'Takviye Urunler', slug: 'takviye-urunler' },
  { name: 'Sabah Rutini', slug: 'sabah-rutini' },
  { name: 'Beslenme', slug: 'beslenme' },
]

export const blogPosts: BlogPost[] = [
  {
    slug: 'sabah-rutini-onerileri',
    title: 'Enerjik Bir Sabah Icin 5 Etkili Oneri',
    excerpt: 'Gune daha dinc ve motive baslamak icin uygulayabileceginiz pratik sabah rutini onerileri.',
    content: `
# Enerjik Bir Sabah Icin 5 Etkili Oneri

Sabahlar gununuzun gidisatini belirleyen en onemli zamanlardan biridir. Dogru bir sabah rutini ile gune daha enerjik ve odakli baslayabilirsiniz.

## 1. Erken Kalkma Aliskanligi

Erken kalkmak, gune sakin bir baslangic yapmanizi saglar. Acelesiz bir sabah, stres seviyenizi dusurur ve gune daha hazirlikli baslamaniza yardimci olur.

## 2. Su Tuketimi

Gece boyunca vucut susuz kalir. Sabah kalktığınızda ilk is olarak bir bardak su icmek, metabolizmanizi harekete gecirir.

## 3. Hafif Egzersiz

Sabah yapilan hafif egzersizler, kan dolasimini arttirir ve zihinsel berraklik saglar. 10-15 dakikalik bir esneme rutini bile fark yaratabilir.

## 4. Dengeli Kahvalti

Kahvalti, gununuzun en onemli ogunudur. Protein, lif ve saglikli yaglari iceren dengeli bir kahvalti, gun boyu enerji seviyenizi korur.

## 5. Gida Takviyeleri

Gunluk rutininize uygun gida takviyelerini eklemek, genel sagliginizi destekleyebilir. Multilimit Premium Detoks Kompleksi gibi premium urunler, sabah rutininizin bir parcasi olabilir.

---

*Bu yazi genel bilgilendirme amaclidir. Herhangi bir saglik sorununuz varsa, lutfen bir uzmana danisin.*
    `,
    category: 'Sabah Rutini',
    author: 'Multilimit Ekibi',
    date: '15 Mar 2026',
    readTime: '5 dk',
    tags: ['sabah rutini', 'enerji', 'saglikli yasam'],
  },
  {
    slug: 'dogal-takviyeler-rehberi',
    title: 'Dogal Takviyeler Hakkinda Bilmeniz Gerekenler',
    excerpt: 'Gida takviyeleri secerken dikkat edilmesi gereken onemli noktalar ve dogru kullanim onerileri.',
    content: `
# Dogal Takviyeler Hakkinda Bilmeniz Gerekenler

Gida takviyeleri, dengeli beslenmeyi desteklemek icin kullanilan urunlerdir. Dogru secim ve kullanim, bu urunlerden maksimum verim almanizi saglar.

## Gida Takviyesi Nedir?

Gida takviyeleri, vitamin, mineral, bitkisel ozler veya amino asitler gibi bilesenleri iceren urunlerdir. Bu urunler, gunluk beslenmenizi desteklemek icin tasarlanmistir.

## Kalite Kriterleri

Bir gida takviyesi secerken dikkat edilmesi gereken noktalar:

- **Uretim Standartlari**: GMP sertifikali tesislerde uretim
- **Icerik Seffafligi**: Acik ve anlasilir icerik listesi
- **Marka Guvenirliligi**: Kullanici yorumlari ve marka gecmisi
- **Ambalaj Kalitesi**: Urunun korunmasini saglayan ambalaj

## Dogru Kullanim

Gida takviyelerinden en iyi sekilde yararlanmak icin:

1. Onerileri dozaji asmayin
2. Duzenli kullanim saglayin
3. Saglik durumunuzu gozetin
4. Gerekirse uzmana danisin

---

*Bu urunler bir gida takviyesidir. Hastaliklari tedavi etmek, onlemek veya iyilestirmek icin kullanilamaz.*
    `,
    category: 'Takviye Urunler',
    author: 'Multilimit Ekibi',
    date: '12 Mar 2026',
    readTime: '7 dk',
    tags: ['takviye', 'dogal', 'saglik'],
  },
  {
    slug: 'wellness-trendleri-2026',
    title: '2026 Yilinin One Cikan Wellness Trendleri',
    excerpt: 'Bu yil saglikli yasam ve wellness alaninda dikkat ceken gelismeler ve trendler.',
    content: `
# 2026 Yilinin One Cikan Wellness Trendleri

Saglikli yasam ve wellness sektoru her gecen yil geliserek devam ediyor. 2026 yilinda dikkat ceken trendleri sizin icin derledik.

## 1. Kisisellestirilmis Saglik

Bireysel ihtiyaclara gore tasarlanmis saglik ve wellness cozumleri one cikiyor. Genetik ve yasam tarzi analizlerine dayali kisisel oneriler populerlesiyor.

## 2. Dogal ve Temiz Icerikler

Tuketiciler urunlerin icerigine daha fazla dikkat ediyor. Dogal, islenme orani dusuk icerikler tercih ediliyor.

## 3. Zihinsel Saglik Onceligi

Fiziksel saglik kadar zihinsel saglik da onem kazaniyor. Meditasyon, mindfulness ve stres yonetimi uygulamalari yayginlasiyor.

## 4. Surdurulebilirlik

Cevre dostu ambalajlar ve surdurulebilir uretim yontemleri tuketici tercihlerini etkiliyor.

## 5. Premium ve Kaliteli Urunler

Tuketiciler, daha az ancak daha kaliteli urunler tercih etme egiliminde. Premium segmentteki urunlere talep artiyor.

---

*Bu yazi genel bilgilendirme amaclidir.*
    `,
    category: 'Wellness',
    author: 'Multilimit Ekibi',
    date: '8 Mar 2026',
    readTime: '6 dk',
    tags: ['wellness', 'trendler', '2026'],
  },
  {
    slug: 'detoks-nedir',
    title: 'Detoks Kavrami ve Dogru Bilinen Yanlislar',
    excerpt: 'Detoks hakkinda merak edilenler ve yaygin yanlis bilgiler.',
    content: `
# Detoks Kavrami ve Dogru Bilinen Yanlislar

"Detoks" kelimesi sikca duyulan ancak cok farkli anlamlarda kullanilan bir terimdir. Bu yazida detoks kavramini ve yaygin yanlis bilgileri ele aliyoruz.

## Detoks Nedir?

Detoks, vucudun dogal aritma sureclerini ifade eder. Karaciger, bobrekler ve sindirim sistemi bu sureclerde onemli rol oynar.

## Yaygin Yanlislar

### "Detoks diyet yapmaliyim"

Agir kisitlamali diyetler genellikle gerekli degildir ve uzun vadede surdurulebilir olmayabilir.

### "Sadece sivilar tuketmeliyim"

Dengeli beslenme, genel saglik icin onemlidir. Sadece sivi tuketimi yerine, dengeli beslenme tercih edilmelidir.

### "Detoks urunleri sihirli cozumdur"

Hicbir urun tek basina mucizevi sonuclar saglamaz. Saglikli yasam tarzinin bir parcasi olarak degerlendirilmelidir.

## Saglikli Yaklasim

- Dengeli beslenme
- Yeterli su tuketimi
- Duzenli fiziksel aktivite
- Yeterli uyku
- Stres yonetimi

---

*Bu yazi genel bilgilendirme amaclidir. Herhangi bir saglik sorununuz varsa, bir uzmana danisin.*
    `,
    category: 'Saglikli Yasam',
    author: 'Multilimit Ekibi',
    date: '5 Mar 2026',
    readTime: '5 dk',
    tags: ['detoks', 'saglikli yasam', 'bilgi'],
  },
  {
    slug: 'gunluk-rutininizi-nasil-gelistirirsiniz',
    title: 'Gunluk Rutininizi Gelistirmenin 7 Yolu',
    excerpt: 'Verimli ve saglikli bir gun icin rutininizi nasil optimize edebilirsiniz?',
    content: `
# Gunluk Rutininizi Gelistirmenin 7 Yolu

Gunluk rutinlerimiz, yasam kalitemizi dogrudan etkiler. Kucuk degisikliklerle buyuk farklar yaratabilirsiniz.

## 1. Planlama Yapin

Her aksam, ertesi gunun planini yapin. Bu, sabah kararsizlik stresini azaltir.

## 2. Tutarli Uyku Duzeni

Her gun ayni saatte uyumak ve uyanmak, vucut ritminizi duzene sokar.

## 3. Onceliklendirin

Gununuzun en onemli gorevlerini belirleyin ve onlara oncelik verin.

## 4. Aralar Verin

Uzun sureli calisma yerine, duzenli aralar vermek verimliligi arttirir.

## 5. Hareket Edin

Gun icinde fiziksel aktivite icin zaman ayirin. Kisa yuruyusler bile faydalıdir.

## 6. Beslenmeye Dikkat Edin

Dengeli ogunler ve saglikli atistirmaliklar tercih edin.

## 7. Aksam Rutini Olusturun

Gun sonunda rahatlama rutini olusturmak, uyku kalitesini arttirir.

---

*Bu yazi genel bilgilendirme amaclidir.*
    `,
    category: 'Gunluk Rutin',
    author: 'Multilimit Ekibi',
    date: '1 Mar 2026',
    readTime: '4 dk',
    tags: ['rutin', 'verimlilik', 'gunluk yasam'],
  },
  {
    slug: 'saglikli-beslenme-temelleri',
    title: 'Saglikli Beslenmenin Temel Ilkeleri',
    excerpt: 'Dengeli ve saglikli beslenme icin temel bilgiler ve pratik oneriler.',
    content: `
# Saglikli Beslenmenin Temel Ilkeleri

Saglikli beslenme, genel sagliginizin temelini olusturur. Bu yazida temel ilkeleri inceliyoruz.

## Besin Gruplari

### Proteinler
Et, balik, yumurta, baklagiller ve sut urunleri protein kaynaklaridir.

### Karbonhidratlar
Tam tahillar, meyveler ve sebzeler saglikli karbonhidrat kaynaklaridir.

### Yaglar
Zeytinyagi, kuruyemisler ve balik saglikli yag kaynaklaridir.

### Vitaminler ve Mineraller
Cesitli meyve ve sebzeler tuketmek, vitamin ve mineral ihtiyacini karsilar.

## Pratik Oneriler

1. **Cositlilik**: Farkli besin gruplarından yiyin
2. **Porsigon Kontrolu**: Dengeli porsiyonlar tuketin
3. **Su**: Yeterli su icin
4. **İsenmemis Gidalar**: Dogal ve az islenmis gidalari tercih edin

---

*Bu yazi genel bilgilendirme amaclidir. Beslenme konusunda bir uzmana danismaniz onerilir.*
    `,
    category: 'Beslenme',
    author: 'Multilimit Ekibi',
    date: '25 Sub 2026',
    readTime: '6 dk',
    tags: ['beslenme', 'saglik', 'diyet'],
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  if (category === 'all') return blogPosts
  return blogPosts.filter((post) => post.category.toLowerCase().replace(/\s+/g, '-') === category)
}
