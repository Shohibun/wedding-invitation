# Project Architecture Overview

## 1. Core Architectural Paradigm

The Antigravity Wedding Invitation Platform strictly adheres to **Clean Architecture** principles, enforcing a unidirectional data flow and strict layer boundaries.

### Layer Hierarchy

1. **Presentation Layer (`src/components/`, `src/hooks/`)**
   - Contains React Components and custom UI hooks.
   - Responsible strictly for rendering data and capturing user events.
   - **Constraint**: Cannot access the Database or perform complex business calculations.

2. **Application Layer (`src/features/*/service.ts`)**
   - The Service Layer orchestrates domain logic.
   - Receives commands from the Presentation layer and coordinates data retrieval/saving.
   - **Constraint**: Cannot contain React logic. Returns pure JSON-serializable DTOs.

3. **Domain Layer (`src/features/*/types.ts`, `schema.ts`, `src/lib/`)**
   - Contains pure business rules, Zod validation schemas, and mathematical engines (e.g., `kpi-engine`, `report-builder`).
   - Completely agnostic to the database or UI.

4. **Repository Layer (`src/features/*/repository.ts`)**
   - The isolated Data Access Layer.
   - Encapsulates all `supabase.from()` interactions.
   - Maps raw database rows to Domain objects.

5. **Infrastructure Layer (`supabase/`)**
   - Postgres Database, Storage Buckets, and GoTrue Authentication.

---

## 2. Key System Flows

### Authentication Flow
```mermaid
sequenceDiagram
    participant User
    participant AuthContext
    participant AuthService
    participant AuthRepository
    participant Supabase

    User->>AuthContext: login(email, pass)
    AuthContext->>AuthService: login(email, pass)
    AuthService->>AuthRepository: signInWithPassword()
    AuthRepository->>Supabase: POST /auth/v1/token
    Supabase-->>AuthRepository: Session (JWT)
    AuthRepository-->>AuthService: User DTO
    AuthService-->>AuthContext: User state updated
    AuthContext-->>User: Redirect to Dashboard
```

### Builder Flow (Drafting to Live)
```mermaid
sequenceDiagram
    participant Editor
    participant BuilderService
    participant LocalStorage
    participant PublishingService
    participant Supabase

    Editor->>BuilderService: AutoSave(DraftData)
    BuilderService->>LocalStorage: save(draft_id)
    
    Editor->>PublishingService: Publish()
    PublishingService->>Supabase: Insert to `invitation_versions`
    Supabase-->>PublishingService: Version ID
    PublishingService->>Supabase: Update `invitations.active_version_id`
    PublishingService-->>Editor: Success (Live)
```

### Guest Management & RSVP Flow
```mermaid
sequenceDiagram
    participant Guest
    participant PublicPage
    participant GuestService
    participant Supabase

    Guest->>PublicPage: Open Invitation Link
    PublicPage->>GuestService: getGuestByToken()
    GuestService->>Supabase: SELECT from `guests`
    Supabase-->>PublicPage: Guest Name & Status
    
    Guest->>PublicPage: Submit RSVP (Attending)
    PublicPage->>GuestService: updateRSVP()
    GuestService->>Supabase: UPDATE `guests.rsvp_status`
    Supabase-->>PublicPage: Success
```

### Analytics Flow
```mermaid
sequenceDiagram
    participant Visitor
    participant SessionManager
    participant AnalyticsRepo
    participant DashboardService
    participant InsightsService

    Visitor->>SessionManager: View Page
    SessionManager->>AnalyticsRepo: queueEvent(PAGE_VIEW)
    AnalyticsRepo->>AnalyticsRepo: flushBatch() -> INSERT `analytics_events`
    
    DashboardService->>AnalyticsRepo: getEvents(7_days)
    AnalyticsRepo-->>DashboardService: Raw Events
    DashboardService-->>InsightsService: Aggregated KPIs
    InsightsService-->>InsightsService: Calculate Anomalies/Trends
```

### Marketplace Flow
```mermaid
sequenceDiagram
    participant User
    participant MarketplaceService
    participant Registry
    participant Supabase

    User->>MarketplaceService: Browse Templates
    MarketplaceService->>Supabase: SELECT from `marketplace_packages`
    Supabase-->>MarketplaceService: Package List
    
    User->>MarketplaceService: Install Package
    MarketplaceService->>Registry: registerTemplate()
    Registry-->>User: Template Available in Builder
```

---

## 3. The Repository Pattern Strategy

By decoupling the UI from the Database, we achieved:
- **Testability**: Services can be tested by mocking Repositories.
- **Maintainability**: If Supabase changes its API, only the Repository files change.
- **Reusability**: `ReportRepository` and `InsightsRepository` safely reuse `DashboardRepository` without duplicating SQL queries.
