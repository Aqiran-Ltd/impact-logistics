# Impact Medical Logistics — Marketing Site

Public marketing site for **Impact Medical Logistics**, a USA-based courier company that moves
surgical trays and bins between hospitals and surgery centers with photo-verified,
chain-of-custody tracking. This repo is the **marketing site only** — it is not the internal
driver/rep application described in `about.md` at the repo root, though it markets that
application's capabilities to prospective hospital clients.

## Stack

- Vue 3.5 (`<script setup lang="ts">` everywhere, Composition API only)
- Vite 8 + `@vitejs/plugin-vue`
- TypeScript 5.9, strict mode — **not** TypeScript 7: as of this writing `typescript-eslint`
  only supports TypeScript `<6.1.0`, so pin to the latest 5.x until that catches up, then
  re-check with `npm view typescript-eslint peerDependencies`
- Vue Router 5 (multi-page, lazy-loaded routes)
- Pinia 4 (minimal — UI state only, see below)
- Tailwind CSS 4 (CSS-first config via `@theme`, no `tailwind.config.js`)
- `@lucide/vue` for icons (the successor to the now-deprecated `lucide-vue-next`), `@vueuse/core` for utility composables
- Vitest + `@vue/test-utils` for unit tests

Run `npm view <package> version` before bumping a dependency — don't guess versions.

## Architecture (MVC-mapped)

| MVC concept | Where it lives |
|---|---|
| **Model** | `src/models/content.ts` — every TS interface for content shapes |
| **Data (mock DB)** | `src/data/*.json` — one file per resource |
| **Controller** | `src/services/*.service.ts` — one async function per resource, plus `src/stores/ui.store.ts` (Pinia) and `src/composables/*` |
| **View** | `src/views/*View.vue` (one per route) + `src/components/` |

### The one hard rule

**Views and components only ever import from `src/services/*.service.ts` for content —
never from `src/data/*.json` directly.** The service functions are the seam where a real
backend attaches later (swap the function body for a `fetch()` call; every caller is
unaffected). `src/utils/delay.ts` simulates latency so loading states are already exercised.

Small, purely presentational copy that will never be backend-driven (e.g. the four "Values" in
`AboutView.vue`) can stay as a local const in the component — it doesn't need a data/service
pair. Anything that reads like a content *resource* (services, testimonials, stats, FAQs, team,
coverage regions, company info) goes through the data/service layer.

### Folder map

```
src/
  models/        TS interfaces (content.ts)
  data/          Mock JSON "database"
  services/      Async data-access functions (the backend seam)
  stores/        Pinia stores (ui.store.ts — mobile nav state)
  composables/   useAsyncData, useScrollReveal, useCountUp
  components/
    ui/          Design-system primitives (BaseButton, BaseCard, SectionHeading, ...)
    layout/      AppHeader, AppFooter
    sections/    Page-section blocks composed from ui/ + services (HeroSection, ProcessSteps, ...)
  views/         One per route (HomeView, ServicesView, PlatformView, ComplianceView,
                 AboutView, ContactView, NotFoundView)
  router/        Route table + scroll behavior
```

## Routes

`/` `/services` `/pricing` `/platform` `/compliance` `/about` `/contact` `/:pathMatch(.*)*` (404).
`ProcessSteps.vue` and `PageIntro.vue` are shared across multiple views — reuse them for new
pages instead of rebuilding the same layout. `AppHeader.vue`'s `navLinks` array and the route
table are two separate lists kept in sync by hand — add a page to both.

## Rate calculator

`/pricing` (full) and the Home page's compact teaser both render `RateCalculator.vue` (a
`compact` prop toggles the tier-description/breakdown detail). Pricing config — base tray/bin
rate, service-speed multipliers, distance multipliers, minimum charge — lives in
`src/data/rates.json`, typed as `RateConfig`, served via `getRateConfig()`. The actual math is in
`useRateEstimate.ts` (unit-tested in `composables/__tests__`): `base = trays * trayRate + bins *
binRate`, `total = max(base * serviceMultiplier * distanceMultiplier, minimumCharge)`. This is a
client-side mock formula, not a real quote engine — when a pricing API exists, it likely replaces
`getRateConfig()` and/or the computation inside `useRateEstimate`, not the component.

## Design system

Deliberately steered away from generic "AI/SaaS startup" styling (soft pastel pill buttons,
blurred gradient blobs, serif-display + sans-body pairing) toward a **logistics-manifest /
chain-of-custody** identity — the site should look like it belongs to a company that stamps,
timestamps, and photographs every handoff.

- **Colors**: `brand-*` (teal/emerald accent) and `ink-*` (near-black neutral) scales, defined
  as CSS variables in the `@theme` block of `src/assets/main.css`. Change the palette there —
  don't hardcode hex values in components.
- **Type**: a single family, **Urbanist**, for both `font-sans` (body/UI) and `font-display`
  (headlines — weighted up to `font-extrabold`/`font-black`, not a separate serif). **IBM Plex
  Mono** (`font-mono`) is a load-bearing part of the brand, not a footnote: reference codes,
  timestamps, stat counters, step numbers, tag/pill labels, and table data all use it — that's
  what sells "logged and verified." Loaded via the Google Fonts `<link>` in `index.html`.
- **Shape language**: rectangular, not pill-shaped. Buttons are `rounded-md` with uppercase
  tracked labels (not soft `rounded-full` pills); cards and inputs use `border-2` with sharp-ish
  `rounded-lg`/`rounded-md` corners, not `rounded-2xl` + soft shadow. Tags/badges
  (`BaseBadge.vue`, team/state chips) are small bordered `rounded-sm` tags, not soft pastel
  pills. Dashed borders (`border-dashed`) mark "tear-off ticket" divisions inside cards (see the
  hero's delivery-record card, the compliance audit table, milestone connectors).
- **Photography**: real photos, hotlinked from Unsplash — never AI-generated or placeholder-service
  images. Every URL lives in `src/data/stockImages.ts` (one named `StockImage` export per photo,
  `{ src, alt }`), never hardcoded inline in a component. Before adding a new one: search
  Unsplash, open the individual photo page, and confirm it says "Free to use under the Unsplash
  License" — **not** "Unsplash+" / "premium_photo" (those are paid-license and off-limits here).
  All current photos are treated with a flat `grayscale` filter (no duotone/gradient overlay) so
  they sit quietly behind the mono/ink palette. `PageIntro.vue` uses one as a full-bleed section
  background behind a solid `bg-ink-950/75` scrim (a **flat** overlay, not a gradient) so the
  white heading stays legible — pass a page-specific `image` prop, don't reuse another page's.
  The hero's delivery-record card and the Platform view's "item detail" mockup use a photo too,
  standing in for the actual pickup/delivery photo the driver app would have captured — reuse
  `heroDeliveryImage` for that specific meaning rather than sourcing something new.
- **No gradients, anywhere** — not on section backgrounds, not on image overlays, not as glow/blob
  decoration. Flat solid colors only. If a past pass reintroduces one (`bg-linear-to-*`,
  `bg-gradient-to-*`, a `from-*`/`via-*`/`to-*` color pair), remove it.
- **No grid pattern in hero sections** (`HeroSection.vue`, `PageIntro.vue`) — that space is now
  the photography described above. The `bg-dot-grid` utility still exists in `main.css` for the
  small decorative thumbnails inside `PlatformTeaser.vue`'s phone mockup; don't reintroduce
  `bg-grid` (the line-blueprint texture) — it was deleted from `main.css` on purpose.
- **Other visual motifs**: `CornerMarks.vue` (registration-mark corner brackets, used on Hero and
  `PageIntro.vue`), the dashed route-line + waypoint-dot SVG in the hero, `bg-plus-grid`
  (tick-mark texture, used on dark CTA bands) in `main.css`, and `PhoneMockup.vue` device frames.
- **Motion**: `useScrollReveal` (IntersectionObserver) and `useCountUp` (animated counters,
  rendered in `font-mono`) are the only motion primitives — no animation library.
- When adding a `variant="secondary"` `BaseButton` on a dark section (e.g. `bg-ink-900`/
  `bg-ink-950`), override its border/text color (see `CtaBanner.vue` / `PlatformTeaser.vue`) —
  the default secondary style assumes a light background and is invisible on dark ink.
- **Nav active state**: `AppHeader.vue` computes `isActive(to)` from `useRoute()` (not
  `RouterLink`'s built-in `active-class`) so it can drive a small mono index-tag (`01`, `02`, ...)
  plus a bottom tab border per link — reuse that pattern rather than the plain `active-class`
  string if you add another nav-like list.
- **Cursor on interactive elements**: `main.css` sets `cursor: pointer` globally on
  `button`/`[role=button]`/`select`; `BaseButton.vue` also sets `cursor-pointer` explicitly since
  it can render as an `<a>`/`RouterLink` (which get pointer from the browser only when they have a
  real `href`). If you ever bind both `:to` and `:href` on the same element again, use a single
  `v-bind` object (see `linkBindings` in `BaseButton.vue`) — binding both as separate `:to`/`:href`
  attrs lets an unused prop's `undefined` value silently strip the other one's real `href`.

## Commands

```
npm run dev           # start dev server
npm run build          # type-check (vue-tsc) + production build
npm run type-check     # vue-tsc only
npm run lint           # eslint --fix
npm run format          # prettier --write src/
npm run test:unit      # vitest run
```

## Known placeholders to replace before launch

All in `src/data/company.json`, `src/data/team.json`, `src/data/testimonials.json`: the HQ
address, phone number, email, and named people are fabricated placeholders for layout purposes.
Swap them for real company details once available — the components don't need to change,
only the JSON (and eventually, the service functions that replace it with real API calls).
