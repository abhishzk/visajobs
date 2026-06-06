import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Apply for an Employment Permit - VisaJobs Ireland",
  description:
    "Step-by-step guide to applying for an Irish employment permit through EPOL. Labour Market Needs Test, document checklists, fees, and processing times.",
};

const applicationSteps = [
  {
    step: 1,
    title: "Employer creates a portal account on EPOL",
    detail:
      "Submit Revenue documents and Companies Registration Office (CRO) number to set up or maintain the account.",
  },
  {
    step: 2,
    title: "Complete the Labour Market Needs Test (if required)",
    detail:
      "Advertise on EURES/JobsIreland AND an additional online platform for a minimum of 28 consecutive days.",
  },
  {
    step: 3,
    title: "Obtain a signed contract of employment",
    detail:
      "Must be signed by both employer and employee. 2 years minimum for CSEP; 12+ months for General EP.",
  },
  {
    step: 4,
    title: "Start the online application on EPOL",
    detail:
      "Must be submitted within 28 days of starting or it will be automatically deleted.",
  },
  {
    step: 5,
    title: "Pay the application fee",
    detail:
      "EFT for business users; cheque, bank draft, or EFT for individuals.",
  },
  {
    step: 6,
    title: "Application enters the processing queue",
    detail: "Processed strictly in date order of receipt.",
  },
  {
    step: 7,
    title: "Review by a decision maker",
    detail:
      "Additional information may be requested — you have 28 days to respond.",
  },
  {
    step: 8,
    title: "Decision issued",
    detail:
      "Permit issued OR application refused with stated reasons. If refused, submit a review within 28 days.",
  },
];

const refusalReasons = [
  "Occupation is on the Ineligible List",
  "Minimum salary threshold not met",
  "Labour Market Needs Test not properly completed (adverts incomplete, too short, or expired)",
  "Application submitted more than 90 days after LMNT advertisement commenced",
  "Employer does not meet the 50:50 EEA workforce requirement",
  "Missing or incomplete documentation",
  "Application started but not submitted within 28 days",
  "Application received fewer than 12 weeks before proposed start date",
  "Employer not registered with Revenue or CRO",
  "Attempting to change employer within first 9 months (without exception)",
];

const lmntExemptions = [
  "Occupations on the Critical Skills Occupations List (CSOL)",
  "Job offers with annual salary over €68,911 (any eligible occupation)",
  "Jobs supported by a recommendation from Enterprise Ireland or IDA Ireland",
  "Carer of a person with exceptional medical needs with high level of dependence",
  "General EP holder made redundant and notified DETE within 4 weeks — for new job within 6 months",
  "All Critical Skills EP applications",
  "All Intra-Company Transfer applications",
  "Internship, Exchange Agreement, Sport & Cultural, Reactivation, and Dependant permits",
];

export default function HowToApplyPage() {
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
        How to Apply for an Employment Permit
      </h1>
      <p className="text-lg text-slate-600 mb-10">
        All employment permit applications are submitted through{" "}
        <a
          href="https://employmentpermits.enterprise.gov.ie/home"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-600 hover:underline font-medium"
        >
          Employment Permits Online (EPOL)
        </a>
        . Either the employer or the prospective employee can submit the
        application. The permit is always issued to the employee.
      </p>

      {/* Who Applies */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Who Can Apply?
        </h2>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <p className="text-slate-700">
            For the Critical Skills and General Employment Permits, either the{" "}
            <strong>employer</strong> or the <strong>prospective employee</strong>{" "}
            (the non-EEA national) may submit the application. The permit is
            always issued to the employee; a certified copy goes to the employer.
          </p>
        </div>
      </section>

      {/* Employer Requirements */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Employer Eligibility
        </h2>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <ul className="space-y-2">
            {[
              "Must be registered with Revenue Commissioners",
              "Must be registered with Companies Registration Office (if applicable)",
              "Must be currently trading in Ireland",
              "Must be in a direct employer-employee relationship (not labour hire)",
              "At least 50% of all employees must be EEA nationals (50:50 rule). Exceptions for EI/IDA-supported start-ups within 2 years of establishment.",
            ].map((req, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-700">
                <span className="text-emerald-600 mt-0.5 flex-shrink-0">
                  &#10003;
                </span>
                {req}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Job Offer */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Job Offer Requirements
        </h2>
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
          <p className="text-slate-700">
            A <strong>signed contract of employment</strong> (signed by both
            employer and employee) is required for every application.
          </p>
          <ul className="space-y-1 text-sm text-slate-600">
            <li>
              <strong>CSEP:</strong> Contract must be for a minimum of 2 years
            </li>
            <li>
              <strong>General EP:</strong> Contract can be for 12 months or more
            </li>
          </ul>
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-sm text-amber-800">
            The application must be received at least 12 weeks before the
            proposed employment start date. Once started on EPOL, it must be
            submitted within 28 days or it will be deleted.
          </div>
        </div>
      </section>

      {/* LMNT */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Labour Market Needs Test (LMNT)
        </h2>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <p className="text-slate-700 mb-4">
            The LMNT requires employers to demonstrate that no suitable EEA
            candidate is available before hiring a non-EEA national. Required
            for General Employment Permit and Contract for Services.
          </p>

          <h3 className="font-semibold text-slate-900 mb-2">
            How to Fulfil the LMNT
          </h3>
          <div className="bg-slate-50 rounded-lg p-4 mb-4 text-sm text-slate-700 space-y-2">
            <p>
              Advertise the vacancy simultaneously on <strong>both</strong> of
              the following for a minimum of <strong>28 consecutive days</strong>
              :
            </p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>
                <a
                  href="https://jobsireland.ie/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:underline"
                >
                  DSP Employment Services / EURES (JobsIreland.ie)
                </a>
              </li>
              <li>
                An additional online platform (LinkedIn, Indeed, Jobs.ie, etc.)
              </li>
            </ol>
            <p>
              Both adverts must contain: job description, employer name, minimum
              annual remuneration, location, and hours of work.
            </p>
            <p>
              Submit the application within <strong>90 days</strong> of the first
              publication date on EURES (120 days for third-level institutions).
            </p>
          </div>

          <h3 className="font-semibold text-slate-900 mb-2">
            When LMNT Is NOT Required
          </h3>
          <ul className="space-y-1">
            {lmntExemptions.map((ex, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-slate-700"
              >
                <span className="text-emerald-600 mt-0.5 flex-shrink-0">
                  &#10003;
                </span>
                {ex}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Eligible Occupations */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Eligible &amp; Ineligible Occupations
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-emerald-200 p-6">
            <h3 className="font-bold text-emerald-800 mb-2">
              Critical Skills Occupations List (CSOL)
            </h3>
            <p className="text-sm text-slate-600 mb-3">
              Strategically important, highly skilled occupations in short supply
              (e.g., ICT professionals, engineers, technologists). Exempt from
              LMNT.
            </p>
            <a
              href="https://enterprise.gov.ie/en/What-We-Do/Workplace-and-Skills/Employment-Permits/Employment-Permit-Eligibility/Highly-Skilled-Eligible-Occupations-List/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-emerald-600 hover:underline font-medium"
            >
              View CSOL &rarr;
            </a>
          </div>
          <div className="bg-white rounded-xl border border-red-200 p-6">
            <h3 className="font-bold text-red-800 mb-2">
              Ineligible Occupations List
            </h3>
            <p className="text-sm text-slate-600 mb-3">
              Occupations explicitly excluded from all employment permits
              regardless of salary offered. No permit can be issued for these
              roles.
            </p>
            <a
              href="https://enterprise.gov.ie/en/What-We-Do/Workplace-and-Skills/Employment-Permits/Employment-Permit-Eligibility/Ineligible-Categories-of-Employment/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-red-600 hover:underline font-medium"
            >
              View Ineligible List &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* Application Steps */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Step-by-Step Application Process
        </h2>
        <div className="space-y-3">
          {applicationSteps.map((step) => (
            <div
              key={step.step}
              className="bg-white rounded-xl border border-slate-200 p-5 flex gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
                {step.step}
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{step.title}</h3>
                <p className="text-sm text-slate-600 mt-1">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Processing Times */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Processing Times
        </h2>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <p className="text-sm text-slate-600 mb-4">
            Applications are processed strictly in date order of receipt. As of
            4 June 2026:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 pr-4 font-semibold text-slate-700">
                    Application Type
                  </th>
                  <th className="text-left py-2 font-semibold text-slate-700">
                    Processing From
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-b border-slate-100">
                  <td className="py-2 pr-4">
                    Critical Skills EP (new)
                  </td>
                  <td className="py-2">19 May 2026</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-2 pr-4">
                    New applications (all other types)
                  </td>
                  <td className="py-2">9 March 2026</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-2 pr-4">
                    Intra-Company Transfer (new)
                  </td>
                  <td className="py-2">5 May 2026</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-2 pr-4">
                    Renewals (all types)
                  </td>
                  <td className="py-2">6 March 2026</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Reviews / Appeals</td>
                  <td className="py-2">9 December 2025</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200 text-sm text-blue-800">
            Processing dates change regularly.{" "}
            <a
              href="https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/current-application-processing-dates/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-medium"
            >
              Check the latest dates here
            </a>
            .
          </div>
        </div>
      </section>

      {/* Fees */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Fees</h2>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">New Permits</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>€1,000 — up to 24 months</li>
                <li>€500 — 6 months or less</li>
                <li>
                  Free — Dependant/Spouse and Exchange Agreement permits
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Renewals</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>€1,500 — up to 36 months</li>
                <li>€750 — 6 months or less</li>
                <li>Free — Unlimited permits (5+ years, same employer)</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            If refused, 90% of the fee is refunded to the applicant (employee),
            even if the employer paid.
          </p>
        </div>
      </section>

      {/* Common Refusal Reasons */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Common Refusal Reasons
        </h2>
        <div className="bg-white rounded-xl border border-red-200 p-6">
          <ul className="space-y-2">
            {refusalReasons.map((reason, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-slate-700"
              >
                <span className="text-red-500 mt-0.5 flex-shrink-0">
                  &#10007;
                </span>
                {reason}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Appeal */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Appeal / Review Process
        </h2>
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3 text-sm text-slate-700">
          <p>
            If refused, you may request a review within{" "}
            <strong>28 days</strong> of the refusal. The review is considered by
            a more senior official not involved in the original decision.
          </p>
          <p>
            A confirmed refusal on review does not prevent you from submitting a
            new application.
          </p>
          <a
            href="https://enterprise.gov.ie/en/publications/application-forms-for-review-of-decision-under-the-employment-permits-act-2024.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-emerald-600 hover:underline font-medium"
          >
            Review of Decision Form &rarr;
          </a>
        </div>
      </section>

      {/* Document Checklists */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Document Checklists
        </h2>
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
          <p className="text-sm text-slate-700">
            DETE publishes permit-specific checklists. Common documents
            required:
          </p>
          <ul className="text-sm text-slate-700 space-y-1">
            <li>Signed contract of employment</li>
            <li>Employer Revenue and CRO details</li>
            <li>Employee passport (valid)</li>
            <li>Educational qualifications or proof of experience</li>
            <li>LMNT evidence (where applicable)</li>
          </ul>
          <div className="flex flex-wrap gap-3 mt-3">
            <a
              href="https://enterprise.gov.ie/en/Publications/Employment-Permits-Checklists.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-emerald-600 hover:underline font-medium"
            >
              All Checklists &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* Visa-Required */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Visa-Required vs Visa-Exempt Nationalities
        </h2>
        <div className="bg-white rounded-xl border border-slate-200 p-6 text-sm text-slate-700 space-y-3">
          <p>
            Whether you need an entry visa depends on your nationality.
            Visa-required nationals must apply for a{" "}
            <strong>&apos;D&apos; (long-stay) visa</strong> at the nearest Irish
            Embassy or Consulate after receiving the employment permit.
          </p>
          <a
            href="https://www.dfa.ie/travel/visas/visas-for-ireland/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-emerald-600 hover:underline font-medium"
          >
            Check visa requirements by nationality &rarr;
          </a>
        </div>
      </section>

      <div className="flex gap-4">
        <Link
          href="/guides/permit-types"
          className="px-5 py-3 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
        >
          &larr; Permit Types
        </Link>
        <Link
          href="/guides/after-approval"
          className="px-5 py-3 rounded-lg bg-emerald-700 text-white font-semibold hover:bg-emerald-800 transition-colors"
        >
          After Approval &rarr;
        </Link>
      </div>

      <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-500">
        Information sourced from{" "}
        <a
          href="https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/"
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
