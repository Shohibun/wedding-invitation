# Project Technology Stack

## 1. Frontend Core
- **Framework**: React 18
- **Language**: TypeScript (Strict Mode)
- **Routing**: React Router (or Next.js App Router if migrating to SSR)
- **State Management**: React Context + Custom Hooks (Redux avoided for localized Domain constraints).

## 2. UI & Styling
- **Styling**: Tailwind CSS
- **Component Library**: Headless UI / Radix Primitives (for unstyled accessibility)
- **Icons**: Lucide React / Heroicons
- **Animations**: Framer Motion (Micro-interactions, page transitions)

## 3. Backend & Infrastructure
- **Database**: PostgreSQL (via Supabase)
- **Backend-as-a-Service**: Supabase
- **Authentication**: Supabase GoTrue (JWT-based)
- **Storage**: Supabase Storage (S3-compatible)
- **API Layer**: Supabase PostgREST client (typed via `supabase-js`)

## 4. Libraries & Tooling
- **Validation**: Zod (Strict runtime schema validation)
- **Form Management**: React Hook Form
- **Unique IDs**: `uuid` (v4)
- **Dates**: `date-fns`
- **PDF Generation**: `jspdf` + `jspdf-autotable`
- **Excel Generation**: `xlsx`

## 5. Developer Tooling & Quality Assurance
- **Linter**: ESLint (with TypeScript & React hooks plugins)
- **Formatter**: Prettier
- **Dependency Analysis**: Madge (Circular dependency detection)
- **Type Checking**: `tsc --noEmit`

## 6. Architecture Patterns Employed
- **Clean Architecture**: Separation of Presentation, Application, Domain, and Infrastructure.
- **Repository Pattern**: Abstracting all database/Supabase interactions into singletons.
- **Strategy Pattern**: Polymorphic file exporters (CSV, JSON, PDF, Excel).
- **Builder Pattern**: Constructing complex nested DTOs in the Analytics & Report engines.
- **Event Queuing**: In-memory batching of analytics events before DB insertion.
