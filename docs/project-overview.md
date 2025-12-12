# Project Overview

This document provides a detailed overview of the web application, its core features, technological stack, and architectural considerations.

## Introduction

This application is a comprehensive web platform for content publishing, user management, interactive features, and sustainability-focused initiatives. It provides a robust system for administrators to manage content and users, while offering a rich experience for end-users to consume content, engage through comments, and participate in 'green' initiatives.

## Core Features:

- **Content Management (CMS):**
  - Post Listing, Detailed View, and CMS for creating/editing posts.
  - Category and Tag management.
  - Media management for uploading and organizing assets.
- **User Interaction:**
  - Social Sharing, Comment Sections, and User Authentication (Register/Login).
- **Admin Dashboard:**
  - Comprehensive dashboard to manage users, posts, comments, categories, tags, and media.
  - Analytics, stat cards, and recent post overviews.
- **AI-Powered Features (Genkit):**
  - AI-powered suggestions for tags, descriptions, and post content.
  - AI-driven text translation capabilities.
- **Sustainability Initiatives ('Green' Features):**
  - Sections like 'Green Journey', 'Green Plan', and 'Our Solutions' to promote environmental consciousness.
  - Form submission for user participation in these initiatives (e.g., `green-journey-form`).
- **Marketing and Growth:**
  - A/B testing framework (`/admin/ab-test`) to experiment with features.
  - Promotional banner management.

## Technology Stack

The application is built using a modern and robust technology stack:

*   **Frontend Framework:** Next.js (React Framework) with App Router.
*   **User Interface:** Shadcn UI, built with Radix UI and Tailwind CSS.
*   **Styling:** Tailwind CSS with PostCSS.
*   **Backend/Database:** Firebase for authentication and database (Firestore/RealtimeDB).
*   **AI Workflows:** Genkit AI for features like content generation and translation.
*   **Rich Text Editor:** React-Quill.
*   **Charting:** Recharts (inferred from `chart.tsx` and dashboard components).

## Architecture

The application follows a server-rendered React architecture provided by Next.js. Frontend components are built with React and styled using Tailwind CSS and Shadcn UI. Backend interactions are handled through dedicated service files (`src/services`) that communicate with Firebase. AI functionalities are encapsulated within Genkit flows. The routing is managed by Next.js's file-based routing system, with distinct areas for the public site, the admin panel, and feature-specific sections.
