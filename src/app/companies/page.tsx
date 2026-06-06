"use client";

import { useState, useEffect, useMemo } from "react";

interface CompanyRecord {
  name: string;
  year: number;
  permits: number;
}

interface AggregatedCompany {
  name: string;
  totalPermits: number;
  yearData: Record<number, number>;
  yearsActive: number;
}

const YEARS = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];

export default function CompaniesPage() {
  const [data, setData] = useState<CompanyRecord[]>([]);
  const [search, setSearch] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");
  const [sortBy, setSortBy] = useState<"permits" | "name" | "years">("permits");
  const [page, setPage] = useState(1);
  const perPage = 50;

  useEffect(() => {
    fetch("/data/companies.json")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const aggregated = useMemo(() => {
    const map = new Map<string, AggregatedCompany>();

    for (const record of data) {
      const existing = map.get(record.name);
      if (existing) {
        existing.totalPermits += record.permits;
        existing.yearData[record.year] =
          (existing.yearData[record.year] || 0) + record.permits;
        existing.yearsActive = Object.keys(existing.yearData).length;
      } else {
        map.set(record.name, {
          name: record.name,
          totalPermits: record.permits,
          yearData: { [record.year]: record.permits },
          yearsActive: 1,
        });
      }
    }

    return Array.from(map.values());
  }, [data]);

  const filtered = useMemo(() => {
    let result = aggregated;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter((c) => c.name.toLowerCase().includes(q));
    }

    if (selectedYear !== "all") {
      result = result.filter((c) => c.yearData[selectedYear]);
    }

    result.sort((a, b) => {
      if (sortBy === "permits") {
        if (selectedYear !== "all") {
          return (
            (b.yearData[selectedYear] || 0) - (a.yearData[selectedYear] || 0)
          );
        }
        return b.totalPermits - a.totalPermits;
      }
      if (sortBy === "years") return b.yearsActive - a.yearsActive;
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [aggregated, search, selectedYear, sortBy]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  useEffect(() => {
    setPage(1);
  }, [search, selectedYear, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Companies Issuing Employment Permits
        </h1>
        <p className="mt-2 text-slate-600">
          {filtered.length.toLocaleString()} companies found. Search and filter
          to find visa sponsors.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Search company
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="e.g. Google, Amazon, TCS..."
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Year
          </label>
          <select
            value={selectedYear}
            onChange={(e) =>
              setSelectedYear(
                e.target.value === "all" ? "all" : Number(e.target.value)
              )
            }
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Years</option>
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Sort by
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="permits">Most Permits</option>
            <option value="years">Most Years Active</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">
                  #
                </th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">
                  Company
                </th>
                <th className="text-right px-4 py-3 text-sm font-semibold text-slate-700">
                  Total Permits
                </th>
                {YEARS.map((y) => (
                  <th
                    key={y}
                    className="text-right px-3 py-3 text-sm font-semibold text-slate-500 hidden lg:table-cell"
                  >
                    {y}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((company, idx) => (
                <tr
                  key={company.name}
                  className="border-b border-slate-100 hover:bg-emerald-50/50 transition-colors"
                >
                  <td className="px-4 py-3 text-sm text-slate-400">
                    {(page - 1) * perPage + idx + 1}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-900">
                      {company.name}
                    </div>
                    <div className="text-xs text-slate-500 lg:hidden">
                      Active {company.yearsActive} year
                      {company.yearsActive > 1 ? "s" : ""}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-800">
                      {company.totalPermits.toLocaleString()}
                    </span>
                  </td>
                  {YEARS.map((y) => (
                    <td
                      key={y}
                      className="px-3 py-3 text-right text-sm text-slate-600 hidden lg:table-cell"
                    >
                      {company.yearData[y] || (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 bg-slate-50">
            <p className="text-sm text-slate-600">
              Showing {(page - 1) * perPage + 1}-
              {Math.min(page * perPage, filtered.length)} of{" "}
              {filtered.length.toLocaleString()}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 text-sm rounded border border-slate-300 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-3 py-1 text-sm text-slate-600">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 text-sm rounded border border-slate-300 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
