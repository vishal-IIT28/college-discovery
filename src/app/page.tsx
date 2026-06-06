import { CollegeCard } from "@/components/CollegeCard";
import { CompareBar } from "@/components/CompareBar";
import { CollegeFilters } from "@/components/CollegeFilters";
import { Pagination } from "@/components/Pagination";
import { getColleges, parseCollegeListQuery } from "@/lib/colleges";

type HomeProps = {
  searchParams: Promise<{
    search?: string | string[];
    maxFees?: string | string[];
    page?: string | string[];
    limit?: string | string[];
    ids?: string | string[];
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const queryParams = await searchParams;
  const query = parseCollegeListQuery(queryParams);
  const { data: colleges, pagination } = await getColleges(queryParams);

  return (
    <main className="min-h-screen bg-slate-50 pb-24">
      <section className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-10 sm:py-14">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            College Discovery
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Find the right college for you
          </h1>
          <p className="mt-3 max-w-2xl text-base text-slate-500">
            Compare fees, placements, and ratings across institutions — then
            shortlist colleges side by side.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-10">
        <CollegeFilters
          search={query.search}
          maxFees={query.maxFees}
          limit={query.limit}
          ids={query.ids}
        />

        {colleges.length > 0 ? (
          <>
            <p className="mb-5 text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {colleges.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700">
                {pagination.total}
              </span>{" "}
              colleges
            </p>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {colleges.map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>

            <Pagination pagination={pagination} query={query} />
          </>
        ) : (
          <section className="rounded-xl border border-slate-100 bg-white p-12 text-center shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              No colleges found
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Try a different name or increase the maximum fees filter.
            </p>
          </section>
        )}
      </div>

      <CompareBar />
    </main>
  );
}
