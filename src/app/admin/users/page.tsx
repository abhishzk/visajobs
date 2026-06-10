"use client";

import { useEffect, useState } from "react";

interface UserData {
  id: string;
  email: string;
  fullName: string | null;
  role: string;
  createdAt: string;
  savedCount: number;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-slate-500">Loading users...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Users ({users.length})
        </h1>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600">
                User
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600">
                Role
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600">
                Saved
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600">
                Joined
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-slate-100 last:border-0"
              >
                <td className="px-4 py-3">
                  <p className="text-sm font-medium text-slate-900">
                    {user.fullName || "—"}
                  </p>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-0.5 rounded font-medium ${
                      user.role === "ADMIN"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">
                  {user.savedCount}
                </td>
                <td className="px-4 py-3 text-sm text-slate-500">
                  {new Date(user.createdAt).toLocaleDateString("en-IE", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
