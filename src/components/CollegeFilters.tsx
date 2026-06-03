"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useTransition } from "react";

type CollegeFiltersProps = {
  search: string;
  maxFees: number | null;
  limit: number;
  ids: string[];
};

export function CollegeFilters({
  search,
  maxFees,
  limit,
  ids,
}: CollegeFiltersProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const nextSearch = String(formData.get("search") ?? "").trim();
    const nextMaxFees = String(formData.get("maxFees") ?? "").trim();
    const params = new URLSearchParams();

    if (nextSearch) {
      params.set("search", nextSearch);
    }

    if (nextMaxFees) {
      params.set("maxFees", nextMaxFees);
    }

    if (limit !== 6) {
      params.set("limit", String(limit));
    }

    if (ids.length > 0) {
      params.set("ids", ids.join(","));
    }

    const query = params.toString();

    startTransition(() => {
      router.push(query ? `/?${query}` : "/");
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 grid gap-4 rounded-xl bg-zinc-950 p-4 ring-1 ring-zinc-800 md:grid-cols-[1fr_180px_auto]"
    >
      <label className="grid gap-2 text-sm text-zinc-300">
        Search by name
        <input
          name="search"
          type="search"
          defaultValue={search}
          placeholder="e.g. Delhi University"
          className="h-11 rounded-lg border border-zinc-800 bg-black px-3 text-white outline-none transition focus:border-zinc-500"
        />
      </label>

      <label className="grid gap-2 text-sm text-zinc-300">
        Max fees
        <input
          name="maxFees"
          type="number"
          min="0"
          defaultValue={maxFees ?? ""}
          placeholder="250000"
          className="h-11 rounded-lg border border-zinc-800 bg-black px-3 text-white outline-none transition focus:border-zinc-500"
        />
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="h-11 self-end rounded-lg bg-white px-5 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:bg-zinc-500"
      >
        {isPending ? "Loading..." : "Apply"}
      </button>
    </form>
  );
}
