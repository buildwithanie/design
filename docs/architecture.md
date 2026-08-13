# Architecture

## System overview

The repository is a pnpm monorepo with two independent applications:

```text
iahl-website/
├── web/       Next.js public website
├── studio/    Standalone Sanity Studio
├── docs/      Developer documentation
└── package.json
```

`pnpm-workspace.yaml` registers `web` and `studio`. Every workspace declares
its own runtime and development dependencies.

## Public website

`web/` is a Next.js App Router application. Pages and layouts are Server
Components unless interactivity or browser APIs require a small Client
Component boundary.

Keep `page.tsx` files server-side. Navigation state, carousels, forms,
analytics consent and hash-scroll behaviour are legitimate focused client
boundaries. Pass serializable props from the server component rather than
marking an entire page with `"use client"`.

Cache Components are enabled in `web/next.config.ts`. The production build may
report both static routes and Partial Prerender routes. Runtime data such as
route parameters or URL hooks must be placed behind the appropriate `Suspense`
boundary rather than disabling Cache Components globally.

## Sanity integration

Studio is a standalone Vite application in `studio/`. It is deliberately not
mounted under `/studio` or `/admin` in Next.js. This keeps frontend builds
smaller and allows Studio auto-updates, independent deployment and TypeGen
watch mode.

The frontend client in `web/sanity/lib/client.ts` uses the published
perspective, Sanity CDN, and a fixed API date from `web/sanity/env.ts`. It does
not use a read token because the `production` dataset is public.

`defineLive` in `web/sanity/lib/live.ts` exports `sanityFetch` and
`SanityLive`. `SanityLive` is rendered once in the root layout. Queries live in
`web/sanity/lib/queries.ts` and use `defineQuery` so TypeGen can infer result
types.

When a schema or query changes, run `pn typegen`. This updates
`studio/schema.json` and `web/sanity.types.ts`. Do not manually edit generated
types.

## Content model

Singleton documents have fixed document IDs and appear once in the custom
Studio structure:

- Home page
- About page
- Projects page
- Our Work page
- Media Center page
- Get involved page
- Organization details

Repeatable documents include team members, partners, areas of work, projects,
news and insights, publications, galleries and videos.

Singletons control page-level editorial content. Stable routes, navigation,
button destinations, brand styling and application behaviour remain in code.

## Content rendering

Portable Text is rendered by `web/components/content/portable-text.tsx`.
Typeset styles live in `web/app/typeset.css`. Custom Portable Text objects
support content images and image galleries.

Sanity image URLs are built in `web/sanity/lib/image.ts`. The Next.js image
allowlist is restricted to the IAHL Sanity project's production image path.

## Forms and email

Both public forms use Server Actions and Zod validation.

### Contact inquiries

`web/app/get-involved/actions.ts` validates the submission and sends it through
the configured cPanel SMTP account. The submitted email becomes `Reply-To`;
the website never sends as the visitor's domain.

### Newsletter subscriptions

`web/app/actions/newsletter.ts` starts a confirmation flow:

1. Resend emails a signed confirmation link.
2. The HMAC token expires after 24 hours.
3. Confirmation adds or updates the contact in the configured Resend segment
   and topic.
4. Resend handles broadcasts and unsubscribe management.

The website does not provide a newsletter composition dashboard. Broadcasts
are created in Resend using the reusable template maintained by
`pn newsletter:template`.

## SEO and analytics

`web/lib/seo.ts` defines the canonical production domain and shared metadata.
The application supplies canonical links, Open Graph and Twitter metadata,
JSON-LD, `robots.txt`, `sitemap.xml`, a manifest and application icons.

When the production domain changes, update `SITE_URL` in `web/lib/seo.ts` and
the newsletter `SITE_URL` environment variable. They serve different purposes
and must agree in production.

Google Analytics loads only after visitor consent. Custom events cover
successful contact inquiries and confirmed newsletter subscriptions. Vercel
Speed Insights is mounted independently in the root layout.
