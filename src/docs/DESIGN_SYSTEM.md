# Wedding SaaS Design System

This document outlines the architectural guidelines, naming conventions, and best practices for the Wedding SaaS Design System.

## Folder Structure

The Design System is organized cleanly to separate concerns, promoting reusability and adhering to the Single Responsibility Principle:

\`\`\`
src/
├── styles/
│   ├── tokens/          # Core design tokens (colors, spacing, shadows, etc.)
│   └── globals.css      # Tailwind base and theme variables
├── components/
│   ├── typography/      # Text-related components (Heading, Paragraph, etc.)
│   ├── layout/          # Layout primitives (Grid, Flex, Section, Container)
│   ├── feedback/        # State indicators (Loading, Skeleton, EmptyState)
│   └── shared/          # Reusable atomic UI (Buttons, Cards, Badges)
├── providers/
│   ├── theme-provider.tsx    # next-themes integration for dark/light mode
│   └── theme-context.tsx     # Context for dynamic wedding themes
└── lib/
    ├── animations/
    │   └── variants.ts  # Centralized Framer Motion variants
    └── utils/           # Shared utility functions (cn, slugify, formatDate)
\`\`\`

## Naming Conventions

- **Files:** `kebab-case.tsx` (e.g., `animated-button.tsx`, `glass-card.tsx`).
- **Components:** `PascalCase` (e.g., `AnimatedButton`, `GlassCard`).
- **Tokens/Variables:** `camelCase` (e.g., `fadeVariants`, `spacing`).
- **Interfaces:** `ComponentProps` (e.g., `AnimatedButtonProps`).

## How to Add New Components

1. **Identify Category:** Determine if the component is Layout, Feedback, Typography, or Shared.
2. **Create File:** Add `[name].tsx` to the appropriate folder.
3. **Use Radix/Tailwind:** Extend standard HTML attributes using `React.forwardRef`.
4. **Utility Class (`cn`):** Always use `cn()` from `@/lib/utils` to merge `className` props effectively.
5. **No Business Logic:** Components must remain "dumb". Do not import Repositories, Services, or Supabase directly into these UI components. Pass data via props.

## Theme Architecture

The system supports two parallel themes:
1. **System Theme (Dark/Light Mode):** Handled by `next-themes` (`ThemeProvider`).
2. **Wedding Template Theme:** Handled by `WeddingThemeProvider`. This adds a class to the `body` (e.g., `theme-elegant`, `theme-floral`) which recalculates the CSS variables defined in `globals.css` to instantly change primary/secondary colors across the entire app.

## Animation Guidelines

All complex animations should utilize `framer-motion`.
- **Reusable Variants:** Import animations from `src/lib/animations/variants.ts` rather than hardcoding them in components.
- **Accessibility:** Framer Motion respects `prefers-reduced-motion` natively. Avoid long durations (`>500ms`) for basic interactions.
- **Performance:** Use `layoutId` cautiously to avoid unnecessary heavy reflows.

## Best Practices

- **Composition over Configuration:** Use atomic components (e.g., `Grid` + `Stack` + `Text`) rather than passing massive JSON configs to a single component.
- **TypeScript:** Everything must be fully typed. Use `React.HTMLAttributes<T>` for extending base elements.
- **Client/Server Components:** By default, layout and typography are Server Components. Any component using `framer-motion` or hooks must have `"use client"` at the top.
