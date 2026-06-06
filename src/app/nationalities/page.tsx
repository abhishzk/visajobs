"use client";

import { useState, useEffect, useMemo } from "react";

interface NationalityRecord {
  nationality: string;
  year: number;
  issued: number;
}

const YEARS = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];

export default function NationalitiesPage() {
  const [data, setData] = useState<NationalityRecord[]>([]);
  const [search, setSearch] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");
  const [page, setPage] = useState(1);
  const perPage = 30;

  useEffect(() => {
    fetch("/data/nationalities.json")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const aggregated = useMemo(() => {
    const map = new Map<
      string,
      {
        nationality: string;
        total: number;
        yearData: Record<number, number>;
      }
    >();

    for (const record of data) {
      const existing = map.get(record.nationality);
      if (existing) {
        existing.total += record.issued;
        existing.yearData[record.year] =
          (existing.yearData[record.year] || 0) + record.issued;
      } else {
        map.set(record.nationality, {
          nationality: record.nationality,
          total: record.issued,
          yearData: { [record.year]: record.issued },
        });
      }
    }

    return Array.from(map.values());
  }, [data]);

  const filtered = useMemo(() => {
    let result = aggregated;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter((n) => n.nationality.toLowerCase().includes(q));
    }

    if (selectedYear !== "all") {
      result = result.filter((n) => n.yearData[selectedYear]);
      result.sort(
        (a, b) =>
          (b.yearData[selectedYear] || 0) - (a.yearData[selectedYear] || 0)
      );
    } else {
      result.sort((a, b) => b.total - a.total);
    }

    return result;
  }, [aggregated, search, selectedYear]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const maxVal =
    selectedYear !== "all"
      ? Math.max(...filtered.map((n) => n.yearData[selectedYear] || 0), 1)
      : Math.max(...filtered.map((n) => n.total), 1);

  useEffect(() => {
    setPage(1);
  }, [search, selectedYear]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Permits by Nationality
        </h1>
        <p className="mt-2 text-slate-600">
          See which nationalities receive the most employment permits in
          Ireland.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 space-y-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search nationality..."
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedYear("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedYear === "all"
                ? "bg-emerald-700 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            All Years
          </button>
          {YEARS.map((y) => (
            <button
              key={y}
              onClick={() => setSelectedYear(y)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedYear === y
                  ? "bg-emerald-700 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      {/* Nationality list */}
      <div className="space-y-2">
        {paginated.map((nat, idx) => {
          const permits =
            selectedYear !== "all"
              ? nat.yearData[selectedYear] || 0
              : nat.total;
          const pct = (permits / maxVal) * 100;

          return (
            <div
              key={nat.nationality}
              className="bg-white rounded-lg border border-slate-200 px-4 py-3 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-400 w-6 text-right">
                    {(page - 1) * perPage + idx + 1}
                  </span>
                  <span className="font-medium text-slate-900">
                    {nat.nationality}
                  </span>
                </div>
                <span className="font-bold text-blue-700">
                  {permits.toLocaleString()}
                </span>
              </div>
              <div className="ml-9 bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 px-2">
          <p className="text-sm text-slate-600">
            Showing {(page - 1) * perPage + 1}-
            {Math.min(page * perPage, filtered.length)} of {filtered.length}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 text-sm rounded border border-slate-300 hover:bg-white disabled:opacity-40"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 text-sm rounded border border-slate-300 hover:bg-white disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
