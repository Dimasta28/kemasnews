# Panduan Pengguna dan Dokumentasi Proyek

Dokumen ini menyediakan panduan pengguna dan dokumentasi teknis untuk proyek ini.

## 1. Gambaran Umum Proyek

Aplikasi ini adalah platform berbasis web yang dibangun menggunakan Next.js, Tailwind CSS, Shadcn UI, dan mengintegrasikan layanan backend melalui Firebase serta fungsionalitas AI menggunakan Genkit AI. Tujuannya adalah untuk menyediakan platform untuk [Jelaskan tujuan utama aplikasi berdasarkan pemahaman Anda dari nama file dan struktur. Contoh: pengelolaan konten (blog), rekrutmen (karir), dll.].

Fitur utama meliputi:

*   Antarmuka pengguna yang responsif dan modern.
*   Sistem manajemen pengguna dengan login dan registrasi.
*   Area admin untuk pengelolaan konten dan data (pengguna, postingan, karir, dll.).
*   Fungsionalitas terkait karir/lowongan kerja.
*   Tampilan postingan atau konten dengan fitur komentar.
*   Integrasi dengan layanan Firebase untuk backend.
*   Penggunaan AI melalui Genkit untuk fitur tertentu (misalnya, pembuatan konten).

## 2. Struktur Proyek

Proyek mengikuti struktur standar aplikasi Next.js dengan penambahan beberapa direktori untuk mengorganisir kode.

*   `/`: Direktori root proyek, berisi file konfigurasi utama.
*   `/.idx/`: Direktori yang mungkin digunakan untuk konfigurasi development environment.
*   `/.vscode/`: Konfigurasi untuk editor VS Code.
*   `/docs/`: Berisi dokumentasi proyek.
    *   `blueprint.md`: Blueprint atau rencana proyek.
    *   `project-overview.md`: Ringkasan proyek.
    *   `project-structure.md`: Deskripsi struktur proyek ini.
*   `/public/`: Aset statis (gambar, font, dll.).
*   `/src/`: Direktori utama kode sumber aplikasi.
    *   `/src/ai/`: Kode terkait integrasi AI (Genkit).
        *   `/src/ai/flows/`: Definisi alur kerja Genkit AI.
    *   `/src/app/`: Direktori untuk routing berbasis file Next.js. Setiap sub-direktori di sini biasanya mewakili sebuah halaman atau grup halaman.
        *   `/src/app/admin/`: Area admin aplikasi.
        *   `/src/app/apply/`: Halaman untuk proses aplikasi (lamaran).
        *   `/src/app/careers/`: Halaman untuk menampilkan lowongan karir.
        *   `/src/app/dashboard/`: Dashboard pengguna (jika ada).
        *   `/src/app/login/`: Halaman login.
        *   `/src/app/post/`: Halaman untuk menampilkan detail postingan.
        *   `/src/app/privacy-policy/`: Halaman kebijakan privasi.
        *   `/src/app/register/`: Halaman registrasi.
    *   `/src/components/`: Komponen React yang dapat digunakan kembali.
        *   `/src/components/ui/`: Komponen UI berbasis Shadcn UI.
    *   `/src/hooks/`: Custom React hooks.
    *   `/src/lib/`: Library atau utilitas umum.
    *   `/src/services/`: Logika untuk berinteraksi dengan layanan eksternal, seperti Firebase.

**File Konfigurasi Utama:**

*   `README.md`: Deskripsi proyek.
*   `apphosting.yaml`: Konfigurasi untuk deployment (misalnya, Firebase App Hosting).
*   `components.json`: Konfigurasi Shadcn UI.
*   `next.config.ts`: Konfigurasi Next.js.
*   `package-lock.json`: Informasi dependensi yang tepat.
*   `package.json`: Daftar dependensi proyek dan script.
*   `postcss.config.mjs`: Konfigurasi PostCSS.
*   `tailwind.config.ts`: Konfigurasi Tailwind CSS.
*   `tsconfig.json`: Konfigurasi TypeScript.

## 3. Panduan Pengguna

Bagian ini menjelaskan cara menggunakan aplikasi dari sudut pandang pengguna akhir.

### Login dan Registrasi

*   **Registrasi:** Untuk membuat akun baru, navigasikan ke halaman `/register`. Isi informasi yang diperlukan dan ikuti langkah-langkah yang diminta.
*   **Login:** Jika Anda sudah memiliki akun, navigasikan ke halaman `/login`. Masukkan kredensial Anda (username/email dan password) dan klik tombol login.

### Fitur-fitur Utama

*   **Halaman Beranda (`/`):** Halaman utama aplikasi yang menampilkan [Jelaskan apa yang ditampilkan di halaman beranda, contoh: postingan terbaru, ringkasan fitur].
*   **Karir (`/careers`):** Halaman ini menampilkan daftar lowongan karir yang tersedia. Anda dapat melihat detail setiap lowongan.
*   **Kebijakan Privasi (`/privacy-policy`):** Halaman ini berisi informasi mengenai kebijakan privasi penggunaan aplikasi.
*   **Dashboard (`/dashboard`):** (Jika diimplementasikan untuk pengguna non-admin) Halaman ini menyediakan ringkasan atau alat bagi pengguna, misalnya profil pengguna, postingan yang dibuat, dll.
*   **Melihat Postingan (`/post/[id]`):** Untuk melihat detail postingan tertentu, klik pada judul atau thumbnail postingan. Anda akan diarahkan ke halaman yang menampilkan konten penuh postingan tersebut.
    *   **Bagian Komentar:** Di halaman detail postingan, Anda dapat melihat komentar dari pengguna lain dan mungkin menambahkan komentar Anda sendiri (tergantung hak akses).
*   **Mengajukan Lamaran (`/apply/[jobId]`):** Jika Anda tertarik pada lowongan karir tertentu, mungkin ada tombol atau tautan di halaman detail lowongan yang mengarahkan Anda ke formulir aplikasi di `/apply/[jobId]`. Isi formulir dengan informasi yang diminta untuk mengirimkan lamaran Anda.

### Area Admin (`/admin`)

Area ini hanya dapat diakses oleh pengguna dengan hak akses administrator. Menyediakan alat untuk mengelola berbagai aspek aplikasi.

*   **Dashboard Admin (`/admin/dashboard`):** Menyajikan ringkasan data dan statistik penting (misalnya, jumlah pengguna, postingan, lamaran terbaru).
*   **Manajemen Pelamar (`/admin/applicants`):** Melihat dan mengelola daftar pelamar yang telah mengajukan lamaran kerja.
*   **Manajemen Karir / Lowongan Kerja (`/admin/careers` atau `/admin/job-openings`):** Membuat, mengedit, menghapus, dan melihat daftar lowongan karir.
*   **Manajemen Kategori (`/admin/categories`):** Mengelola kategori untuk postingan atau konten lainnya.
*   **Manajemen Komentar (`/admin/comments`):** Melihat, menyetujui, atau menghapus komentar pengguna.
*   **Manajemen Departemen (`/admin/departments` atau `/admin/job-openings/departments`):** Mengelola daftar departemen (misalnya, terkait dengan lowongan karir).
*   **Manajemen Anggota (`/admin/members`):** Melihat dan mengelola daftar pengguna aplikasi.
*   **Manajemen Notifikasi (`/admin/notifications`):** Mengirim atau mengelola notifikasi dalam aplikasi.
*   **Manajemen Postingan (`/admin/posts`):** Membuat, mengedit, menghapus, dan melihat daftar postingan blog atau artikel.
*   **Kebijakan Privasi (Admin) (`/admin/privacy-policy`):** Mengelola konten halaman kebijakan privasi.
*   **Manajemen Promo Banner (`/admin/promo-banner`):** Mengelola banner promosi yang mungkin ditampilkan di aplikasi.
*   **Pengaturan (`/admin/settings`):** Mengakses dan mengubah pengaturan global aplikasi.
*   **Manajemen Tag (`/admin/tags`):** Mengelola tag untuk postingan atau konten lainnya.

## 4. Dokumentasi Pengembang

Bagian ini ditujukan untuk pengembang yang ingin berkontribusi atau memahami kode proyek.

### Instalasi dan Setup

**Prasyarat:**

*   Node.js (disarankan versi LTS terbaru)
*   npm atau yarn (package manager)

**Langkah-langkah Instalasi:**

1.  Clone repository proyek:
    
```
bash
    git clone <url-repository-anda>
    cd <nama-folder-proyek>
    
```
2.  Instal dependensi:
```
bash
    npm install
    # atau
    yarn install
    
```
3.  Konfigurasi environment: Buat file `.env.local` di root proyek dan tambahkan variabel environment yang diperlukan (misalnya, kunci API Firebase, konfigurasi Genkit). Lihat file konfigurasi atau README.md untuk detail lebih lanjut tentang variabel yang dibutuhkan.
4.  Menjalankan aplikasi dalam mode development:
```
bash
    npm run dev
    # atau
    yarn dev
    
```
Aplikasi akan berjalan di `http://localhost:3000` (atau port lain yang dikonfigurasi).

### Teknologi yang Digunakan

*   **Next.js:** Framework React untuk aplikasi web full-stack. Digunakan untuk server-side rendering (SSR), static site generation (SSG), routing berbasis file, dan API routes.
*   **React:** Library JavaScript untuk membangun antarmuka pengguna.
*   **TypeScript:** Superset JavaScript yang menambahkan pengetikan statis untuk meningkatkan keandalan kode.
*   **Tailwind CSS:** Framework CSS utility-first untuk styling yang cepat.
*   **Shadcn UI:** Kumpulan komponen UI yang dibangun di atas Radix UI dan styled dengan Tailwind CSS.
*   **Firebase:** Platform pengembangan aplikasi dari Google. Digunakan untuk:
    *   Autentikasi (manajemen pengguna).
    *   Firestore atau Realtime Database (basis data).
    *   Storage (penyimpanan file).
    *   Fungsi lainnya sesuai penggunaan di `src/services/`.
*   **Genkit AI:** Framework untuk membangun aplikasi berbasis AI. Digunakan untuk mendefinisikan dan menjalankan alur kerja AI di `src/ai/flows/`.

### Struktur Kode

*   **Komponen (`src/components/`):** Modular UI building blocks. Hindari logika bisnis kompleks di sini; fokus pada presentasi.
*   **Custom Hooks (`src/hooks/`):** Logika stateful yang dapat digunakan kembali antar komponen.
*   **Libraries / Utilities (`src/lib/`):** Fungsi atau konfigurasi pembantu yang umum digunakan di seluruh aplikasi (misalnya, `utils.ts`).
*   **Services (`src/services/`):** Layer untuk berinteraksi dengan backend atau API eksternal (khususnya Firebase dalam kasus ini). File-file di sini menangani logika komunikasi data (fetching, sending, updating, deleting).
*   **AI Flows (`src/ai/flows/`):** Definisi alur kerja Genkit AI. File-file ini menjelaskan langkah-langkah dan model AI yang digunakan untuk tugas-tugas tertentu (misalnya, `generate-post-flow.ts`).

### Menambah Fitur Baru

1.  **Halaman Baru:** Buat direktori atau file `.tsx` di dalam `src/app/` sesuai dengan path yang diinginkan.
2.  **Komponen Baru:** Buat file `.tsx` di dalam `src/components/`. Pisahkan komponen UI (`src/components/ui/`) dari komponen aplikasi yang lebih spesifik.
3.  **Logika Backend (Firebase/API):** Jika fitur baru memerlukan interaksi dengan backend, tambahkan atau modifikasi file service yang relevan di `src/services/`.
4.  **Alur Kerja AI:** Jika fitur melibatkan fungsionalitas AI, definisikan alur kerja baru di `src/ai/flows/`.

### Deployment

Proyek ini dikonfigurasi untuk deployment menggunakan Firebase App Hosting (berdasarkan `apphosting.yaml`). Langkah-langkah deployment biasanya melibatkan:

1.  Membangun aplikasi:
    
```
bash
    npm run build
    # atau
    yarn build
    
```
2.  Login ke Firebase CLI.
3.  Deploy ke Firebase:
```
bash
    firebase deploy --only hosting
    
```
(Perintah mungkin bervariasi tergantung konfigurasi spesifik di `apphosting.yaml` atau skrip deployment di `package.json`).

Pastikan Anda telah menginisialisasi proyek Firebase dan mengatur Firebase CLI dengan benar sebelum melakukan deployment.