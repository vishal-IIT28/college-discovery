# Architecture

This project is a Next.js 16 App Router application with Prisma-backed server rendering.

## High-Level Flow

```txt
Browser
  -> Next.js App Router
  -> Server Components / Route Handlers
  -> src/lib data helpers
  -> Prisma 7 client
  -> PostgreSQL on Neon
```

## Main Layers

### App Routes

`src/app` contains public routes and route handlers.

- `src/app/page.tsx` renders the listing page.
- `src/app/api/colleges/route.ts` exposes the listing API.
- `src/app/college/[id]/page.tsx` renders a college detail page.
- `src/app/compare/page.tsx` renders the compare table.

Pages are server components unless browser interactivity is required.

### Components

`src/components` contains reusable UI pieces.

- `CollegeCard` renders listing cards and compare checkbox entry points.
- `CollegeFilters` owns the listing filter form.
- `Pagination` renders URL-preserving page links.
- `CollegeDetailView` renders the detail page UI.
- `CompareCheckbox`, `CompareBar`, and `CompareTable` implement compare UI.

### Hooks

`src/hooks` contains browser-only behavior.

- `useCompareSelection` reads and writes compare selections through URL search params.

### Lib

`src/lib` contains shared non-UI logic.

- `prisma.ts` creates the generated Prisma client.
- `colleges.ts` parses listing queries and fetches paginated data.
- `college-detail.ts` fetches one college by ID.
- `compare-selection.ts` parses and builds compare URL state.
- `compare-colleges.ts` fetches selected colleges for comparison.
- `formatters.ts` contains shared display formatters.

## State Model

URL search params are the source of truth for user-visible listing and compare state.

Listing state:

```txt
/?search=iit&maxFees=300000&page=1&limit=6
```

Compare state:

```txt
/?ids=id1,id2
/compare?ids=id1,id2,id3
```

This makes the UI shareable, refresh-safe, and free from `localStorage`.

## Data Access Rules

- Query Prisma through `src/lib`.
- Keep API route handlers thin.
- Keep server components responsible for awaiting data.
- Keep client components focused on input, navigation, and pending states.
- Do not import Prisma into client components.

## Next.js 16 Notes

Next.js 16 has framework conventions that differ from older versions.

- `params` is a promise.
- `searchParams` is a promise.
- Route handlers use Web `Request` and `Response` APIs.
- Read local docs in `node_modules/next/dist/docs/` before changing routing or data-fetching behavior.
