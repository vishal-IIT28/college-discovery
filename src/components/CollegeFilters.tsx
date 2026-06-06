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
    <section className="mb-10 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Find your college
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Search by name or set a maximum fee budget to narrow results.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 md:grid-cols-[1fr_180px_auto] md:items-end"
      >
        <label className="grid gap-1.5">
          <span className="text-sm font-medium text-slate-700">
            Search by name
          </span>
          <input
            name="search"
            type="search"
            defaultValue={search}
            placeholder="e.g. Delhi University"
            className="h-11 rounded-lg border border-slate-200 bg-white px-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </label>

        <label className="grid gap-1.5">
          <span className="text-sm font-medium text-slate-700">Max fees</span>
          <input
            name="maxFees"
            type="number"
            min="0"
            defaultValue={maxFees ?? ""}
            placeholder="250000"
            className="h-11 rounded-lg border border-slate-200 bg-white px-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </label>

        <button
          type="submit"
          disabled={isPending}
          className="h-11 rounded-lg bg-indigo-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
        >
          {isPending ? "Loading..." : "Apply"}
        </button>
      </form>
    </section>
  );
}
