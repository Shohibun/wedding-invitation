# Project Module Inventory

## 1. Domain Modules (`src/features/`)

| Module | Purpose | Responsibilities | Dependencies | Status |
|---|---|---|---|---|
| **Auth** | User Identity | Login, Registration, Session Management, Context. | Supabase GoTrue | ✅ Complete |
| **Builder** | Invitation Editing | WYSIWYG Editor, Draft Auto-saving, Component Drag & Drop. | Media, Templates | ✅ Complete |
| **CMS** | Content Management | Form generation, User-provided string/image configuration. | Media | ✅ Complete |
| **Templates** | Rendering Engine | Maps JSON schema to React components dynamically. | Registry | ✅ Complete |
| **Media** | Asset Management | Image/Video uploads, Gallery organization, File limits. | Supabase Storage | ✅ Complete |
| **Guest** | Guest List & RSVPs | CRUD for Guests, Unique token generation, RSVP tracking. | Invitations | ✅ Complete |
| **Marketplace** | Ecosystem | Browsing, installing, and registering custom templates/themes. | Builder, Templates | ✅ Complete |
| **Publishing** | Deployment | Version control, transitioning Drafts to Live status, Activity Logging. | Builder | ✅ Complete |
| **Analytics** | Raw Tracking | Event ingestion, batch queueing, Supabase synchronization. | Visitor | ✅ Complete |
| **Visitor** | Session Tracking | `sessionStorage` lifecycle, IP hashing, device detection. | None | ✅ Complete |
| **Dashboard** | Analytics UI Data | Aggregates raw analytics into UI-ready chart DTOs. | Analytics, Visitor | ✅ Complete |
| **Reports** | Data Export | Converts dashboard aggregations into CSV, JSON, PDF, Excel. | Dashboard, `jspdf`, `xlsx` | ✅ Complete |
| **Insights** | Intelligence | Rule-based heuristics, Anomalies, Trends, Health scoring. | Dashboard, Analytics | ✅ Complete |

---

## 2. Shared Libraries (`src/lib/`)

| Folder | Purpose |
|---|---|
| `analytics/` | Dispatchers, queue logic, client environment extractors. |
| `dashboard/` | Pure math functions (percentages, statistics) and payload builders. |
| `insights/` | Pure logic for thresholds, scoring, trend forecasting, anomaly heuristics. |
| `reports/` | Exporters implementing the Strategy Pattern (`pdf-exporter`, `csv-exporter`). |
| `utils/` | General utilities (date formatting, UUID generation, deep merging). |

---

## 3. High-Level Folder Structure

```
wedding-invitation/
├── docs/                     # Global architecture and milestone documentation
├── public/                   # Static assets (favicons, manifest)
├── supabase/                 # Database migrations, seed data, configuration
└── src/
    ├── components/           # Presentation Layer
    │   ├── auth/             # Login/Register forms
    │   ├── builder/          # Drag-and-drop editor UI
    │   ├── dashboard/        # Analytics charts and metrics UI
    │   ├── insights/         # KPI, Trend, and Recommendation cards
    │   ├── reports/          # Report tables and Export buttons
    │   └── tracking/         # Debug overlays for analytics
    ├── features/             # Domain & Application Layer
    │   ├── analytics/        # (types, schema, repository, service)
    │   ├── auth/
    │   ├── builder/
    │   ├── dashboard/
    │   ├── insights/
    │   ├── reports/
    │   └── visitor/
    ├── hooks/                # React Hooks tying UI to Services
    ├── lib/                  # Pure logic, math, builders, exporters
    ├── providers/            # React Context providers (Auth, Theme)
    └── types/                # Global ambient TypeScript types
```

---

## 4. Documentation Inventory

All modular architecture docs are stored in the Brain Artifacts directory or the local `docs/` folder.

- `AUTH_ARCHITECTURE.md` (Sprint 9)
- `MEDIA_ARCHITECTURE.md` (Sprint 10)
- `BUILDER_ARCHITECTURE.md` (Sprint 11)
- `GUEST_ARCHITECTURE.md` (Sprint 12)
- `MARKETPLACE_ARCHITECTURE.md` (Sprint 14)
- `PUBLISHING_ARCHITECTURE.md` (Sprint 15)
- `ANALYTICS_ARCHITECTURE.md` (Sprint 16)
- `ANALYTICS_DASHBOARD_ARCHITECTURE.md` (Sprint 16)
- `REPORT_ENGINE_ARCHITECTURE.md` (Sprint 16)
- `ANALYTICS_INSIGHTS_ARCHITECTURE.md` (Sprint 16)
- `PROJECT_MILESTONE_REVIEW.md` (Sprint 16.5)
