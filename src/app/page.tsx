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
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="mb-10 text-4xl font-bold">College Discovery</h1>

      <CollegeFilters
        search={query.search}
        maxFees={query.maxFees}
        limit={query.limit}
        ids={query.ids}
      />

      {colleges.length > 0 ? (
        <>
          <div className="mb-4 text-sm text-zinc-400">
            Showing {colleges.length} of {pagination.total} colleges
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {colleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>

          <Pagination pagination={pagination} query={query} />
        </>
      ) : (
        <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-10 text-center">
          <h2 className="text-2xl font-bold">No colleges found</h2>
          <p className="mt-2 text-zinc-400">
            Try a different name or increase the maximum fees filter.
          </p>
        </section>
      )}

      <CompareBar />
    </main>
  );
}
