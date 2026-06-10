import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { savedCompanies } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { slugify } from "@/lib/companies";

export default async function SavedCompaniesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirectTo=/dashboard/saved");

  const saved = await db
    .select()
    .from(savedCompanies)
    .where(eq(savedCompanies.userId, user.id))
    .orderBy(desc(savedCompanies.savedAt));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link
            href="/dashboard"
            className="text-sm text-emerald-600 hover:underline"
          >
            &larr; Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 mt-2">
            Saved Companies
          </h1>
          <p className="text-slate-600 mt-1">
            {saved.length} {saved.length === 1 ? "company" : "companies"} saved
          </p>
        </div>
        <Link
          href="/companies"
          className="px-4 py-2 rounded-lg bg-emerald-700 text-white text-sm font-medium hover:bg-emerald-800 transition-colors"
        >
          Find more
        </Link>
      </div>

      {saved.length === 0 ? (
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-12 text-center">
          <p className="text-slate-500 text-lg">No saved companies yet</p>
          <p className="text-slate-400 mt-2">
            Browse companies and click the save button to track them here.
          </p>
          <Link
            href="/companies"
            className="inline-block mt-6 px-6 py-3 rounded-lg bg-emerald-700 text-white font-semibold hover:bg-emerald-800 transition-colors"
          >
            Browse Companies
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {saved.map((company) => (
            <Link
              key={company.id}
              href={`/companies/${company.companySlug}`}
              className="block rounded-xl border border-slate-200 bg-white p-5 hover:shadow-md hover:border-emerald-200 transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {company.companyName}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Saved{" "}
                    {new Date(company.savedAt).toLocaleDateString("en-IE", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <span className="text-emerald-600 text-sm font-medium">
                  View &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
