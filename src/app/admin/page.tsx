"use client";

import { useEffect, useState } from "react";

interface Metrics {
  totalUsers: number;
  totalSaves: number;
  totalSearches: number;
  recentSignups: number;
  topSavedCompanies: {
    companySlug: string;
    companyName: string;
    saveCount: number;
  }[];
  recentActivity: {
    action: string;
    path: string | null;
    metadata: Record<string, unknown> | null;
    createdAt: string;
    userEmail: string | null;
  }[];
}

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/metrics")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(setMetrics)
      .catch(() => setError("Failed to load metrics"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-slate-500">Loading metrics...</div>
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <div className="bg-red-50 rounded-xl p-6 text-red-700">{error}</div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">
        System Overview
      </h1>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-3xl font-bold text-slate-900">
            {metrics.totalUsers}
          </p>
          <p className="text-sm text-slate-500 mt-1">Total Users</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-3xl font-bold text-emerald-700">
            {metrics.recentSignups}
          </p>
          <p className="text-sm text-slate-500 mt-1">Signups (7 days)</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-3xl font-bold text-blue-700">
            {metrics.totalSaves}
          </p>
          <p className="text-sm text-slate-500 mt-1">Company Saves</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-3xl font-bold text-amber-700">
            {metrics.totalSearches}
          </p>
          <p className="text-sm text-slate-500 mt-1">Total Searches</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Saved Companies */}
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="font-semibold text-slate-900 mb-4">
            Most Saved Companies
          </h2>
          {metrics.topSavedCompanies.length === 0 ? (
            <p className="text-slate-400 text-sm">No saves yet</p>
          ) : (
            <div className="space-y-2">
              {metrics.topSavedCompanies.map((company, i) => (
                <div
                  key={company.companySlug}
                  className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
                >
                  <span className="text-sm text-slate-700">
                    <span className="text-slate-400 mr-2">{i + 1}.</span>
                    {company.companyName}
                  </span>
                  <span className="text-sm font-medium text-emerald-600">
                    {company.saveCount} saves
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="font-semibold text-slate-900 mb-4">
            Recent Activity
          </h2>
          {metrics.recentActivity.length === 0 ? (
            <p className="text-slate-400 text-sm">No activity yet</p>
          ) : (
            <div className="space-y-2">
              {metrics.recentActivity.map((activity, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 py-2 border-b border-slate-100 last:border-0"
                >
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono whitespace-nowrap">
                    {activity.action}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 truncate">
                      {activity.userEmail || "Anonymous"}
                    </p>
                    {activity.path && (
                      <p className="text-xs text-slate-400 truncate">
                        {activity.path}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-slate-400 whitespace-nowrap">
                    {new Date(activity.createdAt).toLocaleString("en-IE", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
