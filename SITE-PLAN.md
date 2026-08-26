# talatkarasakal.com — Bakım ve İyileştirme Planı

**Depo:** kişisel portföy sitesi (React + Vite + GitHub Pages + Cloudflare)
**Plan tarihi:** 26 Ağustos 2026
**Revizyon:** 26 Ağustos 2026 — plan koda göre düzeltildi, Faz 1 uygulandı
**Amaç:** Beş ayrı değerlendirme raporundan süzülen, doğrulanabilir eksikleri kapatmak. Yeni özellik eklemek değil, mevcut yapıdaki hataları ve boşlukları gidermek.

---

## Revizyon notu — bu planın nasıl düzeltildiği

Planın ilk sürümü siteye **dışarıdan** bakan beş değerlendirme raporundan süzüldü; depo kodunu görmedi. Kod okunduğunda görevlerin bir kısmının öncülü yanlış çıktı, bir kısmı zaten yapılmıştı ve iki doğrulama ölçütü bozuktu — biri hiç iş yapılmadan geçiyordu.

Düzeltilen her görevin altında **"Kod gerçeği"** başlıklı bir not var. Görev numaraları korundu ki eski referanslar bozulmasın.

Depo yapısının tam haritası: [`NOTLAR/DEPO-HARITASI.md`](NOTLAR/DEPO-HARITASI.md)
Talat'ın yazması gereken metinler: [`NOTLAR/ICERIK-BEKLEYEN.md`](NOTLAR/ICERIK-BEKLEYEN.md)
Masaüstü/mobil içerik farkı raporu: [`NOTLAR/MOBIL-MASAUSTU-FARKI.md`](NOTLAR/MOBIL-MASAUSTU-FARKI.md)

### Faz 1 durum tablosu

| Görev | Durum | Not |
|---|---|---|
| G1 — Depoyu tanı | **bitti** | `NOTLAR/DEPO-HARITASI.md` |
| G2 — Deneyim şeması | **kod tarafı gerekmedi** | Şema zaten devam eden kaydı destekliyor; içerik bekliyor |
| G3 — İki durumlu uygunluk | **kod tarafı bitti** | İçerik bekliyor |
| G4 — TEKNOFEST rozeti | **kapatıldı** | Öncülü yanlış, istenen metin zaten depoda |
| G5 — EN başlık ve meta | **kod tarafı bitti** | EN metni bekliyor |
| G6 — Sertifika `alt` metinleri | **kapatıldı** | İş zaten yapılmıştı |
| G7 — Kartlarda medya göstergesi | **ertelendi** | Masaüstünde zaten var; mobil kısmı Faz 2'ye |
| G8 — Lisans ve README | **Faz 3'e taşındı** | Bu deponun işi değil |
| **YENİ** — Çifte JSON-LD | **bitti** | Planda yoktu, kod okunurken bulundu |
| **YENİ** — Ölü kod | **bitti** | Planda yoktu |

---

## 0. Claude Code için çalışma kuralları

Bu bölümü göreve başlamadan önce oku ve tüm görevler boyunca uygula.

### 0.1 Sıra
Görevleri sırayla yap. Bir görev bitmeden sonrakine geçme. Bir görev bloke olursa (bilgi eksik, dosya bulunamadı, test geçmiyor) o görevi `NOTLAR/ICERIK-BEKLEYEN.md` dosyasına işleyip **bir sonrakine geç**, durma.

**Ama önce durum tablosuna bak.** Yukarıdaki tabloda "bitti" veya "kapatıldı" yazan bir görevi tekrar yapma; öncülünün neden geçersiz olduğu ilgili görevin altında yazıyor.

### 0.2 İçerik uydurma yasağı — en önemli kural
Bu sitedeki metinler bir iş başvurusu materyalidir ve her cümlesi mülakatta sorulabilir.

**Asla yapma:**
- Sitede olmayan bir deneyim, tarih, kurum adı, görev tanımı yazma.
- Sitede duran hiçbir sayıyı, metriği veya teknik iddiayı **değiştirme, yuvarlama veya yeniden ifade etme** (mAP değerleri, görüntü sayıları, süre ölçümleri, puanlar).
- "Daha iyi durur" diye proje açıklaması, özet cümlesi veya yetkinlik ifadesi yazma.
- İngilizce çeviri **üretme**. Bir metnin İngilizcesi çeviri sözlüğünde/dosyasında yoksa, o metni çevirme; not düş.

**Yapabileceğin:** mevcut metni taşımak, mevcut metni bir bileşenden diğerine geçirmek, HTML/JSX yapısını değiştirmek, mevcut veriden türetilen `alt` metni yazmak (örn. sertifika başlığı veri dosyasında zaten varsa).

Kural şu: **metnin kaynağı depoda yoksa, o metni sen yazmazsın.**

Bu kural bir kez fazladan işe yaradı: G4'ün "Talat yazmalı" dediği bağlam cümlesi aslında zaten depodaydı. Bir metnin eksik olduğunu varsaymadan önce **veri dizilerini oku**.

### 0.3 Not düşme prosedürü
Talat'ın yazması gereken her metin için `NOTLAR/ICERIK-BEKLEYEN.md` dosyasına aşağıdaki şablonla **ekleme yap** (dosyayı üzerine yazma, sona ekle).

```markdown
### [G{numara}] {kısa başlık}
- **Dosya:** {gerçek dosya yolu ve satır aralığı}
- **Nerede görünecek:** {sayfadaki bölüm / bileşen adı}
- **Gereken içerik:** {tam olarak hangi alanlar, hangi dillerde}
- **Neden gerekli:** {tek cümle}
- **Kod tarafı:** {hazır / hazır değil — hazırsa hangi alan boş bırakıldı}
- **Durum:** bekliyor
```

Kod tarafında bir alan hazırlaman gerekiyorsa, **canlıya boş/placeholder metin çıkmasın**. Yeni alanı `null`/`undefined` durumunda hiç render etmeyecek şekilde koşullu yaz. Sitede `TODO`, `{{...}}`, `Lorem ipsum` veya benzeri bir yer tutucu **görünmemeli**.

### 0.4 Commit
Her görev **tek bir commit**. Mesaj biçimi: `site: G3 — sertifika alt metinleri`. Görev not düşmeyle sonuçlandıysa commit mesajının sonuna `(içerik bekliyor)` ekle.

### 0.5 Doğrulama
Her görevden sonra sırayla:

1. `npm run build` — hata vermemeli.

2. **Paket boyutunu ölç** — `dist` klasörünün toplamını **değil**:
   ```bash
   ls -l dist/assets/index-*.js
   ```
   Temel değer: **264.643 bayt ham / 83,55 kB gzip** (26 Ağustos 2026). %10'dan fazla büyüme olursa commit etme, sebebini not et.

   > **Kod gerçeği:** Planın ilk sürümü "`dist` klasörünün toplam boyutu, hedef 257 KB civarı" diyordu. `du -sh dist` bugün **15 MB** veriyor ve neredeyse tamamı statik medya (7,0 MB proje medyası + 6,8 MB sertifika görseli). O ölçütle JS iki katına çıksa bile fark edilmezdi. 257 KB değeri aslında JS paketinin boyutu; `README.md` de bunu "257 KB (gzip 82 KB)" olarak kaydetmiş.

3. `npm run lint` — **yeni uyarı çıkmamalı.** Temel: 9 uyarı.

4. `npm run preview` ile siteyi aç, dokunduğun bölümün TR ve EN modda düzgün göründüğünü kontrol et.

5. Karanlık ve aydınlık temada, masaüstü ve mobil genişlikte kontrol et. **Mobil ayrı bir kontrol** — 900px altında bileşen ağacı tamamen değişiyor, masaüstünde doğru görünen şey mobilde farklı koddan geliyor.

### 0.6 Kapsam dışı — bu planda **yapılmayacak** işler
Aşağıdakiler bilinçli olarak dışarıda bırakıldı. Fikir olarak aklına gelse bile yapma, önerme, dosya oluşturma:

- İçerik yönetim mimarisi refaktörü (30 projeye ölçeklenen markdown/CMS yapısı).
- Canlı demo, REST API, Hugging Face Space kurulumu.
- Profil fotoğrafı alanı.
- Öne çıkan proje sayısını azaltma veya proje arşivi sayfası.
- Tasarım/renk/tipografi değişikliği. **Renk paletine, rozet renklerine ve tipografiye hiç dokunulmayacak** — mevcut hâlinde bir sorun yok.
- Görselleri yeniden boyutlandırma, yeniden kodlama veya sıkıştırma. Çözünürlükler zaten yüksek değil; bozulmayacak.
- **Masaüstü/mobil içerik paritesi değişiklikleri.** Farklar [`NOTLAR/MOBIL-MASAUSTU-FARKI.md`](NOTLAR/MOBIL-MASAUSTU-FARKI.md) dosyasında raporlandı; bir kısmı bilinçli olarak çıkarılmış. Hangisinin geri geleceğine Talat karar verir.
- `CV_URL` boş olduğu için görünmeyen CV düğmesini kaldırmak. **Kasıtlı**: PDF yüklendiğinde düğme kendiliğinden görünecek, koşullu render doğru çalışıyor (`src/App.jsx:1597`).
- `COPY` içindeki kullanılmayan `avail` anahtarına dokunmak.
- Yeni bağımlılık (dependency) ekleme — G9 hariç, orada da en hafif seçenek ve yalnızca `devDependencies`.

---

## 1. Faz 1 — Hatalı bilgi ve erişilebilirlik/SEO açıkları

Bu fazın tamamı uygulandı. Görsel tasarıma dokunulmadı.

---

### G1 — Depoyu tanı ve temel ölçümü al · **BİTTİ**
**Tür:** A

**Çıktı:** [`NOTLAR/DEPO-HARITASI.md`](NOTLAR/DEPO-HARITASI.md)

> **Kod gerçeği:** Planın "hangi klasörde veri dosyaları, hangi klasörde i18n sözlüğü" soruları geçersiz. **Ayrı klasör yok.** Site iki dosya: `src/App.jsx` (1767 satır — bütün veri dizileri, çeviri sözlüğü ve 27 bileşen) ve `index.html` (4071 satır — meta etiketleri, JSON-LD ve gömülü CSS'in tamamı). Doğru soru "hangi klasörde" değil, "App.jsx'in hangi satır aralığında".

---

### G2 — Deneyim veri yapısı · **KOD TARAFI GEREKMEDİ, İÇERİK BEKLİYOR**
**Tür:** B

**Bağlam:** Talat 24 Ağustos 2026'da zorunlu yaz stajına başladı. Site bunu göstermiyor; şu an "boşta" izlenimi veriyor. Bu, plandaki en yüksek öncelikli madde çünkü **eksik bilgi değil, güncel olmayan bilgi**. Bağlam geçerli.

> **Kod gerçeği:** Planın istediği şema işi diye bir şey yok. `EXPERIENCE`'da başlangıç/bitiş tarihi alanı **hiç yok**; tarihler `period` / `periodEn` serbest metni (`src/App.jsx:331`). Devam eden kayıt zaten destekleniyor ve dizide iki tanesi var: `"Eki 2024 – devam"` / `"Oct 2024 – present"`. Yani "bitiş tarihi `null` olduğunda devam ediyor göster" diye bir görev kurulamaz — kıyaslanacak tarih alanı yok.
>
> Planın **sormadığı** gerçek soru: `EXPERIENCE` elle sıralı ve kronolojik değil (Ağu 2025 → Oca 2026 → Tem 2024 → …). Otomatik sıralama yok, yani kayıt nereye konursa orada görünür.

**Kalan iş:** kaydın kendisi. Kurum, pozisyon, tarih, staj türü ve görev açıklaması `NOTLAR/ICERIK-BEKLEYEN.md` içindeki `[G2]` girdisinde, dizinin başına eklenmesi önerisiyle bekliyor.

---

### G3 — `open_to` / uygunluk satırını iki durumlu hâle getir · **KOD TARAFI BİTTİ, İÇERİK BEKLİYOR**
**Tür:** B

**Bağlam:** Hero kimlik kartında `açık — staj · Ekim 2026'dan itibaren` satırı var (`openLine`). Talat şu anda bir yerde çalışıyor **ve** Ekim 2026 için müsait. Tek satır bunu anlatamıyor. Bağlam geçerli.

**Yapıldı:** kimlik kartına, "konum" ile "açık" satırları arasına opsiyonel bir satır eklendi (`src/App.jsx:895`). Hem etiket (`spec.current`) hem değer (`currentLine`) çeviri sözlüğünde tanımlı olmadıkça **hiç render edilmiyor**. İkisi de tanımlı değil, dolayısıyla kart bugün birebir eskisi gibi: 6 satır, boş alan yok. Mevcut `openLine` metnine dokunulmadı.

**Kalan iş:** `[G3]` girdisi — etiket ve değer, TR + EN.

---

### G4 — TEKNOFEST rozeti · **KAPATILDI**
**Tür:** —

> **Kod gerçeği — iki ayrı öncül de yanlış:**
>
> **1. Renk iddiası.** Plan "rozet şu an kırmızı, arayüz dilinde kırmızı hata/tehlike demektir" diyordu. `.status-pill` karanlık temada — yani varsayılanda — **zaten nötr**: `color: var(--text-mute)`, `border: 1px solid var(--line-strong)` (`index.html:2060`). Renk yalnızca açık temada var (`index.html:831`) ve o da `--accent-1: #8E2433`, sitenin marka şarabı; `sec-rule` ve `tint-wine` aynı rengi kullanıyor. Üstelik aynı stil "Tamamlandı" ve "Devam ediyor" rozetlerine de uygulanıyor, yani elenmeye özel olumsuz bir sinyal yok. **Ayrıca renk paletine dokunmak artık açıkça kapsam dışı (0.6).**
>
> **2. "Talat yazmalı" iddiası.** Planın uzun uzun uyardığı bağlam cümlesi **zaten depoda**. p01'in `outcomeTr` alanı (`src/App.jsx:46`) elenme aşamasını ve geçilen aşamayı ayrı ayrı söylüyor: Ön Tasarım Raporu 85,67/100 ile geçildi, final aşamasında baraj puanı geçilemedi, plaka bölgesi doğru bulunuyordu ama OCR katmanı geçerli plaka metni üretemedi. Yani planın korktuğu "geçilen aşamanın yüksek puanını elenme etiketinin yanına koymak" hatası hiç yapılmamış; doğru ayrım zaten yazılmış.
>
> Yapılacak iş kalmadı.

---

### G5 — İngilizce modda sayfa başlığı ve meta açıklaması · **KOD TARAFI BİTTİ, EN METNİ BEKLİYOR**
**Tür:** B

**Bağlam:** Dil EN'e alındığında sayfa içeriği çevriliyor ama tarayıcı sekmesindeki başlık ve `<meta name="description">` Türkçe kalıyor.

> **Kod gerçeği:**
> - `html[lang]` **zaten** dil değişiminde güncelleniyordu (`src/App.jsx:1672`). Planın istediği bu kısım yapılmıştı.
> - Planın gerekçesi kısmen hatalı: "arama motoru ve paylaşım önizlemesi bu ikisini okur". Paylaşım önizlemesini üreten tarayıcılar (LinkedIn, WhatsApp, Twitter) **JavaScript çalıştırmaz**; yalnızca statik HTML'i okurlar. Dolayısıyla `og:` etiketlerini bir JS efektiyle güncellemenin paylaşım önizlemesine **bugün hiç etkisi yok**. Efektin gerçek kazancı sekme başlığı ve JS çalıştıran arama motorları. Önizleme sorunu **G9'un işi**.

**Yapıldı:** mevcut `lang` efekti genişletildi (`src/App.jsx:1672` civarı). `document.title`, `meta[name="description"]`, `og:title`, `og:description`, `twitter:title`, `twitter:description` ve `og:locale` çifti güncelleniyor. Metinler `COPY[lang]`'dan okunuyor; TR değerleri `index.html`'deki mevcut etiketlerden birebir taşındı (`og:description` meta açıklamasından farklı olduğu için ayrı anahtar). Karşılığı olmayan alan **hiç değiştirilmiyor**, yani EN modda etiketler bugünkü değeriyle kalıyor ve boş değer oluşmuyor.

`og:` etiketleri de güncelleniyor çünkü G9 tamamlandığında ön render bu değerleri statik HTML'e işleyecek; o noktada paylaşım önizlemesi de düzelecek.

**Kalan iş:** `[G5]` girdisi — `seoTitle`, `seoDescription`, `ogDescription`, yalnızca İngilizce.

---

### G6 — Sertifika görsellerinin alt metinleri · **KAPATILDI**
**Tür:** —

> **Kod gerçeği:** Planın "ekran okuyucu kullanan biri sertifika bölümünü tamamen kaçırıyor" iddiası doğru değil. Bölüm zaten erişilebilir:
> - Sertifika adı, tarihi ve veren kurum **gerçek metin** olarak render ediliyor (`cert-name` / `cert-date` / `cert-issuer`, `src/App.jsx:1391`).
> - Kart, `aria-label={name}` taşıyan bir `button`.
> - Panelde açılan büyük görselde `alt={cert.alt}` var, değeri sertifika adı (`src/App.jsx:1433`).
> - Proje medyasında `alt` zaten altyazıdan türetiliyor (`src/App.jsx:1170`).
>
> Küçük thumbnail'deki `alt=""` **doğru olan**: görsel, hemen yanındaki görünür metni tekrarlıyor ve kartın erişilebilir adı `aria-label`'dan geliyor. WCAG'a göre burada boş `alt` istenen davranış; doldurmak ekran okuyucuda aynı bilgiyi iki kez okutur.
>
> Kalan boş `alt`'lar dekoratif hayvan görselleri; biri `aria-hidden="true"` bir kapsayıcının içinde. Yapılacak iş yok.

---

### G7 — Proje kartlarında medya olduğunu belli et · **ERTELENDİ**
**Tür:** A

> **Kod gerçeği:** Masaüstü tarafı **zaten yapılmış**. `MediaButton` var ve tam da planın istediği gibi `project.media && project.media.length > 0` koşuluyla render ediliyor (`src/App.jsx:1303`) — medyası olmayan kartta görünmüyor. Plan olduğu gibi uygulanırsa masaüstünde **ikinci** bir gösterge eklenmiş olur.
>
> Gerçek boşluk daha dar: 900px altında `CompactProjectRow` render ediliyor ve o satırda medya ipucu yok. Medyanın kendisi mobilde erişilebilir durumda — `ProjectSheet` medyayı `MediaList` ile panelin içinde gösteriyor, hatta masaüstünden daha doğrudan. Eksik olan yalnızca satırdaki **ipucu**.
>
> Bu bir mobil görünüm değişikliği olduğu için 0.6 gereği bu tur yapılmadı. Faz 2'ye taşındı.

---

### G8 — Öne çıkan depolara lisans ve README · **FAZ 3'E TAŞINDI**

> **Kod gerçeği:** Bu görev **bu deponun işi değil**. `PROJECTS` içinde 13 ayrı `repoUrl` var; görev o depolara dokunuyor. Bu yüzden:
> - 0.4'ün "tek görev = tek commit" kuralı uygulanamaz (13 depoda ~26 dosya).
> - 0.5'in `npm run build` ve paket boyutu doğrulaması hiç uygulanamaz.
>
> İçeriği geçerli, yeri yanlış. Faz 3'e taşındı.

---

## 2. Faz 2 — Staj bitince (18 Eylül sonrası)

Bu fazdaki işler daha risklidir ve tek oturumda bitmez. Faz 1 tamamlanıp canlıya alınmadan başlama.

---

### G9 — Ön render (prerender): botların boş sayfa görmesini durdur
**Tür:** A

**Bağlam:** Vite SPA çıktısında `index.html` pratikte boş bir kök `<div>`. JavaScript çalıştırmayan her ziyaretçi — Bing, DuckDuckGo, bazı tarama araçları, **bütün paylaşım önizleme tarayıcıları** ve işe alımcıların adayı özetletmek için kullandığı yapay zekâ araçları — sayfayı boş görüyor. Google JS çalıştırdığı için indeksleme muhtemelen sorunsuz; asıl kayıp diğer kanallarda.

Bu görev G5'in yarım kalan tarafını da tamamlıyor: ön render sonrası `og:` etiketleri statik HTML'e işleneceği için paylaşım önizlemesi ilk kez doğru çalışacak.

**Yapılacak:**
- Derleme sonrası statik HTML üreten bir çözüm entegre et. Kriter: GitHub Pages ile uyumlu, sunucu gerektirmiyor, bundle boyutunu **çalışma zamanında** büyütmüyor (yalnızca `devDependencies`).
- Seçtiğin kütüphaneyi ve **neden onu seçtiğini** `NOTLAR/KARARLAR.md` dosyasına yaz: değerlendirdiğin alternatifler, son bakım tarihleri, elemeyi hangi kriterle yaptın. Bu not mülakatta savunulabilir olmalı.

> **Kod gerçeği — kütüphane seçimini kısıtlayan iki engel:**
>
> **1. Node'da render patlar.** Şu başlatıcılar render sırasında çalışıyor ve tarayıcı API'si istiyor:
> - `useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches)` — `src/App.jsx:659`
> - `useState(() => window.matchMedia(query).matches)` — `src/App.jsx:670`
> - `useState(() => localStorage.getItem("tk-theme"))` ve dil karşılığı — `src/App.jsx:1643` civarı
>
> Yani `react-dom/server` ile düz `renderToString` çalışmaz. Ya bu başlatıcılar `typeof window === "undefined"` ile korunacak (kaynak kodu değiştirmek), ya da **gerçek bir tarayıcı motoru kullanan** bir ön render seçilecek (kaynak kodu değiştirmemek). İkincisi tercih edilmeli: kod dokunulmadan kalır ve çıktı canlı sayfayla birebir aynı olur.
>
> **2. Ön render tek bir kırılma noktasını dondurur.** `useMediaQuery("(max-width: 900px)")` yüzünden çıktı ya masaüstü ya mobil bileşen ağacını içerecek. **Masaüstü varyantı seçilmeli** — içeriği belirgin biçimde fazla (kararlar, sonuç, tüm etiketler kartta açık). Ön render genişliği 1280px veya üstü olmalı.

**Bitti sayılır (ölçülebilir kriter):**
```bash
npm run build
grep -c "Sınav Planlama ve Yönetim Sistemi" dist/index.html   # 0'dan büyük olmalı
```

> **Kod gerçeği:** Planın ilk sürümündeki kriter `grep -c "Projects" dist/index.html` idi ve **hiç iş yapılmadan geçiyordu** — gömülü CSS'te `/* ---------- Projects ---------- */` yorumu var, grep onu buluyordu. Ölçüt, sayfanın gövdesinde geçen ve başka hiçbir yerde bulunmayan bir dizge olmalı; yukarıdaki proje başlığı bu koşulu sağlıyor.

Ayrıca `dist/assets/index-*.js` boyutu 0.5'teki temel değerden büyük olmamalı.

---

### G10 — İngilizce için ayrı adres ve `hreflang`
**Tür:** A

**Bağlam:** Dil değişimi sadece JS durumu; ayrı bir URL yok. Bu durumda İngilizce sürüm ne ayrı indekslenebiliyor ne de link olarak paylaşılabiliyor — "portföyümün İngilizcesi" diye gönderilecek bir adres yok.

**Yapılacak:**
- `/` (TR) ve `/en/` (EN) olacak şekilde yönlendirme kur.
- `<link rel="alternate" hreflang="tr" ...>` ve `hreflang="en"` etiketlerini ekle, `x-default` TR olsun.
- GitHub Pages'te istemci tarafı yönlendirme derin bağlantılarda 404 verir; `404.html` yönlendirme çözümünü uygula veya ön render ile her iki dili de gerçek dosya olarak üret. **G9 tamamlanmadan bu göreve başlama.**
- Dil değiştirme düğmesi artık adresi de değiştirsin, sayfa konumu (scroll) korunsun.

**Ön koşul:** G5'in İngilizce metinleri (`[G5]` notu) yazılmış olmalı. Aksi hâlde `/en/` sayfası Türkçe başlık ve açıklamayla yayına çıkar — ayrı URL'nin bütün kazancı bu iki etikette.

**Bitti sayılır:** `/en/` doğrudan açıldığında İngilizce içerik geliyor, iki adres birbirine `hreflang` ile bağlı, tarayıcıda geri düğmesi dil geçişlerinde çalışıyor.

---

### G11 — Vaka analizi (case study) iskeleti — tek proje
**Tür:** B (içeriğin tamamı Talat'tan)

**Bağlam:** Dört ayrı değerlendirme, sitedeki *"Being able to explain why a system is built the way it is, is harder and worth more than getting it to run."* cümlesini en güçlü ifade olarak işaretledi. Ama bu bir vaat ve sitede karşılığı yok. Teknik mülakatta bu cümleyi okuyan kişi ilk olarak onu test eder.

**Yapılacak:**
- **Tek** bir proje için (TEKNOFEST YOLOv8 hattı) ayrı bir detay sayfası/rotası oluştur. Şablon dört başlıklı olsun: **Problem / Değerlendirilen Seçenekler / Karar ve Gerekçe / Sonuç ve Çıkarılan Ders**.
- Sayfa yapısı, tipografisi ve navigasyonu hazır olsun; içerik alanları veri dosyasından gelsin.
- **Metnin tek satırını yazma.** İçerik boşken sayfa rotası da yayına çıkmasın (yönlendirme kapalı kalsın veya bağlantı render edilmesin).

> **Not:** p01'in `decisionsTr` ve `outcomeTr` alanları bu dört başlığın "Karar ve Gerekçe" ile "Sonuç" kısımlarına hazır malzeme sağlıyor — dört veri seti kararı ve ölçüm sonuçları zaten yazılmış durumda. Bunlar **taşınabilir** (0.2 gereği serbest). Yeni yazılması gereken kısım Problem ve Değerlendirilen Seçenekler.

**Not düşülecek içerik:** dört başlığın her biri için Talat'ın yazacağı metin; ayrıca her teknik iddianın yanına hangi commit/rapor/ölçüm dosyasına bağlanacağı.

**Bitti sayılır:** şablon ve rota hazır, hiçbir yerde yer tutucu metin görünmüyor, `[G11]` notu düşülmüş.

---

### G12 — Ziyaretçi ölçümü
**Tür:** A

**Bağlam:** Sayfa hızı ölçülmüş durumda (98/100/100/100). Ölçülmeyen şey ziyaretçi davranışı: kaç kişi geliyor, hangi bölümde bırakıyor, proje kartlarına tıklıyor mu. Bu veri olmadan "içerik çok uzun mu" tartışması tahmin olarak kalıyor.

Bu ölçüm ayrıca [`NOTLAR/MOBIL-MASAUSTU-FARKI.md`](NOTLAR/MOBIL-MASAUSTU-FARKI.md) dosyasındaki kararları da besler: mobil ziyaretçi oranı bilinmeden hangi içeriğin telefonda geri gelmesi gerektiği tahminden ibaret.

**Yapılacak:**
- Cloudflare Web Analytics ekle (çerezsiz, ücretsiz, ek bundle maliyeti yok). Alan adı zaten Cloudflare üzerinde.
- Çerez kullanmadığı için çerez bildirimi (cookie banner) **ekleme**.

**Bitti sayılır:** analitik betiği canlıda çalışıyor, PageSpeed skoru düşmedi.

---

### G7-mobil — Mobil proje satırında medya göstergesi
**Tür:** A

G7'den ayrılan kısım. 900px altındaki `CompactProjectRow`'a, medyası olan projeler için sessiz bir gösterge ekle (`src/App.jsx:1047` civarı). Masaüstündeki `MediaButton`'a dokunma — orada zaten var.

**Ön koşul:** 0.6'daki mobil içerik dokunulmazlığının Talat tarafından kaldırılması. [`NOTLAR/MOBIL-MASAUSTU-FARKI.md`](NOTLAR/MOBIL-MASAUSTU-FARKI.md) dosyasındaki kararlar verilmeden başlanmamalı.

---

## 3. Faz 3 — Depo dışı işler

### G8 — Öne çıkan depolara lisans ve README
**Tür:** A (README iskeleti) / B (proje açıklama metni)

**Bağlam:** İncelenen depolarda lisans dosyası yok. Lisanssız bir depo teknik olarak "tüm hakları saklıdır" demektir; işe alımcı kodu inceleyip inceleyemeyeceğini bilemez. README eksikliği de aynı sürtünmeyi yaratır.

**Yapılacak (yalnızca sitede öne çıkan ve Talat'a ait olan depolar için — fork'lanmış grup depolarına dokunma):**
- MIT lisans dosyası ekle (telif satırı: `Copyright (c) 2026 Talat Karasakal`).
- README iskeleti oluştur: başlık, tek cümlelik ne işe yaradığı, teknoloji listesi, kurulum adımları, çalıştırma komutu, test komutu, bilinen sınırlamalar, lisans.
- **Kurulum/çalıştırma/test komutlarını depodaki gerçek yapıdan çıkar** (`package.json`, `pom.xml`, `build.gradle`, `requirements.txt`). Bulamadığını uydurma, o başlığı boş bırakıp not düş.
- Proje açıklaması ve bilinen sınırlamalar bölümü için, sitedeki mevcut proje metnini **kaynak olarak kullanabilirsin** (Talat'ın kendi yazdığı metin). Sitede karşılığı yoksa not düş.

**Hedef depolar:** `PROJECTS` içindeki 13 `repoUrl`. Hangilerinin Talat'a ait olduğu, hangilerinin grup çalışması olduğu **başlamadan önce** teyit edilmeli.

**Bu depoda yapılacak iş yok.** Her hedef depo kendi commit'ini alır; 0.4 ve 0.5 kuralları burada uygulanmaz.

---

## 4. Planda olmayıp kod okunurken bulunan ve yapılan işler

### Çifte Person JSON-LD · **BİTTİ**

`index.html` iki ayrı `Person` JSON-LD bloğu taşıyordu — biri `<head>` başında `alumniOf` ile, diğeri `</head>` öncesinde `affiliation` ile. Çelişiyorlardı: `url` birinde sonda `/` içeriyordu diğerinde içermiyordu, `knowsAbout` listeleri ve büyük harf kullanımı farklıydı, `address` biri eksikti.

Tek bloğa indirildi. Alanlar birleştirildi, yeni iddia üretilmedi: `image` ve `description` ikinci bloktan taşındı, `address`'in daha eksiksiz hâli (İzmir + TR) alındı, `knowsAbout` birleşimi tek biçime getirildi, kurum alanı olarak `alumniOf` korundu.

Doğrulama: `grep -c '"@type": "Person"' dist/index.html` → **1** (önce 2).

### Ölü kod · **BİTTİ**

- `AnimalGlyph` tanımlıydı ama hiçbir yerden çağrılmıyordu; `Divider` görseli doğrudan `<img>` ile kuruyor. `oxlint` bunu bildiriyordu.
- Aynı satırlardaki `__R` hep boş bir nesneydi ve hiçbir yerde doldurulmuyordu, dolayısıyla `ANIMAL_IMAGES` içindeki her erişim zaten yedek dizgeye düşüyordu. Dolaylı katman kaldırıldı, davranış birebir aynı.

Lint uyarısı 10'dan 9'a düştü.

### Raporlandı ama dokunulmadı

Bunlar davranış değiştirme riski taşıyor veya Talat'ın kararını gerektiriyor:

- **Masaüstü/mobil içerik farkları** — [`NOTLAR/MOBIL-MASAUSTU-FARKI.md`](NOTLAR/MOBIL-MASAUSTU-FARKI.md). Kasıtlı gibi durmayan iki madde var: `ProjectSheet`'te eksik olan `project.category` ve mobil panele taşınmamış `.nav-cta`.
- **Ölü CSS:** `.exp-row-wrap` için `@media (max-width: 900px)` kuralları (`index.html:2886` civarı) hiç uygulanmıyor — o genişlikte JS `CompactExpRow` render ediyor, `exp-row-wrap` DOM'da yok.
- **Tekrarlı CSS:** üç ayrı `@media (max-width: 900px)` bloğu (`index.html:3961`, `4003`, `4024`) aynı `.nav-panel` / `.nav-inner` kurallarını `!important` ile üst üste yazıyor. Birleştirilebilir.
- **Ölü i18n anahtarı:** `avail` (`src/App.jsx:408` ve `461`) tanımlı, hiçbir yerde render edilmiyor. 0.6 gereği dokunulmadı.
- Kalan 9 lint uyarısı: kullanılmayan `t` parametreleri, boş `catch (e)` blokları, iki `exhaustive-deps`.

---

## 5. Faz 1 sonu — teslim kontrol listesi

Faz 1 tamamlandı. Sonuç özeti [`NOTLAR/ICERIK-BEKLEYEN.md`](NOTLAR/ICERIK-BEKLEYEN.md) dosyasının başında.

- [x] `npm run build` temiz geçiyor; `dist/assets/index-*.js` **264.643 bayt** (temel 263.620, artış %0,4 — eşik %10).
- [x] `npm run lint` — 9 uyarı, temel 10 idi; yeni uyarı yok.
- [x] Site TR ve EN modda, açık ve koyu temada, masaüstü ve mobil (375px) genişlikte kontrol edildi. Konsol hatası yok.
- [x] Hiçbir yerde yer tutucu metin, boş alan veya kırık düzen yok. Kimlik kartı hâlâ 6 satır.
- [x] Bilgi taşıyan görsellerde `alt` metni var — G6'da açıklandığı gibi bu iş zaten yapılmıştı.
- [x] `NOTLAR/ICERIK-BEKLEYEN.md` içinde Talat'ın yazması gereken her madde, gerçek dosya yolu ve gereken alan listesiyle duruyor.
- [x] Sitedeki hiçbir sayı, metrik veya teknik iddia değişmedi (`git diff` üzerinden kontrol edildi).
