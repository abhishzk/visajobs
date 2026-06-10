"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const [fullName, setFullName] = useState("");
  const [targetSectors, setTargetSectors] = useState<string[]>([]);
  const [targetCounties, setTargetCounties] = useState<string[]>([]);
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/user/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.profile) {
          setFullName(data.profile.fullName || "");
        }
        if (data.preferences) {
          setTargetSectors(data.preferences.targetSectors || []);
          setTargetCounties(data.preferences.targetCounties || []);
          setMinSalary(data.preferences.minSalary?.toString() || "");
          setMaxSalary(data.preferences.maxSalary?.toString() || "");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    await fetch("/api/user/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName,
        targetSectors,
        targetCounties,
        minSalary: minSalary ? parseInt(minSalary) : null,
        maxSalary: maxSalary ? parseInt(maxSalary) : null,
      }),
    });

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-slate-500">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/dashboard"
        className="text-sm text-emerald-600 hover:underline"
      >
        &larr; Dashboard
      </Link>
      <h1 className="text-3xl font-bold text-slate-900 mt-4 mb-8">
        Your Profile
      </h1>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Basic Info */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="font-semibold text-slate-900 mb-4">Basic Info</h2>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Your name"
            />
          </div>
        </div>

        {/* Job Preferences */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="font-semibold text-slate-900 mb-4">
            Job Search Preferences
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Target Sectors (comma-separated)
              </label>
              <input
                type="text"
                value={targetSectors.join(", ")}
                onChange={(e) =>
                  setTargetSectors(
                    e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean)
                  )
                }
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g. Technology, Healthcare, Finance"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Target Counties (comma-separated)
              </label>
              <input
                type="text"
                value={targetCounties.join(", ")}
                onChange={(e) =>
                  setTargetCounties(
                    e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean)
                  )
                }
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g. Dublin, Cork, Galway"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Min Salary (EUR)
                </label>
                <input
                  type="number"
                  value={minSalary}
                  onChange={(e) => setMinSalary(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g. 35000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Max Salary (EUR)
                </label>
                <input
                  type="number"
                  value={maxSalary}
                  onChange={(e) => setMaxSalary(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g. 80000"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-lg bg-emerald-700 text-white font-semibold hover:bg-emerald-800 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          {saved && (
            <span className="text-sm text-emerald-600 font-medium">
              Saved successfully!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
