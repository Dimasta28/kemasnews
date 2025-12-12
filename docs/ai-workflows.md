# Dokumentasi Alur Kerja AI

Dokumen ini memberikan gambaran teknis tentang berbagai alur kerja AI yang diimplementasikan dalam proyek menggunakan Genkit AI. Setiap alur kerja didefinisikan sebagai `flow` dan dirancang untuk melakukan tugas-tugas tertentu yang terkait dengan pembuatan dan pengelolaan konten.

## 1. Alur Kerja Obrolan (`chat-flow.ts`)

*   **Tujuan:** Untuk menangani percakapan interaktif dengan pengguna, berfungsi sebagai chatbot sederhana.
*   **Input:** `ChatInput` - Objek yang berisi `message` (string) dari pengguna.
*   **Output:** `ChatOutput` - Objek yang berisi `response` (string) yang dihasilkan oleh AI.

## 2. Alur Kerja Pembuatan Deskripsi (`generate-description-flow.ts`)

*   **Tujuan:** Untuk membuat deskripsi singkat dan menarik untuk postingan blog berdasarkan kontennya.
*   **Input:** `GenerateDescriptionInput` - Objek yang berisi `content` (string Markdown) dari postingan blog.
*   **Output:** `GenerateDescriptionOutput` - Objek yang berisi `description` (string) yang dihasilkan.

## 3. Alur Kerja Pembuatan Postingan (`generate-post-flow.ts`)

*   **Tujuan:** Untuk menghasilkan konten postingan blog lengkap, termasuk judul dan gambar unggulan.
*   **Input:** `GeneratePostInput` - Objek yang berisi `title` (string) untuk postingan blog.
*   **Output:** `GeneratePostOutput` - Objek yang berisi `description` (string), `content` (string HTML), dan `imageUrl` (string URI data).

## 4. Alur Kerja Pembuatan Tag (`generate-tags-flow.ts`)

*   **Tujuan:** Untuk menyarankan tag SEO yang relevan untuk postingan blog berdasarkan judul dan kontennya.
*   **Input:** `GenerateTagsInput` - Objek yang berisi `title` (string) dan `content` (string HTML atau teks).
*   **Output:** `GenerateTagsOutput` - Objek yang berisi larik `tags` (larik string).

## 5. Alur Kerja Penerjemahan Teks (`translate-text-flow.ts`)

*   **Tujuan:** Untuk menerjemahkan sekumpulan teks ke dalam bahasa target yang ditentukan.
*   **Input:** `TranslateTextInput` - Objek yang berisi `texts` (objek JSON dari pengidentifikasi ke teks) dan `targetLanguage` (string).
*   **Output:** `TranslateTextOutput` - Objek yang berisi `translations` (objek JSON dengan kunci yang sama tetapi dengan nilai yang diterjemahkan).
