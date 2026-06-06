import { Metadata } from "next";
import { notFound } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import ClientCompanyDetail from "./client";

async function getCompanyData(slug: string) {
  try {
    const filePath = path.join(process.cwd(), "public", "data", "companies.json");
    const raw = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(raw);

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
  } catch {
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
