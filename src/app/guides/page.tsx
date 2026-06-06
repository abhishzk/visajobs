import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visa Guides - VisaJobs Ireland",
  description:
    "Complete guides to Irish employment permits, visa applications, and the path to residency. Official government information made simple.",
};

const guides = [
  {
    title: "Employment Permit Types",
    description:
      "All 9 permit types compared — Critical Skills, General, ICT, and more. Salary thresholds, durations, and eligibility at a glance.",
    href: "/guides/permit-types",
    icon: "1",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "How to Apply",
    description:
      "Step-by-step application process through EPOL. Labour Market Needs Test, document checklists, employer requirements, and fees.",
    href: "/guides/how-to-apply",
    icon: "2",
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "After Approval",
    description:
      "What happens after your permit is granted — entry visas, IRP registration, stamp types, PPS number, and changing employer.",
    href: "/guides/after-approval",
    icon: "3",
    color: "bg-amber-100 text-amber-700",
  },
  {
    title: "Long-Term Pathway",
    description:
      "Renewal process, path to Stamp 4, long-term residency, and Irish citizenship by naturalisation. Your roadmap from permit to passport.",
    href: "/guides/long-term-pathway",
    icon: "4",
    color: "bg-purple-100 text-purple-700",
  },
];

export default function GuidesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900">
          Irish Work Visa Guides
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          Everything you need to know about working in Ireland as a non-EEA
          national. Based on official information from{" "}
          <a
            href="https://enterprise.gov.ie"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 hover:underline"
          >
            enterprise.gov.ie
          </a>{" "}
          and{" "}
          <a
            href="https://www.irishimmigration.ie"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 hover:underline"
          >
            irishimmigration.ie
          </a>
          .
        </p>
      </div>

      <div className="space-y-4">
        {guides.map((guide) => (
          <Link
            key={guide.href}
            href={guide.href}
            className="block bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md hover:border-emerald-200 transition-all"
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-10 h-10 rounded-lg ${guide.color} flex items-center justify-center text-lg font-bold flex-shrink-0`}
              >
                {guide.icon}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {guide.title}
                </h2>
                <p className="mt-1 text-slate-600">{guide.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <Link
          href="/tools/salary-checker"
          className="block bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl border border-emerald-200 p-6 hover:shadow-md transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-lg font-bold flex-shrink-0">
              $
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Salary Checker Tool
              </h2>
              <p className="mt-1 text-slate-600">
                Enter your salary to see which employment permits you qualify
                for. Instant results based on current thresholds.
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-10 p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-500">
        <p>
          Information sourced from official Irish government websites as of June
          2026. Salary thresholds, fees, and processing times are subject to
          change.{" "}
          <a
            href="https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 hover:underline"
          >
            Always verify with official sources
          </a>
          .
        </p>
      </div>
    </div>
  );
}
