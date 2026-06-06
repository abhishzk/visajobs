"use client";

import { useState, useEffect, useMemo } from "react";

interface SectorRecord {
  sector: string;
  year: number;
  permits: number;
}

const YEARS = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];

export default function SectorsPage() {
  const [data, setData] = useState<SectorRecord[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");

  useEffect(() => {
    fetch("/data/sectors.json")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const aggregated = useMemo(() => {
    const map = new Map<
      string,
      { sector: string; total: number; yearData: Record<number, number> }
    >();

    for (const record of data) {
      const existing = map.get(record.sector);
      if (existing) {
        existing.total += record.permits;
        existing.yearData[record.year] =
          (existing.yearData[record.year] || 0) + record.permits;
      } else {
        map.set(record.sector, {
          sector: record.sector,
          total: record.permits,
          yearData: { [record.year]: record.permits },
        });
      }
    }

    let result = Array.from(map.values());

    if (selectedYear !== "all") {
      result = result.filter((s) => s.yearData[selectedYear]);
      result.sort(
        (a, b) =>
          (b.yearData[selectedYear] || 0) - (a.yearData[selectedYear] || 0)
      );
    } else {
      result.sort((a, b) => b.total - a.total);
    }

    return result;
  }, [data, selectedYear]);

  const maxPermits =
    selectedYear !== "all"
      ? Math.max(...aggregated.map((s) => s.yearData[selectedYear] || 0), 1)
      : Math.max(...aggregated.map((s) => s.total), 1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Permits by Economic Sector
        </h1>
        <p className="mt-2 text-slate-600">
          See which industries issue the most employment permits in Ireland.
        </p>
      </div>

      {/* Year Filter */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
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

      {/* Sector bars */}
      <div className="space-y-3">
        {aggregated.map((sector, idx) => {
          const permits =
            selectedYear !== "all"
              ? sector.yearData[selectedYear] || 0
              : sector.total;
          const pct = (permits / maxPermits) * 100;

          return (
            <div
              key={sector.sector}
              className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-slate-400 w-6">
                    {idx + 1}
                  </span>
                  <h3 className="font-semibold text-slate-900">
                    {sector.sector}
                  </h3>
                </div>
                <span className="text-lg font-bold text-emerald-700">
                  {permits.toLocaleString()}
                </span>
              </div>
              <div className="ml-9 bg-slate-100 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              {selectedYear === "all" && (
                <div className="ml-9 mt-2 flex gap-1 flex-wrap">
                  {YEARS.map((y) => (
                    <span
                      key={y}
                      className={`text-xs px-2 py-0.5 rounded ${
                        sector.yearData[y]
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-50 text-slate-300"
                      }`}
                    >
                      {y}: {sector.yearData[y]?.toLocaleString() || "-"}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
