import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { profiles, savedCompanies, searchHistory, activityLog } from "@/lib/db/schema";
import { count, sql, eq, desc } from "drizzle-orm";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check admin role
  const [profile] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.id, user.id));

  if (!profile || profile.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    // Total users
    const [{ value: totalUsers }] = await db
      .select({ value: count() })
      .from(profiles);

    // Total saved companies
    const [{ value: totalSaves }] = await db
      .select({ value: count() })
      .from(savedCompanies);

    // Total searches
    const [{ value: totalSearches }] = await db
      .select({ value: count() })
      .from(searchHistory);

    // Signups last 7 days
    const [{ value: recentSignups }] = await db
      .select({ value: count() })
      .from(profiles)
      .where(
        sql`${profiles.createdAt} > now() - interval '7 days'`
      );

    // Most saved companies (top 10)
    const topSavedCompanies = await db
      .select({
        companySlug: savedCompanies.companySlug,
        companyName: savedCompanies.companyName,
        saveCount: count(),
      })
      .from(savedCompanies)
      .groupBy(savedCompanies.companySlug, savedCompanies.companyName)
      .orderBy(desc(count()))
      .limit(10);

    // Recent activity (last 20)
    const recentActivity = await db
      .select({
        action: activityLog.action,
        path: activityLog.path,
        metadata: activityLog.metadata,
        createdAt: activityLog.createdAt,
        userEmail: profiles.email,
      })
      .from(activityLog)
      .leftJoin(profiles, eq(activityLog.userId, profiles.id))
      .orderBy(desc(activityLog.createdAt))
      .limit(20);

    return NextResponse.json({
      totalUsers,
      totalSaves,
      totalSearches,
      recentSignups,
      topSavedCompanies,
      recentActivity,
    });
  } catch (error) {
    console.error("Error fetching admin metrics:", error);
    return NextResponse.json(
      { error: "Failed to fetch metrics" },
      { status: 500 }
    );
  }
}
