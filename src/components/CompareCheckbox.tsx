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
    <label className="relative z-10 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-700 bg-black/80 px-3 py-2 text-sm font-medium text-zinc-200 shadow-lg shadow-black/20 transition hover:border-zinc-500 has-disabled:cursor-not-allowed has-disabled:text-zinc-500">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => toggleCollege(collegeId, event.target.checked)}
        className="h-4 w-4 accent-white"
      />
      Compare
    </label>
  );
}
