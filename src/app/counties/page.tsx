"use client";

import { useState, useEffect, useMemo } from "react";

interface CountyRecord {
  county: string;
  year: number;
  issued: number;
  refused: number;
  withdrawn: number;
}

const YEARS = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];

export default function CountiesPage() {
  const [data, setData] = useState<CountyRecord[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");

  useEffect(() => {
    fetch("/data/counties.json")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const aggregated = useMemo(() => {
    const map = new Map<
      string,
      {
        county: string;
        totalIssued: number;
        totalRefused: number;
        yearData: Record<number, { issued: number; refused: number }>;
      }
    >();

    for (const record of data) {
      const existing = map.get(record.county);
      if (existing) {
        existing.totalIssued += record.issued;
        existing.totalRefused += record.refused;
        existing.yearData[record.year] = {
          issued: record.issued,
          refused: record.refused,
        };
      } else {
        map.set(record.county, {
          county: record.county,
          totalIssued: record.issued,
          totalRefused: record.refused,
          yearData: {
            [record.year]: {
              issued: record.issued,
              refused: record.refused,
            },
          },
        });
      }
    }

    let result = Array.from(map.values());

    if (selectedYear !== "all") {
      result = result.filter((c) => c.yearData[selectedYear]);
      result.sort(
        (a, b) =>
          (b.yearData[selectedYear]?.issued || 0) -
          (a.yearData[selectedYear]?.issued || 0)
      );
    } else {
      result.sort((a, b) => b.totalIssued - a.totalIssued);
    }

    return result;
  }, [data, selectedYear]);

  const maxIssued =
    selectedYear !== "all"
      ? Math.max(
          ...aggregated.map((c) => c.yearData[selectedYear]?.issued || 0),
          1
        )
      : Math.max(...aggregated.map((c) => c.totalIssued), 1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Permits by County
        </h1>
        <p className="mt-2 text-slate-600">
          Discover where in Ireland employment permits are being issued.
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

      {/* County grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {aggregated.map((county, idx) => {
          const issued =
            selectedYear !== "all"
              ? county.yearData[selectedYear]?.issued || 0
              : county.totalIssued;
          const refused =
            selectedYear !== "all"
              ? county.yearData[selectedYear]?.refused || 0
              : county.totalRefused;
          const pct = (issued / maxIssued) * 100;

          return (
            <div
              key={county.county}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-400">
                      #{idx + 1}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">
                      {county.county}
                    </h3>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-emerald-700">
                    {issued.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-500">permits issued</p>
                </div>
              </div>
              <div className="mt-3 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="mt-2 flex items-center gap-4 text-sm">
                <span className="text-red-600">
                  {refused.toLocaleString()} refused
                </span>
                <span className="text-slate-400">
                  {issued > 0
                    ? ((issued / (issued + refused)) * 100).toFixed(1)
                    : 0}
                  % approval rate
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
