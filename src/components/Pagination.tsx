import Link from "next/link";
import {
  buildCollegeSearchParams,
  type CollegePagination,
  type ParsedCollegeListQuery,
} from "@/lib/colleges";

type PaginationProps = {
  pagination: CollegePagination;
  query: ParsedCollegeListQuery;
};

export function Pagination({ pagination, query }: PaginationProps) {
  if (pagination.totalPages <= 1) {
    return null;
  }

  const previousPage = pagination.page - 1;
  const nextPage = pagination.page + 1;

  return (
    <nav className="mt-8 flex flex-wrap items-center justify-between gap-3 text-sm text-zinc-300">
      <span>
        Page {pagination.page} of {pagination.totalPages}
      </span>

      <div className="flex gap-2">
        {previousPage >= 1 ? (
          <Link
            href={buildCollegeSearchParams({ ...query, page: previousPage })}
            className="rounded-lg border border-zinc-700 px-4 py-2 transition hover:border-zinc-400 hover:text-white"
          >
            Previous
          </Link>
        ) : (
          <span className="rounded-lg border border-zinc-900 px-4 py-2 text-zinc-600">
            Previous
          </span>
        )}

        {nextPage <= pagination.totalPages ? (
          <Link
            href={buildCollegeSearchParams({ ...query, page: nextPage })}
            className="rounded-lg border border-zinc-700 px-4 py-2 transition hover:border-zinc-400 hover:text-white"
          >
            Next
          </Link>
        ) : (
          <span className="rounded-lg border border-zinc-900 px-4 py-2 text-zinc-600">
            Next
          </span>
        )}
      </div>
    </nav>
  );
}
