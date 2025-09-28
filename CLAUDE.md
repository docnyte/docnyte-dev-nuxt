# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Manager

This project uses **pnpm** as the package manager. The specific version is pinned via `packageManager` field in package.json (pnpm@10.17.1).

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server (http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Lint code
pnpm lint

# Fix linting issues
pnpm lint:fix

# Type checking
pnpm typecheck
```

## Project Overview
A modern personal portfolio of DocNyte (nickname) and blog built with Nuxt 4, started from an official Nuxt 4 template [portfolio](https://github.com/nuxt-ui-templates/portfolio)
The site combines optimal performance, SEO, and user experience for sharing technical and personal content.

## Architecture Overview

This is a **Nuxt 4** application with the following key characteristics:

### Core Framework
- **Nuxt 4** - Full-stack Vue.js framework with SSR/SSG
- **Vue 3** - Reactive JavaScript framework with Composition API
- **TypeScript** - Statically typed programming language

### Core Modules & Features
- **@nuxt/content**: Content management system for markdown files
- **@nuxt/eslint**: ESLint integration with Nuxt-specific rules
- **@nuxt/image**: Optimized image handling
- **@nuxt/ui**: Nuxt UI component library
- **@vueuse/nuxt**: Collection of essential Vue composition utilities
- **better-sqlite3**: SQLite database integration
- **motion-v**: Motion library for Vue 3
- **nuxt-og-image**: OG image generation
- **@iconify-json/lucide**: Lucide icon set
- **@iconify-json/simple-icons**: Simple icons collection

### Styling & UI
- **Nuxt UI** - Pre-built component library with Tailwind CSS
- **Lucide Icons** - Modern icon system via Iconify
- **Simple Icons** - Brand icons for social links
- **Motion-v** - Vue 3 motion and animation library
- **Dark/Light Mode** - Theme support with system preference detection
- **Responsive Design** - Mobile-first approach

### Content Management
- **Nuxt Content** - Headless CMS for Markdown content
- **MDC (Markdown Components)** - Vue components inside Markdown
- **Syntax Highlighting** - Shiki for code highlighting
- **YAML Front Matter** - Metadata for posts and pages

### Performance & SEO
- **Nuxt Image** - Automatic image optimization
- **SSG/Prerendering** - Static site generation with prerender routes
- **OG Image Generation** - Automatic Open Graph images via nuxt-og-image
- **Meta Tags** - SEO optimized
- **Crawl Links** - Automatic link discovery for prerendering

### Project Structure
- Uses `app/` directory structure (Nuxt 4 pattern)
- Standard Nuxt directory organization:
  - `app/pages/`: File-based routing (index.vue, projects.vue, speaking.vue, blog/)
  - `app/layouts/`: Layout components (default.vue)
  - `app/components/`: Vue components (AppHeader.vue, AppFooter.vue, landing/, etc.)
  - `app/utils/`: Utility functions (clipboard.ts, links.ts)
  - `app/assets/css/`: Stylesheets (main.css)
  - `app/app.config.ts`: Application configuration
- Content stored in `content/` directory:
  - `content/blog/`: Blog posts in Markdown format
  - `content/projects/`: Project data in YAML format
  - `content/*.yml`: Page content (about.yml, blog.yml, etc.)
- Configuration files:
  - `content.config.ts`: Content schema definitions with Zod validation
  - `nuxt.config.ts`: Nuxt configuration

### Configuration
- **ESLint**: Uses Nuxt's built-in ESLint config with custom rules (stylistic settings)
- **TypeScript**: Full TypeScript support with project references
- **Nuxt UI**: Primary color is blue, neutral colors for secondary elements
- **Prerendering**: Configured to prerender `/` route with link crawling enabled

### Content System
- **@nuxt/content** for managing markdown content
- **Zod schemas** in `content.config.ts` define strict content structure
- **Collections**: index, projects, blog, pages, speaking, about
- **Content Types**:
  - Blog posts: Markdown files with author, date, image, minRead metadata
  - Projects: YAML files with title, description, image, URL, tags, date
  - Pages: YAML configuration for projects.vue and blog.vue
  - Speaking: YAML with events data (category, title, date, location, URL)

## Development Notes

- **Devtools**: Enabled in development for debugging
- **File-based routing**: Pages automatically generated from `app/pages/`
- **Content validation**: Strict Zod schemas ensure content integrity
- **Icon system**: Uses Iconify with Lucide and Simple Icons collections
- **Motion**: Animations handled by motion-v library

## Key Architecture Decisions

### Content Management
- **Structured Content**: All content is schema-validated using Zod
- **YAML Front Matter**: Blog posts use YAML metadata for consistency
- **Collection-based**: Different content types (blog, projects, speaking) are separate collections
- **Media Management**: Images handled through Nuxt Image with optimization

### Styling Approach
- **Component Library**: Nuxt UI provides consistent, accessible components
- **Color System**: Configurable primary (blue) and neutral color schemes
- **Responsive Design**: Mobile-first with Nuxt UI's responsive utilities

## Content Guidelines

### Blog Post Schema (content/blog/*.md)
```yaml
---
title: "Post Title"
description: "Brief description for SEO"
minRead: 5
date: 2025-01-15
image: "/images/blog/post-cover.jpg"
author:
  name: "Author Name"
  description: "Author bio"
  username: "username"
  twitter: "@handle"
  to: "/about"
  avatar:
    src: "/images/author.jpg"
    alt: "Author photo"
---

Post content in Markdown...
```

### Project Schema (content/projects/*.yml)
```yaml
title: "Project Name"
description: "Project description"
image: "/images/projects/project.jpg"
url: "https://project-url.com"
tags: ["nuxt", "vue", "typescript"]
date: 2025-01-15
```

### Content Collections Available
- **index**: Homepage content (index.yml)
- **blog**: Blog posts (blog/*.md)
- **projects**: Project showcase (projects/*.yml)
- **pages**: Page configurations (blog.yml, projects.yml)
- **speaking**: Speaking engagements (speaking.yml)
- **about**: About page content (about.yml)

## Quality Assurance

### Before Committing
Always run these commands to ensure code quality:
```bash
pnpm lint          # Check for linting errors
pnpm typecheck     # Verify TypeScript types
pnpm build         # Ensure production build works
```

### Content Validation
- All content must pass Zod schema validation
- Images should be optimized and properly sized
- Dates must be valid ISO format
- Required fields cannot be empty

This is a Nuxt 4 portfolio template customized for DocNyte, leveraging modern web development practices with strong type safety and content validation.