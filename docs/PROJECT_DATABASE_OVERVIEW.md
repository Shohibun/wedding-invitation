# Project Database Overview

## 1. Database Tables (PostgreSQL / Supabase)

| Table Name | Purpose | Primary Relationships | Used By Module |
|---|---|---|---|
| `users` (Auth) | Core authentication identity managed by Supabase GoTrue. | Has Many `invitations`, `media_assets` | Auth |
| `user_profiles` | Extended metadata for a user (name, plan, preferences). | Belongs To `users` | Auth, Settings |
| `invitations` | The root entity for a wedding event. | Belongs To `users`. Has Many `guests`, `invitation_versions` | CMS, Builder |
| `invitation_versions` | Immutable snapshots of the builder JSON schema for version control. | Belongs To `invitations` | Publishing, Builder |
| `guests` | Individual invitees and their RSVP status. | Belongs To `invitations`. Has Many `visitor_sessions` | Guest Management |
| `media_assets` | Pointers to files in Supabase Storage. | Belongs To `users`, `invitations` | Media Management |
| `marketplace_packages` | Available templates/themes for installation. | N/A (Global Registry) | Marketplace |
| `installed_packages` | Tracking which user has installed which marketplace package. | Belongs To `users`, `marketplace_packages` | Marketplace |
| `analytics_events` | Granular interaction logs (clicks, scroll, play music). | Belongs To `invitations`, `visitor_sessions` | Analytics, Dashboard |
| `visitor_sessions` | Aggregated visit data per unique browser session. | Belongs To `invitations`, `guests` | Visitor Tracking, Analytics |
| `activity_logs` | Audit trail of major publisher actions (Publish, Restore, Delete). | Belongs To `invitations`, `users` | Publishing |

## 2. Storage Buckets (Supabase Storage)

| Bucket Name | Visibility | Purpose | Current Usage |
|---|---|---|---|
| `invitation-media` | Public | Stores images, background music, and videos uploaded by users for their specific invitations. | Media Gallery, Builder Image blocks |
| `marketplace-assets` | Public | Stores preview thumbnails, JSON manifests, and static assets for Marketplace templates/themes. | Marketplace Browsing |

*Note: Storage row-level security (RLS) ensures users can only mutate files in `invitation-media` under their specific `user_id` folder path.*
