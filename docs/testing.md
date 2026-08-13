# Testing

This repository currently uses production builds, linting and targeted manual
acceptance tests. It has no automated unit or end-to-end test suite.

## Code checks

Frontend-only changes:

```powershell
pn lint
pn build
```

Studio schema, structure or configuration changes:

```powershell
pn typegen
pn --dir studio exec eslint .
pn studio:build
```

For changes spanning both workspaces, run all relevant checks. Do not run
TypeGen when no schema or query changed merely to produce a generated diff.

## Acceptance checklist

Test the deployed preview, not only localhost.

### Navigation and layout

- Header and footer appear on public routes.
- Desktop and mobile navigation work.
- Layouts do not overflow narrow screens.
- Images preserve useful crops at supported breakpoints.
- Keyboard focus is visible and controls are reachable.

### Content and failure states

- Home, About, Our Work, Projects, Media and Get involved load published data.
- Empty featured lists do not render broken sections.
- Missing singleton content produces the intended not-found state.
- Invalid project, news and multimedia slugs return designed 404 pages.
- Portable Text headings, lists, links, images and galleries render correctly.
- External links and publication downloads open the intended resource.

### Sanity publishing

- Publish a harmless text change.
- Verify it appears on the deployed website without a frontend deploy.
- Restore and publish the original text.
- Confirm draft-only changes are not public.

### Contact form

- Browser and server validation behave correctly.
- Errors do not clear entered values.
- A valid inquiry reaches `CONTACT_TO_EMAIL`.
- Replying targets the visitor's submitted email.
- Delivery failures show a generic retry message without leaking credentials.

Use labelled test content and avoid repeatedly emailing the production inbox.

### Newsletter

- A valid address receives the confirmation email.
- The link works before its 24-hour expiry.
- Invalid or expired tokens show the safe error page.
- Confirmation updates the Resend contact, segment and topic.
- Reusing confirmation does not create duplicate contacts.
- Broadcasts include Resend's unsubscribe footer.

Use a controlled address and remove it afterward if it should not receive
future broadcasts.

### Privacy and analytics

- Analytics does not load before consent.
- Declining leaves the site functional.
- Accepting produces Google Analytics Realtime activity.
- `generate_lead` appears after a successful inquiry.
- `newsletter_subscribe` appears after successful confirmation.
- Privacy settings reopen from the footer.

### SEO and performance

Inspect:

```text
/robots.txt
/sitemap.xml
/manifest.webmanifest
/opengraph-image
/icon.svg
```

Confirm titles, descriptions, canonical URLs, Open Graph metadata and JSON-LD
use the canonical IAHL domain. Confirm Vercel Speed Insights receives deployed
traffic and review Core Web Vitals after enough real visits exist.

## Release smoke test

1. Open production in a private window.
2. Test analytics consent and navigation.
3. Open one project and one media detail page.
4. Verify an image and Portable Text document.
5. Check `/robots.txt` and `/sitemap.xml`.
6. Review Vercel logs for new errors.
7. Open Studio and confirm authenticated editing works.
