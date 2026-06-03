# Implementation Plan

This document captures how the current feature set was implemented and how future work should be added.

## Completed Features

### Feature 1: Search, Filter, Pagination

Status: complete

Implemented pieces:

- Query parsing in `src/lib/colleges.ts`
- Prisma `where` construction for name search and max-fees filter
- Server-side pagination with `skip` and `take`
- API route support at `/api/colleges`
- Server-rendered homepage list
- Client filter form with pending state
- Reusable pagination component
- Empty state UI
- Route loading skeleton

### Feature 2: College Detail Page

Status: complete

Implemented pieces:

- Dynamic route at `/college/[id]`
- Detail fetch helper in `src/lib/college-detail.ts`
- Server component page
- Premium dark detail view component
- Route-level `loading.tsx`
- Route-level `not-found.tsx`
- Card click navigation from listing to detail

### Feature 3: Compare Colleges

Status: complete

Implemented pieces:

- URL-backed compare ID parsing
- Max 3 selected colleges
- Compare checkbox on college cards
- Sticky bottom compare bar
- Server-rendered `/compare` page
- Prisma fetch for selected colleges
- Responsive horizontal-scroll compare table
- Empty compare state
- Compare loading skeleton

## Future Feature Ideas

### Authentication

Add user accounts for saved colleges and personalized shortlists.

Suggested direction:

- Keep public listing and detail routes server-rendered.
- Add auth checks only around personalized features.
- Avoid mixing auth logic into low-level Prisma helpers.

### Saved Colleges

Add a `SavedCollege` table linked to users.

Suggested fields:

- `id`
- `userId`
- `collegeId`
- `createdAt`

### Advanced Filters

Possible filters:

- location
- course
- minimum rating
- placement range

Implementation notes:

- Extend `CollegeListQuery`.
- Extend `parseCollegeListQuery`.
- Extend Prisma `where` construction.
- Preserve filters in pagination links.

### Sorting

Possible sorts:

- rating descending
- fees ascending
- fees descending
- newest

Implementation notes:

- Add `sort` query param.
- Validate supported sort keys in `src/lib`.
- Keep the UI as a small client component if it changes URL state.

### Tests

Recommended test targets:

- query parsing helpers
- compare ID parsing
- API response shape
- empty-state rendering
- max compare selection behavior

## Implementation Rules

- Keep reusable UI in `src/components`.
- Keep database and parsing logic in `src/lib`.
- Keep browser-only URL mutation in `src/hooks`.
- Use server components for data-rendered pages.
- Keep client components small.
- Do not edit `src/generated`.
- Do not replace the app architecture unless the project requirements change.
