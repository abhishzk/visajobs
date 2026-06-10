import {
  pgTable,
  text,
  timestamp,
  serial,
  integer,
  jsonb,
  uniqueIndex,
  pgEnum,
} from "drizzle-orm/pg-core";

// ============================================================
// Enums
// ============================================================

export const userRoleEnum = pgEnum("user_role", [
  "JOB_SEEKER",
  "ADMIN",
  "COMPANY",
  "JOB_POSTER",
]);

export const activityActionEnum = pgEnum("activity_action", [
  "SIGNUP",
  "LOGIN",
  "SAVE_COMPANY",
  "UNSAVE_COMPANY",
  "SEARCH",
  "VIEW_COMPANY",
  "VIEW_GUIDE",
  "UPDATE_PROFILE",
]);

// ============================================================
// Profiles (extends Supabase auth.users)
// ============================================================

export const profiles = pgTable("profiles", {
  id: text("id").primaryKey(), // matches auth.users.id
  email: text("email").notNull(),
  fullName: text("full_name"),
  avatarUrl: text("avatar_url"),
  role: userRoleEnum("role").default("JOB_SEEKER").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// ============================================================
// Saved Companies (replaces localStorage)
// ============================================================

export const savedCompanies = pgTable(
  "saved_companies",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .references(() => profiles.id, { onDelete: "cascade" })
      .notNull(),
    companySlug: text("company_slug").notNull(),
    companyName: text("company_name").notNull(), // denormalized for fast reads
    savedAt: timestamp("saved_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("saved_companies_user_slug_idx").on(
      table.userId,
      table.companySlug
    ),
  ]
);

// ============================================================
// User Preferences (job seeker profile)
// ============================================================

export const userPreferences = pgTable("user_preferences", {
  userId: text("user_id")
    .primaryKey()
    .references(() => profiles.id, { onDelete: "cascade" }),
  targetSectors: text("target_sectors").array(),
  targetCounties: text("target_counties").array(),
  minSalary: integer("min_salary"),
  maxSalary: integer("max_salary"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// ============================================================
// Search History
// ============================================================

export const searchHistory = pgTable("search_history", {
  id: serial("id").primaryKey(),
  userId: text("user_id").references(() => profiles.id, { onDelete: "set null" }),
  query: text("query").notNull(),
  filters: jsonb("filters"), // { year?, sector?, county? }
  resultCount: integer("result_count"),
  searchedAt: timestamp("searched_at", { withTimezone: true }).defaultNow().notNull(),
});

// ============================================================
// Activity Log (admin analytics)
// ============================================================

export const activityLog = pgTable("activity_log", {
  id: serial("id").primaryKey(),
  userId: text("user_id").references(() => profiles.id, { onDelete: "set null" }),
  action: activityActionEnum("action").notNull(),
  path: text("path"),
  metadata: jsonb("metadata"), // flexible data per action type
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
