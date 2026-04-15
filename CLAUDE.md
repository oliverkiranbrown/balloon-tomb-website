# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the website for **Balloon Tomb**, a band. It's a full-stack Next.js app with user submission features (text and audio), an admin dashboard, and static lyric pages. The UI uses [Pixelact-ui](https://pixelact-ui.com) — a retro/8-bit themed component library built on Radix UI — to match the band's aesthetic.

## Commands

All commands run from the `site/` directory:

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # Run ESLint
```

**Docker (preferred for local development — includes PostgreSQL):**

```bash
# From repo root
docker-compose -f docker-compose.dev.yaml up    # Dev: app (3000), db (5433), pgAdmin (5050)
docker-compose -f docker-compose.prod.yaml up --build -d  # Production
```

**Admin provisioning** (runs automatically in prod Docker, or manually):

```bash
cd site && npx tsx scripts/create_admins.ts
```

## Architecture

### Stack
- **Next.js 16** with App Router (TypeScript), React 19
- **Tailwind CSS 4** + **Pixelact-ui** for styling
- **PostgreSQL 16** with `pg` connection pool (`site/app/lib/db.ts`)
- **Docker Compose** for local dev and production deployment
- Deployed on a VPS behind nginx (nginx handles TLS, proxies to `localhost:3000`)

### Key directories

- `site/app/` — Next.js App Router pages and API routes
- `site/app/content/lyrics/` — Markdown files for song lyrics (source of truth for lyric pages)
- `site/app/api/` — Route handlers for submissions and admin auth
- `site/components/` — Shared React components; `components/ui/` contains Pixelact-ui wrappers
- `site/scripts/` — One-off scripts (e.g., admin user creation)
- `db-init/` — SQL init scripts run by PostgreSQL on first container start (no migration tool)
- `audio/` — Mounted volume where user-uploaded WebM audio files are stored

### Database schema

Three core tables in PostgreSQL:
- `text_submissions` — user text messages
- `audio_submissions` — metadata for uploaded audio (file path + mime type)
- `admins` + `admin_sessions` — admin credentials (bcryptjs, salt 12) and session tokens

### Auth

Admin auth uses a simple cookie (`admin_session`) containing a base64-encoded `{timestamp}-{admin_id}` string. The cookie is `httpOnly` + `secure` (prod only), expires in 7 days. The `admin_sessions` table exists in the schema but is not used in application code — auth is validated directly against the cookie value.

### Content (lyrics)

Each song has a markdown file in `site/app/content/lyrics/` and a corresponding directory under `site/app/lyrics/[song_name]/page.tsx`. New songs require both. The lyrics index page (`site/app/lyrics/page.tsx`) lists available songs.

### Audio pipeline

Users record audio in-browser via the Web Audio API (`MediaRecorder`, WebM format). Uploaded files land in the `audio/` volume at `/app/audio/` inside the container. The admin dashboard streams audio via `/api/admin/extract/stream/[filename]`.

## Environment

Copy `.env.local` for dev (already present). For prod, `.env.prod` is used. Required vars:

```
DATABASE_URL=postgresql://...
NODE_ENV=development|production
NEXT_PUBLIC_API_URL=http://localhost:3000
ADMIN_USERNAME=...
ADMIN_PASSWORD=...
```

## Responsive design pattern

Mobile breakpoint is `lg` (1024px). The navbar has distinct mobile (hamburger) and desktop (dropdown) layouts toggled via a `isMobile` state on `window` resize. Use `lg:` Tailwind prefix as the mobile/desktop threshold throughout.
