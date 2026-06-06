import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "After Your Permit is Approved - VisaJobs Ireland",
  description:
    "What to do after your Irish employment permit is approved: entry visas, IRP registration, stamp types, PPS number, changing employer, and family reunification.",
};

const stamps = [
  {
    stamp: "Stamp 1",
    who: "General EP, ICT, Contract for Services, Reactivation, Sport & Cultural holders",
    conditions:
      "Can work only for named employer in named occupation. Must hold valid employment permit.",
  },
  {
    stamp: "Stamp 1A",
    who: "Trainee accountants in paid, IAASA-regulated accountancy training",
    conditions:
      "Cannot work in other business or profession. Must complete within 4 years.",
  },
  {
    stamp: "Stamp 1G",
    who: "Spouses/partners of CSEP holders; researchers on Hosting Agreements; Graduate Programme participants",
    conditions:
      "Work without employment permit. Cannot set up business. Renewal annually. After 5 years → Stamp 4.",
  },
  {
    stamp: "Stamp 1H",
    who: "Doctors with multi-site General EP as NCHD in public hospital",
    conditions:
      "Can move hospitals within HSE group after initial 6-month contract.",
  },
  {
    stamp: "Stamp 2",
    who: "Students on ILEP-listed courses",
    conditions:
      "Work max 20 hrs/week in term; 40 hrs/week holidays. Max 7 years total. NOT reckonable for citizenship.",
  },
  {
    stamp: "Stamp 3",
    who: "Dependants of General EP holders; volunteers; ministers of religion",
    conditions: "Cannot work. Reckonable for citizenship.",
  },
  {
    stamp: "Stamp 4",
    who: "CSEP holders after 2 years; General EP after 5 years; spouses of Irish citizens; refugees",
    conditions:
      "No permit needed. Can work in any profession. Can run a business. Reckonable for citizenship.",
  },
  {
    stamp: "Stamp 5",
    who: "Long-term residents — Without Condition as to Time",
    conditions:
      "Indefinite leave to remain (subject to passport expiry). Reckonable for citizenship.",
  },
];

export default function AfterApprovalPage() {
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
        After Your Permit is Approved
      </h1>
      <p className="text-lg text-slate-600 mb-10">
        Getting the employment permit is step one. Here&apos;s everything you
        need to do next — from entering Ireland to registering your immigration
        permission.
      </p>

      {/* Entry Visa */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          1. Entry Visa (If Required)
        </h2>
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
          <p className="text-slate-700">
            An employment permit is <strong>not</strong> an entry visa. If you
            are from a visa-required country, you must apply for a{" "}
            <strong>&apos;D&apos; (long-stay) entry visa</strong> at your
            nearest Irish Embassy or Consulate before travelling to Ireland.
          </p>
          <ul className="text-sm text-slate-700 space-y-1">
            <li>
              Apply online at{" "}
              <a
                href="https://www.irishimmigration.ie"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:underline"
              >
                irishimmigration.ie
              </a>
            </li>
            <li>
              Check visa requirements by nationality at{" "}
              <a
                href="https://www.dfa.ie/travel/visas/visas-for-ireland/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:underline"
              >
                dfa.ie
              </a>
            </li>
            <li>Carry the original employment permit for inspection on arrival</li>
            <li>Entry is always at the discretion of the Immigration Officer</li>
          </ul>
        </div>
      </section>

      {/* IRP Registration */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          2. IRP Registration
        </h2>
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <p className="text-slate-700">
            Every non-EEA national staying more than 90 days must register with
            Immigration Service Delivery (ISD) within{" "}
            <strong>90 days of arrival</strong>.
          </p>

          <div className="bg-slate-50 rounded-lg p-4">
            <h3 className="font-semibold text-slate-900 mb-2">
              First-Time Registration
            </h3>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>
                In-person at{" "}
                <strong>
                  Burgh Quay Registration Office, 13-14 Burgh Quay, Dublin 2
                </strong>
              </li>
              <li>
                Book an appointment at{" "}
                <a
                  href="https://inisonline.jahs.ie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:underline"
                >
                  inisonline.jahs.ie
                </a>
              </li>
              <li>
                If you cannot get an appointment within 90 days, DETE will not
                cancel your permission as long as you can demonstrate you sought
                one promptly
              </li>
            </ul>
          </div>

          <div className="bg-slate-50 rounded-lg p-4">
            <h3 className="font-semibold text-slate-900 mb-2">Renewals</h3>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>
                All renewals are applied for{" "}
                <strong>
                  <a
                    href="https://inisonline.jahs.ie"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:underline"
                  >
                    online
                  </a>
                </strong>
              </li>
              <li>
                Renew at least <strong>1 month before expiry</strong> to avoid
                unlawful presence
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* IRP Card */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          3. IRP Card (Irish Residence Permit)
        </h2>
        <div className="bg-white rounded-xl border border-slate-200 p-6 text-slate-700 space-y-3">
          <p>
            Upon successful registration, an IRP card is issued by post. It is
            not an identity card but proves you are legally residing in Ireland.
          </p>
          <p>
            The card shows your <strong>stamp type</strong>, the conditions
            attached to your permission, and the period you are permitted to
            remain.
          </p>
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-sm text-amber-800">
            Always carry your IRP card and produce it to authorities when asked.
          </div>
        </div>
      </section>

      {/* Stamp Types */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          4. Immigration Stamps
        </h2>
        <p className="text-slate-600 mb-4">
          Your stamp type determines what you can and cannot do in Ireland.
          Here are the stamps relevant to employment permit holders:
        </p>
        <div className="space-y-3">
          {stamps.map((s) => (
            <div
              key={s.stamp}
              className={`bg-white rounded-xl border p-5 ${
                s.stamp === "Stamp 4"
                  ? "border-emerald-200 ring-1 ring-emerald-100"
                  : "border-slate-200"
              }`}
            >
              <div className="flex items-start gap-4">
                <span
                  className={`text-lg font-bold px-3 py-1 rounded-lg flex-shrink-0 ${
                    s.stamp === "Stamp 4"
                      ? "bg-emerald-100 text-emerald-800"
                      : s.stamp === "Stamp 1G"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {s.stamp}
                </span>
                <div>
                  <p className="text-sm text-slate-500 mb-1">{s.who}</p>
                  <p className="text-sm text-slate-700">{s.conditions}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-slate-500">
          Source:{" "}
          <a
            href="https://www.irishimmigration.ie/registering-your-immigration-permission/information-on-registering/immigration-permission-stamps/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 hover:underline"
          >
            irishimmigration.ie
          </a>
        </p>
      </section>

      {/* PPS Number */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          5. PPS Number
        </h2>
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <p className="text-slate-700">
            A Personal Public Service (PPS) number is required for work, tax,
            and access to public services. You{" "}
            <strong>cannot start work</strong> without one.
          </p>

          <div className="bg-slate-50 rounded-lg p-4">
            <h3 className="font-semibold text-slate-900 mb-2">How to Apply</h3>
            <ol className="text-sm text-slate-700 space-y-1 list-decimal list-inside">
              <li>
                Create a MyGovID account at{" "}
                <a
                  href="https://www.mygovid.ie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:underline"
                >
                  mygovid.ie
                </a>
              </li>
              <li>
                Apply online at{" "}
                <a
                  href="https://services.mywelfare.ie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:underline"
                >
                  services.mywelfare.ie
                </a>
              </li>
              <li>
                Book and attend an in-person appointment at a PPS Number
                Allocation Centre
              </li>
              <li>PPS number is issued by post</li>
            </ol>
          </div>

          <div className="bg-slate-50 rounded-lg p-4">
            <h3 className="font-semibold text-slate-900 mb-2">
              Documents Required
            </h3>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>Valid passport</li>
              <li>
                Proof of address: utility bill, official letter, bank
                statement, or tenancy agreement (not older than 3 months)
              </li>
            </ul>
          </div>

          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-sm text-amber-800">
            You cannot apply for a PPS number before arriving in Ireland. Apply
            only after you arrive.
          </div>
        </div>
      </section>

      {/* Changing Employer */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          6. Changing Employer
        </h2>
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3 text-sm text-slate-700">
          <p>
            Employment permits are <strong>employer-specific</strong>. Changing
            employer generally requires a new permit application.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <h3 className="font-semibold text-red-800 mb-1">
                First 9 Months
              </h3>
              <p className="text-red-700">
                Cannot change employer without DETE approval. Exceptions:
                redundancy, medical doctor rotations, or fundamental change to
                employment relationship.
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h3 className="font-semibold text-green-800 mb-1">
                After 9 Months
              </h3>
              <p className="text-green-700">
                Can apply for a new permit with a new employer, subject to
                normal requirements including LMNT if applicable.
              </p>
            </div>
          </div>
          <p>
            <strong>If made redundant:</strong> Notify DETE within 4 weeks. You
            have 6 months to secure new employment and apply for a new permit.
          </p>
        </div>
      </section>

      {/* Family Reunification */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          7. Family Reunification
        </h2>
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3 text-sm text-slate-700">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
              <h3 className="font-semibold text-emerald-800 mb-1">
                CSEP Holders
              </h3>
              <p className="text-emerald-700">
                Eligible for immediate family reunification from the date the
                CSEP is granted. Spouse receives Stamp 1G (can work without a
                permit).
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-1">
                General EP Holders
              </h3>
              <p className="text-slate-600">
                Spouses and dependants must apply for their own employment
                permit independently. Not eligible for the Dependant/Spouse
                permit.
              </p>
            </div>
          </div>
          <a
            href="https://www.irishimmigration.ie/coming-to-join-family-in-ireland/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-emerald-600 hover:underline font-medium"
          >
            More on family reunification &rarr;
          </a>
        </div>
      </section>

      <div className="flex gap-4">
        <Link
          href="/guides/how-to-apply"
          className="px-5 py-3 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
        >
          &larr; How to Apply
        </Link>
        <Link
          href="/guides/long-term-pathway"
          className="px-5 py-3 rounded-lg bg-emerald-700 text-white font-semibold hover:bg-emerald-800 transition-colors"
        >
          Long-Term Pathway &rarr;
        </Link>
      </div>

      <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-500">
        Information sourced from{" "}
        <a
          href="https://www.irishimmigration.ie/"
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
        as of June 2026.
      </div>
    </div>
  );
}
