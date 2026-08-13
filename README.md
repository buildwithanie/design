# IAHL Website Platform

Technical repository for the Innovate AI HealthLab (IAHL) public website and
content-management system.

## Applications

| Workspace | Purpose | Hosted at |
| --- | --- | --- |
| [`web/`](web/) | Public Next.js website | Vercel |
| [`studio/`](studio/) | Standalone Sanity Studio | Sanity |

The applications live in one pnpm workspace but are built and deployed
independently. The public site does not embed Studio.

## Technology

- Next.js App Router with Cache Components
- React and TypeScript
- Tailwind CSS and shadcn/ui based on Base UI
- Sanity Content Lake, Studio, Live Content API and TypeGen
- Resend for newsletter subscriptions and broadcasts
- SMTP for contact-form delivery
- Google Analytics with visitor consent
- Vercel Speed Insights

## Requirements and ownership

- Node.js 24.x (tested with `24.19.0`)
- pnpm 11.x (tested with `11.21.0`)
- Access to the private IAHL GitHub repository
- Individual access to the IAHL Sanity project for Studio work
- Service credentials when testing email or newsletter functionality

The repository uses the `pn` alias in its examples because that is the project
maintainer's pnpm 11 CLI. If the alias is unavailable, substitute `pnpm`.

IAHL's technical services are administered through the organization-controlled
account `innovativeaihealthlab@gmail.com`. Developers should use their own
invited accounts for daily access rather than sharing that account's password.

The private source repository is owned by the `innovate-ai-healthlab` GitHub
organization. Private visibility does not make it acceptable to commit secrets.

## Quick start

```powershell
pn install
Copy-Item web/.env.example web/.env.local
pn dev
```

Run Studio in a second terminal:

```powershell
pn studio:dev
```

- Website: <http://localhost:3000>
- Studio: <http://localhost:3333>

Fill `web/.env.local` before testing Sanity, contact-email or newsletter flows.
Never commit `.env.local` or copy secret values into documentation.

## Root commands

| Command | Purpose |
| --- | --- |
| `pn dev` | Run the Next.js development server |
| `pn build` | Create the production Next.js build and type-check it |
| `pn lint` | Lint the Next.js workspace |
| `pn studio:dev` | Run Sanity Studio with schema extraction and TypeGen watch mode |
| `pn studio:build` | Build Studio and validate its schema |
| `pn studio:deploy` | Deploy Studio to Sanity hosting |
| `pn typegen` | Extract the Studio schema and regenerate `web/sanity.types.ts` |
| `pn newsletter:template` | Create or update the reusable newsletter template in Resend |
| `pn deps:outdated` | Report outdated packages in all workspaces |
| `pn deps:update` | Interactively update dependencies across workspaces |

## Documentation

- [Architecture](docs/architecture.md)
- [Local development](docs/local-development.md)
- [Environment variables](docs/environment-variables.md)
- [Testing](docs/testing.md)
- [Deployment](docs/deployment.md)
- [Maintenance and troubleshooting](docs/maintenance.md)

These documents are for developers maintaining the platform. The client-facing
Sanity editor manual is maintained as a separate Word/PDF deliverable.

## Production services

- Private repository: `https://github.com/innovate-ai-healthlab/iahl-website`
- Public preview: <https://iahl-website.vercel.app>
- Sanity Studio: <https://iahl-content.sanity.studio>
- Canonical public domain: <https://innovateaihealthlab.co.ke>
- Sanity project ID: `f46q2zdd`
- Dataset: `production`

## Contribution workflow

1. Branch from an up-to-date `main`.
2. Make narrowly scoped changes.
3. Run the checks appropriate to the affected workspace.
4. Commit generated `web/sanity.types.ts` when schema or query types change.
5. Open a pull request into `main`.
6. Merge only after the production build succeeds.

Do not commit service credentials, account recovery information or exported
content containing personal data.
