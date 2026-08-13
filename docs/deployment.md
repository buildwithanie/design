# Deployment

The website and Studio deploy independently from the same repository.

The private repository is owned by the `innovate-ai-healthlab` GitHub
organization. IAHL's organization-controlled administrative email is
`innovativeaihealthlab@gmail.com`; deployment operators should nevertheless
use individually invited accounts.

## Website on Vercel

The Vercel project uses:

| Setting | Value |
| --- | --- |
| Framework | Next.js |
| Root directory | `web` |
| Install command | Automatically detected pnpm install |
| Build command | `next build` |
| Output directory | Next.js default `.next` |
| Production branch | `main` |

Do not configure `pn --dir web build` in Vercel. It already executes from the
configured `web` root. Add all variables from
[environment-variables.md](environment-variables.md). Git pushes and merged
pull requests trigger deployments through the repository integration.

### Preview

The stable preview is:

```text
https://iahl-website.vercel.app
```

Add that exact origin to Sanity CORS without credentials. Branch deployments
use changing URLs; do not enable a broad credentialed wildcard.

### Production domain cutover

When `innovateaihealthlab.co.ke` is connected to Vercel:

1. Add and verify the domain in Vercel.
2. Update the Vercel `SITE_URL` variable.
3. Confirm `web/lib/seo.ts` contains the same canonical domain.
4. Add the production origin to Sanity CORS without credentials.
5. Redeploy the website.
6. Verify confirmation links, metadata, sitemap and JSON-LD.
7. Update the Google Analytics web-stream URL where appropriate.
8. Confirm the Resend sending domain remains verified.

## Sanity Studio

Studio is hosted by Sanity at:

```text
https://iahl-content.sanity.studio
```

Deploy from the repository root:

```powershell
pn studio:deploy
```

`studio/sanity.cli.ts` contains the non-secret deployment `appId` and enables
automatic updates. Deployment performs schema extraction, Studio build,
manifest generation and schema deployment.

Studio hosting is separate from Vercel. Do not create a Vercel project for
`studio` and do not embed it in the website.

## Sanity CORS

```powershell
pn --dir studio exec sanity cors list
pn --dir studio exec sanity cors add https://example.org
```

The public website reads the public dataset and should not allow credentials.
Authenticated Studio origins require credentials; Sanity-hosted Studio is
handled by Sanity.

## Rollback

### Website

Promote the last known-good deployment from Vercel history, then diagnose the
failed commit in a new branch. Do not rewrite `main` history.

### Studio code

Revert the problematic commit through Git and redeploy Studio. Auto-updated
runtime versions are managed separately from custom Studio code through the
configured Studio application.

### Content

Use Sanity document history to restore content. Redeploying frontend code does
not roll back Content Lake data.

After deployment, follow the relevant checks in [testing.md](testing.md). A
successful build alone does not verify email, newsletter, CORS, content
freshness or analytics.
