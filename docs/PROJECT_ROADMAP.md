# Project Roadmap & Future Milestones

With the Core MVP Ecosystem (Sprints 1-16) effectively complete and passing all Quality Gates, the focus now shifts towards Monetization, Communications, and Production Readiness.

## Sprint 17: Communications & Notifications (Proposed)
**Goal:** Automate interactions between the Host and the Guests.
- Email integration (Resend or SendGrid).
- WhatsApp API integration for direct invitation dispatch.
- Automated "Save the Date" and "H-1 Reminder" blasts.
- Host notifications on new RSVPs.

## Sprint 18: Monetization & Payments (Proposed)
**Goal:** Introduce revenue streams and premium gating.
- Stripe or Xendit integration.
- Subscription tiers (Free, Pro, Enterprise).
- Premium Marketplace templates.
- Removing "Made with Antigravity" watermarks for paid users.

## Sprint 19: Custom Domains & White-labeling (Proposed)
**Goal:** Allow users to host invitations on their own URLs.
- Vercel Domains API integration.
- Subdomain routing (e.g., `john-jane.antigravity.com`).
- Custom OpenGraph (OG) image generation for social sharing.

## Sprint 20: Production Hardening & SEO (Proposed)
**Goal:** Prepare for public launch.
- Server-Side Rendering (SSR) optimizations for public invitation pages to ensure 100% Lighthouse SEO scores.
- Advanced caching (Redis/CDN) for Live Invitations to handle massive traffic spikes.
- Stress testing the Analytics Event Queue under load.
- E2E Playwright testing suite.

## Final Release (v1.0.0)
- Public Beta Launch.
- Marketing site deployment.
- Initial user onboarding sequence.
