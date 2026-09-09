# Fazzadwr — Portfolio Website (2026)

Portofolio modern yang dibangun dengan **Next.js 16**, **React 19**, **Tailwind CSS v4**, dan terintegrasi langsung dengan **Sanity CMS**. Dilengkapi dengan Three.js particle wave background, interactive schema space view, dan tema dark/light.

Live Website: [fazzadwr.my.id](https://fazzadwr.my.id)

---

## Tech Stack

- **Framework**: Next.js 16 (App Router & Turbopack)
- **Library**: React 19, TypeScript
- **Styling**: Tailwind CSS v4, Lucide Icons, Styled Components
- **Headless CMS**: Sanity CMS v4 (next-sanity)
- **Animations & 3D**: Framer Motion, Three.js, React Zoom Pan Pinch

---

## Quick Start / Panduan Menjalankan

Ikuti langkah-langkah berikut secara berurutan setiap kali Anda melakukan clone atau setup baru:

### 1. Clone Repository
```bash
git clone https://github.com/fazzadwir/web-porto-26.git
cd web-porto-26
```

### 2. Install Dependensi
Pastikan dependensi telah terpasang sebelum menjalankan server:
```bash
npm install
# atau jika menggunakan Bun:
bun install
```

> **Catatan jika mengalami error koneksi (`ECONNRESET`):**
> Gunakan perintah dengan flag retry:
> ```bash
> npm install --fetch-retries=5
> ```
> Atau gunakan `bun install` yang memiliki pengunduhan paralel lebih cepat.

### 3. Konfigurasi Environment Variables
Salin template `.env.example` menjadi `.env.local`:
```bash
cp .env.example .env.local
```

Isi dari `.env.local`:
```env
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID="o1s2ofhu"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"
```
*Variabel default sudah diarahkan langsung ke Sanity Production (`o1s2ofhu`).*

### 4. Jalankan Development Server
```bash
npm run dev
# atau:
bun run dev
```

Buka [http://localhost:3000](http://localhost:3000) pada browser Anda.

---

## Sanity Studio (CMS)

Anda dapat mengakses panel CMS Sanity secara lokal melalui:
- URL: [http://localhost:3000/studio](http://localhost:3000/studio)
- Di sini Anda dapat menambahkan, mengedit, atau mengubah visibilitas (public/private) dari projek portofolio.

---

## Troubleshooting / Masalah Umum

| Pesan Error | Penyebab | Solusi |
|---|---|---|
| `next: command not found` | Folder `node_modules` belum ada / dependensi belum di-install. | Jalankan `npm install` atau `bun install`. |
| `Dataset not found for project ID "project-id-placeholder"` | Environment variable Sanity belum di-set atau masih memakai dummy placeholder. | Jalankan `cp .env.example .env.local` dan pastikan `NEXT_PUBLIC_SANITY_PROJECT_ID="o1s2ofhu"`. |
| `ECONNRESET / network aborted` | Gangguan koneksi internet saat mengunduh package npm. | Gunakan `bun install` atau jalankan `npm cache clean --force` lalu coba kembali. |

---

## NPM Scripts

- `npm run dev`: Menjalankan development server dengan Turbopack.
- `npm run build`: Melakukan build aplikasi untuk production.
- `npm run start`: Menjalankan production server setelah build.
- `npm run lint`: Menjalankan ESLint untuk pengecekan kode.
