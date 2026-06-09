"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  CompanyRecord,
  YEARS,
  aggregateCompanies,
  getTrendingCompanies,
  slugify,
  getGrowthIndicator,
} from "@/lib/companies";

export default function TrendingSection() {
  const [data, setData] = useState<CompanyRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/companies.json")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      });
  }, []);

  const trending = useMemo(() => {
    const aggregated = aggregateCompanies(data);
    return getTrendingCompanies(aggregated, 10);
  }, [data]);

  const currentYear = Math.max(...YEARS);
  const previousYear = currentYear - 1;

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-1/3 mb-4" />
          <div className="h-4 bg-slate-200 rounded w-1/2 mb-8" />
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-28 bg-slate-100 rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (trending.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            Trending Sponsors
          </h2>
          <p className="text-slate-600 mt-1">
            Companies sponsoring more permits in {currentYear} vs {previousYear}
          </p>
        </div>
        <Link
          href="/companies"
          className="text-sm font-medium text-emerald-700 hover:text-emerald-900 hover:underline hidden sm:block"
        >
          View all companies &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {trending.map((company, idx) => {
          const permits = company.yearData[currentYear] || 0;
          const prevPermits = company.yearData[previousYear] || 0;
          const growth = company.growth || 0;
          const indicator = getGrowthIndicator(growth);

          return (
            <Link
              key={company.name}
              href={`/companies/${slugify(company.name)}`}
              className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md hover:border-emerald-200 transition-all group"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs text-slate-400 font-medium">
                  #{idx + 1}
                </span>
                <span className={`text-sm font-bold ${indicator.color}`}>
                  {indicator.label}
                </span>
              </div>
              <h3 className="font-semibold text-slate-900 text-sm leading-tight line-clamp-2 min-h-[2.5rem] group-hover:text-emerald-700 transition-colors">
                {company.name}
              </h3>
              <div className="mt-2 text-xs text-slate-500">
                <span>{prevPermits} &rarr; {permits} permits</span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-4 text-center sm:hidden">
        <Link
          href="/companies"
          className="text-sm font-medium text-emerald-700 hover:underline"
        >
          View all companies &rarr;
        </Link>
      </div>
    </section>
  );
}
