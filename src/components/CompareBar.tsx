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
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 px-5 py-4 shadow-[0_-4px_24px_rgba(15,23,42,0.08)] backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-800">
          Compare{" "}
          <span className="text-indigo-600">
            {selectedIds.length}/{MAX_COMPARE_COLLEGES}
          </span>{" "}
          selected
        </p>

        <Link
          href={compareHref}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
        >
          Compare colleges
        </Link>
      </div>
    </div>
  );
}
