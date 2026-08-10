# talatkarasakal.com

Kişisel portfolyo sitesi. **[talatkarasakal.com](https://talatkarasakal.com)**

*Personal portfolio site. Scroll down for English.*

---

## Türkçe

Projeleri, sertifikaları ve deneyimi tek sayfada toplayan portfolyo sitesi.
Türkçe/İngilizce ve açık/karanlık tema desteği var; her proje kartında ekran
kayıtları ve ölçüm görsellerini açan bir medya paneli bulunuyor.

### Teknoloji

- React 19 + Vite
- Tek dosyalık veri güdümlü yapı: tüm projeler, sertifikalar, deneyim ve
  metinler `src/App.jsx` içindeki dizilerde tutulur, sayfa bunları döngüyle
  üretir
- CSS özel değişkenleriyle iki tema, medya sorgularıyla mobil düzen
- GitHub Actions ile otomatik derleme, GitHub Pages üzerinde yayın
- Cloudflare DNS, özel alan adı

### Performans

Sayfa ilk sürümde JSX'i tarayıcıda derliyordu ve ilk boyamadan önce yaklaşık
4 MB JavaScript indiriyordu. Vite ile ön derlemeye geçilerek bu **257 KB'a
(gzip 82 KB)** düşürüldü.

PageSpeed Insights, mobil: **Performans 98 · Erişilebilirlik 100 · En İyi
Uygulamalar 100 · SEO 100**. First Contentful Paint 1,7 sn · Largest
Contentful Paint 2,0 sn · Cumulative Layout Shift 0.

### Bazı uygulama detayları

- Kaydırma konumu React durumunda tutulmuyor; sürekli çalışan bir
  `requestAnimationFrame` döngüsü değeri yumuşatıp CSS özel değişkenine
  yazıyor, parallax katmanları oradan sürülüyor. Böylece kaydırma sırasında
  hiçbir bileşen yeniden render olmuyor.
- Deneyim bölümündeki S biçimli yol, kayıtların ölçülen yüksekliklerinden
  üretiliyor; metin uzunluğu değişse de kayıtlar üst üste binmiyor.
- Bölüm ayraçlarındaki hayvan figürleri (kurt, kartal, at, geyik) takımyıldız
  tarzında çizilmiş; LinkedIn banner'ıyla görsel bütünlük kuruyor.
- Diyalog panelleri odak tuzağı, Escape ile kapanma ve gövde kaydırma kilidi
  içeriyor.

### Geliştirme

```bash
npm install
npm run dev      # geliştirme sunucusu
npm run build    # dist/ üretir
npm run preview  # dist/ çıktısını yerelde sunar
```

İçerik değişikliği `src/App.jsx` içindeki `PROJECTS`, `CERTIFICATES`,
`EXPERIENCE`, `SKILLS` ve `COPY` dizilerinden yapılır. `dist/` klasörü her
derlemede baştan yazılır, elle düzenlenmez.

---

## English

A single-page portfolio collecting projects, certificates and experience.
It supports Turkish/English and light/dark themes, and each project card opens
a media panel with screen recordings and measurement images.

### Stack

- React 19 + Vite
- Data-driven single file: every project, certificate, experience entry and
  string lives in arrays inside `src/App.jsx`; the page renders from them
- Two themes via CSS custom properties, responsive layout via media queries
- Built and deployed automatically with GitHub Actions on GitHub Pages
- Cloudflare DNS, custom domain

### Performance

The first version compiled JSX in the browser and shipped roughly 4 MB of
JavaScript before first paint. Moving to a Vite build brought this down to
**257 KB (82 KB gzipped)**.

PageSpeed Insights, mobile: **Performance 98 · Accessibility 100 · Best
Practices 100 · SEO 100**. FCP 1.7 s · LCP 2.0 s · CLS 0.

### A few implementation notes

- Scroll position is kept out of React state. A single continuous
  `requestAnimationFrame` loop damps the value and writes it to a CSS custom
  property, which drives the parallax layers — so nothing re-renders while
  scrolling.
- The S-shaped road in the experience section is generated from the measured
  heights of each entry, so entries never overlap regardless of text length.
- The section dividers are constellation-style animal heads (wolf, eagle,
  horse, stag), matching the visual identity used elsewhere.
- Dialog panels include a focus trap, Escape-to-close and a body scroll lock.

### Development

```bash
npm install
npm run dev
npm run build
npm run preview
```

Content changes go in the `PROJECTS`, `CERTIFICATES`, `EXPERIENCE`, `SKILLS`
and `COPY` arrays in `src/App.jsx`. The `dist/` folder is regenerated on every
build and is not edited by hand.
