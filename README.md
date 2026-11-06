# Devlon Solutions

Website and client-facing tools for **Devlon Solutions** — a web design, development and printing studio based in North Polokwane, Limpopo, South Africa, founded by Joseph Malemela.

The site presents the business (services, process, pricing) and includes three tools that turn visitors into enquiries: a printing quote form, an AI chat assistant, and a website-package invoice generator.

## Contents
- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Scripts](#scripts)
- [Project structure](#project-structure)
- [Data](#data)
- [Testing](#testing)
- [Deployment](#deployment)
- [Project status](#project-status)
- [Contact](#contact)

## Features
- **Marketing pages** — Home, About, Contact and Printing, each with page-level SEO metadata.
- **Printing quote form** (`/printing`) — captures job type, size, quantity and finishing, and hands the enquiry off to WhatsApp.
- **AI chat assistant** (`/api/chat`) — a visitor-facing assistant with persisted conversation threads; qualified enquiries are saved as leads for follow-up.
- **Invoice generator** (`/invoice`) — builds a printable quote/invoice for the basic website package and can share it straight to WhatsApp.
- **Supabase-backed data** — quote requests, leads and chat threads/messages are stored in Postgres via Supabase (see [Data](#data)).

## Tech stack
| Layer | Choice |
| --- | --- |
| Framework | [TanStack Start](https://tanstack.com/start) (React 19, file-based routing, SSR) |
| Language | TypeScript |
| Styling / UI | Tailwind CSS v4, Radix UI primitives, shadcn-style components |
| Data | Drizzle ORM + PostgreSQL via [Supabase](https://supabase.com) |
| AI | [Vercel AI SDK](https://sdk.vercel.ai) over an OpenAI-compatible model |
| Build / dev | Vite, Nitro (Cloudflare target by default) |
| Testing | Vitest, Testing Library, jsdom |
| Tooling | ESLint, Prettier, [Bun](https://bun.sh) (package manager & runtime) |

## Getting started
This project uses **Bun**, not npm or yarn — `bun.lock` is the lockfile.

### Prerequisites
- [Bun](https://bun.sh) installed

### Setup
```sh
git clone <this-repository-url>
cd devlon-solutions
bun install
bun run dev
```
The app runs at **http://localhost:8080**.

## Environment variables
Set these before running locally (already present in `.env` for this project — copy the same names into your host's environment settings when deploying):

| Variable | Purpose |
| --- | --- |
| `SUPABASE_URL` / `VITE_SUPABASE_URL` | Supabase project URL (server / client) |
| `SUPABASE_PROJECT_ID` / `VITE_SUPABASE_PROJECT_ID` | Supabase project ID |
| `SUPABASE_PUBLISHABLE_KEY` / `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase public (anon) key |
| `LOVABLE_API_KEY` | Required for the AI chat assistant — authenticates calls to the AI gateway |

## Scripts
| Command | Description |
| --- | --- |
| `bun run dev` | Start the dev server (http://localhost:8080) |
| `bun run build` | Production build |
| `bun run build:dev` | Development-mode build |
| `bun run preview` | Preview a production build locally |
| `bun run lint` | Run ESLint |
| `bun run format` | Format the codebase with Prettier |
| `bun run test` | Run the test suite once (Vitest) |
| `bun run test:watch` | Run tests in watch mode |

## Project structure
```
src/
  routes/           File-based pages: index, about, contact, printing, invoice, api/chat
  components/        UI components (ui/, ai-elements/) and shared site components
  integrations/
    supabase/         Supabase client, auth middleware and server helpers
  lib/                Site content (site.ts), invoice logic, chat helpers, error reporting
  server.ts, start.ts  SSR entry points
drizzle/
  migrations/         SQL migrations (chat_threads, chat_messages, leads, print_quote_requests, user_roles)
supabase/
  config.toml         Supabase project configuration
```

## Data
Quote requests, leads and AI chat threads/messages are stored in Postgres via Supabase, defined by the migrations in `drizzle/migrations/`:
- `print_quote_requests` — printing quote submissions
- `leads` — enquiries captured by the AI chat assistant
- `chat_threads` / `chat_messages` — chat conversation history
- `user_roles` — access control for staff/admin users

**Do not hand-edit `drizzle/` or `supabase/migrations/` directly** — coordinate schema changes with the project maintainer. Client data can be reviewed in the Supabase dashboard for this project.

## Testing
```sh
bun run test
```
Uses Vitest with Testing Library and jsdom — see `src/test/` for route and invoice-logic tests.

## Deployment
```sh
bun run build
```
Builds target Cloudflare by default via Nitro. Make sure the environment variables above (particularly `LOVABLE_API_KEY`, for the AI assistant) are set wherever the app is hosted.

## Project status
See [`roadmap.md`](./roadmap.md) for the full, up-to-date checklist. At a glance:
- ✅ Printing quote form with WhatsApp handoff
- ✅ AI chat assistant with saved conversations and lead capture
- ⏳ Owner alerts for new quotes/leads — pending a verified email domain (WhatsApp alerts also need a WhatsApp Business connection)
- ⏳ Customer confirmation email after a quote request — pending a verified email domain and an email field on the quote form

## Contact
**Devlon Solutions** — North Polokwane, Limpopo, South Africa
- WhatsApp / Phone: +27 68 965 2237
- Email: dixiedevSol@gmail.com
- Instagram: [@devlonsolutions](https://instagram.com/devlonsolutions)

