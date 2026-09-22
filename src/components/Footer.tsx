import Link from 'next/link';
import { footerLearn, footerShop, legalPages, site } from '@/lib/content';

function PhoneIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-[18px] w-[18px]" fill="none" aria-hidden>
      <path
        d="M4.2 3h2.6l1.3 3.3-1.6 1.2a9.4 9.4 0 004.9 4.9l1.2-1.6L16 12.2v2.6a1.9 1.9 0 01-2.1 1.9A13.3 13.3 0 013.3 5.1 1.9 1.9 0 014.2 3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
      {children}
    </h3>
  );
}

/**
 * Four-column retailer footer: Shop, Learn, Talk to a Human, Legal &
 * Compliance — followed by the full reseller disclosure and fine print.
 */
export default function Footer() {
  return (
    <footer className="bg-ht-navy text-white">
      {/* ------------------------------ Top CTA ------------------------------ */}
      <div className="border-b border-white/10">
        <div className="shell flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/10">
              <svg viewBox="0 0 44 44" className="h-11 w-11" fill="none" aria-hidden>
                <circle cx="22" cy="22" r="3.6" fill="#4294F7" />
                <path d="M14.6 29.4a10.5 10.5 0 010-14.8" stroke="#4294F7" strokeWidth="2.1" strokeLinecap="round" />
                <path d="M29.4 14.6a10.5 10.5 0 010 14.8" stroke="#4294F7" strokeWidth="2.1" strokeLinecap="round" />
                <path d="M9.6 34.4a17.5 17.5 0 010-24.8" stroke="#22D3C5" strokeWidth="1.7" strokeLinecap="round" />
                <path d="M34.4 9.6a17.5 17.5 0 010 24.8" stroke="#22D3C5" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-extrabold tracking-[-0.025em] text-white">
                {site.retailerName}
              </span>
              <span className="mt-1.5 text-[0.75rem] font-medium text-white/60">
                Authorized Retailer
              </span>
            </span>
          </div>

          <a
            href={site.salesPhoneHref}
            className="inline-flex items-center gap-3 rounded-full bg-ht-blue px-7 py-4 font-display text-base font-bold text-white transition-colors duration-300 hover:bg-ht-blue-deep"
          >
            <PhoneIcon />
            Call now — {site.salesPhone}
          </a>
        </div>
      </div>

      {/* ---------------------------- Link columns --------------------------- */}
      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <nav aria-label="Shop">
          <ColumnHeading>Shop</ColumnHeading>
          <ul className="mt-5 space-y-3">
            {footerShop.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-[0.9375rem] text-white/70 transition-colors duration-300 hover:text-ht-blue"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Learn">
          <ColumnHeading>Learn</ColumnHeading>
          <ul className="mt-5 space-y-3">
            {footerLearn.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-[0.9375rem] text-white/70 transition-colors duration-300 hover:text-ht-blue"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <ColumnHeading>Talk to a human</ColumnHeading>
          <ul className="mt-5 space-y-4 text-[0.9375rem] text-white/70">
            <li>
              <a
                href={site.salesPhoneHref}
                className="font-display text-lg font-bold text-white transition-colors duration-300 hover:text-ht-blue"
              >
                {site.salesPhone}
              </a>
            </li>
            <li>{site.hours}</li>
            <li className="leading-relaxed">
              {/* ⚠️ Replace with your registered business address before launch. */}
              [Street Address]
              <br />
              [City], HI [ZIP]
            </li>
          </ul>
        </div>

        <nav aria-label="Legal and compliance">
          <ColumnHeading>Legal &amp; compliance</ColumnHeading>
          <ul className="mt-5 space-y-3">
            {legalPages.map((page) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  className="text-[0.9375rem] text-white/70 transition-colors duration-300 hover:text-ht-blue"
                >
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* ----------------------------- Disclosure ---------------------------- */}
      <div className="border-t border-white/10">
        <div className="shell space-y-4 py-10 text-[0.8125rem] leading-relaxed text-white/50">
          <p>{site.disclosureLong}</p>
          <p>
            All prices, speeds, channel counts and promotional offers shown on this site are subject
            to change without notice and are not guaranteed at any particular address. Advertised
            internet rates reflect enrollment in eBill and are available to new residential
            customers. The 1 Gig and 3 Gig symmetrical tiers are not available at every address.
            Fioptics+ TV requires an active Fioptics internet subscription of at least 400 Mbps and a
            minimum of one receiver per account. Quoted rates exclude taxes, government fees and
            surcharges unless stated otherwise. Final pricing, terms and availability are confirmed
            at the time of order.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/40 sm:flex-row">
          <p>
            © {site.retailerName} Authorized Retailer. All rights reserved.
          </p>
          <p>Hawaiian Telcom, Fioptics and Fioptics+ are trademarks of their respective owner.</p>
        </div>
      </div>
    </footer>
  );
}
