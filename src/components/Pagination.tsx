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

  const linkClass =
    "rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900";
  const disabledClass =
    "rounded-lg border border-slate-100 bg-slate-50 px-4 py-2 text-sm text-slate-300";

  return (
    <nav className="mt-10 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
      <span>
        Page{" "}
        <span className="font-semibold text-slate-700">{pagination.page}</span>{" "}
        of{" "}
        <span className="font-semibold text-slate-700">
          {pagination.totalPages}
        </span>
      </span>

      <div className="flex gap-2">
        {previousPage >= 1 ? (
          <Link
            href={buildCollegeSearchParams({ ...query, page: previousPage })}
            className={linkClass}
          >
            Previous
          </Link>
        ) : (
          <span className={disabledClass}>Previous</span>
        )}

        {nextPage <= pagination.totalPages ? (
          <Link
            href={buildCollegeSearchParams({ ...query, page: nextPage })}
            className={linkClass}
          >
            Next
          </Link>
        ) : (
          <span className={disabledClass}>Next</span>
        )}
      </div>
    </nav>
  );
}
