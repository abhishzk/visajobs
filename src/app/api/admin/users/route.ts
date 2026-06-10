import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { profiles, savedCompanies } from "@/lib/db/schema";
import { eq, desc, count } from "drizzle-orm";

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
    const users = await db
      .select({
        id: profiles.id,
        email: profiles.email,
        fullName: profiles.fullName,
        role: profiles.role,
        createdAt: profiles.createdAt,
        savedCount: count(savedCompanies.id),
      })
      .from(profiles)
      .leftJoin(savedCompanies, eq(profiles.id, savedCompanies.userId))
      .groupBy(profiles.id)
      .orderBy(desc(profiles.createdAt));

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
