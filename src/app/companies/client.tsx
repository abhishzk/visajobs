"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CompanyRecord,
  AggregatedCompany,
  YEARS,
  aggregateCompanies,
  slugify,
  getGrowthPercent,
  getGrowthIndicator,
} from "@/lib/companies";

export default function CompaniesClient() {
  const searchParams = useSearchParams();
  const urlSearch = searchParams.get("search") || "";

  const [data, setData] = useState<CompanyRecord[]>([]);
  const [search, setSearch] = useState(urlSearch);
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");
  const [sortBy, setSortBy] = useState<"permits" | "name" | "years">("permits");
  const [page, setPage] = useState(1);
  const [savedCompanies, setSavedCompanies] = useState<string[]>([]);
  const perPage = 50;

  useEffect(() => {
    fetch("/data/companies.json")
      .then((r) => r.json())
      .then(setData);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("savedCompanies");
    if (saved) setSavedCompanies(JSON.parse(saved));
  }, []);

  const aggregated = useMemo(() => aggregateCompanies(data), [data]);

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
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 space-y-4">
        <div className="flex flex-wrap gap-4 items-end">
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

        {/* Quick filters */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          <Link
            href="/sectors"
            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
          >
            📊 Browse Sectors
          </Link>
          <Link
            href="/counties"
            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors"
          >
            📍 Browse Counties
          </Link>
          <Link
            href="/nationalities"
            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
          >
            🌍 Browse Nationalities
          </Link>
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
              {paginated.map((company, idx) => {
                const currentYear = Math.max(...YEARS);
                const previousYear = currentYear - 1;
                const growth = getGrowthPercent(
                  company.yearData[currentYear],
                  company.yearData[previousYear]
                );
                const indicator = getGrowthIndicator(growth);
                const isSaved = savedCompanies.includes(company.name);

                return (
                  <tr
                    key={company.name}
                    className="border-b border-slate-100 hover:bg-emerald-50/50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-slate-400">
                      {(page - 1) * perPage + idx + 1}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/companies/${slugify(company.name)}`}
                        className="font-medium text-emerald-700 hover:text-emerald-900 hover:underline"
                      >
                        {company.name}
                      </Link>
                      <div className="flex items-center gap-2 text-xs text-slate-500 lg:hidden mt-1">
                        <span>
                          Active {company.yearsActive} year
                          {company.yearsActive > 1 ? "s" : ""}
                        </span>
                        {growth !== null && (
                          <span className={`${indicator.color} font-medium`}>
                            {indicator.label} {indicator.icon}
                          </span>
                        )}
                        <button
                          onClick={() => {
                            const updated = isSaved
                              ? savedCompanies.filter((c) => c !== company.name)
                              : [...savedCompanies, company.name];
                            setSavedCompanies(updated);
                            localStorage.setItem(
                              "savedCompanies",
                              JSON.stringify(updated)
                            );
                          }}
                          className="ml-auto text-slate-400 hover:text-slate-600"
                        >
                          {isSaved ? "★" : "☆"}
                        </button>
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
                );
              })}
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
