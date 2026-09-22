# Hawaiian Telcom Authorized Retailer — Landing Site

A single-page Next.js landing site for an independent authorized retailer of
Hawaiian Telcom. Frontend only: there is no backend, no database and no API.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # writes the static site to out/
npm run preview  # serve out/ locally to check the build
```

## Deploying — it is plain HTML

`npm run build` emits an `out/` folder of real `.html` files plus the CSS, JS,
fonts and images they reference. **Upload the contents of `out/` to any web
host.** No Node process, no server runtime, nothing to configure — it works on
Apache, nginx, S3, Netlify, Vercel, cPanel or any shared hosting.

```
out/
  index.html                     the landing page
  legal/privacy/index.html       … and the other seven policies
  404.html
  _next/                         css, js, fonts, hashed images
  images/                        og-share.jpg (social card)
```

URLs are directory-style (`/legal/privacy/`), so hosts serve them from
`index.html` without rewrite rules.

Everything is preserved in the export: the framer-motion choreography, the CSS
gradient fields, glows, marquee, hover states, the ZIP validator, the FAQ
accordion and the mobile nav. It is the same code, pre-rendered rather than
rendered per request.

Two things worth knowing:

- **Serve it over HTTP, not `file://`.** Assets are referenced from the site
  root (`/_next/...`), so opening `index.html` straight off disk will not load
  styles or scripts.
- **Hosting in a subfolder** (e.g. `example.com/promo/`) needs `basePath` and
  `assetPrefix` set to that folder in `next.config.mjs` before building.
  Root-level hosting needs no change.

`out/images/` also contains plain-named copies of the six section photographs.
Nothing requests them — the pages use content-hashed copies under
`_next/static/media/` for better caching — so they are safe to delete from the
upload if you want a leaner folder. `og-share.jpg` must stay; the social card
metadata points at it by URL.

## Before you launch — three edits

Everything below lives in **`src/lib/content.ts`**.

1. **`site.salesPhone`** is a placeholder in the reserved fictional `555-01xx`
   range so no real party receives misdirected calls. Replace it with your
   tracked sales number. It is the only place the number is defined — the
   header, hero, every plan CTA and the footer all read from it.
2. **`site.retailerName`** is `"Hawaiian Telcom"` — the site trades under the
   brand name. The persistent top bar, the footer disclosure and every legal
   page still state plainly that the site is operated by an independent
   authorized retailer and not by the carrier. Keep those disclosures intact.
3. **Bracketed fields** such as `[Street Address]` appear in `src/lib/legal.ts`
   and in the footer's "Talk to a human" column. Fill those in and have your
   attorney review the policies.

## Changing prices

Edit `src/lib/content.ts` and nothing else. Every price, speed, plan name,
feature bullet, promo line and fine-print row on the site is read from that
file. Adding a plan to `fiberPlans`, `bundlePlans`, `tvPlans` or `phonePlans`
renders a new card automatically.

A plan with a numeric `price` gets a **"Call to order"** button. A plan without
one gets **"Call for pricing"**. That rule is enforced in `ctaLabel()`, so you
cannot get it wrong by editing data.

## Structure

```
src/
  app/
    page.tsx              section order for the whole landing page
    layout.tsx            fonts, metadata, Lenis mount
    globals.css           design tokens and component classes
    legal/[slug]/page.tsx the 8 legal pages, statically generated
  lib/
    content.ts            ← SINGLE SOURCE OF TRUTH
    legal.ts              legal page copy
  components/
    PriceLockup.tsx       the one price typography treatment
    PlanCard.tsx          3D-tilt pricing card
    ServiceSection.tsx    renders every service line
    motion-primitives.tsx Heading / Reveal / Stagger / Parallax / ClipWipe
    useIOHealth.ts        fail-safe so reveals never stay hidden
```

## Services on the page

Hawaiian Telcom's site was audited to decide what appears here. They sell
**fiber internet, bundles, TV and home phone** — those four sections are built.
They do **not** sell cable or mobile, so those sections do not exist rather
than appearing as empty placeholders.

## Notes

- Colors are the exact brand hexes read from hawaiiantel.com's live styles and
  nothing else — no generated tints. `#4294F7` primary blue, `#012639` navy,
  `#101014` ink, `#394758`/`#515156`/`#82939B` type greys, `#EDF5FF`/`#F6F6FA`
  surfaces, `#C6C6CA`/`#EBEBED` borders, plus the accent set. See
  `tailwind.config.ts`.
- Hawaiian Telcom sets type in Gilroy, a licensed face. Plus Jakarta Sans and
  Inter stand in for it.
- All motion respects `prefers-reduced-motion`.
- Section headings animate with a transform-only CSS keyframe and never with
  opacity, so a heading stays legible at every frame — including in a
  background tab, where browsers freeze animations at frame zero.
- `npm audit` flags a build-time postcss advisory inside Next's own nested
  dependency. It affects the bundler, not shipped browser code, and clears by
  upgrading to Next 16.
