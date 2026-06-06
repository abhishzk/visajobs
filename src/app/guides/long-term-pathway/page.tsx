import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Long-Term Pathway to Residency & Citizenship - VisaJobs Ireland",
  description:
    "Permit renewal, path to Stamp 4, long-term residency, and Irish citizenship by naturalisation. Your roadmap from employment permit to passport.",
};

export default function LongTermPathwayPage() {
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
        Long-Term Pathway
      </h1>
      <p className="text-lg text-slate-600 mb-10">
        Your roadmap from employment permit to permanent residency and Irish
        citizenship. Timelines, requirements, and what to expect at each stage.
      </p>

      {/* Visual Timeline */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          The Journey at a Glance
        </h2>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="space-y-0">
            {[
              {
                year: "Year 0",
                title: "Employment Permit Granted",
                detail: "Start working in Ireland on Stamp 1 or Stamp 1G",
                color: "bg-emerald-500",
              },
              {
                year: "Year 2",
                title: "CSEP → Stamp 4",
                detail:
                  "Critical Skills holders apply directly to ISD for Stamp 4 (open work permission)",
                color: "bg-emerald-600",
              },
              {
                year: "Year 5",
                title: "General EP → Stamp 4",
                detail:
                  "General EP holders apply for Stamp 4 after 5 consecutive years",
                color: "bg-emerald-700",
              },
              {
                year: "Year 5",
                title: "Long-Term Residency",
                detail:
                  "Apply for Long-Term Residency after 5 years of lawful residence",
                color: "bg-emerald-800",
              },
              {
                year: "Year 5+",
                title: "Irish Citizenship",
                detail:
                  "Apply for naturalisation after 5 years of reckonable residence (1,825 days)",
                color: "bg-emerald-900",
              },
            ].map((milestone, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full ${milestone.color} text-white flex items-center justify-center text-xs font-bold flex-shrink-0`}
                  >
                    {milestone.year.replace("Year ", "Y")}
                  </div>
                  {i < 4 && (
                    <div className="w-0.5 h-8 bg-emerald-200 my-1" />
                  )}
                </div>
                <div className="pb-6">
                  <h3 className="font-semibold text-slate-900">
                    {milestone.title}
                  </h3>
                  <p className="text-sm text-slate-600">{milestone.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Permit Renewal */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          1. Permit Renewal
        </h2>
        <div className="space-y-3">
          <div className="bg-white rounded-xl border border-emerald-200 p-5">
            <h3 className="font-bold text-emerald-800 mb-2">
              Critical Skills EP
            </h3>
            <p className="text-sm text-slate-700">
              <strong>No renewal through DETE.</strong> After 2 years, apply
              directly to Dept of Justice (ISD) for Stamp 4. Apply at least 1
              month before expiry. Stamp 4 Support Letter from DETE is no
              longer required (changed November 2023).
            </p>
          </div>

          <div className="bg-white rounded-xl border border-blue-200 p-5">
            <h3 className="font-bold text-blue-800 mb-2">
              General EP
            </h3>
            <p className="text-sm text-slate-700 mb-2">
              Apply via EPOL within <strong>4 months of expiry</strong>.
            </p>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>Initial renewal: up to 3 years</li>
              <li>
                After 5+ continuous years with same employer: apply for
                Unlimited Permit renewal (no fee)
              </li>
              <li>After 5 consecutive years total: apply to ISD for Stamp 4</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="font-bold text-slate-800 mb-2">
              Other Permit Types
            </h3>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>
                <strong>ICT:</strong> Renewable via EPOL. Max 24 months per
                renewal, then up to 36 months
              </li>
              <li>
                <strong>Contract for Services:</strong> Renewable up to 36
                months via EPOL
              </li>
              <li>
                <strong>Internship:</strong> Not renewable
              </li>
              <li>
                <strong>Exchange Agreement:</strong> Not renewable
              </li>
            </ul>
          </div>

          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-sm text-amber-800">
            <strong>IRP card renewal:</strong> Renew online via{" "}
            <a
              href="https://inisonline.jahs.ie"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              inisonline.jahs.ie
            </a>{" "}
            at least 1 month before expiry.
          </div>
        </div>
      </section>

      {/* Stamp 4 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          2. Path to Stamp 4 (Open Work Permission)
        </h2>
        <div className="bg-white rounded-xl border border-emerald-200 ring-1 ring-emerald-100 p-6">
          <div className="mb-4 p-4 bg-emerald-50 rounded-lg">
            <h3 className="font-bold text-emerald-800 mb-1">
              What Stamp 4 Means
            </h3>
            <p className="text-sm text-emerald-700">
              No employment permit required. Can work in any profession, set up
              a business, and access state funds and services. This is the key
              milestone for long-term settlement.
            </p>
          </div>

          <div className="space-y-4">
            <div className="border-l-4 border-emerald-500 pl-4">
              <h3 className="font-semibold text-slate-900">
                Critical Skills EP Holders
              </h3>
              <p className="text-sm text-slate-700">
                Apply to ISD for Stamp 4 after <strong>2 years</strong>. Stamp
                4 granted for 2-year periods, then renewable.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-slate-900">
                General EP Holders
              </h3>
              <p className="text-sm text-slate-700">
                Apply to ISD for Stamp 4 after{" "}
                <strong>5 consecutive years</strong> on valid General EPs.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-slate-900">
                Researchers on Hosting Agreement
              </h3>
              <p className="text-sm text-slate-700">
                Apply to ISD for Stamp 4 after <strong>2 years</strong>.
              </p>
            </div>

            <div className="border-l-4 border-amber-500 pl-4">
              <h3 className="font-semibold text-slate-900">
                Stamp 1G Holders (Spouses of CSEP)
              </h3>
              <p className="text-sm text-slate-700">
                After <strong>5 years</strong> on Stamp 1G, eligible to apply
                for Stamp 4.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Switching Permits */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          3. Switching Permit Types
        </h2>
        <div className="bg-white rounded-xl border border-slate-200 p-6 text-sm text-slate-700 space-y-3">
          <p>
            It is possible to switch between permit types (e.g., from General EP
            to CSEP) by applying for the new permit type through EPOL. The new
            application must meet all criteria for the target permit type.
          </p>
          <p>
            If made redundant and notified DETE within 4 weeks, you have{" "}
            <strong>6 months</strong> to secure new employment and can apply
            for either a General or Critical Skills permit for the new role.
          </p>
        </div>
      </section>

      {/* Long-Term Residency */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          4. Long-Term Residency
        </h2>
        <div className="bg-white rounded-xl border border-slate-200 p-6 text-sm text-slate-700 space-y-3">
          <p>
            After <strong>5 years of lawful residence</strong> (on reckonable
            stamps), non-EEA nationals may apply for Long-Term Residency to
            ISD. This grants a Stamp 4 permission for extended periods.
          </p>
          <a
            href="https://www.irishimmigration.ie/my-situation-has-changed-since-i-arrived-in-ireland/long-term-residency/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-emerald-600 hover:underline font-medium"
          >
            More on Long-Term Residency &rarr;
          </a>
        </div>
      </section>

      {/* Citizenship */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          5. Irish Citizenship (Naturalisation)
        </h2>
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <p className="text-slate-700">
            Irish citizenship by naturalisation is handled by ISD Citizenship
            Division. There are three main routes:
          </p>

          {/* Route A */}
          <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">
              Route A: 5 Years Residency (Standard)
            </h3>
            <ul className="text-sm text-slate-700 space-y-2">
              <li>
                Requires <strong>1,825 days</strong> (1,826 in a leap year) of
                reckonable residence
              </li>
              <li>
                Including <strong>1 continuous year</strong> immediately before
                application (up to 70 days absence allowed; 30 more in
                exceptional circumstances)
              </li>
              <li>
                <strong>Reckonable stamps:</strong> Stamp 1, 1H, 1G, 3, 4, 5
              </li>
              <li>
                <strong>NOT reckonable:</strong> Stamp 2, Stamp 2A
              </li>
            </ul>
          </div>

          {/* Route B */}
          <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">
              Route B: Marriage/Civil Partnership to Irish Citizen
            </h3>
            <ul className="text-sm text-slate-700 space-y-2">
              <li>3+ years of marriage or civil partnership</li>
              <li>
                3 of the last 5 years of lawful residence on the island of
                Ireland (including 1 continuous year before applying)
              </li>
              <li>1,095 days reckonable residence</li>
            </ul>
          </div>

          {/* Route C */}
          <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">
              Route C: Declared Refugee
            </h3>
            <p className="text-sm text-slate-700">
              Five years from the date protection was granted. Special
              provisions apply.
            </p>
          </div>

          {/* Fees & Process */}
          <div className="bg-emerald-50 rounded-lg p-5 border border-emerald-200">
            <h3 className="font-bold text-emerald-800 mb-2">
              Application Process & Fees
            </h3>
            <ul className="text-sm text-emerald-700 space-y-1">
              <li>
                Apply online at{" "}
                <a
                  href="https://inisonline.jahs.ie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  inisonline.jahs.ie
                </a>
              </li>
              <li>Application fee: €175</li>
              <li>
                Certification fee (on approval): €950 (adult), €200 (minor),
                €0 (refugee/stateless)
              </li>
              <li>Processing time: most applications within 12 months</li>
              <li>Mandatory citizenship ceremony for successful adult applicants</li>
              <li>Cannot appeal a refusal, but can reapply</li>
            </ul>
          </div>

          <a
            href="https://www.irishimmigration.ie/naturalisation-residency-calculator/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-emerald-700 text-white rounded-lg text-sm font-medium hover:bg-emerald-800 transition-colors"
          >
            Use the Official Residency Calculator &rarr;
          </a>
        </div>
      </section>

      {/* Key Contacts */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Key Contacts
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-900 mb-2">
              Employment Permits (DETE)
            </h3>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>Tel: +353 1 631 2121 or 0818 302 121</li>
              <li>Email: employmentpermits@enterprise.gov.ie</li>
              <li>23 Kildare Street, Dublin 2, D02 TD30</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-900 mb-2">
              Immigration Service Delivery (ISD)
            </h3>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>13-14 Burgh Quay, Dublin 2, D02 XK70</li>
              <li>
                Online:{" "}
                <a
                  href="https://portal.irishimmigration.ie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:underline"
                >
                  portal.irishimmigration.ie
                </a>
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-900 mb-2">
              PPS Number (DSP)
            </h3>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>Tel: (071) 967 2616 or 0818 927 999</li>
              <li>Email: CIS@welfare.ie</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-900 mb-2">
              Citizens Information
            </h3>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>Tel: 0818 07 4000 (Mon-Fri, 9am-8pm)</li>
              <li>
                <a
                  href="https://www.citizensinformation.ie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:underline"
                >
                  citizensinformation.ie
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div className="flex gap-4">
        <Link
          href="/guides/after-approval"
          className="px-5 py-3 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
        >
          &larr; After Approval
        </Link>
        <Link
          href="/tools/salary-checker"
          className="px-5 py-3 rounded-lg bg-emerald-700 text-white font-semibold hover:bg-emerald-800 transition-colors"
        >
          Salary Checker Tool &rarr;
        </Link>
      </div>

      <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-500">
        Information sourced from{" "}
        <a
          href="https://www.irishimmigration.ie/how-to-become-a-citizen/become-an-irish-citizen-by-naturalisation/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-600 hover:underline"
        >
          irishimmigration.ie
        </a>{" "}
        and{" "}
        <a
          href="https://enterprise.gov.ie"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-600 hover:underline"
        >
          enterprise.gov.ie
        </a>{" "}
        as of June 2026. This does not constitute legal advice.
      </div>
    </div>
  );
}
