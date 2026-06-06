"use client";

import { useCompareSelection } from "@/hooks/useCompareSelection";

type CompareCheckboxProps = {
  collegeId: string;
};

export function CompareCheckbox({ collegeId }: CompareCheckboxProps) {
  const { isDisabled, isSelected, toggleCollege } = useCompareSelection();
  const checked = isSelected(collegeId);
  const disabled = isDisabled(collegeId);

  return (
    <label
      className={`relative z-10 inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200 has-disabled:cursor-not-allowed has-disabled:opacity-50 ${
        checked
          ? "border-indigo-600 bg-indigo-600 text-white shadow-sm"
          : "border-slate-200 bg-white text-slate-600 shadow-sm hover:border-indigo-300 hover:text-indigo-600"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => toggleCollege(collegeId, event.target.checked)}
        className="sr-only"
      />
      <span
        aria-hidden
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
          checked
            ? "border-white/40 bg-white/20"
            : "border-slate-300 bg-slate-50"
        }`}
      >
        {checked ? (
          <svg
            className="h-2.5 w-2.5 text-white"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 6l3 3 5-5" />
          </svg>
        ) : null}
      </span>
      Compare
    </label>
  );
}
