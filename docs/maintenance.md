# Maintenance and troubleshooting

## Safe change workflow

1. Pull the latest `main`.
2. Create a focused feature branch.
3. Preserve unrelated working-tree changes.
4. Update generated types with schema/query changes.
5. Run affected workspace checks.
6. Open a pull request with a concise test record.
7. Merge without rewriting shared history.

## Content-model changes

The project already contains content. Treat destructive schema changes as
content migrations even when TypeScript compiles.

- Prefer adding or deprecating fields over silently repurposing them.
- Model stable relationships with Sanity references.
- Let Sanity generate IDs for repeatable documents.
- Reserve fixed IDs for Studio-controlled singletons.
- Run TypeGen after schema and query changes.
- Test existing published documents and newly created documents.

If a production field is removed, plan and test a Sanity migration rather than
assuming old values disappear safely.

## Common problems

### Missing Sanity environment variable

Ensure `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` exist in
`web/.env.local` or Vercel, then restart or redeploy.

### Sanity Live CORS error

Add the exact protocol and hostname to Sanity CORS. Origins have no path. Do
not enable credentials for the public website.

### Published content is not visible

Check that the document is published, its required references and slug exist,
the GROQ query projects the fields, TypeGen is current, and `SanityLive`
remains mounted in the root layout.

### TypeGen output lacks a field

Confirm the field exists in the schema and GROQ projection, then run
`pn typegen`. Query-result types omit schema fields the query does not select.

### Cache Components build error

Read the current error and matching local guide under
`web/node_modules/next/dist/docs/`. Runtime parameters, search parameters or
URL hooks commonly need a `Suspense` boundary. Do not disable Cache Components
as the first response.

### Contact form delivery failure

- Verify SMTP and contact variables.
- Confirm port `465` is used for immediate TLS when applicable.
- Ensure the authenticated mailbox matches `CONTACT_FROM_EMAIL`.
- Review Vercel function logs without printing credentials.
- Test the mailbox independently through cPanel/Roundcube.

### Newsletter confirmation failure

- Verify the Resend API key, segment ID and topic ID.
- Confirm `SITE_URL` points to the active deployment.
- Avoid rotating `NEWSLETTER_SIGNING_SECRET` while confirmation links are live.
- Check Resend and Vercel logs.
- Remember confirmation tokens expire after 24 hours.

### Analytics is absent

- Ensure the measurement ID existed at build time.
- Accept analytics in a private browser session.
- Disable blockers while testing.
- Check Realtime before historical reports.
- Do not send custom events before consent.

### Studio runtime version mismatch

Auto-updates may serve a runtime newer than local packages. Update `sanity` and
`@sanity/vision` together after pnpm policy permits the release, run Studio
checks, and commit the lockfile.

## Secrets, backups and ownership

Never log or commit API keys, SMTP passwords, signing secrets, authentication
tokens or recovery codes. Public identifiers such as the Sanity project ID,
dataset, Studio app ID and Google measurement ID are not credentials.

Rotate a secret immediately if it appears in Git history, deployment output,
screenshots or issue comments. Removing it from the latest file is not enough.

Sanity content lives in Content Lake, not Git. Before a high-risk migration,
create a dataset export using current Sanity CLI guidance. Repository backups
do not back up content or third-party service configuration.

GitHub, Vercel, Sanity, Resend, Google Analytics and the domain registrar are
administered for IAHL through `innovativeaihealthlab@gmail.com`. Developers and
vendors should receive individual access rather than the Gmail password.
Documentation records procedures and identifiers, never passwords.
