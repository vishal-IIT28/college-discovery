# Maintenance Guide

Use this guide when changing data, dependencies, schema, or production behavior.

## Daily Development Checklist

Run these before handing off changes:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

If `npm run build` fails while fetching Geist fonts, rerun in an environment with network access. The font fetch comes from the existing `next/font` setup in `src/app/layout.tsx`.

## Database Maintenance

### Regenerate Prisma Client

Run this after changing `prisma/schema.prisma`:

```bash
npx prisma generate
```

The generated client is written to:

```txt
src/generated
```

Do not manually edit generated files.

### Push Schema in Development

For quick local/dev schema syncing:

```bash
npx prisma db push
```

### Use Migrations for Durable Changes

For migration-based development:

```bash
npx prisma migrate dev
```

### Seed Data

```bash
npm run prisma:seed
```

Current seed data is in `prisma/seed.ts`.

## Data Quality Notes

Some seeded `placements` values may show mojibake for the rupee symbol. To clean this:

1. Update `prisma/seed.ts` with valid UTF-8 text.
2. Reset or clean the affected rows.
3. Rerun the seed.

Do not fix display encoding by adding UI hacks. Fix the source data.

## Dependency Updates

Recommended order:

1. Update dependencies in `package.json`.
2. Run `npm install`.
3. Read relevant Next.js docs in `node_modules/next/dist/docs/`.
4. Run lint, typecheck, and build.
5. Smoke-test `/`, `/api/colleges`, `/college/[id]`, and `/compare`.

## Production Readiness Checklist

- `DATABASE_URL` is set.
- Prisma client has been generated.
- Database schema is applied.
- Seed data exists, if demo data is required.
- `npm run build` passes.
- `/api/colleges` returns expected JSON.
- Detail pages return `404` for invalid IDs.
- Compare page handles empty and valid `ids`.

## Common Change Patterns

### Adding a New College Field

1. Add the field to `prisma/schema.prisma`.
2. Apply migration or `db push`.
3. Regenerate Prisma client.
4. Update seed data.
5. Update relevant selectors in `src/lib`.
6. Update UI components.
7. Update docs if the field is user-facing.

### Adding a New Filter

1. Add query param support in `CollegeListQuery`.
2. Parse and validate in `parseCollegeListQuery`.
3. Add Prisma `where` logic in `getColleges`.
4. Preserve the query param in pagination links.
5. Add form control in `CollegeFilters`.
6. Test empty and matching results.

### Adding a New Compare Row

1. Ensure the field is selected in `compare-colleges.ts`.
2. Add a row in `CompareTable`.
3. Keep mobile horizontal scrolling intact.
