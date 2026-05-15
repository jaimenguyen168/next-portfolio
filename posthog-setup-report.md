<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into your Next.js App Router portfolio. Here's what was set up:

- **`instrumentation-client.ts`** — Client-side PostHog initialization using the Next.js 16 `instrumentation-client` convention, with reverse-proxy routing, exception capture, and debug mode in development.
- **`next.config.ts`** — Reverse proxy rewrites added for `/ingest/*`, `/ingest/static/*`, and `/ingest/array/*` to route PostHog traffic through your own domain, reducing ad-blocker interference.
- **`src/lib/posthog-server.ts`** — Singleton server-side PostHog client (posthog-node) for capturing events in API routes.
- **`.env.local`** — `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` set.
- **`posthog-js`** and **`posthog-node`** packages installed.

Event tracking was added to 9 files (7 client-side, 2 server-side):

| Event | Description | File |
|---|---|---|
| `contact_form_submitted` | User submitted the contact form successfully | `src/features/landing/components/contact-section.tsx` |
| `contact_form_failed` | Contact form submission resulted in an error | `src/features/landing/components/contact-section.tsx` |
| `social_link_clicked` | User clicked a social link (GitHub, LinkedIn, Email) | `src/features/landing/components/contact-section.tsx` |
| `chat_opened` | User opened the Jaime.ai chat widget | `src/features/chat/components/chat-widget.tsx` |
| `chat_message_sent` | User sent a message in the chat widget | `src/features/chat/components/chat-widget.tsx` |
| `chat_quick_prompt_clicked` | User clicked a quick prompt suggestion | `src/features/chat/components/chat-widget.tsx` |
| `project_github_clicked` | User clicked 'View Code' on a project | `src/features/projects/views/project-details-view.tsx` |
| `project_demo_clicked` | User clicked 'Live Demo' on a project | `src/features/projects/views/project-details-view.tsx` |
| `project_filter_applied` | User applied a skill filter on projects page | `src/features/projects/views/projects-view.tsx` |
| `resume_downloaded` | User clicked the resume download button | `src/features/shared/components/resume-button.tsx` |
| `planet_mark_submitted` | Visitor submitted a mark on a planet | `src/features/landing/components/beyond-add-mark-dialog.tsx` |
| `hero_view_projects_clicked` | User clicked 'View Projects' CTA in the hero | `src/features/landing/components/hero-section.tsx` |
| `hero_get_in_touch_clicked` | User clicked 'Get In Touch' CTA in the hero | `src/features/landing/components/hero-section.tsx` |
| `contact_form_submitted_server` | Server-side: contact email successfully sent | `src/app/api/contact/route.ts` |
| `planet_mark_submitted_server` | Server-side: planet mark saved to Sanity | `src/app/api/planet-mark/route.ts` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/dashboard/1587271)
- [Contact Form Submissions (30d)](/insights/Rc0TDp1C) — Daily trend of successful contact form submissions
- [Chat Widget Engagement (30d)](/insights/B6nLqUXZ) — Chat opens vs messages sent over time
- [Contact Conversion Funnel](/insights/PJ564APl) — Funnel from "Get In Touch" CTA click to form submitted
- [Project Link Clicks (30d)](/insights/7EM0UVpe) — GitHub and demo link clicks on project pages
- [Resume Downloads (30d)](/insights/77749dI4) — Total resume download count

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
