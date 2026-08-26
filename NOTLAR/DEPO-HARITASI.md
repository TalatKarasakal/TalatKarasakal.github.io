# Depo haritası

**Çıkarıldığı tarih:** 26 Ağustos 2026 · SITE-PLAN.md G1 çıktısı

## En önemli bulgu

Planın varsaydığı klasör yapısı **yok**. Site iki dosya:

| Dosya | Satır | İçindekiler |
|---|---|---|
| `src/App.jsx` | 1767 | Bütün veri dizileri, çeviri sözlüğü ve 27 bileşenin tamamı |
| `index.html` | 4071 | `<head>` meta etiketleri, JSON-LD, `@font-face` tanımları ve **CSS'in tamamı** (gömülü `<style>`) |

Ayrı veri dosyası, ayrı i18n sözlük dosyası, ayrı bileşen dosyası yok. `src/main.jsx` yalnızca 7 satırlık kök bağlama.

Sonuç: "hangi klasörde şu veri var" biçimindeki sorular geçersiz. Doğru soru "App.jsx'in hangi satır aralığında".

## Veri dizileri — `src/App.jsx`

| Ne | Satır | Kayıt |
|---|---|---|
| `PROJECTS` | 16 | 14 proje — 3 `featured`, 3 `project`, 8 `personal`; 6'sında `media` dizisi, 13'ünde `repoUrl` |
| `STATUS_LABELS` | 228 | `elendi` / `tamamlandi` / `devam`, TR+EN |
| `SKILLS` | 237 | 5 grup |
| `LANGUAGES` | 259 | 3 dil (İngilizce B2, Almanca A2, Fransızca başlangıç) |
| `CERTIFICATES` | 268 | 10 sertifika |
| `EXPERIENCE` | 309 | 5 kayıt |
| `SOCIALS` | 348 | 2 (GitHub, LinkedIn) |
| `EMAIL` / `GITHUB_URL` / `CV_URL` | 345-347 | `CV_URL` bilerek boş — dolana kadar İletişim'deki düğme render edilmiyor |

## Çeviri sözlüğü — `src/App.jsx`

`COPY` · **355-465**. Tek nesne, iki dil bloğu:
- `tr:` **356-411**
- `en:` **412-464**

Her iki blokta aynı anahtar kümesi bulunmalı. Sözlükte olmayan bir metin sayfada da yoktur.

Ayrıca veri dizilerinde alan düzeyinde çeviri var: `roleTr`/`roleEn`, `descTr`/`descEn`, `period`/`periodEn`, `decisionsTr`/`decisionsEn`, `outcomeTr`/`outcomeEn`. `*En` alanı yoksa taban alana düşülüyor.

**Dikkat:** `EXPERIENCE` ve `PROJECTS` tarihleri **serbest metin** (`period: "Eki 2024 – devam"`). Başlangıç/bitiş tarihi alanı, tarih tipi veya sıralama alanı yok. Diziler **elle sıralı** ve `EXPERIENCE` kronolojik değil.

## `<head>` ve meta etiketleri — `index.html`

- `<title>` · 7
- `<meta name="description">` · 8
- `<link rel="canonical">` · 11
- `og:` ve `twitter:` etiketleri · 13-15 ve 39-48
- **Person JSON-LD · 17** — tek blok. (26 Ağustos 2026'ya kadar iki çelişkili blok vardı, C1 ile tekilleştirildi.)
- Favicon bağlantıları · 49-53
- Gömülü `<style>` · iki blok: 57-567 (font tanımları) ve 568-4063 (sayfa stilleri)

Dil değişiminde `document.title` ve meta etiketleri `src/App.jsx:1676` civarındaki `lang` efektiyle güncelleniyor; metin `COPY[lang].seoTitle` / `seoDescription` / `ogDescription` anahtarlarından okunuyor.

## Duyarlı (responsive) davranışın kaynağı

İki ayrı mekanizma birlikte çalışıyor — biri değiştirilirken diğeri gözden kaçmamalı:

1. **JS bileşen değişimi** — `useMediaQuery` (`src/App.jsx:669`). Kritik eşik **900px**: `Projects` (980), `Certificates` (1362), `Experience` (1487) bu genişlikte tamamen farklı bileşen ağacı render ediyor.
2. **CSS medya sorguları** — `index.html`. Asıl içerik gizleme bloğu **640px** (3633). Ayrıca **yükseklik** tabanlı bloklar var (`max-height: 940px` / `700px`).

Masaüstü-mobil içerik farklarının tam listesi bu turda ayrı olarak raporlandı; hiçbiri değiştirilmedi.

## Ölçüm temeli

26 Ağustos 2026, `npm ci && npm run build` sonrası:

```
dist/assets/index-*.js   264.643 bayt ham   ·   83,55 kB gzip
dist/index.html          103,33 kB ham      ·   16,27 kB gzip
dist toplam              15 MB
```

**Boyut ölçütü `dist` toplamı DEĞİL.** `dist` 15 MB ve neredeyse tamamı statik medya (7,0 MB proje medyası + 6,8 MB sertifika görseli); JS iki katına çıksa bile toplamda görünmez. Ölçülecek şey `dist/assets/index-*.js`. `README.md`'de kayıtlı "257 KB (gzip 82 KB)" değeri de bu paketin boyutu.

## Komutlar

```bash
npm ci          # bağımlılıklar
npm run build   # üretim derlemesi -> dist/
npm run preview # derlenmiş çıktıyı localhost:4173'te sun
npm run lint    # oxlint
```

Yayın: `main` dalına push → `.github/workflows/deploy.yml` → GitHub Pages. Alan adı Cloudflare üzerinde, `public/CNAME` ile bağlı.

Temel lint durumu: **9 uyarı** (kullanılmayan `t` parametreleri, boş `catch (e)` blokları, iki `exhaustive-deps`). Yeni uyarı eklenmemeli.
