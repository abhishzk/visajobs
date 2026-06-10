import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { profiles, userPreferences } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [profile] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.id, user.id));

  const [preferences] = await db
    .select()
    .from(userPreferences)
    .where(eq(userPreferences.userId, user.id));

  return NextResponse.json({ profile, preferences });
}

export async function PATCH(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  try {
    // Update profile name if provided
    if (body.fullName !== undefined) {
      await db
        .update(profiles)
        .set({ fullName: body.fullName, updatedAt: new Date() })
        .where(eq(profiles.id, user.id));
    }

    // Upsert preferences
    if (
      body.targetSectors !== undefined ||
      body.targetCounties !== undefined ||
      body.minSalary !== undefined ||
      body.maxSalary !== undefined
    ) {
      await db
        .insert(userPreferences)
        .values({
          userId: user.id,
          targetSectors: body.targetSectors || [],
          targetCounties: body.targetCounties || [],
          minSalary: body.minSalary || null,
          maxSalary: body.maxSalary || null,
        })
        .onConflictDoUpdate({
          target: userPreferences.userId,
          set: {
            targetSectors: body.targetSectors,
            targetCounties: body.targetCounties,
            minSalary: body.minSalary,
            maxSalary: body.maxSalary,
            updatedAt: new Date(),
          },
        });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
