import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { profiles, savedCompanies } from "@/lib/db/schema";
import { eq, count } from "drizzle-orm";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirectTo=/dashboard");

  // Get or create profile
  let [profile] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.id, user.id));

  if (!profile) {
    await db.insert(profiles).values({
      id: user.id,
      email: user.email!,
      fullName:
        user.user_metadata?.full_name || user.user_metadata?.name || null,
      avatarUrl: user.user_metadata?.avatar_url || null,
    });
    [profile] = await db.select().from(profiles).where(eq(profiles.id, user.id));
  }

  // Get saved companies count
  const [{ value: savedCount }] = await db
    .select({ value: count() })
    .from(savedCompanies)
    .where(eq(savedCompanies.userId, user.id));

  const displayName =
    profile.fullName || user.email?.split("@")[0] || "there";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-900">
        Welcome, {displayName}
      </h1>
      <p className="text-slate-600 mt-2">
        Your visa job search dashboard
      </p>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        <Link
          href="/dashboard/saved"
          className="rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow bg-white"
        >
          <p className="text-3xl font-bold text-emerald-700">{savedCount}</p>
          <p className="text-sm text-slate-600 mt-1">Saved Companies</p>
        </Link>
        <Link
          href="/companies"
          className="rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow bg-white"
        >
          <p className="text-3xl font-bold text-blue-700">22,570+</p>
          <p className="text-sm text-slate-600 mt-1">Companies to Explore</p>
        </Link>
        <Link
          href="/tools/salary-checker"
          className="rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow bg-white"
        >
          <p className="text-3xl font-bold text-amber-700">6</p>
          <p className="text-sm text-slate-600 mt-1">Permit Types</p>
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/companies"
            className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-sm transition-all"
          >
            <span className="text-2xl">🔍</span>
            <div>
              <p className="font-medium text-slate-900">Search Companies</p>
              <p className="text-sm text-slate-500">
                Find visa sponsor employers
              </p>
            </div>
          </Link>
          <Link
            href="/guides/permit-types"
            className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-sm transition-all"
          >
            <span className="text-2xl">📋</span>
            <div>
              <p className="font-medium text-slate-900">Permit Types Guide</p>
              <p className="text-sm text-slate-500">
                Compare all 9 permit types
              </p>
            </div>
          </Link>
          <Link
            href="/tools/salary-checker"
            className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-sm transition-all"
          >
            <span className="text-2xl">💰</span>
            <div>
              <p className="font-medium text-slate-900">Salary Checker</p>
              <p className="text-sm text-slate-500">
                Check permit eligibility
              </p>
            </div>
          </Link>
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-sm transition-all"
          >
            <span className="text-2xl">⚙️</span>
            <div>
              <p className="font-medium text-slate-900">Edit Preferences</p>
              <p className="text-sm text-slate-500">
                Set target sectors & salary
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Admin link if admin */}
      {profile.role === "ADMIN" && (
        <div className="mt-8 p-4 rounded-xl bg-purple-50 border border-purple-200">
          <Link
            href="/admin"
            className="flex items-center gap-2 text-purple-700 font-medium hover:underline"
          >
            <span>🛡️</span> Go to Admin Dashboard
          </Link>
        </div>
      )}
    </div>
  );
}
