import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { savedCompanies } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const saved = await db
      .select()
      .from(savedCompanies)
      .where(eq(savedCompanies.userId, user.id))
      .orderBy(desc(savedCompanies.savedAt));

    return NextResponse.json({ companies: saved });
  } catch (error) {
    console.error("Error fetching saved companies:", error);
    return NextResponse.json(
      { error: "Failed to fetch saved companies" },
      { status: 500 }
    );
  }
}
