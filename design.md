# Portfolio Website Design System

Dokumen ini adalah sumber acuan desain untuk website portfolio Fazza Dwi Riandy. Perbarui dokumen ini setiap kali terdapat perubahan visual, layout, komponen, atau motion yang bersifat sistemik.

## 1. Design Direction

Website menggunakan pendekatan editorial portfolio dengan karakter:

- Tipografi besar, padat, uppercase, dan kontras tinggi.
- Permukaan netral yang dipadukan dengan kartu proyek berwarna ekspresif.
- Layout lapang dengan fokus pada satu pesan atau objek utama per section.
- Artwork berukuran besar dan sengaja terpotong oleh batas kartu.
- Section homepage full-bleed: blok warna flat selebar layar, tanpa jarak dan tanpa sudut membulat.
- Motion berbasis spring physics agar terasa tactile, playful, dan menyerupai Material Design 3 Expressive.
- Floating navigation berbentuk pill dengan indikator aktif yang meluncur.

## 2. Technology

- Framework: Next.js 16 dengan App Router.
- Styling: Tailwind CSS 4 dan global CSS.
- Font: Plus Jakarta Sans melalui `next/font`.
- React motion runtime: Framer Motion.
- Motion direction dan parameter: recipe dari Kinetics.
- Content: Sanity dengan fallback mock data.

Kinetics adalah library recipe CSS/React, bukan dependency runtime npm. Framer Motion tetap digunakan untuk mengeksekusi animasi React kompleks dengan parameter spring dari Kinetics.

## 3. Color System

### Core surfaces

| Token/usage | Value | Keterangan |
| --- | --- | --- |
| Project section background | `#FAF9F6` | Warm off-white untuk section Work |
| Profile section | `#FCD000` | Blok kuning "Hello, World" |
| Primary dark surface | `#27272A` | Hero dan permukaan gelap utama |
| Secondary dark surface | `#161312` | Overlay atau neutral black |
| Default light background | `#FFFFFF` | Halaman dan komponen terang |
| Dark-mode background | `#0A0A0A` | Background mode gelap |

### Typography colors

| Usage | Value |
| --- | --- |
| Primary dark heading | `#252529` |
| Secondary light heading | `#C9C5C3` |
| Body text on light surface | `#4A4A4E` |
| Primary light text | `#F9F5F0` |
| Secondary dark-mode text | `#A3A3A3` |

### Project category cards

| Category | Background | Heading |
| --- | --- | --- |
| Interface Design | `#666BEA` | `#F7F5F2` |
| Visual Design | `#2CE590` | `#064F3E` |
| Motion Design | `#DCF154` | `#526400` |

### Profile section

| Usage | Value |
| --- | --- |
| Background | `#FCD000` |
| Heading | `#5C4A00` |
| Body | `#6B5600` |

## 4. Typography

Font family utama adalah Plus Jakarta Sans dengan fallback `sans-serif`.

### Display headings

- Weight: `900` / black.
- Style: uppercase.
- Line height: `0.82–0.85`.
- Letter spacing: `-0.055em` sampai `-0.065em`.
- Heading section (mis. Work Experience, Hello World): `52px`, sama di mobile dan desktop.
- Heading utama hero: `60px` mobile hingga `104px` desktop.
- Heading kategori kartu: `42px` mobile, `52–58px` desktop.

### Body copy

- Ukuran dasar: `16px`.
- Ukuran desktop untuk intro: `18–20px`.
- Gunakan line-height yang lapang dan maksimal lebar sekitar `520–768px`.
- Hindari paragraf panjang yang memenuhi seluruh lebar viewport.

## 5. Spacing and Layout

- Lebar konten utama My Project: maksimal `1220px`.
- Lebar konten hero: maksimal `1400px`.
- Horizontal page padding:
  - Mobile: `20–24px`.
  - Tablet: `32–64px`.
  - Desktop: `64–96px`.
- Vertical section padding:
  - Mobile: sekitar `96px`.
  - Tablet: sekitar `128px`.
  - Desktop: sekitar `160px`.
- Jarak antarkartu proyek: `20px` mobile dan `24px` desktop.

## 6. Homepage Sections

Urutan homepage: Hero → Profile → Work Categories → Work Experience → Footer.

### Hero

- Background: scene Three.js ruang kerja desainer bergaya stylized (`DesignDeskScene`), full-bleed, golden-hour lighting.
- Konten: display heading dan dua tombol (My Project, Download CV). Tidak ada paragraf intro.
- Overlay gradasi gelap di kiri bawah (lebih gelap di mobile) untuk keterbacaan.
- Renderer dibatasi pixel ratio `1.5` dan berhenti render saat hero di luar viewport.

### Profile ("Hello, World")

- Blok kuning full-bleed, rasio `3:1` di desktop (`640px` pada lebar `1920px`), bertumpuk di mobile.
- Ilustrasi: siluet + tiga shape (putih, biru, hijau) di kanan, setinggi section; shape yang keluar batas dipotong oleh section.
- Asset di `public/profile_section/` (siluet `.webp`, shape `.svg`).

### Work Categories

Kartu kategori adalah entry point menuju `/work`.

- Tiga kartu full-bleed dalam satu baris (`md:grid-cols-3`), satu kolom di mobile.
- Rasio kartu `640/680` (sesuai frame Figma), tanpa border radius, tanpa jarak.
- Judul dan deskripsi memakai unit `cqw` sehingga skalanya mengikuti lebar kartu.
- Artwork diposisikan 1:1 sesuai frame Figma (persen dari `640×680`); bagian yang keluar kartu dipotong `overflow: hidden`.
- Asset raster disimpan sebagai `.webp` di `public/new_work_category/` dan dilayani lewat `next/image` (jangan memakai SVG yang membungkus PNG besar).

### Work page covers

- Cover tiap halaman `/work` dibangun dengan kode (`CoverCollage`), bukan satu PNG: background warna kategori + mockup terpisah yang diposisikan dalam persen dari frame `2880×770`.
- Tinggi cover `max(320px, 26.74vw)`; frame selalu memenuhi lebar dan di layar sempit dipotong dari tengah.
- Motion: tiap mockup masuk bergantian (Kinetics Overshoot, dari atas/bawah), lalu melayang pelan tanpa henti (loop sinus, pengecualian seperti marquee).
- Asset Interface di `public/projects/interface-design-bg/`; Visual memakai poster di `public/projects/visual-design-bg/` + stiker logo dari `public/new_work_category/visual_design/`. Motion memakai `public/projects/motion_design_bg/shape-purple.png` + bentuk 3D dari `public/new_work_category/motion_design/` (hijau `-34°`, pink `-18°`; rotasi lewat class `rotate`, bukan transform).
- Cara mengukur posisi: ambil bounding box bagian solid aset (alpha > 230), cocokkan dengan tepi objek di export cover, lalu hitung `left/top/width` dalam persen frame.

### Work page project cards & filters

- Filter chip dibangun dari nilai `subcategory` di Sanity (`getSubcategoryFilters`): "All" + setiap nilai unik, urut abjad. Chip baru muncul otomatis setelah halaman revalidate (±60 detik).
- Kartu project memakai `WorkProjectCard` (dipakai bersama Interface/Visual/Motion).
- Hover/focus: overlay gradasi hitam bawah→atas (`40%` → `15%`), nama project besar (`22–30px`, bold) muncul di kiri bawah, tombol share (salin link project) di kanan atas. Di layar sentuh ketiganya selalu tampil.
- Link kartu adalah lapisan `absolute inset-0` terpisah agar tombol share tidak berada di dalam `<a>`.

### Work Experience

- Dua kartu berwarna (hijau `#2EE683`, merah `#FF6B6B`) dengan panel detail putih.
- Grafis SVG di sudut kanan atas panel warna, sebagian tertutup panel putih.

## 7. Motion System

Semua UI motion mengikuti recipe Kinetics. Jangan menambahkan `ease-in`, `ease-out`, atau cubic-bezier lain secara lokal tanpa memperbarui sistem ini.

### Motion tokens

| Token | Parameter | Penggunaan |
| --- | --- | --- |
| Kinetics Spring | `stiffness: 320`, `damping: 24`, `mass: 1` | Navigasi dan perpindahan UI |
| Kinetics Overshoot | `stiffness: 280`, `damping: 18`, `mass: 1` | Entrance, modal, dropdown, dan elemen tactile |
| Kinetics Glide | `cubic-bezier(0.16, 1, 0.3, 1)` | Opacity dan perubahan warna |
| Kinetics Smooth | `cubic-bezier(0.65, 0, 0.35, 1)` | Perpindahan indikator yang terukur |

Konfigurasi React berada di `lib/kinetics-motion.ts`. Kurva CSS global berada di `app/globals.css`.

### Interaction recipes

- **Press (`kineticsPress`)**: semua button, CTA, icon button, dan link navigasi memakai preset ini dari `lib/kinetics-motion.ts` — hover `scale: 1.05`, tap `scale: 0.94`, Kinetics Spring. Spread ke elemen `motion.*` (`<motion.a {...kineticsPress} />`, atau `motion.create(Link)`). Boleh override `whileHover` (mis. ikon `1.1`, ikon sosial `1.15` + naik `4px`).
- **Sliding indicator**: state aktif pada pill navigation dan filter chip ditandai elemen dengan `layoutId` yang meluncur antar item memakai Kinetics Spring (FloatingNav, WorkNav, filter chip Interface/Visual/Motion).
- **Hover Lift**: kartu project memakai class `.kinetics-lift` — bergerak `-10px` dengan shadow yang membesar.
- **Artwork hover**: artwork kartu (Work Categories, Profile, Experience) bergeser/berputar sedikit saat kartu di-hover. Reveal diletakkan di wrapper dan hover di elemen dalam, agar delay reveal tidak memperlambat hover-out.
- **Scroll reveal**: section dan kartu muncul saat masuk viewport (`whileInView`, sekali per kunjungan), dengan stagger antar kartu dan elemen di dalamnya. Paragraf dan elemen pendukung memakai komponen `Reveal`.
- **Toggle icon**: pergantian ikon (mis. tema terang/gelap, web/schema) berputar masuk dengan Kinetics Overshoot.
- Modal masuk dengan kombinasi opacity, scale, dan vertical translation.
- Pergantian gambar menggunakan spring horizontal.
- Scene Three.js hero berjalan real-time; dijeda saat di luar viewport.

### CSS vs Framer Motion

- CSS global memberi transisi spring pada `a`/`button` untuk warna, `scale`, dan `translate` (utility Tailwind 4), serta press `scale: 0.96` untuk elemen tanpa preset.
- `transform` sengaja tidak ditransisikan oleh CSS karena dikendalikan Framer Motion setiap frame; transisi CSS di atasnya membuat spring tersendat.
- Elemen yang memakai `kineticsPress` memiliki atribut `data-motion` sehingga press CSS tidak diterapkan dua kali.
- Pada elemen `motion.*`, gunakan `transition-colors`, bukan `transition-all`.

### Heading entrance

Semua heading level-2 utama menggunakan komponen `KineticHeading`:

- Initial: `opacity: 0`, `translateY(40px)`, `scale(0.96)`.
- Final: `opacity: 1`, `translateY(0)`, `scale(1)`.
- Spring: Kinetics Overshoot `280/18`.
- Trigger: ketika sekitar `45%` heading masuk viewport.
- Playback: sekali per kunjungan halaman.

## 8. Navigation

- Floating pill berada di tengah atas viewport.
- Surface menggunakan zinc gelap transparan dengan backdrop blur.
- Active item menggunakan lingkaran putih (`layoutId="floating-nav-indicator"`) yang meluncur ke item baru saat berpindah halaman; ikon aktif berwarna gelap.
- Setiap item memakai `kineticsPress` (hover `scale: 1.1`).
- Navigation disembunyikan saat scroll aktif dan kembali setelah scroll berhenti.
- Gerakan masuk/keluar memakai Kinetics Spring.
- Halaman `/work` memakai `WorkNav` dengan pola indikator yang sama.

## 9. Responsive Behavior

- Gunakan mobile-first styling.
- Heading dan tombol boleh menumpuk vertikal pada viewport kecil.
- Kartu Work Categories satu kolom di mobile dan tiga kolom mulai `md`.
- Artwork tidak boleh mengurangi keterbacaan judul.
- Modal berubah dari layout vertikal di mobile menjadi dua kolom di desktop.
- Validasi minimal pada viewport sekitar `390 × 844` dan desktop `1280 × 720`.

## 10. Accessibility

- Seluruh link visual harus memiliki label yang deskriptif.
- Teks dan kontrol interaktif harus mempertahankan kontras yang memadai.
- Motion non-esensial harus menghormati `prefers-reduced-motion`.
- Pada reduced motion, animation dan transition dipersingkat menjadi `0.01ms` serta smooth scrolling dinonaktifkan.
- Interaksi hover harus tetap dapat digunakan dengan keyboard atau touch.

## 11. Key Implementation Files

- `app/globals.css`: global colors, motion curves, interaction behavior, dan reduced motion.
- `tailwind.config.ts`: font dan base theme extension.
- `lib/kinetics-motion.ts`: shared React motion configuration.
- `components/ui/KineticHeading.tsx`: entrance animation heading level-2.
- `components/ui/Reveal.tsx`: scroll reveal untuk paragraf dan elemen pendukung.
- `components/ui/DesignDeskScene.tsx`: scene Three.js hero.
- `components/sections/Profile.tsx`: section "Hello, World".
- `components/sections/ProjectCategories.tsx`: kartu Work Categories homepage.
- `components/sections/Experience.tsx`: kartu Work Experience.
- `components/ui/CoverCollage.tsx`: cover code-based halaman `/work`.
- `components/ui/WorkProjectCard.tsx`: kartu project halaman `/work`.
- `components/ui/FloatingNav.tsx`: floating navigation behavior.
- `components/ui/CanvasView.tsx`: schema canvas, modal, dan spring-driven nodes.

## 12. Design Maintenance Rules

1. Gunakan token warna dan motion yang sudah terdokumentasi sebelum membuat nilai baru.
2. Jangan menambahkan easing lokal yang bertentangan dengan Kinetics. Elemen interaktif baru wajib memakai `kineticsPress` atau recipe di atas.
3. Pertahankan hirarki display heading yang besar dan body copy yang ringkas.
4. Pastikan artwork kartu tetap menjadi elemen dominan tanpa menutup judul.
5. Uji perubahan visual pada desktop dan mobile.
6. Jalankan TypeScript, lint untuk file terkait, dan production build setelah perubahan sistemik.
