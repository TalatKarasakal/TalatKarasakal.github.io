import React from "react";

const { useState, useEffect, useRef } = React;

/* =========================================================================
   CONTENT DATA — edit here, the page rebuilds itself.
   ========================================================================= */

/* -------------------------------------------------------------------------
   PROJECTS — three tiers.
   tier: "featured" → large card: role + decisions + outcome + status
   tier: "project"  → normal card: role + description + tags + link
   tier: "personal" → compact row: title, one-line description, tags, links
   Links only render when the URL actually starts with http(s).
   ------------------------------------------------------------------------- */
const PROJECTS = [
{
  id: "p01",
  media: [
    { type: "image", src: "assets/projeler/nexa-egitim-egrileri.png",
      tr: "Eğitim eğrileri, 50 epoch. Doğrulama kaybı sona kadar düşüyor, mAP 40. tur civarında oturuyor — aşırı öğrenme yok.",
      en: "Training curves over 50 epochs. Validation loss keeps falling and mAP plateaus around epoch 40 — no overfitting." },
    { type: "image", src: "assets/projeler/nexa-karisiklik-matrisi.png",
      tr: "Normalize karışıklık matrisi. Plaka 0,88; koltuk sınıfları zayıf. Boş slalom satırı eksiklik değil: slalom ayrı bir sınıf olarak değil, aracın yatay salınımının sayılmasıyla belirleniyor.",
      en: "Normalised confusion matrix. Plate 0.88; the seat classes are weak. The empty slalom row is by design — swerving is detected by counting lateral oscillation, not as a class." }
  ],
  tier: "featured",
  title: "Akıllı Yol Güvenliği",
  status: "elendi",
  roleTr: "TEKNOFEST 2026 · Turkcell · 3 kişilik ekipte yapay zekâ ve kod sorumlusu",
  roleEn: "TEKNOFEST 2026 · Turkcell · AI and code lead in a three-person team",
  descTr: "Yol kenarındaki sabit bir kameradan gelen görüntüde araç tipi, plaka bölgesi, renk, sürücü ihlalleri ve koltuk doluluğunu tek bir 21 sınıflı YOLOv8s modeliyle tespit eden çıkarım hattı. Araçlar kareler arasında ByteTrack ile takip ediliyor, böylece aynı araç için tekrarlı olay üretilmiyor. Slalom ihlali ayrı bir modelle değil, aracın merkez noktasının yatay salınımlarının sayılmasıyla belirleniyor. Yarışmanın kapsamı 5G servislerini ve mobil arayüzü de içeriyordu; teslim edilen sistem yalnızca görüntü işleme hattıdır, diğer bileşenler mimari düzeyde tasarlandı.",
  descEn: "An inference pipeline that detects vehicle type, licence-plate region, colour, driver violations and seat occupancy from a fixed roadside camera using a single 21-class YOLOv8s model. Vehicles are tracked across frames with ByteTrack, so the same car does not generate repeated events. Swerving is not detected by a separate model but by counting the horizontal oscillations of a vehicle's centre point. The competition scope also covered 5G services and a mobile interface; what was delivered is the vision pipeline only — the remaining components stayed at architecture level.",
  decisionsTr: [
    "10 açık kaynak veri setini yarışmanın 21 resmî sınıfına yeniden eşledim (~32.425 görüntü).",
    "Aynı klipten gelen ardışık karelerin eğitim/doğrulama/test bölümlerine dağılmasını group_fn ile engelledim.",
    "Plaka yönü ve koltuk yön ayrımını bozduğu için flip augmentation'ı kapattım.",
    "YOLOv8s ve YOLOv8m'i kendi donanımımda karşılaştırıp YOLOv8s'i seçtim."
  ],
  decisionsEn: [
    "Re-mapped ten open-source datasets onto the competition's 21 official classes (~32,425 images).",
    "Prevented consecutive frames from the same clip leaking across the train/val/test splits, using a group_fn mechanism.",
    "Disabled flip augmentation, because it breaks plate orientation and left/right seat distinction.",
    "Compared YOLOv8s against YOLOv8m on my own hardware and selected YOLOv8s."
  ],
  outcomeTr: "mAP@0.5 0,701 genel · plaka bölgesi tespiti 0,896 · ~12 ms/kare · 32.425 görüntülük veri seti. Ön Tasarım Raporu 85,67/100 ile geçildi. Final aşamasında baraj puanı geçilemedi; plaka bölgesi doğru bulunuyordu ama OCR katmanı geçerli plaka metni üretemedi.",
  outcomeEn: "mAP@0.5 0.701 overall · 0.896 for plate-region detection · ~12 ms per frame · 32,425-image dataset. The preliminary report passed at 85.67/100. The project did not clear the threshold at the final stage: plate regions were located correctly, but the OCR layer could not produce valid plate text.",
  tags: ["YOLOv8", "Python", "Docker", "EasyOCR", "Nesne Tespiti"],
  category: "Bilgisayarlı Görü",
  period: "Şub – Tem 2026", periodEn: "Feb – Jul 2026"
  // videoUrl: <TODO: Talat — ekran kaydı sonra eklenecek>
},
{
  id: "p02",
  media: [
    { type: "video", src: "assets/projeler/sinav-planlama-demo.mp4",
      tr: "Çizelgenin üretilmesi ve sonucun tabloya dökülmesi.",
      en: "Generating the timetable and populating the results table." },
    { type: "image", src: "assets/projeler/sinav-planlama-takvim.png",
      tr: "Öğrenci başına ilk ve son sınav tarihleri.",
      en: "First and last exam dates per student." },
    { type: "image", src: "assets/projeler/sinav-planlama-kurallar.png",
      tr: "Ders bazlı özel kurallar: süre, sınıf kapasitesi, çizelge dışı bırakma.",
      en: "Per-course rule overrides: duration, room capacity, exclusion from the schedule." },
    { type: "image", src: "assets/projeler/sinav-planlama-disa-aktarim.png",
      tr: "CSV, Excel ve PDF dışa aktarım.",
      en: "CSV, Excel and PDF export." }
  ],
  tier: "featured",
  title: "Sınav Planlama ve Yönetim Sistemi",
  status: "tamamlandi",
  roleTr: "5 kişilik ders projesi · arayüz katmanı ve iki teknik ekleme",
  roleEn: "Five-person course project · UI layer and two technical additions",
  descTr: "Üniversite sınav haftası çizelgelemesini otomatikleştiren Java/JavaFX/SQLite masaüstü uygulaması. Öğrenci çakışması, sınıf kapasitesi, günlük sınav limiti ve minimum ara süresi kısıtlarını birlikte değerlendiriyor; sabit bir tohum değeriyle çalıştığı için aynı girdi her seferinde aynı takvimi üretiyor. Sonuçlar CSV ve Excel olarak dışa aktarılabiliyor. Çekirdek çizelgeleme algoritması bir takım arkadaşıma aittir; benim alanım arayüz katmanı ve girdi işleme oldu.",
  descEn: "A Java/JavaFX/SQLite desktop application that automates university exam-week scheduling. It weighs student conflicts, room capacity, daily exam limits and minimum gaps together, and runs from a fixed seed so the same input always produces the same timetable. Results export to CSV and Excel. The core scheduling algorithm belongs to a teammate; my area was the UI layer and input handling.",
  decisionsTr: [
    "Takıma Java'yı önerdim; ekibin ortak deneyimi ve masaüstü dağıtım kolaylığı gerekçesiyle kabul edildi.",
    "Çizelgeleme hesaplamalarının paralelleştirilmesini önerdim — çalışma süresi belirgin biçimde kısaldı.",
    "Kalıcılık sorununa, son açılan dosyaları ve filtreleri saklayıp her açılışta yeniden hesaplama çözümünü önerdim."
  ],
  decisionsEn: [
    "Proposed Java to the team; accepted on the grounds of shared experience and straightforward desktop distribution.",
    "Proposed parallelising the scheduling computation — runtime dropped noticeably.",
    "Proposed solving persistence by storing the last-opened files and filters and recomputing on each launch."
  ],
  outcomeTr: "Uygulama tamamlandı; Windows, macOS ve Linux için paketler yayımlandı.",
  outcomeEn: "The application was completed and packaged for Windows, macOS and Linux.",
  tags: ["Java", "JavaFX", "SQLite", "Gradle"],
  category: "Masaüstü / Java",
  repoUrl: "https://github.com/TalatKarasakal/sinav-programi-olusturma-uygulamasi",
  period: "Eki – Ara 2025", periodEn: "Oct – Dec 2025"
},
{
  id: "p03",
  media: [
    { type: "video", src: "assets/projeler/ayrik-olay-demo.mp4",
      tr: "İki dosya girdisinin ayrıştırılması ve simülasyonun yürütülmesi — 2024 sürümü.",
      en: "Parsing the two input files and running the simulation — the 2024 version." }
  ],
  tier: "featured",
  title: "Ayrık Olay Simülasyonu",
  status: "tamamlandi",
  roleTr: "4 kişilik orijinal takım üyesi (2024) · ayrıştırıcı sınıflarda çekirdek düzeltmeler",
  roleEn: "Member of the original four-person team (2024) · core fixes in the parser classes",
  descTr: "İki dosya girdisini işleyip iş akışı simülasyon raporu üreten Java uygulaması. İş tiplerini, görevleri ve istasyonları modelliyor; istasyon başına FIFO veya en erken teslim tarihi (EDD) önceliklendirmesi seçilebiliyor. Rapor iş ve istasyon bazlı özet olarak sunuluyor. 2024 katmanında ayrıştırıcı sınıflardaki çekirdek hata düzeltmeleri bana ait; 2026'daki fork'ta çekirdek yeniden yazıldı, o katmandaki katkım arayüz tarafında.",
  descEn: "A Java application that processes two input files and produces a workflow simulation report. It models job types, tasks and stations, with per-station FIFO or earliest-due-date prioritisation. The report is presented as a per-job and per-station summary. In the 2024 layer the core bug fixes in the parser classes are mine; the core was rewritten in the 2026 fork, where my contribution is on the interface side.",
  decisionsTr: [
    "İki katmanı bilinçli olarak ayrı değerlendiriyorum: 2024 çekirdek katkısı ile 2026 arayüz katkısı aynı şey değil."
  ],
  decisionsEn: [
    "I keep the two layers deliberately separate: the 2024 core contribution and the 2026 interface work are not the same thing."
  ],
  outcomeTr: "142 test (JUnit 5) ve JaCoCo kapsam raporu. Bilinen sınır: istasyon kullanım oranı hesabı, eş zamanlı işlenen görev sürelerini kapasiteye bölmeden topluyor; kapasitesi birden büyük istasyonlarda oran %100\u0027ü aşıyor. Hata teslimden sonra tespit edildi, kod teslim edildiği hâliyle bırakıldı.",
  outcomeEn: "142 tests (JUnit 5) and a JaCoCo coverage report. Known limitation: the station utilisation calculation sums concurrent task durations without dividing by capacity, so the rate exceeds 100% on stations with capacity above one. The defect was identified after submission; the code is left as delivered.",
  tags: ["Java", "JUnit 5", "Maven"],
  category: "Masaüstü / Java",
  repoUrl: "https://github.com/TalatKarasakal/ayrik-olay-simulasyonu-uygulamasi",
  period: "Nis – May 2024", periodEn: "Apr – May 2024"
},
{
  id: "p04",
  media: [
    { type: "video", src: "assets/projeler/iae-demo.mp4",
      tr: "Dil yapılandırması, ardından üç gönderimin derlenip çalıştırılması; PASS, FAIL ve RUNTIME_ERROR ayrı ayrı sınıflanıyor.",
      en: "Language configuration, then three submissions compiled and run, with PASS, FAIL and RUNTIME_ERROR classified separately." }
  ],
  tier: "project",
  title: "Bütünleşik Ödev Değerlendirme Sistemi",
  status: "tamamlandi",
  roleTr: "5 kişilik ders projesi · çalıştırma motoru modülü",
  roleEn: "Five-person course project · execution engine module",
  descTr: "Öğrenci programlama ödevlerini otomatik derleyip çalıştıran ve çıktıyı beklenen sonuçla karşılaştıran Java/JavaFX masaüstü uygulaması. Her gönderim izole bir süreçte çalışıyor; zaman aşımında yalnızca üst süreç değil, altındaki tüm süreç ağacı sonlandırılıyor. Çıktı karşılaştırması satır satır ve CRLF/LF farkları normalize edilerek yapılıyor. Takım beş modüle bölündü; benim modülüm çalıştırma motoru ve eklentilerdi.",
  descEn: "A Java/JavaFX desktop application that compiles and runs student programming assignments and compares the output against expected results. Each submission runs in an isolated process; on timeout the whole process tree is terminated, not just the parent. Output comparison is line by line with CRLF/LF differences normalised. The team was split into five modules; mine was the execution engine and plugins.",
  tags: ["Java", "JavaFX", "JUnit"],
  category: "Masaüstü / Java",
  repoUrl: "https://github.com/TalatKarasakal/butunlesik-odev-degerlendirme-sistemi",
  period: "May 2026", periodEn: "May 2026"
},
{
  id: "p05",
  media: [
    { type: "image", src: "assets/projeler/oyun-kutuphanesi.jpg",
      tr: "Tür bazlı katalog görünümü, kapak görselleri ve JSON içe/dışa aktarma.",
      en: "Genre-grouped catalogue view with cover art and JSON import/export." }
  ],
  tier: "project",
  title: "Oyun Kütüphanesi",
  status: "tamamlandi",
  roleTr: "4 kişilik ders projesi · arama ve filtreleme işlevi",
  roleEn: "Four-person course project · search and filtering",
  descTr: "JavaFX tabanlı oyun katalog uygulaması: kayıt ekleme, arama, filtreleme, kapak görselli liste görünümü. Veri JSON dosyasında tutuluyor ve Gson ile okunup yazılıyor; katalog içe ve dışa aktarılabiliyor. Benim alanım arama ve filtreleme işleviydi.",
  descEn: "A JavaFX game-catalogue application: adding entries, search, filtering and a cover-art list view. Data is held in a JSON file read and written through Gson, and the catalogue can be imported and exported. My area was the search and filtering.",
  tags: ["Java", "JavaFX", "JSON"],
  category: "Masaüstü / Java",
  repoUrl: "https://github.com/TalatKarasakal/oyun-kutuphanesi-uygulamasi",
  period: "Nis – May 2025", periodEn: "Apr – May 2025"
},
{
  id: "p06",
  tier: "project",
  title: "BIST / TEFAS Portföy Takip Uygulaması",
  status: "devam",
  roleTr: "Kişisel proje · tek kişilik",
  roleEn: "Personal project · solo",
  descTr: "BIST hisseleri ve TEFAS fonları için masaüstü portföy takip uygulaması. XIRR, Sharpe oranı, maksimum düşüş ve volatilite metrikleri hesaplanıyor; maliyet bazı ağırlıklı ortalama, FIFO veya LIFO olarak seçilebiliyor. Arayüz MVVM düzeninde kurulu, açık ve karanlık palet birlikte geliyor, macOS ve Windows için ayrı paketler üretiliyor.",
  descEn: "A desktop portfolio tracker for Turkish equities (BIST) and funds (TEFAS). It computes XIRR, Sharpe ratio, maximum drawdown and volatility, with weighted-average, FIFO or LIFO cost basis. The interface follows an MVVM structure, ships with paired light and dark palettes, and is packaged separately for macOS and Windows.",
  tags: ["Python", "PySide6", "SQLAlchemy", "SQLite", "PyQtGraph"],
  category: "Masaüstü / Finans",
  repoUrl: "https://github.com/TalatKarasakal/portfoy-takip-uygulamasi",
  period: "2026"
},
{ id: "p07", status: "devam", tier: "personal", title: "Kağanlar Çağı",
  descTr: "Türk devletleri temalı gerçek zamanlı strateji oyunu. Simülasyon çekirdeği deterministik çalışıyor: aynı başlangıç durumu ve aynı girdi dizisi her çalıştırmada aynı sonucu veriyor. Uygarlık, birim ve bina tanımları koddan ayrı JSON dosyalarında tutuluyor.",
  descEn: "A real-time strategy game themed on Turkic states. The simulation core is deterministic: the same initial state and input sequence produce the same result on every run. Civilisation, unit and building definitions live in JSON files, separate from the code.",
  tags: ["C++20", "SDL3", "CMake"], category: "Oyun",
  repoUrl: "https://github.com/TalatKarasakal/savas-oyunu", period: "2026" },

{ id: "p08", status: "devam", tier: "personal", title: "Kariyer Takip Uygulaması",
  descTr: "İş ve staj başvurularının takibi ile öz geçmiş üretimini tek veritabanında birleştiren masaüstü uygulaması. Başvuru durumu, mülakat tarihleri ve şirket notları aynı yerde tutuluyor. Metin üretimi cihazda çalışan bir dil modeli üzerinden yapıldığı için veriler dışarı çıkmıyor.",
  descEn: "A desktop application that combines job and internship application tracking with résumé generation on a single database. Application status, interview dates and company notes live in one place. Text generation runs through a language model on the machine itself, so nothing leaves the device.",
  tags: ["Python", "PySide6", "SQLAlchemy", "Ollama"], category: "Masaüstü",
  repoUrl: "https://github.com/TalatKarasakal/kariyer-takip-uygulamasi", period: "2026" },

{ id: "p09", status: "devam", tier: "personal", title: "Yapılacaklar Yöneticisi",
  descTr: "Yerel bir dil modeliyle öncelik ve zaman planı öneren yapılacaklar uygulaması. Öneriler ayrı bir panelde birikiyor ve kabul edilene kadar görev listesine yazılmıyor — model hiçbir şeyi kendiliğinden değiştirmiyor.",
  descEn: "A to-do application that proposes priorities and time blocks through a local language model. Suggestions collect in a separate panel and are not written to the task list until accepted — the model changes nothing on its own.",
  tags: ["Python", "PySide6", "Ollama"], category: "Masaüstü",
  repoUrl: "https://github.com/TalatKarasakal/yapilacaklar", period: "2026" },

{ id: "p10", status: "devam", tier: "personal", title: "Spor ve Diyet Planlayıcı",
  descTr: "Antrenman ve beslenme planı üreten masaüstü uygulaması. Plan üretilirken eldeki ekipman, sakatlık geçmişi ve diyet kısıtları girdi olarak alınıyor. İlerleme PyQtGraph ile çizilen grafikler üzerinden izleniyor.",
  descEn: "A desktop application that generates training and nutrition plans, taking available equipment, injury history and dietary constraints as inputs. Progress is tracked through PyQtGraph charts.",
  tags: ["Python", "PySide6", "Ollama", "PyQtGraph"], category: "Masaüstü",
  repoUrl: "https://github.com/TalatKarasakal/spor-diyet-uygulamasi", period: "2026" },

{ id: "p11", status: "devam", tier: "personal", title: "Kütüphanem",
  descTr: "Kitap, film ve dizi koleksiyonlarını tek yerde tutan masaüstü uygulaması. Her tür için ayrı alan şeması var; veriler tamamen cihazda, IndexedDB üzerinde saklanıyor. Excel ve CSV ile içe ve dışa aktarma destekleniyor.",
  descEn: "A desktop application that keeps book, film and series collections in one place. Each type has its own field schema, and all data stays on the device in IndexedDB. Excel and CSV import and export are supported.",
  tags: ["Electron", "React", "TypeScript", "IndexedDB"], category: "Masaüstü",
  repoUrl: "https://github.com/TalatKarasakal/kutuphane-takip-sistemi", period: "2026" },

{ id: "p12", status: "tamamlandi", tier: "personal", title: "Unity 2D Tenis Oyunu",
  descTr: "Unity ile oyun geliştirmenin temellerini öğrenmek için iki kişilik bir ekiple yapılan 2B tenis oyunu. Üç zorluk seviyesinde bir rakip ve basit bir puanlama akışı var. WebGL olarak derlendiği için tarayıcıda oynanabiliyor.",
  descEn: "A 2D tennis game built by a two-person team to learn the basics of game development in Unity, with a three-level opponent and a simple scoring loop. Compiled to WebGL, so it runs in the browser.",
  tags: ["Unity 6", "C#", "WebGL"], category: "Oyun",
  repoUrl: "https://github.com/TalatKarasakal/tenis-oyunu",
  period: "Haz – Tem 2025", periodEn: "Jun – Jul 2025" },

{ id: "p13", status: "tamamlandi", tier: "personal", title: "Sınav Oluşturma Sistemi",
  descTr: "Öğretmenin bir soru havuzu tuttuğu ve seçtiği kriterlere göre otomatik sınav ürettiği masaüstü uygulaması.",
  descEn: "A desktop application where a teacher maintains a question bank and generates exams automatically from selected criteria.",
  tags: ["Python"], category: "Masaüstü",
  repoUrl: "https://github.com/TalatKarasakal/sinav-olusturma-sistemi",
  period: "2026" },

{ id: "p14", status: "tamamlandi",
  media: [
    { type: "video", src: "assets/projeler/bluejack-terminal-demo.mp4",
      tr: "Terminal sürümünde bir tur oynanışı.",
      en: "A round of play in the terminal version." }
  ], tier: "personal", title: "Bluejack Kart Oyunu",
  descTr: "Java ve nesne yönelimli tasarım pratiği olarak yazılmış kart oyunu. Kart, Deste, Oyuncu ve Oynanış sınıflarından oluşuyor; kart dağıtma, tur kontrolü ve puanlama akışını içeriyor.",
  descEn: "A card game written as an exercise in Java and object-oriented design, built from Card, Deck, Player and Gameplay classes, covering dealing, turn control and scoring.",
  tags: ["Java", "OOP"], category: "Oyun",
  repoUrl: "https://github.com/TalatKarasakal/bluejack-oyunu",
  period: "Ara 2023", periodEn: "Dec 2023" }];

const STATUS_LABELS = {
  elendi:      { tr: "Elendi",        en: "Eliminated" },
  tamamlandi:  { tr: "Tamamlandı",    en: "Completed"  },
  devam:       { tr: "Devam ediyor",  en: "Ongoing"    }
};

/* -------------------------------------------------------------------------
   SKILLS — { tr, en, items, itemsEn, learning, secondary }
   ------------------------------------------------------------------------- */
const SKILLS = [
{ tr: "Diller ve Çatılar", en: "Languages & Frameworks",
  items: ["Java", "JavaFX", "Python", "C", "C++", "C#"] },

{ tr: "Araçlar", en: "Tools",
  items: ["Git / GitHub", "SQLite", "Gradle / Maven"] },

{ tr: "Alanlar", en: "Areas",
  items: ["Masaüstü uygulama geliştirme", "Bilgisayarlı görü ve nesne tespiti",
          "Performans ve kalıcılık tasarımı"],
  itemsEn: ["Desktop application development", "Computer vision and object detection",
            "Performance and persistence design"] },

{ tr: "Süreç", en: "Process",
  items: ["Proje yönetimi ve planlama", "Etkinlik organizasyonu ve koordinasyon"],
  itemsEn: ["Project management & planning", "Event organisation & coordination"] },

{ tr: "Ayrıca kullandığım teknolojiler", en: "Also worked with",
  items: ["TypeScript / JavaScript", "React", "PySide6",
          "Unity", "SQLAlchemy", "Docker", "YOLOv8 / Ultralytics"],
  secondary: true },];

const LANGUAGES = [
{ tr: "İngilizce", en: "English", levelTr: "B2",                       levelEn: "B2" },
{ tr: "Almanca",   en: "German",  levelTr: "A2",                       levelEn: "A2" },
{ tr: "Fransızca", en: "French",  levelTr: "başlangıç · devam ediyor", levelEn: "beginner · in progress" }];

/* -------------------------------------------------------------------------
   CERTIFICATES — *En variants fall back to the base field.
   image: "" → initials placeholder tile. Fill in a path to show a thumbnail.
   ------------------------------------------------------------------------- */
const CERTIFICATES = [
{ name: "Öğrenciler için Yapay Zekâ Yetkinliği", nameEn: "AI Fluency for Students",
  originalName: "AI Fluency for Students",
  issuer: "Anthropic", date: "2026", image: "assets/sertifikalar/anthropic-ai-fluency.jpg" },

{ name: "Modern Yapay Zekâya Giriş", nameEn: "Introduction to Modern AI",
  originalName: "Introduction to Modern AI",
  issuer: "Cisco", date: "Ara 2024", dateEn: "Dec 2024", image: "assets/sertifikalar/cisco-modern-ai.jpg" },

{ name: "Veri Bilimine Giriş", nameEn: "Introduction to Data Science",
  originalName: "Introduction to Data Science",
  issuer: "Cisco", date: "Eki 2024", dateEn: "Oct 2024", image: "assets/sertifikalar/cisco-veri-bilimi.jpg" },

{ name: "Makine Öğrenmesine Giriş Çalıştayı", nameEn: "Introduction to Machine Learning Workshop",
  issuer: "İEÜ Yazılım Topluluğu", issuerEn: "IUE Software Community",
  date: "Mar 2025", dateEn: "Mar 2025", image: "assets/sertifikalar/ieu-makine-ogrenmesi-calistayi.jpg" },

{ name: "Çevik Proje Yönetimi", nameEn: "Agile Project Management",
  issuer: "BTK Akademi", date: "Oca 2026", dateEn: "Jan 2026", image: "assets/sertifikalar/btk-cevik-proje-yonetimi.jpg" },

{ name: "Microsoft Project ile Proje Yönetimi", nameEn: "Project Management with Microsoft Project",
  issuer: "BTK Akademi", date: "Şub 2026", dateEn: "Feb 2026", image: "assets/sertifikalar/btk-microsoft-project.jpg" },

{ name: "ISO 9001:2015 Kalite Yönetim Sistemi", nameEn: "ISO 9001:2015 Quality Management Systems",
  issuer: "Sigmacert Global", date: "Mar 2026", dateEn: "Mar 2026", image: "assets/sertifikalar/sigmacert-iso-9001.jpg" },

{ name: "Kuika Designer ve Builder", nameEn: "Kuika Designer and Builder",
  issuer: "İEÜ ÖÖM · Kuika Akademi", issuerEn: "IUE Lifelong Learning · Kuika Academy",
  date: "2025", image: "assets/sertifikalar/kuika-designer-builder.jpg" },

{ name: "Kariyer ve Yetkinlik Buluşmaları", nameEn: "Career and Competency Meetings",
  issuer: "Savunma Sanayii Akademi", issuerEn: "Defence Industry Academy",
  date: "2024 – 2026", image: "assets/sertifikalar/savunma-sanayii-akademi.jpg" },

{ name: "Temel Bilgi Güvenliği", nameEn: "Fundamentals of Information Security",
  issuer: "İzmir Ekonomi Üniversitesi", issuerEn: "Izmir University of Economics",
  date: "Kas 2024", dateEn: "Nov 2024", image: "assets/sertifikalar/ieu-bilgi-guvenligi.jpg" }];

/* -------------------------------------------------------------------------
   EXPERIENCE — two-column blocks.
   ------------------------------------------------------------------------- */
const EXPERIENCE = [
{ roleTr: "Çalışan Öğrenci", roleEn: "Student Employee",
  orgTr: "İzmir Ekonomi Üniversitesi · Kurumsal İletişim Ofisi, Etkinlik Birimi",
  orgEn: "Izmir University of Economics · Corporate Communications, Events Unit",
  period: "Ağu – Ara 2025 · Şub – Tem 2026", periodEn: "Aug – Dec 2025 · Feb – Jul 2026",
  descTr: "Kurumsal İletişim Ofisi Etkinlik Birimi'nde, üniversitenin yıl boyunca düzenlediği büyük ölçekli etkinliklerin saha koordinasyonunda görev aldım. Akademik yıl açılışı, mezuniyet törenleri, Kıdem Takdir Töreni, Bahar Şenlikleri konseri ve üniversitenin 25. kuruluş yıl dönümü kutlamaları bu kapsamdaydı. Görev, sözleşmenin sona ermesiyle Temmuz 2026'da tamamlandı.",
  descEn: "In the Events Unit of the Corporate Communications Office, I worked on the field coordination of the university's large-scale events across the year: the academic year opening, graduation ceremonies, the long-service awards, the spring festival concert and the university's 25th anniversary. The role ended in July 2026 when the contract expired." },

{ roleTr: "Proje Yönetimi Stajyeri", roleEn: "Project Management Intern",
  orgTr: "SCA Social", orgEn: "SCA Social",
  period: "Oca – Şub 2026 · uzaktan", periodEn: "Jan – Feb 2026 · remote",
  descTr: "Stajın ilk dört haftasında yönetim ve organizasyon, bilişim hukuku, yapay zekâ ve proje yönetimi alanlarında teorik eğitim aldım. Devamında savunma sanayii odaklı yıllık bütçe planlaması ve maliyet tabloları hazırladım. İnşaat projelerindeki belirsizlik ve risklerin erken tespiti için yapay zekâ temelli bir simülasyon yaklaşımı tasarlayarak derin öğrenme ve görüntü işleme tekniklerinin risk analizindeki kullanım senaryolarını modelledim. Bilişim hukuku kapsamında KVKK süreçlerini vaka analizi üzerinden inceleyip veri sorumlusuna başvuru ve Kurul şikâyet mekanizmalarını resmî dokümantasyona dönüştürdüm. Son aşamada Proje Başlatma Belgesi ve Gantt çizelgesi hazırlayarak bir projenin kapsam, kaynak ve zaman planlamasını uçtan uca kurguladım.",
  descEn: "The first four weeks covered theory in management and organisation, information technology law, artificial intelligence and project management. I then prepared annual budget planning and cost tables for the defence sector. To catch uncertainty and risk early in construction projects, I designed an AI-based simulation approach and modelled how deep learning and computer vision techniques could be used in risk analysis. Under information technology law, I examined data-protection procedures through a case study and turned the application and complaint mechanisms into formal documentation. In the final stage I prepared a project initiation document and a Gantt chart, planning a project's scope, resources and schedule end to end." },

{ roleTr: "Tanıtım Personeli", roleEn: "Outreach Staff",
  orgTr: "İzmir Ekonomi Üniversitesi", orgEn: "Izmir University of Economics",
  period: "Tem – Eyl 2024 · Tem – Ağu 2025", periodEn: "Jul – Sep 2024 · Jul – Aug 2025",
  descTr: "2024 tanıtım döneminde çağrı merkezi biriminde çalıştım; İzmir Ekonomi Üniversitesi ile ilgilenen adayların sorularını yanıtladım ve bilgilendirme yaptım. 2025 döneminde transfer biriminde görev aldım: aday öğrenciler ve velilere kampüs içi turlar düzenledim, üniversite ve ilgilendikleri bölümler hakkındaki sorularını yanıtladım. İşin özü, aynı bilgiyi çok farklı hazırlık seviyelerindeki kişilere anlaşılır biçimde aktarmaktı.",
  descEn: "In the 2024 admissions period I worked in the call centre unit, answering questions from prospective students interested in Izmir University of Economics. In 2025 I worked in the transfer unit: running campus tours for prospective students and their families, and answering their questions about the university and the departments they were considering. The core of the job was conveying the same information clearly to people at very different levels of preparation." },

{ roleTr: "Kulüp Üyesi · Denetim Kurulu Üyesi", roleEn: "Club Member · Audit Board Member",
  orgTr: "IEU Software Community", orgEn: "IEU Software Community",
  period: "Eki 2024 – devam",
  periodEn: "Oct 2024 – present",
  descTr: "2024-2025 döneminde kulüp üyesi olarak Cisco ve yapay zekâ alanındaki kurs ve çalıştaylara katıldım; makine öğrenmesine giriş çalıştayı bunlardan biriydi. Eylül 2025 – Temmuz 2026 arasında denetim kurulunda görev aldım: etkinlik planlamalarına katkı sağladım, Bahar Şenlikleri stant organizasyonunda destek verdim ve kulübün düzenlediği seminerlerde yönetime destek oldum.",
  descEn: "As a club member in 2024-2025 I attended Cisco and artificial intelligence courses and workshops, including an introduction to machine learning. Between September 2025 and July 2026 I served on the audit board: contributing to event planning, supporting the spring festival stand, and assisting the committee at the seminars the club ran." },

{ roleTr: "Kulüp Üyesi", roleEn: "Club Member",
  orgTr: "Endüstri Sistemleri Topluluğu", orgEn: "Industrial Systems Community",
  period: "Eki 2024 – devam", periodEn: "Oct 2024 – present",
  descTr: "Topluluğun düzenlediği etkinliklerin organizasyon ekibinde yer alıyorum. Etkinliklere katılım için şirketlerden insan kaynakları uzmanları ve yöneticilerle LinkedIn üzerinden iletişime geçerek davet süreçlerini yürütüyorum. Etkinlik günlerinde konuk ağırlama, genel koordinasyon ve katılımcı yönetiminde görev alıyorum.",
  descEn: "I am part of the organising team for the community's events. I run the invitation process, reaching out to human resources specialists and managers at companies through LinkedIn. On event days I work on hosting guests, general coordination and attendee management." }];

/* -------------------------------------------------------------------------
   CONTACT
   ------------------------------------------------------------------------- */
const EMAIL = "talatkarasakal@outlook.com.tr";
const GITHUB_URL = "https://github.com/TalatKarasakal";
const CV_URL = ""; // <TODO: Talat — PDF hazır olunca doldur, örn. "/talat-karasakal-cv.pdf">
const SOCIALS = [
{ key: "GitHub", handle: "@TalatKarasakal", href: GITHUB_URL },
{ key: "LinkedIn", handle: "/in/talat-karasakal", href: "https://www.linkedin.com/in/talat-karasakal-077368251/" }];

/* -------------------------------------------------------------------------
   UI COPY — one language at a time, no mixed glosses.
   ------------------------------------------------------------------------- */
const COPY = {
  tr: {
    role: "Bilgisayar Mühendisliği Öğrencisi",
    university: "İzmir Ekonomi Üniversitesi",
    location: "Türkiye",
    // SEO — sekme basligi ve meta etiketleri. Uc metin de index.html'deki
    // <title>, <meta name="description"> ve og:description degerlerinden
    // birebir tasindi; og:description digerinden farkli oldugu icin ayri
    // anahtar olarak duruyor.
    seoTitle: "Talat Karasakal — Bilgisayar Mühendisliği Öğrencisi",
    seoDescription: "Talat Karasakal — İzmir Ekonomi Üniversitesi bilgisayar mühendisliği öğrencisi. TEKNOFEST nesne tespiti hattı, Java masaüstü uygulamaları ve bilgisayarlı görü projeleri.",
    ogDescription: "TEKNOFEST nesne tespiti hattı, Java masaüstü uygulamaları ve bilgisayarlı görü projeleri. İzmir Ekonomi Üniversitesi.",
    nav: { hero: "Ana Sayfa", about: "Hakkımda", projects: "Projeler", certificates: "Sertifikalar", experience: "Deneyim", contact: "İletişim" },
    menuLabel: "Menü",
    cta: "Staja açık",
    ctaTitle: ["Aydınlık moda geç", "Karanlık moda geç"],
    portfolio: "PORTFOLYO", locKey: "KONUM",
    online: "çevrim içi", scrollHint: "↳ aşağı kaydır",
    specHead: "KİMLİK",
    spec: { handle: "kullanıcı", role: "rol", uni: "üniversite", focus: "odak", loc: "konum", open: "açık" },
    focusLine: "Yapay zekâ · Bilgisayarlı görü · Yazılım",
    openLine: "staj · Ekim 2026'dan itibaren",
    tagline: "Yapay Zekâ · Bilgisayarlı Görü · Yazılım Geliştirme",
    firstName: "Talat", lastName: "Karasakal",
    bio: "İzmir Ekonomi Üniversitesi'nde bilgisayar mühendisliği okuyorum. Görüntü işleme ve masaüstü uygulama projelerinde çalıştım; ilgim mimari kararlar ve ölçülebilir sonuçlar tarafında.",
    btnProjects: "Projeleri Gör", btnContact: "İletişime geç",
    marquee: ["YAPAY ZEKÂ", "BİLGİSAYARLI GÖRÜ", "NESNE TESPİTİ", "VERİ SETİ TASARIMI", "MASAÜSTÜ UYGULAMALAR", "JAVA"],
    aboutTitle: "Hakkımda",
    lede: "Bir sistemin neden öyle kurulduğunu açıklamayı, onu çalışır hâle getirmekten daha zor ve daha kıymetli buluyorum.",
    ledeEm: "neden öyle kurulduğunu",
    aboutP1: "Bilgisayar mühendisliği okuyorum ve çoğunlukla masaüstü uygulamalar ve görüntü işleme tarafında çalışıyorum. Bir işi yaparken en çok ilgimi çeken kısım, seçeneklerin karşılaştırıldığı yer oluyor: hangi modelin, hangi kütüphanenin, hangi veri kurgusunun neden seçildiği. Bir aracı kullanabilmek ile onu neden seçtiğini anlatabilmek arasındaki farkı önemsiyorum.",
    aboutP2: "En kapsamlı çalışmam TEKNOFEST 2026 Akıllı Yol Güvenliği yarışması oldu. Üç kişilik ekipte yapay zekâ tarafından sorumluydum: on ayrı veri setini tek bir sınıf şemasına eşledim, veri sızıntısını önleyecek bölümleme kurdum ve iki model boyutunu kendi donanımımda karşılaştırarak seçtim. Bu projeden çıkardığım en kalıcı şey, bir veri setinin nasıl kurulduğunun model seçiminden daha belirleyici olabildiği.",
    aboutP3: "Yakın hedefim 2026-2027 döneminde bir yazılım stajı; uzun vadede savunma sanayii ve kurumsal teknoloji tarafında çalışmayı hedefliyorum.",
    nowTag: "ŞİMDİ",
    now: [
    ["Öğreniyor", "C# ve .NET · ASP.NET Core · Entity Framework Core · Makine Öğrenmesi"],
    ["Geliştiriyor", "Kişisel projeler ve portfolyo"],
    ["Planlıyor", "4. sınıf bitirme projesi"]],

    skillLearnBadge: "öğreniyor",
    langTitle: "Diller",
    projTitle: "Projeler",
    tierFeatured: "Öne çıkanlar", tierProject: "Projeler", tierPersonal: "Diğer çalışmalar",
    decisionsLabel: "Kararlar", outcomeLabel: "Sonuç",
    liveLabel: "canlı demo", sheetClose: "Kapat",
    seeMore: "Tümünü göster", seeLess: "Daha az göster", showPersonal: "Diğer çalışmaları göster",
    seeAll: "Tüm depoları GitHub'da gör",
    certTitle: "Sertifikalar",
    expTitle: "Deneyim",
    contactTitle: "İletişim",
    contactLede: "Staj fırsatları ve proje iş birlikleri için bana ulaşabilirsiniz.",
    emailLabel: "E-POSTA",
    cvLabel: "Özgeçmişi indir (PDF)",
    avail: "Ekim 2026'dan itibaren staja açığım",
    socialLabels: { GitHub: "GitHub", LinkedIn: "LinkedIn", Email: "E-posta" },
    footer: ["© 2026 — Talat Karasakal", "Türkiye"]
  },
  en: {
    role: "Computer Engineering Student",
    university: "Izmir University of Economics",
    location: "Türkiye",
    // seoTitle / seoDescription / ogDescription burada bilerek yok:
    // Ingilizce karsiliklari henuz yazilmadi ve uretilmiyor. Anahtar
    // olmadigi surece dil efekti ilgili etiketi hic degistirmez, yani
    // EN modda etiketler index.html'deki degeriyle kalir.
    nav: { hero: "Index", about: "About", projects: "Projects", certificates: "Certificates", experience: "Experience", contact: "Contact" },
    menuLabel: "Menu",
    cta: "Open to internships",
    ctaTitle: ["Switch to light", "Switch to dark"],
    portfolio: "PORTFOLIO", locKey: "LOCATION",
    online: "online", scrollHint: "↳ scroll for more",
    specHead: "IDENTITY",
    spec: { handle: "handle", role: "role", uni: "university", focus: "focus", loc: "location", open: "open_to" },
    focusLine: "Artificial intelligence · Computer vision · Software",
    openLine: "internship · from October 2026",
    tagline: "Artificial Intelligence · Computer Vision · Software Development",
    firstName: "Talat", lastName: "Karasakal",
    bio: "I study computer engineering at Izmir University of Economics. I've worked on computer vision and desktop application projects; my interest sits on the side of architectural decisions and measurable results.",
    btnProjects: "View Projects", btnContact: "Get in touch",
    marquee: ["ARTIFICIAL INTELLIGENCE", "COMPUTER VISION", "OBJECT DETECTION", "DATASET DESIGN", "DESKTOP APPLICATIONS", "JAVA"],
    aboutTitle: "About",
    lede: "Being able to explain why a system is built the way it is, is harder and worth more than getting it to run.",
    ledeEm: "why a system is built the way it is",
    aboutP1: "I study computer engineering and mostly work on desktop applications and computer vision. The part of a job that interests me most is where the options get compared: which model, which library, which dataset design was chosen and why. I care about the difference between being able to use a tool and being able to explain why you picked it.",
    aboutP2: "My most substantial work so far was the TEKNOFEST 2026 Smart Road Safety competition, where I was responsible for the AI side in a three-person team: I mapped ten separate datasets onto a single class schema, built a split that prevents data leakage, and chose between two model sizes by benchmarking them on my own hardware. The lasting lesson was that how a dataset is constructed can matter more than which model you pick.",
    aboutP3: "My near-term goal is a software internship in the 2026-2027 window; longer term I aim to work in the Turkish defence industry and enterprise technology.",
    nowTag: "NOW",
    now: [
    ["Learning", "C# and .NET · ASP.NET Core · Entity Framework Core · machine learning"],
    ["Building", "Personal projects and this portfolio"],
    ["Planning", "Final-year capstone project"]],

    skillLearnBadge: "learning",
    langTitle: "Languages",
    projTitle: "Projects",
    tierFeatured: "Featured", tierProject: "Projects", tierPersonal: "Other work",
    decisionsLabel: "Decisions", outcomeLabel: "Outcome",
    liveLabel: "live demo", sheetClose: "Close",
    seeMore: "Show all", seeLess: "Show less", showPersonal: "Show other work",
    seeAll: "See all repositories on GitHub",
    certTitle: "Certificates",
    expTitle: "Experience",
    contactTitle: "Contact",
    contactLede: "Get in touch about internship opportunities and project collaborations.",
    emailLabel: "EMAIL",
    cvLabel: "Download CV (PDF)",
    avail: "Open to internships from October 2026",
    socialLabels: { GitHub: "GitHub", LinkedIn: "LinkedIn", Email: "Email" },
    footer: ["© 2026 — Talat Karasakal", "Türkiye"]
  }
};

const isUrl = (u) => typeof u === "string" && /^https?:\/\//.test(u);

// First `n` sentences of a paragraph — the mobile teaser for long blocks.
const excerpt = (s, n) => {
  if (!s) return "";
  const parts = s.match(/[^.!?]+[.!?]+/g);
  return parts ? parts.slice(0, n || 2).join(" ").trim() : s;
};

/* =========================================================================
   MOTIFS
   ========================================================================= */

// Hero medallion: an 8-fold girih rosette.
function SeljukMedallion({ className }) {
  const oct = (r, rot) =>
  Array.from({ length: 8 }).map((_, i) => {
    const a = i * Math.PI / 4 + rot * Math.PI / 180;
    return `${(Math.cos(a) * r).toFixed(2)},${(Math.sin(a) * r).toFixed(2)}`;
  }).join(" ");

  const starPts = Array.from({ length: 16 }).map((_, i) => {
    const a = i * Math.PI / 8 - Math.PI / 2;
    const rr = i % 2 === 0 ? 70 : 29;
    return [Math.cos(a) * rr, Math.sin(a) * rr];
  });
  const starD = "M" + starPts.map((p) => `${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" L ") + " Z";

  const spokes = Array.from({ length: 16 }).map((_, i) => {
    const a = i * Math.PI / 8;
    return [Math.cos(a) * 14, Math.sin(a) * 14, Math.cos(a) * 92, Math.sin(a) * 92];
  });

  return (
    <svg viewBox="-100 -100 200 200" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="0.7">
        <circle r="92" />
        <circle r="70" />
        <polygon points={oct(70, 0)} />
        <polygon points={oct(70, 22.5)} />
        <rect x="-49.5" y="-49.5" width="99" height="99" />
        <rect x="-49.5" y="-49.5" width="99" height="99" transform="rotate(45)" />
        <path d={starD} strokeWidth="0.9" />
        <polygon points={oct(40, 22.5)} />
        <circle r="29" />
        <circle r="14" />
        {spokes.map((s, i) =>
        <line key={i} x1={s[0].toFixed(2)} y1={s[1].toFixed(2)} x2={s[2].toFixed(2)} y2={s[3].toFixed(2)} />
        )}
      </g>
    </svg>);

}

// Brand mark — Rub el Hizb seal.
function StarMark() {
  return (
    <svg viewBox="-10 -10 20 20" className="mark-star" aria-hidden="true">
      <g fill="currentColor">
        <rect x="-7" y="-7" width="14" height="14" />
        <rect x="-7" y="-7" width="14" height="14" transform="rotate(45)" opacity="0.55" />
      </g>
    </svg>);

}

const STAR_SVG_DATA = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='-100 -100 200 200'>
    <g fill='none' stroke='%23B23A4B' stroke-width='1.2'>
      <rect x='-60' y='-60' width='120' height='120'/>
      <rect x='-60' y='-60' width='120' height='120' transform='rotate(45)'/>
      <circle r='84'/><circle r='42'/>
    </g>
  </svg>`
)}`;

/* -------------------------------------------------------------------------
   Animal dividers — each kind maps to a portrait image in assets/, framed
   in a circular ring that follows the theme's line/muted tones.
   ------------------------------------------------------------------------- */
const __R = {};
const ANIMAL_IMAGES = { kurt: __R.kurt || "assets/kurt.webp", kartal: __R.kartal || "assets/kartal.webp", at: __R.at || "assets/at.webp", geyik: __R.geyik || "assets/geyik.webp" };

function AnimalGlyph({ kind }) {
  return <img className="hero-tail-img" src={ANIMAL_IMAGES[kind]} alt="" />;
}

function Divider({ kind }) {
  const ref = useRef(null);
  const figRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const narrow = useMediaQuery("(max-width: 640px)");

  useEffect(() => {
    if (reduced || narrow) return;
    return subscribeScroll((y) => {
      if (!ref.current || !figRef.current) return;
      const top = ref.current.getBoundingClientRect().top + y;
      const shift = Math.max(-24, Math.min(24, (y - top + window.innerHeight * 0.5) * 0.03));
      figRef.current.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
    });
  }, [reduced, narrow]);

  return (
    <div className="divider" ref={ref} aria-hidden="true">
      <div className="divider-rule" />
      <div className="divider-figure" ref={figRef}>
        <img src={ANIMAL_IMAGES[kind]} alt="" />
      </div>
      <div className="divider-rule" />
    </div>);

}

/* =========================================================================
   ATMOSPHERE + UTILITIES
   ========================================================================= */
function Atmosphere() {
  return (
    <div className="atmosphere" aria-hidden="true">
      <div className="atm-blob atm-red" />
      <div className="atm-blob atm-blue" />
      <div className="atm-grain" />
      <div className="atm-vignette" />
    </div>);

}

// Scroll position lives outside React entirely: one rAF loop eases the raw
// window.scrollY toward a damped `current` value and writes it to CSS custom
// properties on <html> (--scroll-y, --scroll-progress), so parallax/glow
// layers read it via CSS and no component re-renders on scroll. Per-element
// consumers (e.g. Divider) can subscribeScroll() to get the eased value too.
const scrollSubscribers = new Set();
function subscribeScroll(fn) {
  scrollSubscribers.add(fn);
  return () => scrollSubscribers.delete(fn);
}

// Programmatic (nav-jump) scrolls move window.scrollY hundreds of px in one
// frame; the eased loop below would crawl after it for ~1s. beginScrollJump()
// tells the loop to snap `current` straight to the target instead of easing.
let isJumping = false;
let jumpClearTimer = 0;
function beginScrollJump() {
  isJumping = true;
  clearTimeout(jumpClearTimer);
  const clear = () => {isJumping = false;window.removeEventListener("scrollend", clear);};
  window.addEventListener("scrollend", clear);
  jumpClearTimer = setTimeout(clear, 900);
}

function ScrollDriver() {
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    const root = document.documentElement;
    const nav = document.querySelector(".nav");
    const setNavH = () => {if (nav) root.style.setProperty("--nav-h", nav.getBoundingClientRect().height + "px");};
    setNavH();
    window.addEventListener("resize", setNavH);
    if (reduced) {
      root.style.setProperty("--scroll-y", "0");
      root.style.setProperty("--scroll-progress", "0");
      return () => window.removeEventListener("resize", setNavH);
    }
    let raw = window.scrollY;
    let current = window.scrollY;
    let raf = 0;
    const onScroll = () => {raw = window.scrollY;};
    const snapNow = () => {current = window.scrollY;raw = current;};
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", snapNow);
    const loop = () => {
      if (isJumping || Math.abs(raw - current) > 400) {
        current = raw;
      } else {
        current += (raw - current) * 0.12;
        if (Math.abs(raw - current) < 0.02) current = raw;
      }
      const maxScroll = root.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? current / maxScroll : 0;
      root.style.setProperty("--scroll-y", current.toFixed(2));
      root.style.setProperty("--scroll-progress", progress.toFixed(4));
      scrollSubscribers.forEach((fn) => fn(current, progress));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {window.removeEventListener("scroll", onScroll);window.removeEventListener("resize", snapNow);window.removeEventListener("resize", setNavH);cancelAnimationFrame(raf);};
  }, [reduced]);
  return null;
}

function ScrollProgress() {
  return <div className="scroll-progress" aria-hidden="true" />;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

// Page-level reveals for static blocks.
function useReveal(deps) {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.is-visible)");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {if (e.isIntersecting) {e.target.classList.add("is-visible");obs.unobserve(e.target);}}),
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, deps || []);
}

// Self-observing reveal — used by anything that mounts/unmounts (filtered cards).
function useRevealRef() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {if (e.isIntersecting) {el.classList.add("is-visible");obs.disconnect();}},
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* =========================================================================
   NAV
   ========================================================================= */
const SECTIONS = ["hero", "about", "projects", "certificates", "experience", "contact"];

function Nav({ active, onJump, theme, onToggleTheme, lang, onLang, t, showBrand }) {
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    if (!menu) return;
    const close = () => setMenu(false);
    const onKey = (e) => {if (e.key === "Escape") setMenu(false);};
    window.addEventListener("scroll", close, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {window.removeEventListener("scroll", close);window.removeEventListener("keydown", onKey);};
  }, [menu]);

  const items = SECTIONS.map((id, i) => ({ id, label: t.nav[id], num: "0" + (i + 1) }));

  return (
    <nav className="nav">
      <div className="nav-inner">
        <button className={"nav-mark" + (showBrand ? " is-shown" : "")} onClick={() => onJump("hero")} tabIndex={showBrand ? 0 : -1} aria-hidden={!showBrand}>
          <StarMark />
          <span>Talat Karasakal</span>
        </button>
        <ul className="nav-links">
          {items.map((it) =>
          <li key={it.id}>
              <button className={"nav-link" + (active === it.id ? " is-active" : "")} onClick={() => onJump(it.id)}>
                <span className="nav-link-num">{it.num}</span>
                <span>{it.label}</span>
              </button>
            </li>
          )}
        </ul>
        <div className="nav-right">
          <button className="nav-menu-btn" aria-label={t.menuLabel} aria-expanded={menu} onClick={() => setMenu(!menu)}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2 4h12M2 8h12M2 12h12" strokeLinecap="round" /></svg>
          </button>
          <div className="lang-switch nav-btn" role="group" aria-label="Language">
            <button className={"lang-opt" + (lang === "tr" ? " is-active" : "")} onClick={() => onLang("tr")}>TR</button>
            <button className={"lang-opt" + (lang === "en" ? " is-active" : "")} onClick={() => onLang("en")}>EN</button>
            <span className="lang-pill" data-pos={lang} />
          </div>
          <button className="theme-toggle nav-btn" onClick={onToggleTheme}
          aria-label={theme === "dark" ? t.ctaTitle[0] : t.ctaTitle[1]}
          title={theme === "dark" ? t.ctaTitle[0] : t.ctaTitle[1]}>
            {theme === "dark" ?
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" strokeLinecap="round" />
              </svg> :

            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" strokeLinejoin="round" />
              </svg>
            }
          </button>
          <a className="nav-cta nav-btn" href="#contact" onClick={(e) => {e.preventDefault();onJump("contact");}}>
            <span>{t.cta}</span>
            <span className="pulse" />
          </a>
        </div>
      </div>
      {menu &&
      <div className="nav-panel">
          {items.map((it) =>
        <button key={it.id} className={"nav-panel-item" + (active === it.id ? " is-active" : "")} onClick={() => {setMenu(false);onJump(it.id);}}>
              <span>{it.num}</span><span>{it.label}</span>
            </button>
        )}
          <div className="nav-panel-tools">
            <div className="lang-switch nav-btn" role="group" aria-label="Language">
              <button className={"lang-opt" + (lang === "tr" ? " is-active" : "")} onClick={() => onLang("tr")}>TR</button>
              <button className={"lang-opt" + (lang === "en" ? " is-active" : "")} onClick={() => onLang("en")}>EN</button>
              <span className="lang-pill" data-pos={lang} />
            </div>
            <button className="theme-toggle nav-btn" onClick={onToggleTheme}
          aria-label={theme === "dark" ? t.ctaTitle[0] : t.ctaTitle[1]}
          title={theme === "dark" ? t.ctaTitle[0] : t.ctaTitle[1]}>
              {theme === "dark" ?
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" strokeLinecap="round" />
                </svg> :

            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" strokeLinejoin="round" />
                </svg>
            }
            </button>
          </div>
        </div>
      }
      <div className="nav-glow" />
      <ScrollProgress />
    </nav>);

}

/* =========================================================================
   HERO
   ========================================================================= */
function Hero({ onJump, t }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Istanbul", hour: "2-digit", minute: "2-digit", hour12: false
    });
    const tick = () => setTime(`${fmt.format(new Date())} TRT`);
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);

  const glyphStyle = { transform: "translate3d(0, calc(var(--scroll-y, 0) * 0.4px), 0) rotate(calc(var(--scroll-y, 0) * 0.06deg))" };
  const metaStyle = { transform: "translate3d(0, calc(var(--scroll-y, 0) * -0.15px), 0)", opacity: "clamp(0, calc(1 - (var(--scroll-y, 0) / 600)), 1)" };
  const leftStyle = { transform: "translate3d(0, calc(var(--scroll-y, 0) * -0.06px), 0)" };
  const rightStyle = { transform: "translate3d(0, calc(var(--scroll-y, 0) * -0.22px), 0)" };

  const renderTitle = (s, accent) =>
  <span className={"hero-line" + (accent ? " hero-line-accent" : "")}>
      {s.split("").map((ch, i) =>
    <span key={i} className="t-letter" style={{ "--i": i }}>{ch === " " ? "\u00a0" : ch}</span>
    )}
      {accent && <span className="title-cursor">_</span>}
    </span>;


  return (
    <section id="hero" className="hero" data-screen-label="Hero">
      <div className="hero-glyph" style={glyphStyle}><SeljukMedallion /></div>

      <div className="hero-meta" style={metaStyle}>
        <div className="meta-row">
          <span className="meta-key">{t.portfolio}</span>
          <span className="meta-sep" />
          <span className="meta-val">{time}</span>
        </div>
        <div className="meta-row">
          <span className="meta-key">{t.locKey}</span>
          <span className="meta-sep" />
          <span className="meta-val">{t.location}</span>
        </div>
      </div>

      <div className="hero-grid">
        <div className="hero-left" style={leftStyle}>
          <div className="hero-eyebrow">
            <span className="eyebrow-dot" />
            <b>{t.role}</b>
          </div>
          <h1 className="hero-title">
            {renderTitle(t.firstName, false)}
            {renderTitle(t.lastName, true)}
          </h1>
          <div className="hero-subtitle">{t.tagline}</div>
          <div className="hero-bio"><p>{t.bio}</p></div>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => onJump("projects")}>
              <span>{t.btnProjects}</span>
              <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="square" /></svg>
            </button>
            <button className="btn btn-ghost" onClick={() => onJump("contact")}>{t.btnContact}</button>
          </div>
        </div>

        <div className="hero-right" style={rightStyle}>
          <div className="card-spec">
            <div className="spec-head">
              <span className="spec-label">{t.specHead}</span>
              <span className="spec-status"><span className="status-dot" /> {t.online}</span>
            </div>
            <dl className="spec-list">
              <div><dt>{t.spec.handle}</dt><dd>TalatKarasakal</dd></div>
              <div><dt>{t.spec.role}</dt><dd>{t.role}</dd></div>
              <div><dt>{t.spec.uni}</dt><dd>{t.university}</dd></div>
              <div><dt>{t.spec.focus}</dt><dd>{t.focusLine}</dd></div>
              <div><dt>{t.spec.loc}</dt><dd>{t.location}</dd></div>
              <div><dt>{t.spec.open}</dt><dd>{t.openLine}</dd></div>
            </dl>
            <div className="spec-foot">
              <button className="scroll-hint" onClick={() => onJump("about")}>{t.scrollHint}</button>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-marquee" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, kk) =>
          <div key={kk} className="marquee-row">
              {[...t.marquee, ...t.marquee, ...t.marquee].map((w, j) =>
            <React.Fragment key={j}><span>{w}</span><i /></React.Fragment>
            )}
            </div>
          )}
        </div>
      </div>
      <div className="hero-tail" aria-hidden="true"><SeljukMedallion className="hero-tail-star" /></div>
    </section>);

}

/* =========================================================================
   ABOUT
   ========================================================================= */
function About({ t, lang }) {
  const parts = t.lede.split(t.ledeEm);
  let numbered = 0;
  return (
    <section id="about" className="section about" data-screen-label="About">
      <SectionHead num="02" title={t.aboutTitle} />
      <div className="about-grid">
        <div className="about-prose reveal">
          <p className="lede">{parts[0]}<em>{t.ledeEm}</em>{parts[1]}</p>
          <p>{t.aboutP1}</p>
          <p>{t.aboutP2}</p>
          <p>{t.aboutP3}</p>
          <div className="about-now">
            <div className="now-tag">{t.nowTag}</div>
            <ul>{t.now.map(([k, v], i) => <li key={i}>{k} — <b>{v}</b></li>)}</ul>
          </div>
        </div>
        <div className="about-side reveal">
          {SKILLS.map((g, i) => {
          const items = lang === "en" && g.itemsEn ? g.itemsEn : g.items;
          const num = g.secondary ? null : String(++numbered).padStart(2, "0");
          return (
            <div key={i} className={"skill-block" + (g.learning ? " is-learning" : "") + (g.secondary ? " is-secondary" : "")}>
              <div className="skill-head">
                {num && <span className="skill-num">{num}</span>}
                <span className="skill-group">
                  {lang === "tr" ? g.tr : g.en}
                </span>
              </div>
              <ul className="skill-items">{items.map((it) => <li key={it}>{it}</li>)}</ul>
            </div>);

          })}
          <div className="lang-block">
            <div className="skill-head"><span className="skill-group">{t.langTitle}</span></div>
            <ul className="lang-list">
              {LANGUAGES.map((l, i) =>
              <li key={i}>
                  <span className="lang-name"><StarMark /><span>{lang === "tr" ? l.tr : l.en}</span></span>
                  <span className="lang-level">{lang === "tr" ? l.levelTr : l.levelEn}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>);

}

/* =========================================================================
   PROJECTS
   ========================================================================= */
function Projects({ t, lang }) {
  const compact = useMediaQuery("(max-width: 900px)");
  const [openId, setOpenId] = useState(null);
  const [showPersonal, setShowPersonal] = useState(false);
  const featured = PROJECTS.filter((p) => p.tier === "featured");
  const projects = PROJECTS.filter((p) => p.tier === "project");
  const personal = PROJECTS.filter((p) => p.tier === "personal");
  const openProject = PROJECTS.find((p) => p.id === openId) || null;

  function renderTier(label, list, variant) {
    if (list.length === 0) return null;
    return (
      <React.Fragment>
        <div className="tier-label">{label}</div>
        {variant === "personal" ?
        <ul className="personal-grid">
            {list.map((p, i) => <PersonalCard key={p.id} project={p} index={i} lang={lang} t={t} onOpen={setOpenId} />)}
          </ul> :
        compact ?
        <ul className="crow-list">
            {list.map((p, i) => <CompactProjectRow key={p.id} project={p} index={i} lang={lang} t={t} onOpen={setOpenId} />)}
          </ul> :

        <div className={variant === "featured" ? "proj-featured-grid" : "proj-grid"}>
            {list.map((p, i) => <ProjectCard key={p.id} project={p} index={i} lang={lang} t={t} variant={variant} />)}
          </div>
        }
      </React.Fragment>);

  }

  return (
    <section id="projects" className="section projects" data-screen-label="Projects">
      <SectionHead num="03" title={t.projTitle} />
      {renderTier(t.tierFeatured, featured, "featured")}
      {renderTier(t.tierProject, projects, "project")}
      {compact && !showPersonal ?
      <div className="show-more-wrap">
          <button className="ghost-link show-more" onClick={() => setShowPersonal(true)}>
            {t.showPersonal} ({personal.length})
          </button>
        </div> :
      renderTier(t.tierPersonal, personal, "personal")
      }

      <div className="proj-foot reveal">
        <a className="ghost-link" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
          {t.seeAll}
          <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path d="M5 3l8 5-8 5V3z" fill="currentColor" /></svg>
        </a>
      </div>
      <ProjectSheet project={openProject} lang={lang} t={t} onClose={() => setOpenId(null)} />
    </section>);

}

function CompactProjectRow({ project, index, lang, t, onOpen }) {
  const ref = useRevealRef();
  const role = lang === "tr" ? project.roleTr : project.roleEn;
  const statusLabel = project.status && STATUS_LABELS[project.status] ? STATUS_LABELS[project.status][lang] : null;
  return (
    <li ref={ref} className="crow reveal" style={{ "--stagger": index % 6 * 40 + "ms" }}>
      <button className="crow-btn" onClick={() => onOpen(project.id)} aria-haspopup="dialog">
        <span className="crow-top">
          {statusLabel && <span className="status-pill">{statusLabel}</span>}
          <span className="crow-title">{project.title}</span>
        </span>
        {role && <span className="crow-role">{role}</span>}
        <span className="crow-tags">{project.tags.slice(0, 4).map((s) => <span key={s}>{s}</span>)}</span>
        <span className="crow-chevron" aria-hidden="true">›</span>
      </button>
    </li>);

}

// Body-scroll lock + focus trap shared by every bottom-sheet dialog.
function useSheetBehavior(active, onClose, panelRef, closeBtnRef) {
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    if (!active) return;
    const prevActive = document.activeElement;
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = -scrollY + "px";
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    const raf = requestAnimationFrame(() => {if (closeBtnRef.current) closeBtnRef.current.focus({ preventScroll: true });});
    function onKey(e) {
      if (e.key === "Escape") {closeRef.current();return;}
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"])');
        if (focusables.length === 0) return;
        const first = focusables[0], last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {e.preventDefault();last.focus();} else
        if (!e.shiftKey && document.activeElement === last) {e.preventDefault();first.focus();}
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
      if (prevActive && prevActive.focus) prevActive.focus();
    };
  }, [active]);
}

function ProjectSheet({ project, lang, t, onClose }) {
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);

  useSheetBehavior(project, onClose, panelRef, closeBtnRef);

  if (!project) return null;

  const role = lang === "tr" ? project.roleTr : project.roleEn;
  const desc = lang === "tr" ? project.descTr : project.descEn;
  const decisions = lang === "tr" ? project.decisionsTr : project.decisionsEn;
  const outcome = lang === "tr" ? project.outcomeTr : project.outcomeEn;
  const statusLabel = project.status && STATUS_LABELS[project.status] ? STATUS_LABELS[project.status][lang] : null;
  const period = lang === "en" && project.periodEn ? project.periodEn : project.period;
  const repo = isUrl(project.repoUrl) ? project.repoUrl : null;
  const live = isUrl(project.liveUrl) ? project.liveUrl : null;

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet-panel" ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="sheet-title" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" aria-hidden="true" />
        <button className="sheet-close" ref={closeBtnRef} onClick={onClose} aria-label={t.sheetClose}>×</button>
        <div className="sheet-head">
          {statusLabel && <span className="status-pill">{statusLabel}</span>}
          <h3 id="sheet-title" className="sheet-title">{project.title}</h3>
          {role && <div className="pcard-role">{role}</div>}
        </div>
        <p className="pcard-desc">{desc}</p>
        <div className="pcard-stack">{project.tags.map((s) => <span key={s} className="stack-pill">{s}</span>)}</div>
        <MediaList items={project.media} lang={lang} />
        {(decisions && decisions.length > 0 || outcome) &&
        <div className="pcard-detail">
            {decisions && decisions.length > 0 &&
          <div>
                <div className="pcard-block-label">{t.decisionsLabel}</div>
                <ul className="pcard-decisions">{decisions.map((d, i) => <li key={i}>{d}</li>)}</ul>
              </div>
          }
            {outcome &&
          <div>
                <div className="pcard-block-label">{t.outcomeLabel}</div>
                <p className="pcard-outcome">{outcome}</p>
              </div>
          }
          </div>
        }
        <footer className="pcard-foot">
          <span className="pcard-year">{period || ""}</span>
          <span className="pcard-links">
            {live && <a className="pcard-link is-live" href={live} target="_blank" rel="noopener noreferrer">{t.liveLabel}</a>}
            {repo &&
          <a className="pcard-link" href={repo} target="_blank" rel="noopener noreferrer">
                <GithubIcon />{repo.replace(/^https?:\/\//, "")}
              </a>
          }
          </span>
        </footer>
      </div>
    </div>);

}

function GithubIcon() {
  return <svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.34c-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.89-1.18-.89-1.18-.73-.5.05-.49.05-.49.81.06 1.23.83 1.23.83.72 1.23 1.89.87 2.35.67.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.83-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.52.56.83 1.28.83 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 8 0z" /></svg>;
}

function MediaList({ items, lang }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="media-list">
      {items.map((m, i) => {
        const cap = lang === "en" ? m.en : m.tr;
        return (
          <figure key={i} className="media-item">
            <div className="media-frame">
              {m.type === "video" ?
              <video src={m.src} controls muted playsInline preload="metadata" /> :
              <img src={m.src} alt={cap || ""} loading="lazy" decoding="async" />
              }
            </div>
            {cap && <figcaption className="media-cap">{cap}</figcaption>}
          </figure>);

      })}
    </div>);

}

function MediaSheet({ project, lang, t, onClose }) {
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);
  useSheetBehavior(project, onClose, panelRef, closeBtnRef);
  if (!project) return null;
  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet-panel is-media" ref={panelRef} role="dialog" aria-modal="true"
        aria-labelledby="media-sheet-title" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" aria-hidden="true" />
        <button className="sheet-close" ref={closeBtnRef} onClick={onClose} aria-label={t.sheetClose}>×</button>
        <div className="sheet-head">
          <h3 id="media-sheet-title" className="sheet-title">{project.title}</h3>
        </div>
        <MediaList items={project.media} lang={lang} />
      </div>
    </div>);

}


function MediaButton({ lang, onClick }) {
  return (
    <button type="button" className="media-btn" onClick={onClick}>
      <span className="media-btn-mark" aria-hidden="true"><StarMark /></span>
      {lang === "en" ? "Media" : "Medya"}
    </button>);

}

function ProjectCard({ project, index, lang, t, variant }) {
  const ref = useRevealRef();
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [mediaOpen, setMediaOpen] = useState(false);
  const featured = variant === "featured";
  const accentClass = featured ? "" : " pcard-blue";

  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    setPos({ x: (e.clientX - r.left) / r.width * 100, y: (e.clientY - r.top) / r.height * 100 });
  }

  const repo = isUrl(project.repoUrl) ? project.repoUrl : null;
  const live = isUrl(project.liveUrl) ? project.liveUrl : null;
  const primary = live || repo;
  const role = lang === "tr" ? project.roleTr : project.roleEn;
  const decisions = lang === "tr" ? project.decisionsTr : project.decisionsEn;
  const outcome = lang === "tr" ? project.outcomeTr : project.outcomeEn;
  const statusLabel = project.status && STATUS_LABELS[project.status] ? STATUS_LABELS[project.status][lang] : null;
  const period = lang === "en" && project.periodEn ? project.periodEn : project.period;

  const titleInner =
  <React.Fragment>
      <span>{project.title}</span>
      {primary &&
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" style={{ flexShrink: 0, opacity: 0.5 }}>
          <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="square" />
        </svg>
    }
    </React.Fragment>;

  const name =
  <h3 className="pcard-name">
      {primary ?
    <a href={primary} target="_blank" rel="noopener noreferrer">{titleInner}</a> :
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>{titleInner}</span>
    }
    </h3>;

  const main =
  <React.Fragment>
      {name}
      {role && <div className="pcard-role">{role}</div>}
      <p className="pcard-desc">{lang === "tr" ? project.descTr : project.descEn}</p>
      <div className="pcard-stack">{project.tags.map((s) => <span key={s} className="stack-pill">{s}</span>)}</div>
    </React.Fragment>;

  const detail = (decisions && decisions.length > 0) || outcome ?
  <div className="pcard-detail">
      {decisions && decisions.length > 0 &&
    <div>
          <div className="pcard-block-label">{t.decisionsLabel}</div>
          <ul className="pcard-decisions">{decisions.map((d, i) => <li key={i}>{d}</li>)}</ul>
        </div>
    }
      {outcome &&
    <div>
          <div className="pcard-block-label">{t.outcomeLabel}</div>
          <p className="pcard-outcome">{outcome}</p>
        </div>
    }
    </div> :
  null;

  return (
    <article ref={ref}
    className={"pcard is-" + variant + accentClass + " reveal reveal-card"}
    onMouseMove={onMove}
    style={{ "--mx": pos.x + "%", "--my": pos.y + "%", "--stagger": index * 70 + "ms" }}>
      <div className="pcard-glow" />
      <div className="pcard-border" />

      <header className="pcard-head">
        <div className="pcard-headline">
          {!featured && <span className="pcard-id">{String(index + 1).padStart(2, "0")}</span>}
          {statusLabel && <span className="status-pill">{statusLabel}</span>}
          {period && <span className="pcard-year-inline">{period}</span>}
        </div>
        <span className="pcard-tag">{project.category}</span>
      </header>

      {featured ?
      <div className="pcard-body">
          <div className="pcard-main">{main}</div>
          {detail}
        </div> :
      <React.Fragment>{main}{detail}</React.Fragment>
      }

      <footer className="pcard-foot">
        <span className="pcard-foot-left">
          {project.media && project.media.length > 0 &&
        <MediaButton lang={lang} onClick={() => setMediaOpen(true)} />
        }
        </span>
        <span className="pcard-links">
          {live &&
        <a className="pcard-link is-live" href={live} target="_blank" rel="noopener noreferrer">{t.liveLabel}</a>
        }
          {repo &&
        <a className="pcard-link" href={repo} target="_blank" rel="noopener noreferrer">
              <GithubIcon />{repo.replace(/^https?:\/\//, "")}
            </a>
        }
        </span>
      </footer>
      {mediaOpen && <MediaSheet project={project} lang={lang} t={t} onClose={() => setMediaOpen(false)} />}
    </article>);

}

function PersonalCard({ project, index, lang, t, onOpen }) {
  const ref = useRevealRef();
  const period = lang === "en" && project.periodEn ? project.periodEn : project.period;
  const statusLabel = project.status && STATUS_LABELS[project.status] ?
  STATUS_LABELS[project.status][lang === "en" ? "en" : "tr"] : null;

  return (
    <li ref={ref} className="reveal" style={{ "--stagger": index % 8 * 40 + "ms" }}>
      <button className="pcard-mini" onClick={() => onOpen(project.id)} aria-haspopup="dialog">
        <div className="pcard-mini-head">
          <span className="pcard-mini-title">{project.title}</span>
          <span className="pcard-mini-year">{period || ""}</span>
        </div>
        <div className="pcard-mini-tags">{project.tags.slice(0, 3).map((s) => <span key={s}>{s}</span>)}</div>
        <div className="pcard-mini-foot">
          {statusLabel && <span className="status-pill is-mini">{statusLabel}</span>}
          <span className="pcard-mini-arrow" aria-hidden="true">›</span>
        </div>
      </button>
    </li>);

}

/* =========================================================================
   CERTIFICATES
   ========================================================================= */
function CertThumb({ img, name, initials }) {
  const [broken, setBroken] = useState(false);
  if (img && !broken) {
    return (
      <span className="cert-thumb has-image">
        <img src={img} alt="" loading="lazy" decoding="async" onError={() => setBroken(true)} />
      </span>);
  }
  return <span className="cert-thumb is-empty" aria-hidden="true"><span className="cert-initials">{initials}</span></span>;
}

function Certificates({ t, lang }) {
  const pick = (c, key) => lang === "en" && c[key + "En"] ? c[key + "En"] : c[key];
  const [shot, setShot] = useState(null);
  const compact = useMediaQuery("(max-width: 900px)");
  const [showAllCerts, setShowAllCerts] = useState(false);
  const visibleCerts = compact && !showAllCerts ? CERTIFICATES.slice(0, 4) : CERTIFICATES;

  useEffect(() => {
    if (!shot) return;
    const onKey = (e) => {if (e.key === "Escape") setShot(null);};
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shot]);

  const initialsOf = (s) => (s || "").split(/[\s·/–-]+/).filter(Boolean).slice(0, 2).
  map((w) => w[0]).join("").toLocaleUpperCase("tr");

  return (
    <section id="certificates" className="section" data-screen-label="Certificates">
      <SectionHead num="04" title={t.certTitle} />
      <div className="cert-list reveal">
        {visibleCerts.map((c, i) => {
          const name = pick(c, "name");
          const issuer = pick(c, "issuer");
          const img = typeof c.image === "string" && c.image.trim() !== "" ? c.image : null;
          const open = () => setShot({ src: img, alt: name, issuer: issuer, date: pick(c, "date"), original: c.originalName && c.originalName !== name ? c.originalName : null });
          const Tag = img ? "button" : "div";
          return (
            <Tag key={i} className={"cert-row" + (img ? " is-clickable" : "")}
              {...img ? { onClick: open, type: "button", "aria-label": name } : {}}>
              <CertThumb img={img} name={name} initials={initialsOf(issuer)} />
              <div className="cert-text">
                <div className="cert-name">{name}</div>
                <div className="cert-date">{pick(c, "date")}</div>
                <div className="cert-issuer">{issuer}</div>
              </div>
            </Tag>);

        })}
      </div>
      {compact && CERTIFICATES.length > 4 &&
      <div className="show-more-wrap is-tight">
          <button className="ghost-link show-more" onClick={() => setShowAllCerts(!showAllCerts)}>
            {showAllCerts ? t.seeLess : t.seeMore + " (" + CERTIFICATES.length + ")"}
          </button>
        </div>
      }
      {shot && <CertSheet cert={shot} t={t} onClose={() => setShot(null)} />}
    </section>);

}

function CertSheet({ cert, t, onClose }) {
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);

  useSheetBehavior(cert, onClose, panelRef, closeBtnRef);

  if (!cert) return null;

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet-panel is-cert" ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="cert-sheet-title" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" aria-hidden="true" />
        <button className="sheet-close" ref={closeBtnRef} onClick={onClose} aria-label={t.sheetClose}>×</button>
        <div className="sheet-head">
          <h3 id="cert-sheet-title" className="sheet-title">{cert.alt}</h3>
          <div className="cert-sheet-meta">
            <span className="cert-issuer-chip">{cert.issuer}</span>
            {cert.date && <span className="cert-sheet-date">{cert.date}</span>}
          </div>
        </div>
        {cert.src &&
        <div className="cert-shot">
            <img src={cert.src} alt={cert.alt} />
          </div>
        }
      </div>
    </div>);

}

/* =========================================================================
   EXPERIENCE
   ========================================================================= */
function CompactExpRow({ item, index, lang, t, onOpen }) {
  const ref = useRevealRef();
  const period = lang === "en" && item.periodEn ? item.periodEn : item.period;
  const desc = lang === "tr" ? item.descTr : item.descEn;
  return (
    <li ref={ref} className="crow reveal" style={{ "--stagger": index % 6 * 40 + "ms" }}>
      <button className="crow-btn" onClick={() => onOpen(index)} aria-haspopup="dialog">
        <span className="crow-period">{period}</span>
        <span className="crow-title">{lang === "tr" ? item.roleTr : item.roleEn}</span>
        <span className="crow-role">{lang === "tr" ? item.orgTr : item.orgEn}</span>
        <span className="crow-excerpt">{excerpt(desc, 2)}</span>
        <span className="crow-chevron" aria-hidden="true">›</span>
      </button>
    </li>);

}

function ExperienceSheet({ item, lang, t, onClose }) {
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);

  useSheetBehavior(item, onClose, panelRef, closeBtnRef);

  if (!item) return null;
  const period = lang === "en" && item.periodEn ? item.periodEn : item.period;

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet-panel" ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="exp-sheet-title" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" aria-hidden="true" />
        <button className="sheet-close" ref={closeBtnRef} onClick={onClose} aria-label={t.sheetClose}>×</button>
        <div className="sheet-head">
          <span className="crow-period">{period}</span>
          <h3 id="exp-sheet-title" className="sheet-title">{lang === "tr" ? item.roleTr : item.roleEn}</h3>
          <div className="pcard-role">{lang === "tr" ? item.orgTr : item.orgEn}</div>
        </div>
        <p className="pcard-desc">{lang === "tr" ? item.descTr : item.descEn}</p>
      </div>
    </div>);

}

function Experience({ t, lang }) {
  const compact = useMediaQuery("(max-width: 900px)");
  const [openIdx, setOpenIdx] = useState(null);
  const n = EXPERIENCE.length;
  const step = 92;
  const listRef = React.useRef(null);
  const [measured, setMeasured] = React.useState(0);
  const [rowTops, setRowTops] = React.useState([]);
  React.useLayoutEffect(() => {
    const fit = () => {
      const el = listRef.current;if (!el) return;
      const rows = Array.from(el.querySelectorAll(".exp-row-wrap"));
      if (rows.length === 0) return;
      const sideBottom = [0, 0];
      const tops = [];
      let prevTop = 0;
      rows.forEach((r, i) => {
        const side = i % 2;
        const start = i === 0 ? 0 : Math.max(sideBottom[side], prevTop + step);
        r.style.top = start + "px";
        prevTop = start;
        tops.push(start);
        sideBottom[side] = start + r.offsetHeight + 48;
      });
      setRowTops(tops);
      setMeasured(Math.ceil(Math.max(sideBottom[0], sideBottom[1])));
    };
    fit();
    window.addEventListener("resize", fit);
    const id = setTimeout(fit, 400);
    return () => {window.removeEventListener("resize", fit);clearTimeout(id);};
  }, [lang]);
  const totalHeight = measured || (n - 1) * step + 200;
  const roadPath = (offset) => {
    const cx = 45 + offset, amp = 34;
    const stops = rowTops.length === n ?
    rowTops.concat([totalHeight]) :
    Array.from({ length: n + 1 }, (_, i) => Math.min(i * step, totalHeight));
    let d = `M${cx},${stops[0].toFixed(0)}`;
    for (let i = 0; i < n; i++) {
      const a = stops[i], b = stops[i + 1];
      const seg = Math.max(b - a, 1);
      // Kivrim geometrisi her segmentte ayni: sabit bir "giris mesafesi" ve
      // sabit genlik. Segment kisaysa ikisi de ayni oranda kuculur, boylece
      // kivrilma acisi degismez.
      const lead = 72;
      const k = Math.min(1, seg / (lead * 2));
      const bulge = (i % 2 === 0 ? 45 - amp * k : 45 + amp * k) + offset;
      d += ` C${bulge},${(a + lead * k).toFixed(0)} ${bulge},${(b - lead * k).toFixed(0)} ${cx},${b.toFixed(0)}`;
    }
    return d;
  };
  if (compact) {
    return (
      <section id="experience" className="section" data-screen-label="Experience">
        <SectionHead num="05" title={t.expTitle} />
        <ul className="crow-list exp-compact">
          {EXPERIENCE.map((e, i) =>
          <CompactExpRow key={i} item={e} index={i} lang={lang} t={t} onOpen={setOpenIdx} />
          )}
        </ul>
        <ExperienceSheet item={openIdx === null ? null : EXPERIENCE[openIdx]} lang={lang} t={t} onClose={() => setOpenIdx(null)} />
      </section>);

  }

  return (
    <section id="experience" className="section" data-screen-label="Experience">
      <SectionHead num="05" title={t.expTitle} />
      <div className="exp-list reveal" ref={listRef} style={{ height: totalHeight + "px" }}>
        <svg className="exp-road" viewBox={"0 0 90 " + totalHeight} preserveAspectRatio="none" aria-hidden="true">
          <path className="exp-road-edge" d={roadPath(-6)} />
          <path className="exp-road-edge" d={roadPath(6)} />
          <path className="exp-road-dash" d={roadPath(0)} style={{ strokeDashoffset: "calc(var(--scroll-progress, 0) * -400)" }} />
        </svg>
        {EXPERIENCE.map((e, i) => {
          const period = lang === "en" && e.periodEn ? e.periodEn : e.period;
          return (
            <article key={i} className={"exp-row-wrap side-" + (i % 2 === 0 ? "left" : "right")} style={{ "--exp-top": "0px" }}>
              <span className="exp-connector" />
              <span className="exp-node" />
              <span className="exp-period">{period}</span>
              <div className="exp-row">
                <h3 className="exp-role">{lang === "tr" ? e.roleTr : e.roleEn}</h3>
                <div className="exp-org">{lang === "tr" ? e.orgTr : e.orgEn}</div>
                <p className="exp-desc">{lang === "tr" ? e.descTr : e.descEn}</p>
              </div>
            </article>);

        })}
      </div>
    </section>);

}

/* =========================================================================
   CONTACT
   ========================================================================= */
function Contact({ t }) {
  return (
    <section id="contact" className="section contact" data-screen-label="Contact">
      <Divider kind="geyik" />
      <SectionHead num="06" title={t.contactTitle} />
      <div className="contact-grid">
        <div className="contact-left reveal">
          <p className="contact-lede">{t.contactLede}</p>
          <a className="mailto" href={"mailto:" + EMAIL}>
            <span className="mailto-label">{t.emailLabel}</span>
            <span className="mailto-addr">{EMAIL}</span>
            <span className="mailto-arrow">↗</span>
          </a>
          {CV_URL !== "" &&
          <div className="cv-btn">
              <a className="btn btn-ghost" href={CV_URL} download rel="noopener">{t.cvLabel}</a>
            </div>
          }
        </div>
        <ul className="socials reveal">
          {SOCIALS.map((s, i) =>
          <li key={s.key} style={{ "--stagger": i * 60 + "ms" }}>
              <a href={s.href} className="social" target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                <span className="social-num">0{i + 1}</span>
                <span className="social-label">{t.socialLabels[s.key]}</span>
                <span className="social-handle">{s.handle}</span>
                <span className="social-arrow">→</span>
              </a>
            </li>
          )}
        </ul>
      </div>
      <footer className="footer">
        <div className="footer-star"><StarMark /></div>
        <div className="footer-cols">{t.footer.map((f, i) => <span key={i}>{f}</span>)}</div>
      </footer>
    </section>);

}

function SectionHead({ num, title }) {
  return (
    <header className="sec-head reveal">
      <div className="sec-num">{num}</div>
      <div className="sec-titles">
        <h2 className="sec-title">{title}</h2>
      </div>
      <div className="sec-rule" />
    </header>);

}

/* =========================================================================
   APP
   ========================================================================= */
function App() {
  const [active, setActive] = useState("hero");
  const [heroInView, setHeroInView] = useState(true);
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("tk-theme");
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem("tk-lang");
      if (saved === "tr" || saved === "en") return saved;
      const nav = (navigator.languages && navigator.languages[0]) || navigator.language || "tr";
      return String(nav).toLowerCase().startsWith("tr") ? "tr" : "en";
    } catch (e) {return "tr";}
  });
  const t = COPY[lang];
  const firstTheme = useRef(true);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.setProperty("--star-mask", `url("${STAR_SVG_DATA}")`);
    try {localStorage.setItem("tk-theme", theme);} catch (e) {}
    // The two glows park at each other's corner across themes; on a toggle they
    // cross the viewport, pass through one another and swap places.
    if (firstTheme.current) {firstTheme.current = false;return;}
    const root = document.documentElement;
    root.setAttribute("data-swap", "1");
    const id = setTimeout(() => root.removeAttribute("data-swap"), 1500);
    return () => clearTimeout(id);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    try {localStorage.setItem("tk-lang", lang);} catch (e) {}

    // Sayfa icerigi cevriliyordu ama sekme basligi ve meta etiketleri
    // index.html'deki Turkce degerde kaliyordu. Ceviri sozlugunde
    // karsiligi olmayan alan hic dokunulmadan birakilir; boylece bir
    // dilin metni yazilmamissa o etiket oldugu gibi kalir, bos kalmaz.
    const setMeta = (selector, value) => {
      if (!value) return;
      const el = document.querySelector(selector);
      if (el) el.setAttribute("content", value);
    };
    if (t.seoTitle) document.title = t.seoTitle;
    setMeta('meta[name="description"]', t.seoDescription);
    setMeta('meta[property="og:title"]', t.seoTitle);
    setMeta('meta[name="twitter:title"]', t.seoTitle);
    setMeta('meta[property="og:description"]', t.ogDescription);
    setMeta('meta[name="twitter:description"]', t.ogDescription);
    // Bunlar veriden turuyor, ceviri gerektirmiyor.
    setMeta('meta[property="og:locale"]', lang === "en" ? "en_US" : "tr_TR");
    setMeta('meta[property="og:locale:alternate"]', lang === "en" ? "tr_TR" : "en_US");
  }, [lang, t]);

  useEffect(() => {
    // Pick the last section whose top has crossed a fixed line near the
    // viewport top — robust to short/tall sections, unlike a narrow
    // IntersectionObserver band which can leave gaps where nothing toggles.
    function computeActive() {
      const line = window.innerHeight * 0.35;
      let current = SECTIONS[0];
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - line <= 0) current = id; else break;
      }
      setActive(current);
    }
    computeActive();
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {computeActive();ticking = false;});
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {window.removeEventListener("scroll", onScroll);window.removeEventListener("resize", onScroll);};
  }, []);

  useEffect(() => {
    const el = document.getElementById("hero");
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setHeroInView(e.isIntersecting), { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useReveal([lang]);

  function jump(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 60;
    const before = window.scrollY;
    beginScrollJump();
    window.scrollTo({ top, behavior: "smooth" });
    // Fallback: some engines ignore smooth window scrolling when an ancestor clips overflow.
    setTimeout(() => {if (Math.abs(window.scrollY - before) < 2 && Math.abs(top - before) > 2) window.scrollTo(0, top);}, 240);
    // A jump can skip a .reveal element straight past its IntersectionObserver
    // threshold (no intermediate frame ever intersects it), leaving it stuck
    // invisible. Force-reveal everything inside the destination section.
    el.querySelectorAll(".reveal:not(.is-visible)").forEach((r) => r.classList.add("is-visible"));
  }

  return (
    <div className="app">
      <ScrollDriver />
      <Atmosphere />
      <Nav active={active} onJump={jump} theme={theme} onToggleTheme={() => {beginScrollJump();setTheme(theme === "dark" ? "light" : "dark");}} lang={lang} onLang={(l) => {beginScrollJump();setLang(l);}} t={t} showBrand={!heroInView} />
      <main>
        <Hero onJump={jump} t={t} />
        <About t={t} lang={lang} />
        <Divider kind="kurt" />
        <Projects t={t} lang={lang} />
        <Divider kind="kartal" />
        <Certificates t={t} lang={lang} />
        <Divider kind="at" />
        <Experience t={t} lang={lang} />
        <Contact t={t} />
      </main>
    </div>);

}


export default App;
