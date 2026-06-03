"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  buildCompareHref,
  MAX_COMPARE_COLLEGES,
  parseCompareIds,
} from "@/lib/compare-selection";

export function useCompareSelection() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedIds = parseCompareIds(searchParams.get("ids"));

  function updateSelectedIds(ids: string[]) {
    const params = new URLSearchParams(searchParams.toString());
    const nextIds = parseCompareIds(ids.join(","));

    if (nextIds.length > 0) {
      params.set("ids", nextIds.join(","));
    } else {
      params.delete("ids");
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }

  function toggleCollege(id: string, checked: boolean) {
    if (checked) {
      if (
        selectedIds.includes(id) ||
        selectedIds.length >= MAX_COMPARE_COLLEGES
      ) {
        return;
      }

      updateSelectedIds([...selectedIds, id]);
      return;
    }

    updateSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
  }

  return {
    selectedIds,
    compareHref: buildCompareHref(selectedIds),
    isSelected: (id: string) => selectedIds.includes(id),
    isDisabled: (id: string) =>
      !selectedIds.includes(id) && selectedIds.length >= MAX_COMPARE_COLLEGES,
    toggleCollege,
  };
}
