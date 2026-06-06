"use client";

import { useState } from "react";
import Link from "next/link";

const permitThresholds = [
  {
    name: "Critical Skills EP (CSOL occupation, with degree)",
    minSalary: 40904,
    description:
      "For occupations on the Critical Skills Occupations List. Requires a relevant degree. Fastest path to Stamp 4 (2 years).",
    path: "Stamp 4 after 2 years",
    spouseWork: "Yes (Stamp 1G)",
    lmnt: false,
    highlight: true,
  },
  {
    name: "Critical Skills EP (CSOL, recent graduate)",
    minSalary: 36848,
    description:
      "For CSOL occupations if degree was obtained within 12 months of application.",
    path: "Stamp 4 after 2 years",
    spouseWork: "Yes (Stamp 1G)",
    lmnt: false,
    highlight: true,
  },
  {
    name: "General EP (standard)",
    minSalary: 36605,
    description:
      "For any occupation not on the Ineligible List. Most common permit type.",
    path: "Stamp 4 after 5 years",
    spouseWork: "No (own permit needed)",
    lmnt: true,
    highlight: false,
  },
  {
    name: "General EP (recent Irish graduate)",
    minSalary: 34009,
    description:
      "For applicants with a relevant Irish degree issued in the past 12 months.",
    path: "Stamp 4 after 5 years",
    spouseWork: "No (own permit needed)",
    lmnt: true,
    highlight: false,
  },
  {
    name: "General EP (horticulture, meat processing, HCA, home support)",
    minSalary: 32691,
    description:
      "Lower threshold for specific sectors: horticulture workers, meat processor operatives, healthcare assistants, and home support workers.",
    path: "Stamp 4 after 5 years",
    spouseWork: "No (own permit needed)",
    lmnt: true,
    highlight: false,
  },
  {
    name: "Critical Skills EP (any occupation, no CSOL needed)",
    minSalary: 68911,
    description:
      "For ANY eligible occupation at high salary. Degree not mandatory but experience required. LMNT exemption included.",
    path: "Stamp 4 after 2 years",
    spouseWork: "Yes (Stamp 1G)",
    lmnt: false,
    highlight: true,
  },
];

export default function SalaryCheckerPage() {
  const [salary, setSalary] = useState("");

  const salaryNum = parseFloat(salary.replace(/,/g, "")) || 0;

  const eligible = permitThresholds
    .filter((p) => salaryNum >= p.minSalary)
    .sort((a, b) => b.minSalary - a.minSalary);

  const notEligible = permitThresholds
    .filter((p) => salaryNum > 0 && salaryNum < p.minSalary)
    .sort((a, b) => a.minSalary - b.minSalary);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-4">
        <Link
          href="/guides"
          className="text-sm text-emerald-600 hover:underline"
        >
          &larr; All Guides
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-slate-900 mb-3">
        Salary Checker
      </h1>
      <p className="text-lg text-slate-600 mb-8">
        Enter your annual salary to see which Irish employment permits you
        qualify for based on current thresholds.
      </p>

      {/* Input */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Annual Salary (EUR)
        </label>
        <div className="flex items-center gap-2">
          <span className="text-2xl text-slate-400">&euro;</span>
          <input
            type="text"
            inputMode="numeric"
            value={salary}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9.,]/g, "");
              setSalary(val);
            }}
            placeholder="e.g. 45000"
            className="flex-1 text-3xl font-bold text-slate-900 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        {salaryNum > 0 && (
          <p className="mt-2 text-sm text-slate-500">
            &euro;{salaryNum.toLocaleString()} per year &middot; &euro;
            {Math.round(salaryNum / 12).toLocaleString()} per month
          </p>
        )}
      </div>

      {/* Results */}
      {salaryNum > 0 && (
        <div className="space-y-6">
          {/* Eligible */}
          {eligible.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-green-700 mb-3">
                You qualify for {eligible.length} permit
                {eligible.length !== 1 ? "s" : ""}
              </h2>
              <div className="space-y-3">
                {eligible.map((permit) => (
                  <div
                    key={permit.name}
                    className={`rounded-xl border p-5 ${
                      permit.highlight
                        ? "bg-emerald-50 border-emerald-200"
                        : "bg-white border-slate-200"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-slate-900">
                        {permit.name}
                      </h3>
                      <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded flex-shrink-0 ml-2">
                        &euro;{permit.minSalary.toLocaleString()}+
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">
                      {permit.description}
                    </p>
                    <div className="flex flex-wrap gap-3 text-xs">
                      <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded">
                        {permit.path}
                      </span>
                      <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded">
                        Spouse work: {permit.spouseWork}
                      </span>
                      <span
                        className={`px-2 py-1 rounded ${
                          permit.lmnt
                            ? "bg-amber-100 text-amber-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        LMNT: {permit.lmnt ? "Required" : "Not required"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Not Eligible */}
          {notEligible.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-slate-500 mb-3">
                Below threshold for
              </h2>
              <div className="space-y-2">
                {notEligible.map((permit) => (
                  <div
                    key={permit.name}
                    className="bg-slate-50 rounded-lg border border-slate-200 p-4 opacity-70"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">
                        {permit.name}
                      </span>
                      <span className="text-sm text-slate-500">
                        needs &euro;{permit.minSalary.toLocaleString()} (
                        &euro;
                        {(permit.minSalary - salaryNum).toLocaleString()} more)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No matches */}
          {eligible.length === 0 && (
            <div className="bg-red-50 rounded-xl border border-red-200 p-6 text-center">
              <p className="text-red-700 font-semibold">
                Your salary is below the minimum threshold for all employment
                permits.
              </p>
              <p className="text-sm text-red-600 mt-2">
                The lowest threshold is &euro;32,691 for specific sectors
                (horticulture, meat processing, HCA, home support).
              </p>
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {salaryNum === 0 && (
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-8 text-center">
          <p className="text-slate-500">
            Enter your annual salary above to see which permits you qualify for.
          </p>
          <div className="mt-4 flex justify-center gap-3 flex-wrap">
            {[35000, 45000, 55000, 70000].map((amt) => (
              <button
                key={amt}
                onClick={() => setSalary(amt.toString())}
                className="px-3 py-1.5 text-sm rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-emerald-50 hover:border-emerald-300 transition-colors"
              >
                &euro;{amt.toLocaleString()}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10 p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-500 space-y-2">
        <p>
          Salary thresholds from{" "}
          <a
            href="https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/fees/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 hover:underline"
          >
            enterprise.gov.ie
          </a>{" "}
          as of June 2026. Thresholds are subject to change.
        </p>
        <p>
          This tool checks salary eligibility only. Other requirements (eligible
          occupation, employer eligibility, etc.) also apply.{" "}
          <Link
            href="/guides/permit-types"
            className="text-emerald-600 hover:underline"
          >
            See full permit details
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
