import type { CompareCollege } from "@/lib/compare-colleges";
import { currencyFormatter } from "@/lib/formatters";

type CompareTableProps = {
  colleges: CompareCollege[];
};

export function CompareTable({ colleges }: CompareTableProps) {
  const rows = [
    {
      label: "Location",
      render: (college: CompareCollege) => college.location,
    },
    {
      label: "Fees",
      render: (college: CompareCollege) =>
        currencyFormatter.format(college.fees),
      tabular: true,
    },
    {
      label: "Rating",
      render: (college: CompareCollege) => college.rating.toFixed(1),
      tabular: true,
    },
    {
      label: "Placements",
      render: (college: CompareCollege) => college.placements,
    },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-100/80">
              <th className="w-44 px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Metric
              </th>
              {colleges.map((college) => (
                <th
                  key={college.id}
                  className="px-6 py-4 text-sm font-bold text-slate-900"
                >
                  {college.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.label}
                className="border-b border-slate-100 last:border-0"
              >
                <th className="px-6 py-5 text-sm font-semibold text-slate-500">
                  {row.label}
                </th>
                {colleges.map((college) => (
                  <td
                    key={`${college.id}-${row.label}`}
                    className={`min-w-52 px-6 py-5 align-top text-sm text-slate-800 ${
                      row.tabular ? "font-semibold tabular-nums" : ""
                    }`}
                  >
                    {row.render(college)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
