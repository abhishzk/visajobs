import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon)
     * - public files (data, images)
     */
    "/((?!_next/static|_next/image|favicon.ico|data/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
