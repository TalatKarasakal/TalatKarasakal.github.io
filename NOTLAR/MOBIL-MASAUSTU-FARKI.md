# Mobilde ne görünmüyor?

**Tarih:** 26 Ağustos 2026 · **Durum:** rapor, hiçbir şey değiştirilmedi.

## Nasıl ölçüldü

Tahminle değil, ölçümle. Site iki genişlikte açılıp **gözle görünen bütün metinler** toplandı ve karşılaştırıldı:

- **1440 × 900** (masaüstü): 238 ayrı metin
- **375 × 812** (telefon): 159 ayrı metin

Aradaki 88 metnin her biri tek tek incelendi: hangisi gerçekten yok, hangisi bir düğmenin arkasında duruyor. Sonra telefonda menü açıldı, "göster" düğmelerine basıldı ve paneller açılarak neyin hâlâ ulaşılamadığı bulundu.

---

## 1. Telefonda hiç ulaşılamayan içerik

Bunlar hiçbir düğmenin arkasında değil — telefonda hiç yok.

### a) Hero'daki tanıtım paragrafı

Adının hemen altındaki iki cümle:

> "İzmir Ekonomi Üniversitesi'nde bilgisayar mühendisliği okuyorum. Görüntü işleme ve masaüstü uygulama projelerinde çalıştım; ilgim mimari kararlar ve ölçülebilir sonuçlar tarafında."

Hakkımda bölümündeki paragraflardan **ayrı** bir metin, yani telefonda karşılığı yok.
Kaynak: `t.bio`, `src/App.jsx:867` · gizleyen kural: `.hero-bio { display: none }`, `index.html:3633` bloğu

### b) "Staja açık" düğmesi

Masaüstünde üst barın sağında duran, tıklandığında İletişim'e giden düğme. Telefonda yok **ve hamburger menüsünde de yok** — ölçümle doğrulandı: panelde 6 menü maddesi, TR/EN ve tema düğmesi var, bu düğme yok.
Kaynak: `t.cta`, `src/App.jsx:767` · gizleyen kural: `.nav-cta { display: none }`

### c) Kayan yazı şeridi

Hero'nun altındaki şerit: YAPAY ZEKÂ · BİLGİSAYARLI GÖRÜ · NESNE TESPİTİ · VERİ SETİ TASARIMI · MASAÜSTÜ UYGULAMALAR · JAVA
Kodda `aria-hidden="true"` ile süs olarak işaretlenmiş.
Kaynak: `t.marquee`, `src/App.jsx:907`

### d) İletişim'deki kullanıcı adları

`@TalatKarasakal` ve `/in/talat-karasakal`. "GitHub" ve "LinkedIn" yazıları ve bağlantıların kendisi duruyor; yalnızca kullanıcı adları gizli.
Kaynak: `src/App.jsx:1609` · gizleyen kural: `.social-handle { display: none }`

### e) Proje kategorisi — **bu diğerlerinden farklı**

Masaüstü proje kartının sağ üstündeki etiket: "Bilgisayarlı Görü", "Masaüstü / Java", "Masaüstü / Finans" gibi.

Telefonda ne satırda ne de satıra dokununca açılan panelde var. **Bunu gizleyen bir CSS kuralı yok** — panelin koduna hiç eklenmemiş. Diğer maddeler elle yazılmış `display: none` kurallarıyken bu bir eksiklik.
Masaüstü: `src/App.jsx:1289` · Mobil panel: `ProjectSheet`, `src/App.jsx:1093` — bu alanı hiç render etmiyor

### f) Süs öğeleri

- Selçuklu madalyonu — hero'nun sağ alt köşesindeki geometrik yıldız (hayvan değil)
- Bölüm başlıklarının yanındaki ince çizgi (`.sec-rule`)
- Arka plandaki ışık lekeleri (`.atm-blob`)
- Ayırıcılardaki hayvan figürleri ve ikinci ayırıcı çizgisi

---

## 2. Yalnızca kısa ekranlarda kaybolan

Bunlar **genişliğe değil yüksekliğe** bağlı, yani telefonu **yatay çevirince** ve kısa laptop ekranlarında kayboluyor:

- **Hero'nun en üst satırı** — `PORTFOLYO — 15:28 TRT — KONUM — Türkiye`. Ekran yüksekliği 700px altına düşünce gidiyor (`index.html:3412`). Telefon dikey tutulurken duruyor.
- Hero tanıtım paragrafı kısa ekranlarda 3 satıra (yükseklik 940px altı), sonra 2 satıra (700px altı) kırpılıyor — ama telefonda zaten tamamen gizli.

---

## 3. Kaybolmayan, bir dokunma arkasındaki içerik

Telefonda proje satırına dokununca açılan panel **masaüstü kartındaki her şeyi** veriyor. Ölçümle doğrulandı (TEKNOFEST projesi):

| Alan | Masaüstü kartı | Mobil panel |
|---|---|---|
| Durum rozeti, başlık, rol | var | var |
| Açıklama | var | var |
| Etiketler | 5 tane | **5 tane** (satırda ilk 4 görünür, panelde tamamı) |
| "Kararlar" listesi | 4 madde | 4 madde |
| "Sonuç" | var | var |
| Dönem | var | var |
| Repo bağlantısı | var | var |
| Medya | "Medya" düğmesine basmak gerekir | **panelde doğrudan görünür** |
| **Kategori** | var | **yok** ← tek eksik |

Medya tarafında telefon aslında **daha iyi**: masaüstünde ayrı bir düğmeye basmak gerekirken panelde görseller doğrudan açılıyor. Eksik olan tek şey, proje satırında medya olduğunu belli eden bir ipucu (masaüstündeki "Medya" düğmesi orada yok).

Deneyim bölümünde **eşitlik tam**: satırda ilk 2 cümle özet görünüyor, dokununca panelde dönem, kurum ve tam açıklama açılıyor. Hiçbir şey kaybolmuyor.

Ayrıca bilerek düğme arkasına alınanlar: sertifikaların 5–10'u ("Tümünü göster"), kişisel projeler ("Diğer çalışmaları göster"), menü maddeleri ve dil/tema düğmeleri (hamburger menüsü).

---

## 4. Özet — karar gereken iki madde

Aşağıdakiler kasıtlı görünmüyor, çünkü ikisi de "gizlenmiş" değil, **eksik**:

1. **Proje kategorisi** — mobil panele hiç eklenmemiş (§1e).
2. **"Staja açık" düğmesi** — gizlenmiş ama hamburger menüsüne taşınmamış (§1b).

Geri kalanı ya bilinçli `display: none` kurallarıyla çıkarılmış, ya süs, ya da bir düğmenin arkasında duruyor.

İlgili SITE-PLAN maddesi: **G7-mobil** (proje satırında medya ipucu) — bu kararlar verilmeden başlanmamalı.
