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
    },
    {
      label: "Rating",
      render: (college: CompareCollege) => college.rating.toFixed(1),
    },
    {
      label: "Placements",
      render: (college: CompareCollege) => college.placements,
    },
  ];

  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/40">
      <table className="w-full min-w-[760px] border-collapse text-left">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="w-40 bg-black/40 p-5 text-sm font-semibold text-zinc-400">
              Field
            </th>
            {colleges.map((college) => (
              <th key={college.id} className="p-5 text-lg font-bold text-white">
                {college.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.label}
              className="border-b border-zinc-900 last:border-0"
            >
              <th className="bg-black/30 p-5 text-sm font-semibold text-zinc-400">
                {row.label}
              </th>
              {colleges.map((college) => (
                <td
                  key={`${college.id}-${row.label}`}
                  className="min-w-52 p-5 align-top text-zinc-200"
                >
                  {row.render(college)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
