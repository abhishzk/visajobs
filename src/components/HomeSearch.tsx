"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CompanyRecord {
  name: string;
  year: number;
  permits: number;
}

interface SearchResult {
  name: string;
  slug: string;
  totalPermits: number;
}

export default function HomeSearch() {
  const [query, setQuery] = useState("");
  const [companies, setCompanies] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Load company data lazily on first focus
  const [loaded, setLoaded] = useState(false);
  const loadData = () => {
    if (loaded) return;
    setLoaded(true);
    fetch("/data/companies.json")
      .then((r) => r.json())
      .then((data: CompanyRecord[]) => {
        // Aggregate into unique companies with total permits
        const map = new Map<string, number>();
        for (const r of data) {
          map.set(r.name, (map.get(r.name) || 0) + r.permits);
        }
        const results = Array.from(map.entries())
          .map(([name, totalPermits]) => ({
            name,
            slug: name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-+|-+$/g, ""),
            totalPermits,
          }))
          .sort((a, b) => b.totalPermits - a.totalPermits);
        setCompanies(results);
      });
  };

  const results = useMemo(() => {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    return companies.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 6);
  }, [query, companies]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowResults(false);
      router.push(`/companies?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => {
            loadData();
            if (query.length >= 2) setShowResults(true);
          }}
          placeholder="Search company... e.g. Google, TCS, Amazon"
          className="flex-1 px-4 py-3 rounded-lg bg-white/15 backdrop-blur-sm text-white placeholder-emerald-200/70 border border-white/25 focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/20 text-lg"
        />
        <button
          type="submit"
          className="px-5 py-3 rounded-lg bg-white text-emerald-800 font-semibold hover:bg-emerald-50 transition-colors"
        >
          Search
        </button>
      </form>

      {/* Instant results dropdown */}
      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50">
          {results.map((company) => (
            <Link
              key={company.name}
              href={`/companies/${company.slug}`}
              onClick={() => setShowResults(false)}
              className="flex items-center justify-between px-4 py-3 hover:bg-emerald-50 transition-colors border-b border-slate-100 last:border-0"
            >
              <span className="font-medium text-slate-900 truncate mr-3">
                {company.name}
              </span>
              <span className="text-sm text-emerald-700 font-semibold flex-shrink-0">
                {company.totalPermits.toLocaleString()} permits
              </span>
            </Link>
          ))}
          <Link
            href={`/companies?search=${encodeURIComponent(query)}`}
            onClick={() => setShowResults(false)}
            className="block px-4 py-3 text-center text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors"
          >
            See all results for &ldquo;{query}&rdquo;
          </Link>
        </div>
      )}
    </div>
  );
}
