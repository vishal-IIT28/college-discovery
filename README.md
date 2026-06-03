# College Discovery Platform

A full-stack college search and comparison app built with Next.js 16, TypeScript, TailwindCSS, Prisma 7, and PostgreSQL on Neon.

The platform lets users browse colleges, search by name, filter by fees, open detailed college profiles, and compare up to three colleges side by side.

## Features

### College Listing

- Server-rendered homepage at `/`
- College cards sorted by rating
- Search by college name
- Filter by maximum fees
- Server-side pagination
- Empty state when no colleges match
- Loading skeleton for route transitions

### College API

- Route handler at `/api/colleges`
- Supports query params:
  - `search`
  - `maxFees`
  - `page`
  - `limit`
- Returns:

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 6,
    "total": 0,
    "totalPages": 0
  }
}
```

### College Detail Page

- Dynamic route at `/college/[id]`
- Server-side Prisma fetch by college ID
- Shows:
  - name
  - location
  - fees
  - rating
  - placements
  - courses
- Includes route-level loading and not-found states

### Compare Colleges

- Route at `/compare`
- Users can select up to three colleges from listing cards
- Selected college IDs are stored in the URL as `?ids=id1,id2,id3`
- No `localStorage`
- Sticky compare bar appears when colleges are selected
- Server-rendered comparison table
- Horizontal scroll on smaller screens

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- TailwindCSS 4
- Prisma 7
- PostgreSQL
- Neon database hosting
- Next.js route handlers
- Generated Prisma client in `src/generated`

## Project Structure

```txt
src/
  app/
    api/
      colleges/
        route.ts
    college/
      [id]/
        loading.tsx
        not-found.tsx
        page.tsx
    compare/
      loading.tsx
      page.tsx
    globals.css
    layout.tsx
    loading.tsx
    page.tsx
  components/
    CollegeCard.tsx
    CollegeDetailView.tsx
    CollegeFilters.tsx
    CompareBar.tsx
    CompareCheckbox.tsx
    CompareTable.tsx
    Pagination.tsx
  hooks/
    useCompareSelection.ts
  lib/
    college-detail.ts
    colleges.ts
    compare-colleges.ts
    compare-selection.ts
    formatters.ts
    prisma.ts
  generated/
    ...
prisma/
  schema.prisma
  seed.ts
docs/
  API.md
  ARCHITECTURE.md
  IMPLEMENTATION_PLAN.md
  MAINTENANCE.md
  TROUBLESHOOTING.md
```

## Architecture Summary

The app keeps data access in `src/lib` and keeps route files thin.

- `src/lib/prisma.ts` creates the Prisma 7 client using the Neon/PostgreSQL adapter.
- `src/lib/colleges.ts` owns list query parsing, Prisma filtering, and pagination.
- `src/lib/college-detail.ts` owns detail-page data access.
- `src/lib/compare-colleges.ts` owns compare-page data access.
- Client components are used only where browser interactivity is needed:
  - filter form navigation
  - compare checkbox state
  - sticky compare bar
- Server components are used for pages and data-rendered views where possible.

More detail is available in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create a `.env` file with a Neon/PostgreSQL connection string:

```env
DATABASE_URL="postgresql://..."
```

### 3. Generate Prisma Client

The project uses Prisma 7 with a generated client output inside `src/generated`.

```bash
npx prisma generate
```

### 4. Push or Migrate Schema

For local development against a fresh database:

```bash
npx prisma db push
```

For migration-based workflows:

```bash
npx prisma migrate dev
```

### 5. Seed Data

```bash
npm run prisma:seed
```

### 6. Start Development Server

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev
```

Starts the Next.js development server.

```bash
npm run build
```

Builds the production app.

```bash
npm run start
```

Starts the production server after a build.

```bash
npm run lint
```

Runs ESLint.

```bash
npm run prisma:seed
```

Seeds the `College` table.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | College listing with search, fee filter, pagination, and compare selection |
| `/api/colleges` | JSON API for paginated college listing |
| `/college/[id]` | Detail page for one college |
| `/compare` | Compare selected colleges from URL IDs |

## Database Model

```prisma
model College {
  id         String   @id @default(cuid())
  name       String
  location   String
  fees       Int
  rating     Float
  courses    String[]
  placements String
  createdAt  DateTime @default(now())
}
```

## Development Notes

- This project uses Next.js 16. Read `node_modules/next/dist/docs/` before changing framework-specific conventions.
- In Next.js 16, `params` and `searchParams` are promises in page components.
- Do not edit generated Prisma files in `src/generated`.
- Keep database query logic in `src/lib`, not inside UI components.
- Preserve URL-based state for filters, pagination, and compare selections.
- Avoid `localStorage` for compare state.

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Implementation Plan](docs/IMPLEMENTATION_PLAN.md)
- [API Reference](docs/API.md)
- [Maintenance Guide](docs/MAINTENANCE.md)
- [Troubleshooting](docs/TROUBLESHOOTING.md)

## Known Notes

- The seed data currently contains some mojibake text for rupee symbols in `placements`. This is data quality cleanup, not an application architecture issue.
- Production builds may need network access because `next/font` fetches Google font assets for Geist.

## License

Private project.
