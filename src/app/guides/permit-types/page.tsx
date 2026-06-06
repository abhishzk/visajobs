import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Employment Permit Types in Ireland - VisaJobs Ireland",
  description:
    "Compare all 9 Irish employment permit types: Critical Skills, General, ICT, and more. Salary thresholds, fees, durations, and eligibility requirements.",
};

const permits = [
  {
    id: "csep",
    name: "Critical Skills Employment Permit (CSEP)",
    purpose:
      "Attract highly skilled people with the aim of encouraging permanent residence in Ireland. Targeted at occupations identified as critically important to the economy.",
    who: "Non-EEA nationals with a job offer of at least 2 years in an occupation on the Critical Skills Occupations List (CSOL), OR in any eligible occupation with annual salary above €68,911.",
    salary: [
      "€40,904/year minimum for CSOL occupations (relevant degree required)",
      "€36,848 if degree obtained within 12 months of application",
      "€68,911+ for any eligible occupation (degree not mandatory)",
    ],
    duration: "Up to 2 years. Job offer must be for at least 2 years.",
    renewal:
      "No renewal through DETE. After 2 years, apply directly to Dept of Justice (ISD) for Stamp 4.",
    spouseWork:
      "Yes — spouse/partner receives Stamp 1G which permits employment without an employment permit.",
    lmnt: "Not required.",
    fee: "€1,000. 90% refunded if unsuccessful.",
    path: "After 2 years CSEP → Stamp 4. After 5 years → citizenship eligible.",
    highlight: true,
    source:
      "https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/permit-types/critical-skills-employment-permit/",
  },
  {
    id: "gep",
    name: "General Employment Permit (GEP)",
    purpose:
      "Primary vehicle for non-EEA nationals in a broad range of occupations experiencing labour or skills shortages.",
    who: "Non-EEA nationals with a job offer in any eligible occupation (not on the Ineligible List).",
    salary: [
      "€36,605/year general minimum",
      "€32,691/year for horticulture, meat processing, HCA, and home support workers",
      "€34,009/year if applicant has relevant Irish degree issued in past 12 months",
    ],
    duration: "Up to 2 years initially. Renewable for up to 3 more years.",
    renewal:
      "Apply via EPOL within 4 months of expiry. After 5 consecutive years, apply for Stamp 4.",
    spouseWork:
      "No. Spouses must apply for their own employment permit independently.",
    lmnt: "Required in most cases. Exemptions for CSOL roles, salary over €68,911, EI/IDA recommendations.",
    fee: "€1,000 (up to 24 months) or €500 (6 months or less). Renewal: €1,500 / €750.",
    path: "After 5 consecutive years → Stamp 4. Then citizenship eligible.",
    highlight: true,
    source:
      "https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/permit-types/general-employment-permit/",
  },
  {
    id: "dps",
    name: "Dependant / Partner / Spouse Employment Permit",
    purpose:
      "Allows family members of CSEP holders and researchers on Hosting Agreements to work in Ireland.",
    who: "Dependants, partners, and spouses of CSEP holders, former Green Card EP holders, or researchers on Hosting Agreements.",
    salary: ["No minimum salary threshold."],
    duration: "Tied to the principal permit holder's status.",
    renewal: "Renewable. After 5 years on Stamp 1G → Stamp 4.",
    spouseWork: "This permit IS for the spouse/partner.",
    lmnt: "Not required.",
    fee: "Free (no fee).",
    path: "Via Stamp 1G, which is reckonable for citizenship.",
    highlight: false,
    source:
      "https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/permit-types/dependant-partner-spouse-employment-permit/",
  },
  {
    id: "ict",
    name: "Intra-Company Transfer Employment Permit (ICT)",
    purpose:
      "Facilitates transfer of senior management, key personnel or trainees from an overseas branch of a multinational to its Irish branch.",
    who: "Non-EEA employees of multinational corporations being transferred to an Irish affiliate.",
    salary: ["Role-dependent. Employee can remain on foreign payroll."],
    duration:
      "Up to 2 years initially. Renewable up to 24 months, then up to 36 months.",
    renewal: "Via EPOL.",
    spouseWork: "Not specified.",
    lmnt: "Not required (transfers within same corporate group).",
    fee: "€1,000 (up to 24 months) or €500 (6 months or less).",
    path: "Transfer-specific — check eligibility for long-term options.",
    highlight: false,
    source:
      "https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/permit-types/intra-company-transfer-employment-permit/",
  },
  {
    id: "cfs",
    name: "Contract for Services Employment Permit",
    purpose:
      "For foreign contractors who have won a contract to provide services to an Irish company and need to transfer non-EEA staff.",
    who: "Non-EEA employees of a foreign undertaking being transferred to work on an Irish contract.",
    salary: ["Role-dependent."],
    duration: "Up to 2 years. Renewable up to 36 months.",
    renewal: "Via EPOL within 4 months of expiry.",
    spouseWork: "Not specified.",
    lmnt: "Required in most cases (same exemptions as GEP).",
    fee: "€1,000 (up to 24 months) or €500 (6 months or less). Renewal: €1,500 / €750.",
    path: "Check eligibility for long-term options.",
    highlight: false,
    source:
      "https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/permit-types/",
  },
  {
    id: "reactivation",
    name: "Reactivation Employment Permit",
    purpose:
      "Allows non-EEA nationals who previously held a valid permit but fell out of the system through no fault of their own, or who were exploited.",
    who: "Former permit holders who lost status through no fault of their own, or victims of workplace exploitation.",
    salary: ["No specific minimum."],
    duration: "Up to 2 years. Renewable up to 36 months.",
    renewal: "Via EPOL.",
    spouseWork: "Not specified.",
    lmnt: "Not applicable.",
    fee: "€1,000 (up to 24 months) or €500 (6 months or less). Renewal: €1,500 / €750.",
    path: "Restores legal status for continued employment.",
    highlight: false,
    source:
      "https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/permit-types/",
  },
  {
    id: "internship",
    name: "Internship Employment Permit",
    purpose:
      "Allows non-EEA students enrolled at a third-level institution outside Ireland to gain work experience in a CSOL-eligible discipline.",
    who: "Full-time non-EEA students at a foreign third-level institution.",
    salary: ["Not specified."],
    duration: "Up to 12 months. No renewal.",
    renewal: "Not renewable.",
    spouseWork: "Not specified.",
    lmnt: "Not required.",
    fee: "€1,000 (up to 12 months) or €500 (6 months or less).",
    path: "Temporary — internship only.",
    highlight: false,
    source:
      "https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/permit-types/",
  },
  {
    id: "sport",
    name: "Sport and Cultural Employment Permit",
    purpose:
      "For the development, operation and capacity of sporting and cultural activities in Ireland.",
    who: "Non-EEA nationals with qualifications, skills, or experience in sporting and cultural fields.",
    salary: ["Not specified."],
    duration: "Up to 2 years. Renewable up to 36 months.",
    renewal: "Via EPOL.",
    spouseWork: "Not specified.",
    lmnt: "Not specified.",
    fee: "€1,000 (up to 24 months) or €500 (6 months or less). Renewal: €1,500 / €750.",
    path: "Check eligibility for long-term options.",
    highlight: false,
    source:
      "https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/permit-types/",
  },
  {
    id: "exchange",
    name: "Exchange Agreement Employment Permit",
    purpose:
      "Facilitates employment pursuant to international reciprocal agreements to which Ireland is a party.",
    who: "Non-EEA nationals covered by prescribed international agreements.",
    salary: ["None."],
    duration: "Per agreement terms.",
    renewal: "Not renewable.",
    spouseWork: "Not specified.",
    lmnt: "Not applicable.",
    fee: "Free (no fee).",
    path: "Agreement-specific.",
    highlight: false,
    source:
      "https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/permit-types/",
  },
];

const comparisonRows = [
  {
    type: "Critical Skills",
    salary: "€40,904 / €68,911+",
    lmnt: "No",
    spouse: "Yes (Stamp 1G)",
    duration: "2 years",
    fee: "€1,000",
  },
  {
    type: "General",
    salary: "€32,691 – €36,605",
    lmnt: "Yes (usually)",
    spouse: "No (own permit)",
    duration: "Up to 2 years",
    fee: "€500–€1,000",
  },
  {
    type: "Dependant/Spouse",
    salary: "None",
    lmnt: "No",
    spouse: "N/A (this IS for spouse)",
    duration: "Linked to principal",
    fee: "Free",
  },
  {
    type: "Intra-Company Transfer",
    salary: "Role-dependent",
    lmnt: "No",
    spouse: "Not specified",
    duration: "Up to 2 years",
    fee: "€500–€1,000",
  },
  {
    type: "Contract for Services",
    salary: "Role-dependent",
    lmnt: "Yes (usually)",
    spouse: "Not specified",
    duration: "Up to 2 years",
    fee: "€500–€1,000",
  },
  {
    type: "Reactivation",
    salary: "None specified",
    lmnt: "No",
    spouse: "Not specified",
    duration: "Up to 2 years",
    fee: "€500–€1,000",
  },
  {
    type: "Internship",
    salary: "Not specified",
    lmnt: "No",
    spouse: "Not specified",
    duration: "Up to 12 months",
    fee: "€500–€1,000",
  },
  {
    type: "Sport & Cultural",
    salary: "Not specified",
    lmnt: "Not specified",
    spouse: "Not specified",
    duration: "Up to 2 years",
    fee: "€500–€1,000",
  },
  {
    type: "Exchange Agreement",
    salary: "None",
    lmnt: "No",
    spouse: "Not specified",
    duration: "Per agreement",
    fee: "Free",
  },
];

export default function PermitTypesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-4">
        <Link
          href="/guides"
          className="text-sm text-emerald-600 hover:underline"
        >
          &larr; All Guides
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-slate-900 mb-3">
        Employment Permit Types
      </h1>
      <p className="text-lg text-slate-600 mb-8">
        The Employment Permits Act 2024 provides for nine types of employment
        permits, all issued by the Department of Enterprise, Tourism and
        Employment (DETE). An employment permit is not a Residence Permission
        &mdash; holders must also register with Immigration Service Delivery.
      </p>

      {/* Quick Comparison Table */}
      <div className="mb-12 bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">
            Quick Comparison
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left px-4 py-3 font-semibold text-slate-700">
                  Permit Type
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">
                  Min. Salary
                </th>
                <th className="text-center px-4 py-3 font-semibold text-slate-700">
                  LMNT?
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">
                  Spouse Work?
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">
                  Duration
                </th>
                <th className="text-right px-4 py-3 font-semibold text-slate-700">
                  Fee
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr
                  key={row.type}
                  className={`border-b border-slate-100 ${i < 2 ? "bg-emerald-50/30" : ""}`}
                >
                  <td className="px-4 py-3 font-medium text-slate-900">
                    <a href={`#${permits[i].id}`} className="hover:text-emerald-700 hover:underline">
                      {row.type}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{row.salary}</td>
                  <td className="px-4 py-3 text-center text-slate-700">
                    {row.lmnt}
                  </td>
                  <td className="px-4 py-3 text-slate-700">{row.spouse}</td>
                  <td className="px-4 py-3 text-slate-700">{row.duration}</td>
                  <td className="px-4 py-3 text-right text-slate-700">
                    {row.fee}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Individual Permit Details */}
      <div className="space-y-8">
        {permits.map((permit) => (
          <div
            key={permit.id}
            id={permit.id}
            className={`bg-white rounded-xl border p-6 scroll-mt-20 ${
              permit.highlight
                ? "border-emerald-200 ring-1 ring-emerald-100"
                : "border-slate-200"
            }`}
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-1">
              {permit.name}
            </h2>
            {permit.highlight && (
              <span className="inline-block px-2 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-700 rounded mb-3">
                Most Common
              </span>
            )}
            <p className="text-slate-600 mb-4">{permit.purpose}</p>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">
                  Who is it for
                </h3>
                <p className="text-slate-700 text-sm">{permit.who}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">
                  Salary Thresholds
                </h3>
                <ul className="space-y-1">
                  {permit.salary.map((s, i) => (
                    <li key={i} className="text-sm text-slate-700">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">
                  Duration
                </h3>
                <p className="text-slate-700 text-sm">{permit.duration}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">
                  Renewal
                </h3>
                <p className="text-slate-700 text-sm">{permit.renewal}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">
                  Spouse/Partner Work
                </h3>
                <p className="text-slate-700 text-sm">{permit.spouseWork}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">
                  Labour Market Needs Test
                </h3>
                <p className="text-slate-700 text-sm">{permit.lmnt}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">
                  Fee
                </h3>
                <p className="text-slate-700 text-sm">{permit.fee}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">
                  Path to Residency
                </h3>
                <p className="text-slate-700 text-sm">{permit.path}</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100">
              <a
                href={permit.source}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-emerald-600 hover:underline"
              >
                Official source &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex gap-4">
        <Link
          href="/tools/salary-checker"
          className="px-5 py-3 rounded-lg bg-emerald-700 text-white font-semibold hover:bg-emerald-800 transition-colors"
        >
          Check Your Salary Eligibility
        </Link>
        <Link
          href="/guides/how-to-apply"
          className="px-5 py-3 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
        >
          How to Apply &rarr;
        </Link>
      </div>

      <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-500">
        Information sourced from{" "}
        <a
          href="https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/permit-types/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-600 hover:underline"
        >
          enterprise.gov.ie
        </a>{" "}
        as of June 2026. Governing legislation: Employment Permits Act 2024.
      </div>
    </div>
  );
}
