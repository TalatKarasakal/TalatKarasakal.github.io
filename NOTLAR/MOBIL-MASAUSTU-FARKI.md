# Masaüstü / mobil içerik farkı

**Çıkarıldığı tarih:** 26 Ağustos 2026
**Durum:** rapor. **Hiçbir maddesi değiştirilmedi.** Neyin kasıtlı, neyin gözden kaçmış olduğuna Talat karar verecek.

Farklar üç kaynaktan geliyor:

1. `index.html` içindeki CSS medya sorguları
2. `src/App.jsx` içindeki `useMediaQuery` bileşen değişimleri
3. Veri kırpma (`slice`, `excerpt`)

Kırılma noktaları: **≤1180px** nav daralır · **≤1100/1024px** yalnızca düzen · **≤900px** bileşen değişimi (asıl kırılma) · **≤640px** CSS ile içerik gizleme · **yükseklik ≤940/700px** ayrı bir eksen.

---

## 1. Mobilde tamamen görünmeyen içerik

### CSS ile bilinçle gizlenmiş görünenler

Hepsi `index.html:3633` içindeki tek bir `@media (max-width: 640px)` bloğunda, elle yazılmış `display: none` kuralları:

| İçerik | Kaynak | Not |
|---|---|---|
| `t.bio` — hero'daki iki cümlelik tanıtım | `src/App.jsx:867` | `.hero-bio`. About bölümündeki metinlerden **ayrı** bir içerik, yani telefonda karşılığı yok |
| `t.cta` — "Staja açık" üst bar düğmesi | `src/App.jsx:767` | `.nav-cta`. Aşağıya bakın — bu muhtemelen gözden kaçmış |
| `s.handle` — `@TalatKarasakal`, `/in/talat-karasakal` | `src/App.jsx:1609` | `.social-handle`. Etiketler (GitHub/LinkedIn) ve bağlantılar duruyor, kayıp hafif |
| `t.marquee` — YAPAY ZEKÂ · BİLGİSAYARLI GÖRÜ · … | `src/App.jsx:907` | `.hero-marquee`. JSX'te `aria-hidden="true"`, yani zaten dekoratif işaretlenmiş |

Tamamen dekoratif olduğu için listeye alınmayanlar (aynı blok): `.hero-tail`, `.divider-figure`, `.atm-blob`, `.sec-rule`, ikinci `.divider-rule`.

### Kasıtlı gibi durmayan iki madde

Bunlar CSS gizlemesi değil, **asimetri**:

1. **`project.category`** — masaüstü `ProjectCard`'da `pcard-tag` olarak var (`src/App.jsx:1289`, örn. "Bilgisayarlı Görü"), ama 900px altında açılan `ProjectSheet` (`src/App.jsx:1093`) bu alanı **hiç render etmiyor**. Sonuç: telefonda proje kategorisi hiçbir yerde görünmüyor. Tarayıcıda doğrulandı.

2. **`.nav-cta`** — gizlenmiş, ama mobil menü panelinde karşılığı konmamış. Dil ve tema düğmeleri panele taşınmış (`index.html:3967`), bu üçüncü düğme taşınmamış. Sonuç: telefonda müsaitlik sinyali üst bardan tamamen kayboluyor.

## 2. Yükseklik tabanlı kayıplar (genişlikten bağımsız)

Kısa laptop ekranlarını **ve yatay tutulan telefonları** etkiler:

- `.hero-bio p` → 3 satıra kırpılıyor (`index.html:3367`, yükseklik ≤940px), 2 satıra (`index.html:3408`, ≤700px). CSS yorumu "keep the bio" diyor, yani kasıtlı.
- `.hero-meta` (PORTFOLYO + saat, KONUM + Türkiye) → `display: none` (`index.html:3412`, ≤700px).

## 3. Kaybolmayan, bir tık arkasına geçen içerik

900px altında bileşenler değişiyor; içerik panelde açılıyor:

| Masaüstü | Mobil | Yer |
|---|---|---|
| `ProjectCard` — kararlar, sonuç, açıklama, tüm etiketler, medya düğmesi kartta açık | `CompactProjectRow` → dokunma → `ProjectSheet` | `src/App.jsx:979` |
| Tüm deneyim açıklamaları doğrudan açık | `CompactExpRow` (2 cümle özet) → `ExperienceSheet` (tam metin) | `src/App.jsx:1486` |
| 10 sertifika listelenir | İlk 4 + "Tümünü göster" | `src/App.jsx:1364` |
| Kişisel projeler (8 kayıt) doğrudan görünür | "Diğer çalışmaları göster" arkasında | `src/App.jsx:1015` |

Deneyim tarafında **eşitlik tam**: `ExperienceSheet` masaüstündeki her alanı (dönem, rol, kurum, tam açıklama) veriyor.

Proje tarafında ters yönde bir avantaj var: `ProjectSheet` medyayı `MediaList` ile **panelin içinde** gösteriyor, masaüstünde ise ayrı bir "Medya" düğmesine basmak gerekiyor. Eksik olan tek şey mobil satırda medya olduğuna dair **ipucu** — `MediaButton` yalnızca `ProjectCard` içinde (`src/App.jsx:1303`). SITE-PLAN G7 bu ipucunu istiyordu; mobil içeriğe dokunulmaması gereği bu tur ertelendi.

## 4. Kırpılan veri

- `CompactProjectRow`: `tags.slice(0, 4)` (`src/App.jsx:1047`) — masaüstü kartı tüm etiketleri gösteriyor.
- `PersonalCard`: `tags.slice(0, 3)` (`src/App.jsx:1335`) — her genişlikte aynı.
- `CompactExpRow`: `excerpt(desc, 2)` (`src/App.jsx:1454`) + CSS'te 3 satır `line-clamp`.
- Nav: ≤1180px'te `.nav-links li:nth-child(n+4)` gizleniyor (`index.html:3513`); 4-6. bağlantılar menü düğmesine taşınıyor.

## 5. Yalnızca mobilde olan

- `.sheet-handle` — panel tutamacı, masaüstünde gizli (`index.html:2545`). `aria-hidden`, dekoratif.
- "Tümünü göster" ve "Diğer çalışmaları göster" düğmeleri — yalnızca `compact` durumunda render ediliyor.
- Dil ve tema düğmeleri 900px altında üst bardan menü paneline taşınıyor. DOM'da iki kez bulunuyorlar ama **aynı anda yalnızca biri görünür**; çift kontrol sorunu yok.
