# Project Feature Matrix

| Feature | Status | Sprint | Description | Dependencies | Future Improvements |
|---|---|---|---|---|---|
| **User Authentication** | ✅ Complete | 9 | Email/Password & Session Management. | Supabase Auth | Social Login (OAuth), 2FA. |
| **Theme Engine** | ✅ Complete | 6 | Dynamic CSS token injection and base components. | Tailwind | Advanced CSS animations per theme. |
| **WYSIWYG Builder** | ✅ Complete | 11 | Drag-and-drop editor with Draft autosaving. | Media, Themes | Undo/Redo history stack, Mobile Builder. |
| **Media Gallery** | ✅ Complete | 10 | Image/Video uploading and selection. | Supabase Storage | Cloudinary Integration, Auto-compression. |
| **Guest Management** | ✅ Complete | 12 | Bulk import guests, generate unique invitation links. | N/A | WhatsApp API integration for sending links. |
| **RSVP System** | ✅ Complete | 12 | Public form for guests to confirm attendance & meals. | Guest Management | Waitlist, plus-one limits, QR Code Tickets. |
| **Marketplace** | ✅ Complete | 14 | Installable templates, themes, and presets. | Template Engine | Paid Premium Templates (Stripe). |
| **Publishing Flow** | ✅ Complete | 15 | Snapshotting drafts into immutable Live Versions. | Builder | Scheduled Publishing, A/B Testing Versions. |
| **Visitor Tracking** | ✅ Complete | 16B | Cookie-less `sessionStorage` tracking per browser tab. | N/A | Server-side IP fingerprinting for cross-device tracking. |
| **Analytics Dashboard** | ✅ Complete | 16C | UI for Traffic, Engagement, and Conversion charts. | Analytics, Visitor | Real-time WebSockets tracking (Live now). |
| **Report Engine** | ✅ Complete | 16D | Export data to PDF, Excel, CSV, JSON. | Dashboard, `jspdf` | Scheduled automated email reports. |
| **Insights Engine** | ✅ Complete | 16E | Rule-based anomaly detection and recommendations. | Dashboard | Machine Learning (AI) based predictions. |
| **Custom Domains** | ❌ Planned | TBD | Mapping invitations to custom URLs (e.g., `wedding.com`). | Publishing | Vercel Domains API Integration. |
| **Payments** | ❌ Planned | TBD | Monetization via subscriptions or premium packages. | Marketplace | Stripe / Xendit Integration. |
| **Notifications** | ❌ Planned | TBD | Automated SMS/Emails to guests (Reminders). | Guest Management | Twilio, Resend, or SendGrid. |
