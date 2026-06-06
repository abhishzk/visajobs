import { Suspense } from "react";
import { Metadata } from "next";
import CompaniesClient from "./client";

export const metadata: Metadata = {
  title: "Companies Issuing Employment Permits - VisaJobs Ireland",
  description:
    "Search 22,500+ companies that have been issued employment permits in Ireland. Filter by year, sort by permits, and find visa sponsors.",
};

export default function CompaniesPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-slate-200 rounded w-1/3" />
            <div className="h-4 bg-slate-200 rounded w-1/2" />
            <div className="h-40 bg-slate-200 rounded" />
          </div>
        </div>
      }
    >
      <CompaniesClient />
    </Suspense>
  );
}
