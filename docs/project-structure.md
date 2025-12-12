# Project Structure

This document outlines the directory structure of this web application project. Understanding this structure is crucial for navigating and developing the application.

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
    │   │   ├── ab-test/
    │   │   ├── dashboard/
    │   │   ├── dialog/
    │   │   ├── members/
    │   │   ├── media/
    │   │   ├── notifications/
    │   │   ├── posts/
    │   │   ├── privacy-policy/
    │   │   ├── promo-banner/
    │   │   ├── settings/
    │   │   ├── submissions/
    │   │   └── tags/
    │   ├── _components/
    │   ├── green-journey/
    │   ├── login/
    │   ├── our-solutions/
    │   ├── post/
    │   │   └── [id]/
    │   ├── privacy-policy/
    │   ├── register/
    │   ├── search/
    │   ├── signup/
    │   ├── socials/
    │   └── tags/
    ├── components/
    │   ├── admin/
    │   ├── categories/
    │   ├── editor/
    │   ├── post/
    │   ├── socials/
    │   ├── tags/
    │   └── ui/
    ├── hooks/
    ├── lib/
    └── services/
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

## Main Directory Explanations

*   **`src/app/`**: Using Next.js 13+'s file-based routing approach. Each directory inside `app` typically represents a URL segment.
    *   **`admin/`**: Contains pages accessible only to users with admin roles. Sub-directories organize admin pages by functionality (e.g., post management, categories, etc.).
    *   **`post/[id]/`**: A dynamic route to display specific posts based on their ID.
    *   **`green-journey/`**, **`our-solutions/`**: Feature-specific pages or sections of the application.

*   **`src/components/`**: Contains reusable React components.
    *   **`ui/`**: UI components, often from a library like Shadcn UI.
    *   Other directories like `admin/`, `post/`, etc., contain components specific to those features.

*   **`src/services/`**: An abstraction layer for interacting with backend services, external APIs, or databases. Each service file typically focuses on a specific entity or functionality (e.g., `postService.ts`, `categoryService.ts`).

*   **`src/ai/`**: Contains code related to artificial intelligence (AI) functionalities.
    *   **`flows/`**: Contains definitions of AI workflows created using Genkit AI.
