# Portfolio Website Design System

Dokumen ini adalah sumber acuan desain untuk website portfolio Fazza Dwi Riandy. Perbarui dokumen ini setiap kali terdapat perubahan visual, layout, komponen, atau motion yang bersifat sistemik.

## 1. Design Direction

Website menggunakan pendekatan editorial portfolio dengan karakter:

- Tipografi besar, padat, uppercase, dan kontras tinggi.
- Permukaan netral yang dipadukan dengan kartu proyek berwarna ekspresif.
- Layout lapang dengan fokus pada satu pesan atau objek utama per section.
- Artwork berukuran besar dan sengaja terpotong oleh batas kartu.
- Motion berbasis spring physics agar terasa tactile, playful, dan menyerupai Material Design 3 Expressive.
- Sudut membulat, floating navigation, dan shadow berlapis untuk membangun kedalaman.

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
| Project section background | `#FAF9F6` | Warm off-white untuk section My Project |
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
| Visual Design | `#28DFA1` | `#064F3E` |
| Motion Design | `#DAFA4D` | `#526400` |

## 4. Typography

Font family utama adalah Plus Jakarta Sans dengan fallback `sans-serif`.

### Display headings

- Weight: `900` / black.
- Style: uppercase.
- Line height: `0.82–0.85`.
- Letter spacing: `-0.055em` sampai `-0.065em`.
- Mobile size: `48–56px` untuk heading section.
- Desktop size: `82–104px` untuk heading utama.
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

## 6. Project Category Cards

Kartu kategori pada homepage adalah visual entry point menuju halaman `/work`.

### Base card

- Mobile height: `250px`.
- Desktop height: `330px`.
- Border radius: `18px`.
- Border: putih dengan opacity sekitar `85%`.
- Artwork menggunakan PNG transparan dan `object-contain`.
- Seluruh artwork dipotong dengan `overflow: hidden`.
- Judul ditempatkan sekitar `7%` dari sisi kiri dan rata tengah secara vertikal.

### Card shadow

```css
box-shadow:
  0 33px 9px 0 rgba(0, 0, 0, 0),
  0 21px 8px 0 rgba(0, 0, 0, 0.03),
  0 12px 7px 0 rgba(0, 0, 0, 0.10),
  0 5px 5px 0 rgba(0, 0, 0, 0.18),
  0 1px 3px 0 rgba(0, 0, 0, 0.21);
```

### Artwork composition

- Interface Design: dashboard dimulai sekitar separuh kanan kartu, dekat sisi atas, dan terpotong di bawah.
- Visual Design: logo tersebar di area kanan, dengan sebagian elemen keluar dari sisi kanan/bawah.
- Motion Design: bentuk pink terpotong di atas, bentuk oranye keluar dari sisi kanan, dan bentuk hijau terpotong di bawah.
- Pada mobile, artwork diperkecil dan digeser ke kanan agar judul tetap terbaca.

Asset berada di `public/projects/`.

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

- Interactive cards memakai recipe Hover Lift: bergerak `-10px` dengan spring dan shadow yang membesar.
- Button dan link mengecil ke `scale: 0.96` saat ditekan.
- Ikon dapat bergeser atau membesar saat hover, tetapi selalu memakai spring token global.
- Modal masuk dengan kombinasi opacity, scale, dan vertical translation.
- Pergantian gambar menggunakan spring horizontal.
- Marquee toolkit tetap linear karena merupakan animasi kontinu, bukan micro-interaction.
- Three.js particle wave tetap berjalan secara real-time sebagai visual background.

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
- Active item menggunakan lingkaran putih dan ikon gelap.
- Navigation disembunyikan saat scroll aktif dan kembali setelah scroll berhenti.
- Gerakan masuk/keluar memakai Kinetics Spring.

## 9. Responsive Behavior

- Gunakan mobile-first styling.
- Heading dan tombol boleh menumpuk vertikal pada viewport kecil.
- Kartu kategori tetap satu kolom pada semua breakpoint.
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
- `components/sections/ProjectCategories.tsx`: desain kartu kategori homepage.
- `components/ui/FloatingNav.tsx`: floating navigation behavior.
- `components/ui/CanvasView.tsx`: schema canvas, modal, dan spring-driven nodes.

## 12. Design Maintenance Rules

1. Gunakan token warna dan motion yang sudah terdokumentasi sebelum membuat nilai baru.
2. Jangan menambahkan easing lokal yang bertentangan dengan Kinetics.
3. Pertahankan hirarki display heading yang besar dan body copy yang ringkas.
4. Pastikan artwork kartu tetap menjadi elemen dominan tanpa menutup judul.
5. Uji perubahan visual pada desktop dan mobile.
6. Jalankan TypeScript, lint untuk file terkait, dan production build setelah perubahan sistemik.
