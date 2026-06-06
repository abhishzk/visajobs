"use client";

import { useMemo, useState } from "react";
import { getGrowthPercent, getGrowthIndicator, YEARS } from "@/lib/companies";

interface Record {
  year: number;
  permits: number;
}

export default function ClientCompanyDetail({
  name,
  records,
}: {
  name: string;
  records: Record[];
}) {
  const [savedCompanies, setSavedCompanies] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("savedCompanies");
      if (saved) return JSON.parse(saved);
    }
    return [];
  });

  const stats = useMemo(() => {
    const totalPermits = records.reduce((sum, r) => sum + r.permits, 0);
    const currentYear = Math.max(...YEARS);
    const previousYear = currentYear - 1;

    const currentYearPermits = records.find((r) => r.year === currentYear)?.permits || 0;
    const previousYearPermits = records.find((r) => r.year === previousYear)?.permits || 0;

    const growth = getGrowthPercent(currentYearPermits, previousYearPermits);
    const indicator = getGrowthIndicator(growth);

    const yearsActive = records.length;
    const avgPermitsPerYear = Math.round(totalPermits / yearsActive);

    return {
      totalPermits,
      yearsActive,
      avgPermitsPerYear,
      currentYearPermits,
      previousYearPermits,
      growth,
      indicator,
    };
  }, [records]);

  const isSaved = savedCompanies.includes(name);

  const toggleSave = () => {
    setSavedCompanies((prev) => {
      const updated = isSaved ? prev.filter((c) => c !== name) : [...prev, name];
      localStorage.setItem("savedCompanies", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">{name}</h1>
            <p className="text-slate-600 mt-2">Employment Permit Sponsorship Data</p>
          </div>
          <button
            onClick={toggleSave}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isSaved
                ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {isSaved ? "★ Saved" : "☆ Save"}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <p className="text-sm text-slate-600">Total Permits Issued</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">
            {stats.totalPermits.toLocaleString()}
          </p>
          <p className="text-xs text-slate-500 mt-2">2019-2026</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <p className="text-sm text-slate-600">Year-over-Year Growth</p>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-3xl font-bold ${stats.indicator.color}`}>
              {stats.indicator.label}
            </span>
            <span className="text-2xl">{stats.indicator.icon}</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {Math.max(...YEARS) - 1}: {stats.previousYearPermits.toLocaleString()} →{" "}
            {Math.max(...YEARS)}: {stats.currentYearPermits.toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <p className="text-sm text-slate-600">Years Active</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{stats.yearsActive}</p>
          <p className="text-xs text-slate-500 mt-2">Consecutive sponsorships</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <p className="text-sm text-slate-600">Average Permits/Year</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">
            {stats.avgPermitsPerYear.toLocaleString()}
          </p>
          <p className="text-xs text-slate-500 mt-2">Across all years</p>
        </div>
      </div>

      {/* Yearly Breakdown */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Permits by Year</h2>
        <div className="space-y-4">
          {YEARS.map((year) => {
            const permits = records.find((r) => r.year === year)?.permits || 0;
            const maxPermits = Math.max(...records.map((r) => r.permits));
            const pct = permits > 0 ? (permits / maxPermits) * 100 : 0;

            const prevYear = year - 1;
            const prevPermits = records.find((r) => r.year === prevYear)?.permits || 0;
            const growth = getGrowthPercent(permits, prevPermits);
            const growthIndicator = getGrowthIndicator(growth);

            return (
              <div key={year} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-900 w-12">{year}</span>
                    <span className="text-2xl font-bold text-emerald-700">
                      {permits.toLocaleString()}
                    </span>
                    {year > Math.min(...YEARS) && growth !== null && (
                      <span
                        className={`text-sm font-medium ${growthIndicator.color}`}
                      >
                        {growthIndicator.label} {growthIndicator.icon}
                      </span>
                    )}
                  </div>
                </div>
                <div className="bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
