# Wedding Invitation CMS (MVP)

A highly optimized, fast, and simple Content Management System (CMS) exclusively built for managing digital wedding invitations.

## Overview
This platform empowers a single Admin user to:
- Authenticate securely via Supabase.
- Create and edit dynamic digital wedding invitations.
- Manage comprehensive Guest lists (with Excel/CSV Export & Import).
- Monitor live RSVP data tracking.
- Publish public-facing invitations utilizing an internal Template Engine.

*(Note: The enterprise multi-tenant SaaS features like RBAC, Workspaces, Analytics, Notification queues, and historical Versioning have been entirely stripped away to construct a streamlined, single-user MVP architecture).*

## Getting Started

First, ensure you have configured your environment by copying `.env.example` to `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Historical Documentation
> [!WARNING]
> The architectural documents found in the `/docs` directory refer to the legacy **Enterprise SaaS Architecture**. They are preserved strictly for historical milestone reviews and sprint documentation. **They do not reflect the current MVP Architecture** and should be considered **DEPRECATED**.

## Tech Stack
- [Next.js (App Router)](https://nextjs.org)
- [Supabase Auth](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- [Shadcn UI](https://ui.shadcn.com/)
