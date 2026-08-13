# Local development

## Initial setup

```powershell
git clone https://github.com/innovate-ai-healthlab/iahl-website.git
Set-Location iahl-website
pn install
Copy-Item web/.env.example web/.env.local
```

Add the required values described in
[environment-variables.md](environment-variables.md).

## Run the applications

Use separate terminals from the repository root.

```powershell
pn dev
```

```powershell
pn studio:dev
```

Studio development watches its schema and frontend Sanity queries. It may
regenerate `studio/schema.json` and `web/sanity.types.ts`; review generated
changes before committing them.

## Sanity access and CORS

IAHL's Sanity organization is administered through
`innovativeaihealthlab@gmail.com`. The organization owner accesses Sanity with
**Continue with Google** using that address. Developers should normally sign in
with their own Sanity account after an administrator invites it to project
`f46q2zdd`; do not request or share the organization Gmail password.

The same individual-access rule applies to the private GitHub organization,
Vercel, Resend and Google Analytics. Access should be granted to the
developer's account and revoked when no longer required.

List allowed origins with:

```powershell
pn --dir studio exec sanity cors list
```

`http://localhost:3000` should exist for development. It does not need
credentials for the published public website. `http://localhost:3333` is the
local Studio origin and uses authenticated Studio access.

## Schema and query workflow

1. Update `studio/schemaTypes/` or `web/sanity/lib/queries.ts`.
2. Run `pn typegen`.
3. Review `studio/schema.json` and `web/sanity.types.ts`.
4. Use generated query-result types in frontend components.
5. Build both affected workspaces.

Never hand-write a replacement for a generated TypeGen result type.

## Server and Client Components

- Keep routes, layouts, content fetching and metadata on the server.
- Create a focused Client Component for state, handlers, effects or browser
  APIs.
- Do not add `"use client"` to a `page.tsx` for one nested interactive control.
- Pass serializable data into the interactive component.
- Keep credential-bearing modules marked with `import "server-only"`.

Before changing Next.js behaviour, read the matching guide under
`web/node_modules/next/dist/docs/` because this version contains substantial
API and rendering changes.

## Adding dependencies

```powershell
pn --dir web add package-name
pn --dir studio add package-name
```

Use `-D` for development dependencies. Add a dependency to the root only when
root-level tooling imports it directly. Do not move dependencies to the root
merely to make workspace version numbers match.

## Dependency maintenance

```powershell
pn deps:outdated
pn deps:update
```

`pn deps:outdated` returns a non-zero exit code when updates exist. Review
major releases individually, especially Next.js, React, TypeScript, ESLint and
Sanity. Do not force versions with overrides unless every dependent workspace
supports them.

With Studio auto-updates, the served runtime may move ahead of local packages.
Update local `sanity` and `@sanity/vision` together after the release satisfies
the pnpm supply-chain policy, then rebuild Studio.
