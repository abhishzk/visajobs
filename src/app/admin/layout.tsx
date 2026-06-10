import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirectTo=/admin");

  const [profile] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.id, user.id));

  if (!profile || profile.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-8 pb-4 border-b border-slate-200">
        <Link href="/admin" className="text-xl font-bold text-purple-700">
          Admin
        </Link>
        <nav className="flex gap-2">
          <Link
            href="/admin"
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-purple-50 hover:text-purple-700 transition-colors"
          >
            Overview
          </Link>
          <Link
            href="/admin/users"
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-purple-50 hover:text-purple-700 transition-colors"
          >
            Users
          </Link>
        </nav>
        <div className="ml-auto">
          <Link
            href="/dashboard"
            className="text-sm text-slate-500 hover:text-slate-700"
          >
            &larr; Back to app
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}
