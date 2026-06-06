import Link from "next/link";
import { CompareTable } from "@/components/CompareTable";
import { getCompareColleges } from "@/lib/compare-colleges";

type ComparePageProps = {
  searchParams: Promise<{
    ids?: string | string[];
  }>;
};

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const { ids } = await searchParams;
  const colleges = await getCompareColleges(ids);

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
        >
          ← Back to search
        </Link>

        <header className="mt-8 mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Comparison workspace
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Compare colleges
          </h1>
          <p className="mt-3 max-w-2xl text-base text-slate-500">
            Review fees, outcomes, locations, and course options side by side.
          </p>
        </header>

        {colleges.length > 0 ? (
          <CompareTable colleges={colleges} />
        ) : (
          <section className="rounded-xl border border-slate-100 bg-white p-10 text-center shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Empty comparison
            </p>
            <h2 className="mt-3 text-xl font-bold text-slate-900">
              No colleges selected
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Select up to three colleges from the listing page to compare them.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-indigo-700"
            >
              Browse colleges
            </Link>
          </section>
        )}
      </div>
    </main>
  );
}
