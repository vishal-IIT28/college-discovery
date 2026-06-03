export const MAX_COMPARE_COLLEGES = 3;

export function parseCompareIds(value: string | string[] | null | undefined) {
  const rawValue = Array.isArray(value) ? value[0] : value;

  if (!rawValue) {
    return [];
  }

  return Array.from(
    new Set(
      rawValue
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean),
    ),
  ).slice(0, MAX_COMPARE_COLLEGES);
}

export function buildCompareHref(ids: string[]) {
  const compareIds = parseCompareIds(ids.join(","));
  const params = new URLSearchParams();

  if (compareIds.length > 0) {
    params.set("ids", compareIds.join(","));
  }

  const query = params.toString();
  return query ? `/compare?${query}` : "/compare";
}
