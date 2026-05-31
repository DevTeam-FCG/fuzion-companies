# Fuzion Companies

Marketing site for Fuzion Companies — a portfolio of technology, consulting, and mission-driven businesses. Ported from a Base44 import into the Replit pnpm-workspace stack.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- Frontend (Base44-origin JSX): `artifacts/fuzion/` — pages in `src/pages/`, theme in `src/index.css` (navy + gold, radius 0)
- Backend: `artifacts/api-server/` — routes in `src/routes/` (`portfolio.ts`, `functions.ts`); PDF generators in `src/lib/pdf/*.ts`
- DB schema (source of truth): `lib/db/src/schema/portfolio-companies.ts`
- API contract (source of truth): `lib/api-spec/openapi.yaml` → codegen into `lib/api-zod/` + `lib/api-client-react/`

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
