"use client";

import Link from "next/link";
import { useCompareSelection } from "@/hooks/useCompareSelection";
import { MAX_COMPARE_COLLEGES } from "@/lib/compare-selection";

export function CompareBar() {
  const { compareHref, selectedIds } = useCompareSelection();

  if (selectedIds.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-zinc-800 bg-black/90 px-5 py-4 text-white shadow-2xl shadow-black backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
        <p className="font-semibold">
          Compare ({selectedIds.length}/{MAX_COMPARE_COLLEGES} selected)
        </p>

        <Link
          href={compareHref}
          className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
        >
          Compare colleges
        </Link>
      </div>
    </div>
  );
}
