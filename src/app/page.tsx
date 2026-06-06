import Link from "next/link";

const stats = [
  {
    label: "Companies",
    value: "22,500+",
    desc: "Companies issued employment permits",
    href: "/companies",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    label: "Nationalities",
    value: "177",
    desc: "Nationalities represented",
    href: "/nationalities",
    color: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    label: "Counties",
    value: "26",
    desc: "Counties across Ireland",
    href: "/counties",
    color: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    label: "Sectors",
    value: "46",
    desc: "Economic sectors covered",
    href: "/sectors",
    color: "bg-purple-50 text-purple-700 border-purple-200",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Find companies that
            <br />
            <span className="text-emerald-300">sponsor work permits</span>
            <br />
            in Ireland
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-emerald-100 max-w-2xl">
            Search official government data to discover which companies,
            sectors, and counties are issuing employment permits. Make your visa
            sponsorship job search easier.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/companies"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-emerald-800 font-semibold hover:bg-emerald-50 transition-colors"
            >
              Search Companies
            </Link>
            <Link
              href="/sectors"
              className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-emerald-400 text-white font-semibold hover:bg-emerald-600 transition-colors"
            >
              Browse by Sector
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className={`rounded-xl border p-6 ${stat.color} hover:shadow-lg transition-shadow`}
            >
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="font-semibold mt-1">{stat.label}</p>
              <p className="text-sm opacity-70 mt-1">{stat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">How it works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl font-bold mx-auto">
              1
            </div>
            <h3 className="font-semibold mt-4 text-lg">Government Data</h3>
            <p className="text-slate-600 mt-2">
              We use official employment permit statistics published by the
              Irish Department of Enterprise.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl font-bold mx-auto">
              2
            </div>
            <h3 className="font-semibold mt-4 text-lg">Search & Filter</h3>
            <p className="text-slate-600 mt-2">
              Search by company name, filter by sector, county, or nationality
              to find relevant sponsors.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl font-bold mx-auto">
              3
            </div>
            <h3 className="font-semibold mt-4 text-lg">
              Plan Your Job Search
            </h3>
            <p className="text-slate-600 mt-2">
              Identify companies with a track record of sponsoring work permits
              and target your applications.
            </p>
          </div>
        </div>
      </section>

      {/* Data Coverage */}
      <section className="bg-white border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center mb-4">
            Data from 2019 to 2026
          </h2>
          <p className="text-center text-slate-600 max-w-2xl mx-auto">
            Track employment permit trends over 8 years. See which companies
            are consistently sponsoring, which sectors are growing, and where
            the opportunities are.
          </p>
          <div className="flex justify-center gap-3 mt-8 flex-wrap">
            {[2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026].map((year) => (
              <span
                key={year}
                className="px-4 py-2 bg-slate-100 rounded-lg text-sm font-medium text-slate-700"
              >
                {year}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
