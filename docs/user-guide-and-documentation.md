# Project User Guide and Documentation

This document provides a user guide and technical documentation for this project.

## 1. Project Overview

This application is a web-based platform built using Next.js, Tailwind CSS, and Shadcn UI, with a backend powered by Firebase and AI functionality provided by Genkit AI. Its goal is to provide a feature-rich platform for content publishing, user management, and sustainability initiatives.

## 2. Project Structure

For a detailed understanding of the directory structure, please refer to `docs/project-structure.md`.

## 3. User Guide

### Key Features

*   **Public Pages:**
    *   **Home (`/`):** The main page displaying featured content.
    *   **Posts (`/post/[id]`):** Read full articles with comments and social sharing options.
    *   **Green Initiatives (`/green-journey`, `/green-plan`, `/our-solutions`):** Learn about and participate in sustainability programs.

*   **Admin Area (`/admin`):**
    *   **Dashboard (`/admin/dashboard`):** A summary of analytics, recent posts, and other stats.
    *   **Content Management:** Manage posts, categories, and tags.
    *   **User Management:** Supervise registered members.
    *   **Settings:** Configure promotional banners, privacy policy, and other site settings.

## 4. Developer Documentation

### Technologies Used

*   **Next.js:** A React framework for server-side rendering and static site generation.
*   **React & TypeScript:** For building robust and maintainable user interfaces.
*   **Tailwind CSS & Shadcn UI:** For styling and UI components.
*   **Firebase:** For backend services like authentication and database (Firestore).
*   **Genkit AI:** For AI workflows like content generation and translation.

### AI Workflows

For detailed documentation on the AI workflows, please refer to `docs/ai-workflows.md`.

### Adding New Features

1.  **New Page:** Create a new directory inside `src/app/` corresponding to the desired route.
2.  **New Component:** Add a new `.tsx` file inside `src/components/`.
3.  **Backend Service:** Extend the functionality in `src/services/` to interact with Firebase.
4.  **AI Workflow:** Define new AI workflows in `src/ai/flows/`.
