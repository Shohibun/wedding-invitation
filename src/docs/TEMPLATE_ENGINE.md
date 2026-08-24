# Template Engine Architecture

The Template Engine is the core infrastructure that powers the Wedding SaaS platform. It enables the system to support infinite variations of themes (e.g., Elegant, Minimal, Luxury) without changing the underlying business logic.

## Core Concepts

### 1. **JSON-Serializable Configuration**
The absolute golden rule of the Template Engine is that **TemplateConfig must be 100% JSON-serializable**.
- No React Components
- No runtime functions
- No Date objects or Maps

This ensures that in future sprints, the `TemplateConfig` can be directly stored as a `JSONB` column in PostgreSQL via Supabase, allowing users to customize their specific invitations overriding the default theme values.
Validation is handled securely via **Zod** (`TemplateConfigSchema`).

### 2. **Template Manifest**
Every template requires a `manifest.ts` file which contains its metadata.
- `id`: The unique identifier (e.g., `"darsana"`).
- `supportedSections`: A list of sections this template knows how to render.

### 3. **Section Registry**
Located in `src/templates/sections/registry.tsx`. This acts as a dictionary mapping a generic `SectionId` (like `"hero"`, `"gallery"`) to a React component. In a production build, these components are lazy-loaded using `next/dynamic` to guarantee optimal code splitting.

### 4. **Layout Engine**
The `LayoutEngine` (`src/templates/core/layout-engine.tsx`) is a smart orchestrator. 
It:
1. Reads the `sections.enabled` array from the `TemplateConfig`.
2. Reads the `sections.order` array.
3. Deduplicates and filters the ordered IDs.
4. Dynamically looks up the component in the `SectionRegistry`.
5. Renders the components or a safe fallback/warning if the section is missing.

This means reordering the layout or hiding a section is as simple as updating a JSON array.

## Directory Structure

\`\`\`
src/templates/
├── core/                  # Engine logic, types, registries, and loaders
│   ├── types.ts           # Strict Zod schemas & TS types
│   ├── constants.ts       # Default template constraints
│   ├── registry.ts        # The dictionary of all available Template Packages
│   ├── loader.ts          # Utility to fetch templates dynamically
│   ├── config.ts          # Zod validation & config deep merging
│   ├── layout-engine.tsx  # Dynamic section renderer
│   ├── template-context.tsx # React Context provider
│   ├── hooks.ts           # useTemplateConfig(), etc.
│   └── validation.ts      # Developer runtime validation utilities
│
├── sections/              # Shared section dictionary
│   └── registry.tsx       # Maps "cover" -> dynamic(() => import(...))
│
└── darsana/               # Example Template Package
    ├── index.ts           # Exports manifest, config, theme, and layout
    ├── manifest.ts        
    ├── config.ts          # Darsana-specific JSON defaults
    ├── theme.ts           # Theme token definitions
    └── layout.tsx         # Layout shell wrapping <LayoutEngine />
\`\`\`

## Adding a New Template

To create a new template (e.g., "minimal"):
1. Create `src/templates/minimal/`.
2. Implement `manifest.ts`, `config.ts`, `theme.ts`, and `layout.tsx`.
3. Export them in `src/templates/minimal/index.ts`.
4. Register the template inside `src/templates/core/registry.ts` using `TemplateRegistry.register()`.

## Validation & Versioning
- **Versioning**: Each template config contains a `version` (e.g. `1`). This is strictly tracked to ensure future migrations can cleanly adapt old config objects to newer schemas.
- **Validation Flow**: Developers can utilize `validateTemplate(pkg)` from `core/validation.ts` to ensure that a template package exposes valid Zod-checked manifests, configs, and complete theme CSS variables before registering it to the engine.
