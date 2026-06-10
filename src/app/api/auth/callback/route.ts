import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Ensure profile exists
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Upsert profile on login
        const { db } = await import("@/lib/db");
        const { profiles } = await import("@/lib/db/schema");

        await db
          .insert(profiles)
          .values({
            id: user.id,
            email: user.email!,
            fullName:
              user.user_metadata?.full_name ||
              user.user_metadata?.name ||
              null,
            avatarUrl: user.user_metadata?.avatar_url || null,
          })
          .onConflictDoNothing();
      }

      return NextResponse.redirect(`${origin}${redirectTo}`);
    }
  }

  // Auth error — redirect to login with error
  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
