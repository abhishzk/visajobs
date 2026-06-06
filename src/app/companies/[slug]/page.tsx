import { Metadata } from "next";
import { notFound } from "next/navigation";
import ClientCompanyDetail from "./client";

async function getCompanyData(slug: string) {
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

    const res = await fetch(`${baseUrl}/data/companies.json`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;

    const data = await res.json();
    const companyName = data
      .map((r: any) => r.name)
      .filter((name: string, idx: number, arr: string[]) => arr.indexOf(name) === idx)
      .find(
        (name: string) =>
          name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "") === slug
      );

    if (!companyName) return null;

    const records = data
      .filter((r: any) => r.name === companyName)
      .sort((a: any, b: any) => a.year - b.year);

    return { name: companyName, records };
  } catch (e) {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const company = await getCompanyData(slug);

  if (!company) {
    return { title: "Company not found" };
  }

  const totalPermits = company.records.reduce(
    (sum: number, r: any) => sum + r.permits,
    0
  );

  return {
    title: `${company.name} - Work Permits in Ireland | VisaJobs`,
    description: `${company.name} has issued ${totalPermits.toLocaleString()} employment permits in Ireland from 2019-2026. See visa sponsorship data and apply to companies hiring with sponsorship.`,
    openGraph: {
      title: `${company.name} - Employment Permits Ireland`,
      description: `${totalPermits.toLocaleString()} permits issued | VisaJobs Ireland`,
    },
  };
}

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const company = await getCompanyData(slug);

  if (!company) {
    notFound();
  }

  return <ClientCompanyDetail name={company.name} records={company.records} />;
}
