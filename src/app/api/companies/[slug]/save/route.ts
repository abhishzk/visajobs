import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { savedCompanies, activityLog } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

// Save a company
export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const companyName = body.companyName || slug;

  try {
    await db
      .insert(savedCompanies)
      .values({
        userId: user.id,
        companySlug: slug,
        companyName,
      })
      .onConflictDoNothing();

    // Log activity
    await db.insert(activityLog).values({
      userId: user.id,
      action: "SAVE_COMPANY",
      path: `/companies/${slug}`,
      metadata: { companyName, companySlug: slug },
    });

    return NextResponse.json({ saved: true });
  } catch (error) {
    console.error("Error saving company:", error);
    return NextResponse.json(
      { error: "Failed to save company" },
      { status: 500 }
    );
  }
}

// Unsave a company
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await db
      .delete(savedCompanies)
      .where(
        and(
          eq(savedCompanies.userId, user.id),
          eq(savedCompanies.companySlug, slug)
        )
      );

    // Log activity
    await db.insert(activityLog).values({
      userId: user.id,
      action: "UNSAVE_COMPANY",
      path: `/companies/${slug}`,
      metadata: { companySlug: slug },
    });

    return NextResponse.json({ saved: false });
  } catch (error) {
    console.error("Error unsaving company:", error);
    return NextResponse.json(
      { error: "Failed to unsave company" },
      { status: 500 }
    );
  }
}
