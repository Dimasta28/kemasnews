# Project Overview

This document provides a detailed overview of the web application, its core features, technological stack, and architectural considerations.

## Introduction

This application is a comprehensive web platform designed for content publishing, user management, and interactive features. It aims to provide a robust system for administrators to manage content and users, while offering a rich experience for end-users to consume content, engage through comments, and explore career opportunities. The integration of AI workflows through Genkit adds capabilities for content generation and enhancement.

## Main Features

The application encompasses several key functional areas:

### Content Management

*   **Post Creation and Editing:** Administrators can create, edit, publish, and manage blog posts or articles using a rich text editor.
*   **Category Management:** The application supports organizing content into categories for better navigation and discoverability.
*   **Tagging:** Posts can be tagged to facilitate searching and related content discovery.
*   **Privacy Policy Management:** The application allows for managing and displaying a privacy policy.

### User Management

*   **User Authentication:** Secure login and registration functionalities for users.
*   **Role-Based Access Control:** Different levels of access (e.g., admin, member) to control permissions for various features.
*   **Member Management:** Administrators can view and manage registered users.

### Careers

*   **Job Opening Listings:** Display available job openings.
*   **Job Opening Management:** Administrators can add, edit, and remove job listings.
*   **Department Management:** Support for organizing job openings by department.

### User Interaction

*   **Comments:** Users can leave comments on posts, fostering community engagement.
*   **Notifications:** A system to notify users about relevant activities (e.g., replies to comments).
*   **Social Sharing:** Features to easily share content on social media platforms.
*   **Back to Top Button:** Provides a convenient way for users to navigate back to the top of long pages.

### AI Workflows (Powered by Genkit)

*   **Content Generation:** AI-powered flows to assist in generating post content.
*   **Description Generation:** AI can help in creating descriptions for posts.
*   **Tag Generation:** AI can suggest relevant tags for content.
*   **Chat Functionality:** Potential AI-driven chat features (though specifics depend on implementation).

### Other Features

*   **Theme Toggling:** Users can switch between light and dark themes for a personalized experience.
*   **Promo Banner:** Support for displaying a promotional banner.
*   **Analytics Dashboard:** Provides administrators with insights into application usage (likely in the admin area).

## Technology Stack

The application is built using a modern and robust technology stack:

*   **Frontend Framework:** Next.js (React Framework)
    *   Provides server-side rendering (SSR), static site generation (SSG), routing, and API routes.
    *   Utilizes the App Router for file-based routing and layouts.
*   **User Interface:** Shadcn UI
    *   A collection of reusable and accessible UI components built with Radix UI and Tailwind CSS.
*   **Styling:** Tailwind CSS
    *   A utility-first CSS framework for rapidly building custom designs.
    *   PostCSS is used for processing CSS.
*   **Backend/Database (Potential):** Firebase and/or Supabase
    *   Based on the presence of `src/lib/firebase.ts` and mentions in service files, the application likely uses Firebase for authentication, database (Firestore or Realtime Database), and possibly other services.
    *   Supabase might be used as an alternative or supplementary backend service, particularly for settings management as indicated by `src/services/settingsService.ts`.
*   **AI Workflows:** Genkit AI
    *   A framework for building and deploying AI applications and workflows.
    *   Used to implement the AI-powered features like content and tag generation.
*   **Rich Text Editor:** Likely utilizes a library like React-Quill based on the component name `quill-editor.tsx`.
*   **Charting:** Uses a charting library (indicated by `src/components/ui/chart.tsx`), potentially Tremor or similar, for the analytics dashboard.
*   **Development Environment:** Nix (indicated by `.idx/dev.nix`)
    *   A package manager and system configuration tool used for creating reproducible development environments.

## Architecture

The application follows a typical server-rendered React architecture provided by Next.js. Frontend components are built with React and styled using Tailwind CSS and Shadcn UI. Backend interactions, data fetching, and mutations are handled through dedicated service files that likely communicate with Firebase or Supabase. AI functionalities are encapsulated within Genkit flows, which are integrated into the application as needed. The routing is managed by Next.js's file-based routing system, with distinct areas for the public site and the admin panel.

This overview provides a high-level understanding of the application's purpose, features, and the technologies that power it. Further detailed documentation will cover specific components, services, and workflows.