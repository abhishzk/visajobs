"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  CompanyRecord,
  YEARS,
  aggregateCompanies,
  getTrendingCompanies,
  slugify,
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
    return getTrendingCompanies(aggregated, 6);
  }, [data]);

  if (loading || trending.length === 0) {
    return null;
  }

  const currentYear = Math.max(...YEARS);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">
          📈 Growing Sponsors
        </h2>
        <p className="text-slate-600 mt-2">
          Companies increasing visa sponsorships in {currentYear}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trending.map((company) => {
          const permits = company.yearData[currentYear] || 0;
          const growth = company.growth || 0;

          return (
            <Link
              key={company.name}
              href={`/companies/${slugify(company.name)}`}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-slate-900 line-clamp-2 flex-1">
                  {company.name}
                </h3>
                <span className="text-lg font-bold text-green-600 ml-2 flex-shrink-0">
                  +{growth}%
                </span>
              </div>
              <p className="text-sm text-slate-600">
                {permits.toLocaleString()} permits in {currentYear}
              </p>
              <div className="mt-3 inline-block px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded">
                Growing
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
