# Environment variables

The website reads variables from `web/.env.local` during local development and
from Vercel project settings during deployment. `.env*` files are ignored by
Git; `web/.env.example` is the committed template.

Never place real secrets in documentation, issues, pull requests or chat.

## Variables

| Variable | Exposure | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Public | Sanity project; currently `f46q2zdd` |
| `NEXT_PUBLIC_SANITY_DATASET` | Public | Sanity dataset; currently `production` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` | Public | Google Analytics web stream |
| `SITE_URL` | Server-only | Origin used in newsletter confirmation links |
| `RESEND_API_KEY` | Secret | Newsletter email, contacts and template operations |
| `RESEND_NEWSLETTER_SEGMENT_ID` | Server-only | Confirmed subscriber segment |
| `RESEND_NEWSLETTER_TOPIC_ID` | Server-only | Newsletter opt-in topic |
| `NEWSLETTER_SIGNING_SECRET` | Secret | HMAC confirmation tokens |
| `SMTP_HOST` | Server-only | cPanel SMTP host |
| `SMTP_PORT` | Server-only | Secure SMTP port, normally `465` |
| `CONTACT_SMTP_USER` | Secret | Contact-form mailbox username |
| `CONTACT_SMTP_PASSWORD` | Secret | Contact-form mailbox password |
| `CONTACT_FROM_EMAIL` | Server-only | Authenticated sender address |
| `CONTACT_TO_EMAIL` | Server-only | IAHL inquiry recipient |

`NEXT_PUBLIC_*` values are bundled into browser JavaScript during `next build`
and must never contain secrets.

## Local configuration

```powershell
Copy-Item web/.env.example web/.env.local
```

The file belongs inside `web/`, not at the monorepo root, because Next.js runs
with `web` as its application directory.

## Vercel configuration

Configure variables in the Vercel project's environment settings. The Vercel
root directory is `web`.

- Production should use the canonical public origin for `SITE_URL` after DNS
  cutover.
- Preview may use the stable preview origin for newsletter testing.
- Restrict secrets to environments where those flows are intentionally used.

Changing a `NEXT_PUBLIC_*` value requires a new build. Redeploy after changing
`SITE_URL` so newly generated email links use the correct origin.

## Canonical URL distinction

The SEO canonical domain is defined in code as `SITE_URL` in
`web/lib/seo.ts`. The environment variable also named `SITE_URL` is read by
newsletter code. During a domain change, update both locations and verify the
sitemap, canonical tags, JSON-LD and confirmation emails.
