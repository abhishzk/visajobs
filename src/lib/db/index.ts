import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Lazy initialization to avoid throwing during build
let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  if (_db) return _db;

  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL or POSTGRES_URL environment variable is not set");
  }

  const client = postgres(connectionString, {
    prepare: false, // required for Supabase transaction mode pooler
  });

  _db = drizzle(client, { schema });
  return _db;
}

// Convenience export — use this in API routes and server components
export const db = new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
  get(_target, prop) {
    return (getDb() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
