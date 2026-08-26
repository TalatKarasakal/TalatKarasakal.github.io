# İçerik bekleyen maddeler

Bu dosyadaki metinleri **Talat yazar**. Kod tarafı hazır; alan boş olduğu sürece sayfada hiçbir şey görünmüyor, yer tutucu da çıkmıyor.

---

## Faz 1 teslim özeti — 26 Ağustos 2026

- [x] `npm run build` temiz geçiyor.
- [x] Paket boyutu: **264.643 bayt ham / 83,55 kB gzip**. G1 temeli 263.620 bayt idi; artış **%0,4** (eşik %10).
- [x] Lint: **9 uyarı** — temel 10 idi, C5 bir uyarıyı kaldırdı. Yeni uyarı yok.
- [x] Person JSON-LD: `dist/index.html` içinde artık **1** blok (önce 2 çelişkili blok vardı).
- [x] Site TR ve EN modda, açık ve koyu temada, masaüstü ve mobil genişlikte kontrol edildi. Konsol hatası yok.
- [x] Hiçbir yerde yer tutucu metin, boş alan veya kırık düzen yok. Kimlik kartı hâlâ 6 satır.
- [x] Sitedeki hiçbir sayı, metrik veya teknik iddia değişmedi (`git diff` ile doğrulandı).
- [x] Bilgi taşıyan görsellerde `alt` metni var — bu iş zaten yapılmıştı, ayrıntı SITE-PLAN G6'da.

**Bu turda bilinçli olarak yapılmayanlar:** renk değişikliği, görsel yeniden boyutlandırma, masaüstü-mobil içerik paritesi değişiklikleri (ayrıca raporlandı, karar Talat'ta), `avail` anahtarına dokunma, `CV_URL` düğmesini kaldırma.

---

### [G2] Zorunlu yaz stajı kaydı

- **Dosya:** `src/App.jsx` — `EXPERIENCE` dizisi, satır 309. Yeni kayıt **dizinin başına**, satır 310'a girecek.
- **Nerede görünecek:** Deneyim bölümü. Masaüstünde `exp-row-wrap` (yol şeridi üzerindeki kart), 900px altında `CompactExpRow` → `ExperienceSheet`. İki tarafta da ek kod gerekmiyor.
- **Gereken içerik:** tek bir nesne, şu alanlarla:
  - `roleTr` / `roleEn` — pozisyon başlığı
  - `orgTr` / `orgEn` — kurum adı (varsa birim adı `·` ile)
  - `period` / `periodEn` — **serbest metin.** Devam eden kayıt için mevcut biçim: `"Ağu 2026 – devam"` / `"Aug 2026 – present"`. Staj 18 Eylül'de bitince `"Ağu – Eyl 2026"` / `"Aug – Sep 2026"` olarak güncellenir.
  - `descTr` / `descEn` — 2-3 maddelik görev açıklaması, mevcut kayıtlarla aynı üslupta düz paragraf. Staj türünün (zorunlu yaz stajı) burada belirtilmesi yerinde olur.
- **Neden gerekli:** 24 Ağustos 2026'da başlayan staj sitede hiç görünmüyor; bu eksik bilgi değil, **güncel olmayan bilgi** — site şu an "boşta" izlenimi veriyor.
- **Kod tarafı:** **hazır, hiç değişiklik gerekmedi.** Şema zaten devam eden kaydı destekliyor: tarihler serbest metin ve dizide hâlihazırda iki `"– devam"` kaydı var. Planın öngördüğü "bitiş tarihi `null` olunca devam ediyor göster" işi diye bir şey yok, çünkü tarih alanı hiç yok.
- **Dikkat — sıralama:** `EXPERIENCE` elle sıralı ve **kronolojik değil** (Ağu 2025 → Oca 2026 → Tem 2024 → Eki 2024 → Eki 2024). Otomatik sıralama yok, yani kaydı nereye koyarsan orada görünür. Devam eden ve en güncel kayıt olduğu için **başa** öneriliyor.
- **Durum:** bekliyor

---

### [G3] Kimlik kartındaki "şu anda" satırı

- **Dosya:** `src/App.jsx` — iki yere anahtar eklenecek: `COPY.tr.spec` (satır 374) ve `COPY.en.spec` (satır 427) içine `current`; `COPY.tr` (356-411) ve `COPY.en` (412-464) köküne `currentLine`. Render kodu satır 895-897'de hazır.
- **Nerede görünecek:** Hero bölümündeki KİMLİK / IDENTITY kartı (`spec-list`), "konum" ile "açık" satırları arasında.
- **Gereken içerik:** dört dize:
  - `spec.current` — alan etiketi, TR + EN. Komşularıyla aynı üslupta olmalı: küçük harf, tek kelime (mevcutlar: `kullanıcı`, `rol`, `üniversite`, `odak`, `konum`, `açık` / `handle`, `role`, `university`, `focus`, `location`, `open_to`).
  - `currentLine` — değer, TR + EN. Tek satır, kısa; şu anda nerede çalışıldığını söyler.
- **Neden gerekli:** karttaki `openLine` yalnızca ileriye dönük müsaitliği anlatıyor ("staj · Ekim 2026'dan itibaren"); şu anda bir yerde çalışıldığı bilgisini tek satır anlatamıyor.
- **Kod tarafı:** **hazır.** Satır boş bırakıldı: `{t.spec.current && t.currentLine && ...}` — iki anahtardan biri eksikse satır hiç render edilmiyor. Bugün ikisi de yok, dolayısıyla kart birebir eskisi gibi (6 satır). Etiketi ben yazmadım çünkü mevcut `nowTag` ("ŞİMDİ" / "NOW") büyük harf ve komşu etiketlerin üslubuna uymuyor; CSS ile küçültmek de Türkçe "İ" harfinde bozuk çıktı verir.
- **Durum:** bekliyor

---

### [G5] İngilizce SEO metinleri

- **Dosya:** `src/App.jsx` — `COPY.en` bloğu, satır 416'daki açıklama notunun yerine. TR karşılıkları satır 364-366'da duruyor.
- **Nerede görünecek:** Sayfa içeriğinde değil: tarayıcı sekmesi başlığı, `<meta name="description">`, `og:title`, `og:description`, `twitter:title`, `twitter:description`.
- **Gereken içerik:** üç dize, yalnızca İngilizce:
  - `seoTitle` — sekme başlığı ve `og:title` / `twitter:title`. TR karşılığı: *"Talat Karasakal — Bilgisayar Mühendisliği Öğrencisi"*
  - `seoDescription` — `<meta name="description">`. TR karşılığı: *"Talat Karasakal — İzmir Ekonomi Üniversitesi bilgisayar mühendisliği öğrencisi. TEKNOFEST nesne tespiti hattı, Java masaüstü uygulamaları ve bilgisayarlı görü projeleri."*
  - `ogDescription` — `og:description` / `twitter:description`. **Meta açıklamasından farklı**, o yüzden ayrı anahtar. TR karşılığı: *"TEKNOFEST nesne tespiti hattı, Java masaüstü uygulamaları ve bilgisayarlı görü projeleri. İzmir Ekonomi Üniversitesi."*
- **Neden gerekli:** EN modda sayfa çevriliyor ama sekme başlığı ve meta açıklaması Türkçe kalıyor; JS çalıştıran arama motorları İngilizce sayfayı Türkçe başlıkla görüyor.
- **Kod tarafı:** **hazır.** Efekt `src/App.jsx:1676` civarında; anahtar yoksa ilgili etiketi **hiç değiştirmiyor**, yani şu anda EN modda etiketler `index.html`'deki Türkçe değeriyle kalıyor. Boş değer oluşmuyor, gerileme yok.
- **Not:** Bu üç metin yazıldığında bile paylaşım önizlemesi (LinkedIn, WhatsApp, Twitter) düzelmez — o tarayıcılar JavaScript çalıştırmıyor ve yalnızca statik HTML'i okuyor. Önizleme ancak SITE-PLAN G9 (ön render) tamamlandığında düzelir; o zaman bu değerler statik HTML'e de işlenir.
- **Durum:** bekliyor
