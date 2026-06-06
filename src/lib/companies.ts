export interface CompanyRecord {
  name: string;
  year: number;
  permits: number;
}

export interface AggregatedCompany {
  name: string;
  totalPermits: number;
  yearData: Record<number, number>;
  yearsActive: number;
}

export const YEARS = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getGrowthPercent(
  current: number | undefined,
  previous: number | undefined
): number | null {
  if (!current || !previous) return null;
  return Math.round(((current - previous) / previous) * 100);
}

export function getGrowthIndicator(growth: number | null): {
  icon: string;
  color: string;
  label: string;
} {
  if (growth === null) return { icon: "→", color: "text-slate-400", label: "New" };
  if (growth > 50) return { icon: "📈", color: "text-green-600", label: `+${growth}%` };
  if (growth > 0) return { icon: "↗", color: "text-green-500", label: `+${growth}%` };
  if (growth === 0) return { icon: "→", color: "text-slate-500", label: "Flat" };
  if (growth > -50) return { icon: "↘", color: "text-orange-500", label: `${growth}%` };
  return { icon: "📉", color: "text-red-600", label: `${growth}%` };
}

export function aggregateCompanies(data: CompanyRecord[]): AggregatedCompany[] {
  const map = new Map<string, AggregatedCompany>();

  for (const record of data) {
    const existing = map.get(record.name);
    if (existing) {
      existing.totalPermits += record.permits;
      existing.yearData[record.year] =
        (existing.yearData[record.year] || 0) + record.permits;
      existing.yearsActive = Object.keys(existing.yearData).length;
    } else {
      map.set(record.name, {
        name: record.name,
        totalPermits: record.permits,
        yearData: { [record.year]: record.permits },
        yearsActive: 1,
      });
    }
  }

  return Array.from(map.values());
}

export function getTrendingCompanies(
  companies: AggregatedCompany[],
  limit = 10
) {
  const currentYear = Math.max(...YEARS);
  const previousYear = currentYear - 1;

  return companies
    .map((company) => ({
      ...company,
      growth: getGrowthPercent(
        company.yearData[currentYear],
        company.yearData[previousYear]
      ),
    }))
    .filter((c) => c.growth !== null && c.growth > 0)
    .sort((a, b) => (b.growth || 0) - (a.growth || 0))
    .slice(0, limit);
}

export function searchCompanies(
  companies: AggregatedCompany[],
  query: string
): AggregatedCompany[] {
  const q = query.toLowerCase().trim();
  if (!q) return companies;
  return companies.filter((c) => c.name.toLowerCase().includes(q));
}
