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
    <main className="min-h-screen bg-black px-5 py-6 text-white sm:px-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="inline-flex rounded-lg border border-zinc-800 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white"
        >
          Back
        </Link>

        <header className="mt-8 mb-8">
          <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
            Comparison workspace
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Compare Colleges
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-400">
            Review fees, outcomes, locations, and course options side by side.
          </p>
        </header>

        {colleges.length > 0 ? (
          <CompareTable colleges={colleges} />
        ) : (
          <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center shadow-2xl shadow-black/40">
            <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
              Empty comparison
            </p>
            <h2 className="mt-3 text-2xl font-bold">No colleges selected</h2>
            <p className="mt-3 text-zinc-400">
              Select up to three colleges from the listing page to compare them.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex rounded-lg bg-white px-5 py-3 font-semibold text-black transition hover:bg-zinc-200"
            >
              Browse colleges
            </Link>
          </section>
        )}
      </div>
    </main>
  );
}
