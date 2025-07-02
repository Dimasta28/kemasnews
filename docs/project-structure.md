# Struktur Proyek

Dokumentasi ini menjelaskan struktur direktori dari proyek aplikasi web ini. Pemahaman terhadap struktur ini penting untuk navigasi dan pengembangan aplikasi.
```
.
├── .idx/
├── .vscode/
├── docs/
├── public/
└── src/
    ├── ai/
    │   ├── flows/
    │   └── ...
    ├── app/
    │   ├── admin/
    │   │   ├── careers/
    │   │   ├── categories/
    │   │   ├── comments/
    │   │   ├── dashboard/
    │   │   ├── departments/
    │   │   ├── members/
    │   │   ├── notifications/
    │   │   ├── posts/
    │   │   ├── privacy-policy/
    │   │   ├── promo-banner/
    │   │   ├── settings/
    │   │   ├── tags/
    │   │   └── ...
    │   ├── careers/
    │   ├── dashboard/
    │   ├── login/
    │   ├── privacy-policy/
    │   ├── register/
    │   ├── post/[id]/
    │   ├── favicon.ico
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── page.tsx
    │   └── ...
    ├── components/
    │   ├── ui/
    │   └── ...
    ├── hooks/
    ├── lib/
    ├── services/
    └── ...
├── README.md
├── apphosting.yaml
├── components.json
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```
## Penjelasan Direktori Utama

*   **`.idx/`**: Direktori ini berisi file-file konfigurasi yang digunakan oleh lingkungan pengembangan tertentu, seperti Nix development shell (`dev.nix`). File-file di sini biasanya tidak perlu diubah secara manual kecuali untuk konfigurasi lingkungan.

*   **`.vscode/`**: Berisi pengaturan spesifik untuk editor Visual Studio Code, seperti pengaturan formatter, linter, atau konfigurasi debug (`settings.json`). Ini membantu menjaga konsistensi pengaturan di antara pengembang.

*   **`docs/`**: Direktori ini dimaksudkan untuk menyimpan semua dokumentasi proyek. Saat ini berisi `blueprint.md` dan file dokumentasi lain yang dibuat, seperti `project-overview.md` dan `project-structure.md`.

*   **`public/`**: Direktori ini digunakan untuk menyimpan aset statis yang dapat diakses secara publik melalui root URL aplikasi, seperti gambar, font, atau file statis lainnya (`favicon.ico` adalah contohnya).

*   **`src/`**: Direktori utama yang berisi kode sumber aplikasi. Sebagian besar logika dan antarmuka pengguna aplikasi berada di sini.

    *   **`ai/`**: Berisi kode terkait dengan fungsionalitas kecerdasan buatan (AI).
        *   **`flows/`**: Berisi definisi alur kerja AI yang dibuat menggunakan Genkit AI. Setiap file di sini mewakili alur kerja AI tertentu (misalnya, `chat-flow.ts`, `generate-post-flow.ts`).

    *   **`app/`**: Menggunakan pendekatan routing berbasis file dari Next.js 13+. Setiap direktori di dalam `app` biasanya merepresentasikan segmen URL.
        *   **`admin/`**: Berisi halaman-halaman yang hanya dapat diakses oleh pengguna dengan peran admin. Sub-direktori di dalamnya mengorganisir halaman admin berdasarkan fungsionalitas (misalnya, manajemen karir, kategori, postingan, dll.).
        *   **`careers/`**: Berisi halaman-halaman yang menampilkan informasi tentang lowongan karir.
        *   **`dashboard/`**: Berisi halaman dashboard utama untuk admin atau pengguna yang masuk.
        *   **`login/`**: Berisi halaman untuk proses login pengguna.
        *   **`privacy-policy/`**: Berisi halaman yang menampilkan kebijakan privasi aplikasi.
        *   **`register/`**: Berisi halaman untuk proses registrasi pengguna baru.
        *   **`post/[id]/`**: Ini adalah dynamic route di Next.js. `[id]` menunjukkan bahwa segmen URL ini akan menjadi parameter, memungkinkan aplikasi menampilkan postingan tertentu berdasarkan ID-nya.
        *   **`layout.tsx`**: Mendefinisikan layout global untuk semua halaman di dalam direktori `app`.
        *   **`page.tsx`**: Mewakili halaman root (`/`) dari aplikasi.

    *   **`components/`**: Berisi komponen React yang dapat digunakan kembali di berbagai bagian aplikasi.
        *   **`ui/`**: Berisi komponen antarmuka pengguna yang biasanya diimpor atau dihasilkan dari library seperti Shadcn UI.

    *   **`hooks/`**: Berisi custom React Hooks yang digunakan untuk mengabstraksikan logika stateful.

    *   **`lib/`**: Berisi file-file utilitas umum, konfigurasi library eksternal (seperti inisialisasi Firebase di `firebase.ts`), dan fungsi-fungsi pembantu.

    *   **`services/`**: Berisi lapisan abstraksi untuk berinteraksi dengan layanan backend, API eksternal, atau database. Setiap file layanan biasanya berfokus pada entitas atau fungsionalitas tertentu (misalnya, `userService.ts`, `postService.ts`).

## File Konfigurasi Utama

*   **`README.md`**: File markdown yang biasanya berisi deskripsi proyek, instruksi instalasi, dan informasi penting lainnya.
*   **`apphosting.yaml`**: File konfigurasi untuk layanan app hosting, mungkin terkait dengan deployment di platform tertentu.
*   **`components.json`**: File konfigurasi untuk Shadcn UI, menentukan komponen mana yang digunakan dan bagaimana diatur.
*   **`next.config.ts`**: File konfigurasi untuk framework Next.js, memungkinkan penyesuaian build, routing, dan pengaturan lainnya.
*   **`package-lock.json`**: Mengunci versi dependensi proyek.
*   **`package.json`**: Berisi metadata proyek, daftar dependensi, dan script untuk menjalankan tugas-tugas proyek (misalnya, `dev`, `build`, `start`).
*   **`postcss.config.mjs`**: File konfigurasi untuk PostCSS, digunakan untuk memproses file CSS (seringkali terkait dengan Tailwind CSS).
*   **`tailwind.config.ts`**: File konfigurasi untuk Tailwind CSS, memungkinkan penyesuaian desain token dan utilitas CSS.
*   **`tsconfig.json`**: File konfigurasi untuk TypeScript, menentukan opsi kompilasi dan file yang disertakan dalam proyek.