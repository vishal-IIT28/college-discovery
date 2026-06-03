# Troubleshooting

## Build Fails Fetching Geist Fonts

Symptom:

```txt
next/font: error:
Failed to fetch `Geist` from Google Fonts.
```

Cause:

The app uses `next/font/google` in `src/app/layout.tsx`. Production builds need network access to fetch and optimize those font assets.

Fix:

- Run the build in an environment with network access.
- Or replace Google-hosted font usage with local fonts if offline builds are required.

## Prisma Client Import Fails

Symptom:

```txt
Cannot find module '@/generated/client'
```

Fix:

```bash
npx prisma generate
```

The project expects Prisma client output at `src/generated`.

## Database Connection Fails

Check:

- `.env` exists.
- `DATABASE_URL` is set.
- Neon database is awake and reachable.
- The connection string includes required SSL settings if Neon requires them.

Then retry:

```bash
npx prisma db push
npm run prisma:seed
```

## `/api/colleges` Returns Empty Data

Possible causes:

- Database has no seeded colleges.
- Filters are too restrictive.
- `DATABASE_URL` points to a different database.

Try:

```txt
/api/colleges?page=1&limit=10
```

Then reseed if needed:

```bash
npm run prisma:seed
```

## Compare Bar Does Not Appear

The compare bar appears only when the URL contains at least one selected ID:

```txt
/?ids=id1
```

If it does not appear:

- Confirm `CompareBar` is mounted in `src/app/page.tsx`.
- Confirm `CompareCheckbox` updates the `ids` query param.
- Confirm the current route is the listing page.

## Cannot Select More Than Three Colleges

This is expected.

The max compare count is defined in:

```txt
src/lib/compare-selection.ts
```

The current limit is `3`.

## Invalid Detail Page Shows Not Found

This is expected.

`/college/[id]` calls `notFound()` when Prisma cannot find a matching college ID.
