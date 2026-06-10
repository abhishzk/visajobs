import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { searchHistory, activityLog } from "@/lib/db/schema";

// Log a search (fire-and-forget from client)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query, filters, resultCount } = body;

    if (!query && !filters) {
      return NextResponse.json({ error: "Missing query or filters" }, { status: 400 });
    }

    // Try to get user, but allow anonymous searches too
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    await db.insert(searchHistory).values({
      userId: user?.id || null,
      query: query || "",
      filters: filters || null,
      resultCount: resultCount ?? null,
    });

    // Log activity if user is authenticated
    if (user) {
      await db.insert(activityLog).values({
        userId: user.id,
        action: "SEARCH",
        path: "/companies",
        metadata: { query, filters, resultCount },
      });
    }

    return NextResponse.json({ tracked: true });
  } catch (error) {
    console.error("Error tracking search:", error);
    // Don't fail the user experience for tracking errors
    return NextResponse.json({ tracked: false });
  }
}
