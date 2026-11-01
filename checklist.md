# Implementation Checklist: Multi-Image Projects (Maksimal 4 Gambar, Hover Slideshow & Modal Preview Detail)

Dokumen ini berisi daftar langkah implementasi untuk meningkatkan komponen Projects: mendukung hingga 4 gambar per proyek menggunakan format array, interaksi hover pada kartu (langsung beralih ke gambar 2 lalu slideshow otomatis), serta modal preview galeri detail lengkap (berdasarkan referensi seksi sertifikat untuk mengatasi teks deskripsi yang terpotong).

---

## 1. Pembaruan Struktur Data JSON (`src/data/projects.json`)

- [x] **Format Array `images`**:
  - [x] Ubah properti gambar pada setiap entri proyek menjadi format array `images: [...]`.
  - [x] Tetapkan elemen indeks ke-0 (`images[0]`) sebagai gambar utama (*main image*).
  - [x] Mendukung jumlah gambar secara dinamis (fleksibel sesuai isi array).
  - [x] Sediakan backwards-compatibility di komponen jika ada entri dengan format string tunggal (`image`) atau key `image1..image4`.
- [x] **Penyesuaian Path Aset Gambar**:
  - [x] Pastikan path gambar (`1.png`, `2.png`, dst.) tertulis secara konsisten dan teruji.

---

## 2. Penyempurnaan Card Thumbnail & Hover Slideshow (`src/sections/ProjectsSection.vue`)

- [x] **Helper Resolusi Aset Dinamis**:
  - [x] Buat resolver URL aset Vite (`import.meta.glob`) agar path gambar lokal dari JSON dapat dimuat sempurna baik di dev server maupun saat build produksi (`npm run build`).
- [x] **State Gambar Aktif per Kartu**:
  - [x] Buat state reaktif untuk melacak indeks gambar aktif pada masing-masing kartu proyek secara independen.
- [x] **Interaksi Kursor Aktif (`mouseenter`)**:
  - [x] Jika gambar $\le 1$: Tampilan tetap stabil pada gambar utama.
  - [x] Jika gambar $\ge 2$:
    - [x] Seketika beralih ke gambar kedua (`images[1]`).
    - [x] Mulai interval timer (~1.8 detik) untuk melanjutkan slideshow secara berurutan (`images[1] -> images[2] -> images[3] -> images[0] -> ...`).
- [x] **Interaksi Kursor Keluar (`mouseleave`)**:
  - [x] Bersihkan interval timer (`clearInterval`).
  - [x] Reset indeks kartu kembali ke gambar utama (`images[0]`).
- [x] **Indikator Visual Thumbnail**:
  - [x] Tambahkan dot pagination/bar indikator halus di bagian bawah thumbnail kartu untuk memberikan visual feedback posisi gambar yang sedang aktif.

---

## 3. Pembuatan Modal Lightbox Preview Detail (`src/sections/ProjectsSection.vue`)

- [x] **Struktur & Animasi Modal (Referensi `CertificatesSection.vue`)**:
  - [x] Buat dialog modal menggunakan `<Teleport to="body">` dengan transisi fade & zoom halus.
  - [x] Klik pada kartu/thumbnail proyek membuka modal preview.
  - [x] Cegah event bubbling (`@click.stop`) pada tombol link GitHub agar klik tautan tidak memicu modal.
- [x] **Galeri Interaktif Modal**:
  - [x] Tampilkan gambar aktif dalam ukuran besar menggunakan `ImageWithFallback` dengan `aspect-ratio` responsif dan `object-contain`.
  - [x] Tambahkan tombol navigasi panah Kiri (`ChevronLeft`) dan Kanan (`ChevronRight`) dengan rotasi sirkuler.
  - [x] Tambahkan indikator nomor gambar (misal: "1 / 4").
  - [x] Tambahkan deretan thumbnail kecil (*thumbnail strip*) di bawah gambar untuk memilih gambar secara langsung.
- [x] **Detail Konten Lengkap (Mengatasi Teks Terpotong)**:
  - [x] Tampilkan judul proyek secara utuh.
  - [x] Tampilkan seluruh deskripsi proyek tanpa pemotongan baris (`line-clamp-4` dihapus pada modal).
  - [x] Tampilkan seluruh badge teknologi (`technologies`).
  - [x] Tampilkan tombol aksi GitHub repository (*Source Code*) atau status *Private Repository*.
- [x] **Aksesibilitas & Keyboard Navigation**:
  - [x] Kunci scroll body (`document.body.style.overflow = 'hidden'`) saat modal terbuka.
  - [x] Dukungan tombol `Escape` untuk menutup modal.
  - [x] Dukungan tombol panah keyboard (`ArrowLeft` / `ArrowRight`) untuk navigasi gambar di modal.
  - [x] Tombol tutup modal (`X`) dan kemampuan menutup modal dengan mengklik area backdrop luar.

---

## 4. Pengujian & Verifikasi Kualitas

- [x] **Uji Kasus Variasi Jumlah Gambar**:
  - [x] 0 gambar: fallback "Image unavailable" tampil rapi tanpa error.
  - [x] 1 gambar: thumbnail statis, tidak ada slideshow hover, modal menampilkan 1 gambar tanpa tombol navigasi.
  - [x] 2–4 gambar: hover seketika berpindah ke gambar 2, slideshow berjalan mulus, navigasi modal dan thumbnail strip berfungsi sempurna.
- [x] **Uji Responsivitas**:
  - [x] Tampilan modal dan kartu berjalan optimal di layar mobile, tablet, dan desktop.
- [x] **Uji Build Produksi**:
  - [x] Jalankan `npm run build` dan pastikan build selesai 100% tanpa error kompilasi atau peringatan missing asset.
