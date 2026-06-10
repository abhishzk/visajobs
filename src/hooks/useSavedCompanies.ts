"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Hook that manages saved companies with API (logged in) or localStorage (guest).
 * Checks auth once on mount, then routes save/unsave through the right backend.
 */
export function useSavedCompanies() {
  const [savedSlugs, setSavedSlugs] = useState<Set<string>>(new Set());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // On mount: check if user is logged in and load saved companies
  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const res = await fetch("/api/user/saved");
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) {
            setIsLoggedIn(true);
            setSavedSlugs(
              new Set(
                (data.companies || []).map((s: { companySlug: string }) => s.companySlug)
              )
            );
          }
          return;
        }
      } catch {
        // Not logged in or network error — fall through to localStorage
      }

      // Guest: load from localStorage
      if (!cancelled) {
        setIsLoggedIn(false);
        try {
          const stored = localStorage.getItem("savedCompanies");
          if (stored) {
            const names: string[] = JSON.parse(stored);
            // localStorage used names, not slugs — convert
            setSavedSlugs(new Set(names.map(slugify)));
          }
        } catch {
          // ignore parse errors
        }
      }
    }

    init().finally(() => {
      if (!cancelled) setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const isSaved = useCallback(
    (slug: string) => savedSlugs.has(slug),
    [savedSlugs]
  );

  const toggleSave = useCallback(
    async (slug: string, companyName: string) => {
      const alreadySaved = savedSlugs.has(slug);

      // Optimistic update
      setSavedSlugs((prev) => {
        const next = new Set(prev);
        if (alreadySaved) {
          next.delete(slug);
        } else {
          next.add(slug);
        }
        return next;
      });

      if (isLoggedIn) {
        // API call
        try {
          const res = await fetch(`/api/companies/${slug}/save`, {
            method: alreadySaved ? "DELETE" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ companyName }),
          });
          if (!res.ok) {
            // Revert on failure
            setSavedSlugs((prev) => {
              const next = new Set(prev);
              if (alreadySaved) next.add(slug);
              else next.delete(slug);
              return next;
            });
          }
        } catch {
          // Revert on network error
          setSavedSlugs((prev) => {
            const next = new Set(prev);
            if (alreadySaved) next.add(slug);
            else next.delete(slug);
            return next;
          });
        }
      } else {
        // Guest: persist to localStorage (using company names for backward compat)
        const stored = localStorage.getItem("savedCompanies");
        const names: string[] = stored ? JSON.parse(stored) : [];
        const updated = alreadySaved
          ? names.filter((n) => slugify(n) !== slug)
          : [...names, companyName];
        localStorage.setItem("savedCompanies", JSON.stringify(updated));
      }
    },
    [savedSlugs, isLoggedIn]
  );

  return { isSaved, toggleSave, savedSlugs, isLoggedIn, loading };
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
