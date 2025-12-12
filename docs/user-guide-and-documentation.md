# Panduan Pengguna dan Dokumentasi Proyek

Dokumen ini menyediakan panduan pengguna dan dokumentasi teknis untuk proyek ini.

## 1. Gambaran Umum Proyek

Aplikasi ini adalah platform berbasis web yang dibangun menggunakan Next.js, Tailwind CSS, dan Shadcn UI, dengan backend yang didukung oleh Firebase dan fungsionalitas AI yang disediakan oleh Genkit AI. Tujuannya adalah untuk menyediakan platform yang kaya fitur untuk penerbitan konten, manajemen pengguna, dan inisiatif keberlanjutan.

## 2. Struktur Proyek

Untuk pemahaman mendalam tentang struktur direktori, silakan merujuk ke `docs/project-structure.md`.

## 3. Panduan Pengguna

### Fitur Utama

*   **Halaman Publik:**
    *   **Beranda (`/`):** Halaman utama yang menampilkan konten unggulan.
    *   **Postingan (`/post/[id]`):** Membaca artikel lengkap dengan komentar dan opsi berbagi sosial.
    *   **Inisiatif Hijau (`/green-journey`, `/green-plan`, `/our-solutions`):** Mempelajari dan berpartisipasi dalam program keberlanjutan.

*   **Area Admin (`/admin`):
    *   **Dasbor (`/admin/dashboard`):** Ringkasan analitik, postingan terbaru, dan statistik lainnya.
    *   **Manajemen Konten:** Mengelola postingan, kategori, dan tag.
    *   **Manajemen Pengguna:** Mengawasi anggota terdaftar.
    *   **Pengaturan:** Mengonfigurasi spanduk promosi, kebijakan privasi, dan pengaturan situs lainnya.

## 4. Dokumentasi Pengembang

### Teknologi yang Digunakan

*   **Next.js:** Kerangka kerja React untuk rendering sisi server dan pembuatan situs statis.
*   **React & TypeScript:** Untuk membangun antarmuka pengguna yang kuat dan dapat dipelihara.
*   **Tailwind CSS & Shadcn UI:** Untuk styling dan komponen UI.
*   **Firebase:** Untuk layanan backend seperti otentikasi dan basis data (Firestore).
*   **Genkit AI:** Untuk alur kerja AI seperti pembuatan konten dan terjemahan.

### Alur Kerja AI

Untuk dokumentasi terperinci tentang alur kerja AI, silakan merujuk ke `docs/ai-workflows.md`.

### Menambah Fitur Baru

1.  **Halaman Baru:** Buat direktori baru di dalam `src/app/` sesuai dengan rute yang diinginkan.
2.  **Komponen Baru:** Tambahkan file `.tsx` baru di dalam `src/components/`.
3.  **Layanan Backend:** Perluas fungsionalitas di `src/services/` untuk berinteraksi dengan Firebase.
4.  **Alur Kerja AI:** Tentukan alur kerja AI baru di `src/ai/flows/`.
