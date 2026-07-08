# Electronic Dreams — Website

Premium lead-generation site for a Houston smart home / home theater / Control4 company.
Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · lucide-react icons. No other dependencies.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Where to edit things

| What | File |
|---|---|
| **Phone, email, address, hours, service areas, socials** | `lib/site.ts` |
| **All copy**: path cards, issue cards, services, plans/pricing, FAQ, form options | `lib/content.ts` |
| **SEO title/description/keywords + LocalBusiness schema** | `app/layout.tsx` |
| **Brand colors & fonts** (design tokens) | `app/globals.css` (`@theme` block) |
| **Section order on the homepage** | `app/page.tsx` |

Search for `TODO:` across the project — every placeholder that needs real business
info (pricing, address, review links, social URLs) is marked.

## How the conversion flow works

1. **Hero + Choose Your Path** split visitors into: new project / fix my system / bought a home with tech.
2. **Smart Home Rescue Desk** (`components/RescueDesk.tsx`) shows 8 issue cards, each with a
   "try this first" self-check (deflects easy calls). "Still broken?" pre-fills the form
   with that issue and scrolls to it.
3. **Guided form** (`components/ServiceRequestForm.tsx`) — 3 steps: system & issue → support
   preference → contact. Collects name, phone, email, address, system type, problem category,
   urgency, whether you installed it, preferred support type, message, photo placeholder.
4. Pre-filling is wired through `lib/lead-bus.ts` (a tiny CustomEvent bus — no state library).

## Connecting the form to a real backend

The form currently logs the lead and shows the success state (demo mode).
Open `components/ServiceRequestForm.tsx` and edit `submitLead()` at the bottom:

- **Formspree** — swap in the `fetch("https://formspree.io/f/YOUR_ID", …)` snippet in the comment.
- **HubSpot / HighLevel / Jobber / Airtable / custom** — create `app/api/lead/route.ts`,
  POST the payload there, and forward it server-side (keeps API keys out of the browser).

The payload shape is the `FormData` type at the top of that file.

## Before launch checklist

- [x] Phone/email/address/hours/license in `lib/site.ts` — pulled from electronicdreams.biz
- [x] Trust bar claims (27 yrs, Control4 Gold Dealer/Pinnacle, BBB A+, TX license)
- [ ] Set real pricing in `PLANS` (`lib/content.ts`) — placeholders
- [ ] Confirm service-area city list in `lib/site.ts` (source site just says "Houston area")
- [ ] Verify geo pin + founding year (marked `TODO:` in `lib/site.ts` / `app/layout.tsx`)
- [ ] Add `public/og.jpg` (1200×630) and uncomment the OG image in `app/layout.tsx`
- [ ] Wire `submitLead()` to your CRM/form service
