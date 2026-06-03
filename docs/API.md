# API Reference

## GET `/api/colleges`

Returns paginated college listing data.

### Query Parameters

| Name | Type | Description |
| --- | --- | --- |
| `search` | string | Optional college name search. Case-insensitive. |
| `maxFees` | number | Optional maximum annual fee filter. |
| `page` | number | Optional page number. Defaults to `1`. |
| `limit` | number | Optional page size. Defaults to `6`. Capped in server logic. |

### Example

```txt
/api/colleges?search=iit&maxFees=300000&page=1&limit=6
```

### Response

```json
{
  "data": [
    {
      "id": "college-id",
      "name": "IIT Bombay",
      "location": "Mumbai",
      "fees": 250000,
      "rating": 4.9,
      "placements": "32 LPA"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 6,
    "total": 1,
    "totalPages": 1
  }
}
```

### Empty Response

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

## Page-Level Data Fetches

These are not public JSON APIs, but they are important server data paths.

### College Detail

`src/lib/college-detail.ts`

Fetches one college by `id` for `/college/[id]`.

Fields:

- `id`
- `name`
- `location`
- `fees`
- `rating`
- `placements`
- `courses`

### Compare Colleges

`src/lib/compare-colleges.ts`

Fetches up to three colleges by IDs from `/compare?ids=id1,id2,id3`.

The order of selected IDs is preserved in the rendered table.
