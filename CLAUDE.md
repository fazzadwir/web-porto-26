# CLAUDE.md

Panduan untuk Claude saat bekerja di repo ini.

## Project

Portfolio personal Fazza Dwi Riandy (https://fazzadwr.site).
Next.js (App Router) + React + TypeScript, Tailwind CSS v4, Framer Motion, Sanity CMS, deploy di Vercel dari branch `main`.

- CV yang bisa diunduh: `public/UIUX_FazzaDwi.pdf` (dirujuk di `components/sections/Hero.tsx` dan `components/ui/CanvasView.tsx`). Saat memperbarui CV, timpa file ini dengan nama yang sama.
- Ringkasan struktur codebase: `public/resume.txt`.

## Penamaan branch

Selalu beri nama branch sesuai konteks perubahan. Jangan pakai nama acak/otomatis seperti `claude/intelligent-heisenberg-xxxx`.
Jika sesi memberikan nama branch otomatis, buat branch baru dengan nama yang sesuai sebelum commit.

Format: `<tipe>/<deskripsi-singkat-kebab-case>`

| Tipe       | Kegunaan                              | Contoh                      |
|------------|---------------------------------------|-----------------------------|
| `feat/`    | Fitur atau section baru               | `feat/testimonial-section`  |
| `fix/`     | Perbaikan bug                         | `fix/hero-mobile-layout`    |
| `update/`  | Memperbarui konten/aset               | `update/cv`                 |
| `style/`   | Perubahan tampilan tanpa logika baru  | `style/footer-spacing`      |
| `refactor/`| Merapikan kode tanpa ubah perilaku    | `refactor/project-query`    |
| `docs/`    | Dokumentasi                           | `docs/add-claude-md`        |
| `chore/`   | Dependency, config, tooling           | `chore/upgrade-next`        |
