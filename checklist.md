# Implementation Checklist: Personal Developer Portfolio

Dokumen checklist ini diturunkan langsung dari spesifikasi [`agents/PRD.md`](./agents/PRD.md) untuk memandu proses implementasi dan verifikasi bertahap.

---

## 1. Setup & Environment

- [x] **Migrasi ke JavaScript Murni (No TypeScript)**
  - [x] Ubah `src/main.ts` menjadi `src/main.js`.
  - [x] Ubah `src/lib/utils.ts` menjadi `src/lib/utils.js`.
  - [x] Ubah `vite.config.ts` menjadi `vite.config.js`.
  - [x] Perbarui `index.html` agar mengimpor `/src/main.js`.
  - [x] Hapus pemanggilan `vue-tsc` pada script `package.json` (`"build": "vite build"`).
  - [x] Bersihkan file/konfigurasi TypeScript yang tidak lagi digunakan.
- [x] **Konfigurasi Vite & Routing Path**
  - [x] Tambahkan konfigurasi `base: '/portfolio/'` pada `vite.config.js`.
  - [x] Pastikan path alias `@` menunjuk ke folder `./src`.
- [x] **SEO & Metadata Awal di `index.html`**
  - [x] Set atribut bahasa `<html lang="en">`.
  - [x] Tambahkan `<title>` yang representatif untuk profil developer.
  - [x] Tambahkan meta description, viewport, dan Open Graph (OG) tags dasar.

---

## 2. Struktur Data JSON (`src/data/`)

- [x] **`src/data/profile.json`**
  - [x] Menyediakan field: `name`, `role` ("Full Stack Developer"), `secondaryFocus` ("Backend Development"), `interests`, `photo`, `summary`, `about`, dan kontak (`email`, `github`, `linkedin`).
  - [x] Tidak menyertakan klaim atau tautan fiktif.
- [x] **`src/data/projects.json`**
  - [x] Setiap entri memuat: `title`, `description`, `image` (opsional), `technologies` (array), dan `githubUrl`.
  - [x] Validasi format data agar urutan sesuai file JSON.
- [x] **`src/data/skills.json`**
  - [x] Pengelompokan berdasarkan kategori (Frontend, Backend, Database, Tools, Data Analytics).
  - [x] Berisi nama-nama teknologi saja (tanpa icon atau persentase).
- [x] **`src/data/experience-education.json`**
  - [x] Entri mencakup: tipe (`education`, `work`, `internship`), `title`/posisi/derajat, `institution`/perusahaan, `period`, `summary`, serta opsi `responsibilities`, `achievements`, `technologies`.
  - [x] Hanya mengisi data riil tanpa fabrikasi informasi.

---

## 3. Fondasi UI, Tema & Komponen Inti

- [x] **Sistem Tema Dark/Light**
  - [x] Buat composable `useTheme.js` (atau helper state).
  - [x] Dark mode aktif sebagai default.
  - [x] Sinkronisasi dengan class `dark` pada elemen `<html>`.
  - [x] Simpan preferensi pengguna di `localStorage`.
  - [x] Tambahkan script pencegah flash tema di `index.html`.
  - [x] Buat komponen tombol toggle tema (`ThemeToggle.vue`) dengan ikon `Sun` dan `Moon`.
- [x] **Komponen Fallback Gambar (`ImageWithFallback.vue`)**
  - [x] Tangani kondisi path gambar kosong/tidak ada.
  - [x] Tangani event `error` saat gambar gagal dimuat.
  - [x] Tampilkan placeholder bergaya neutral dengan ikon `ImageOff` dari `@lucide/vue`.
  - [x] Tampilkan label teks *"Image unavailable"*.
  - [x] Pertahankan aspek rasio frame gambar (1:1 untuk profil, rasio tetap untuk thumbnail proyek).
  - [x] Placeholder adaptif terhadap dark/light mode.
- [x] **Komponen Ikon Brand SVG**
  - [x] `GithubIcon.vue` (inline SVG bersih dan scalable).
  - [x] `LinkedinIcon.vue` (inline SVG bersih dan scalable).
- [x] **Navigasi & Header (`Navbar.vue`)**
  - [x] Menu navigasi mencakup 6 seksi: Hero, About, Projects, Skills, Experience, Contact.
  - [x] Mendukung smooth scrolling saat menu diklik.
  - [x] Responsif untuk perangkat mobile dengan menu drawer/dropdown.
  - [x] Menyediakan focus ring yang jelas untuk navigasi keyboard.

---

## 4. Implementasi Seksi Halaman (`src/sections/`)

- [x] **1. Hero / Introduction (`HeroSection.vue`)**
  - [x] Menampilkan nama, peran utama, fokus sekunder, ringkasan singkat, dan foto profil.
  - [x] Layout desktop: dua kolom (teks dan foto berdampingan).
  - [x] Layout mobile: foto profil berada di atas teks.
  - [x] Foto profil menggunakan frame 1:1 square via `ImageWithFallback.vue`.
- [x] **2. About Me (`AboutSection.vue`)**
  - [x] Menampilkan deskripsi latar belakang dan minat profesional murni dari `profile.json`.
- [x] **3. Projects (`ProjectsSection.vue`)**
  - [x] Menampilkan kartu proyek untuk setiap entri valid dari `projects.json`.
  - [x] Urutan kartu sesuai dengan urutan di JSON.
  - [x] Thumbnail proyek menggunakan rasio konsisten dan `object-fit: cover`.
  - [x] Tampilkan badges teknologi yang digunakan.
  - [x] Tautan GitHub repository sebagai aksi utama (`target="_blank" rel="noopener noreferrer"`).
  - [x] Elemen opsional yang kosong disembunyikan secara otomatis.
- [x] **4. Skills (`SkillsSection.vue`)**
  - [x] Menampilkan skill yang dikelompokkan berdasarkan kategori.
  - [x] Badge minimalis berisi teks nama teknologi saja (tanpa icon teknologi atau bar keahlian).
  - [x] Urutan kategori dan item sesuai data di `skills.json`.
- [x] **5. Experience & Education (`ExperienceEducationSection.vue`)**
  - [x] Menggunakan format vertical timeline yang rapi.
  - [x] Mendukung entri Education, Professional Work, dan Internship.
  - [x] Hanya merender field yang memiliki konten riil.
- [x] **6. Contact (`ContactSection.vue`)**
  - [x] Tautan langsung ke Email, GitHub, dan LinkedIn jika nilainya valid.
  - [x] Tidak menyertakan form kontak ber-backend.

---

## 5. Tata Letak, Motion & Aksesibilitas

- [x] **Assembling di `src/App.vue`**
  - [x] Susun layout: Header/Navbar, Hero, About, Projects, Skills, Experience, Contact, dan Footer.
- [x] **Responsivitas & Layout**
  - [x] Uji tampilan pada ukuran mobile (< 640px), tablet (640px - 1024px), dan desktop (> 1024px).
  - [x] Pastikan tidak ada horizontal scrollbar (overflow-x).
- [x] **Aksesibilitas (a11y)**
  - [x] Struktur HTML semantik (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
  - [x] Hierarki heading (`<h1>`, `<h2>`, `<h3>`) yang logis.
  - [x] Atribut `alt` bermakna pada gambar asli.
  - [x] Kontras warna teks dan elemen interaktif memenuhi standar di kedua tema.
  - [x] Atribut ARIA dan accessible name pada tombol toggle tema dan hamburger menu.
- [x] **Dukungan `prefers-reduced-motion`**
  - [x] Efek transisi/animasi diminimalkan atau dinonaktifkan jika pengguna mengaktifkan preferensi reduced motion di sistem operasi.

---

## 6. Build & CI/CD Deployment

- [ ] **Otomasi GitHub Actions (`.github/workflows/deploy.yml`)**
  - [ ] Trigger on push ke branch `main`.
  - [ ] Setup Node.js dan install dependensi dengan `npm ci`.
  - [ ] Eksekusi build static (`npm run build`).
  - [ ] Upload artifact dari direktori `dist/`.
  - [ ] Deploy ke GitHub Pages menggunakan action resmi GitHub (`actions/deploy-pages`).
- [ ] **Verifikasi Build Lokal**
  - [ ] Jalankan `npm run build` dan pastikan tidak ada error.
  - [ ] Uji hasil build melalui `npm run preview` dengan subpath `/portfolio/`.

---

## 7. Dokumentasi Proyek (`docs.md`)

- [ ] Buat file `docs.md` yang memuat:
  - [ ] Deskripsi tujuan proyek dan stack teknologi.
  - [ ] Panduan instalasi dan menjalankan server dev lokal.
  - [ ] Perintah build dan preview produksi.
  - [ ] Penjelasan struktur direktori dan komponen utama.
  - [ ] Struktur data JSON dan panduan update konten (profil, proyek, skill, pengalaman).
  - [ ] Panduan penambahan dan penggantian aset gambar.
  - [ ] Mekanisme kerja tema Dark/Light.
  - [ ] Konfigurasi Vite `base` path untuk GitHub Pages.
  - [ ] Alur kerja GitHub Actions & pengaturan repository GitHub Pages.

---

## 8. Verifikasi Kriteria Penerimaan Akhir (Acceptance Sign-off)

- [ ] Semua 6 seksi tampil berurutan dalam satu halaman.
- [ ] Tidak ada halaman detail proyek terpisah atau unduhan CV.
- [ ] Tidak ada data fiktif atau tautan rusak.
- [ ] Dark mode default bekerja tanpa flash, dan toggle tema berfungsi baik.
- [ ] Image fallback berfungsi konsisten saat gambar gagal/kosong.
- [ ] Build produksi menghasilkan aset statis tanpa error di path `/portfolio/`.
- [ ] Dokumentasi `docs.md` lengkap dan mudah dipahami.
