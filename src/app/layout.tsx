import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VisaJobs Ireland - Employment Permit Data",
  description:
    "Discover which companies, sectors, counties, and nationalities are getting employment permits in Ireland. Powered by official government data.",
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/companies", label: "Companies" },
  { href: "/sectors", label: "Sectors" },
  { href: "/counties", label: "Counties" },
  { href: "/nationalities", label: "Nationalities" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Navigation */}
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-2xl font-bold text-emerald-700">
                  VisaJobs
                </span>
                <span className="text-sm text-slate-500 hidden sm:inline">
                  Ireland
                </span>
              </Link>
              <div className="flex items-center gap-1 sm:gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-sm text-slate-500">
              <p>
                Data sourced from{" "}
                <a
                  href="https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/statistics/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:underline"
                >
                  Department of Enterprise, Tourism and Employment
                </a>
              </p>
              <p className="mt-1">
                Employment permit statistics from 2019 to 2026. Updated
                periodically.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
