import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import { site } from '@/lib/content';

/**
 * Hawaiian Telcom sets its type in Gilroy — a licensed face we cannot
 * redistribute. Plus Jakarta Sans matches its geometric display character,
 * with Inter carrying body copy for legibility at small sizes.
 *
 * Both are SELF-HOSTED rather than pulled through next/font/google.
 * `next/font/google` fetches the stylesheet and font binaries from Google at
 * BUILD time, so a flaky network fails the build outright — this build hit
 * exactly that twice ("An error occurred in next/font: Cannot read properties
 * of null"), and it would be an intermittent CI failure rather than a local
 * annoyance. The files below are committed, so the build never touches the
 * network and the result is byte-identical every time. It also drops the
 * runtime connection to fonts.gstatic.com, which is one fewer third party
 * receiving visitor IP addresses — relevant to the privacy policy this site
 * publishes.
 *
 * These are the variable weight axes, so one file per subset covers every
 * weight the site uses.
 */
const display = localFont({
  src: [
    { path: './fonts/PlusJakartaSans-latin.woff2', style: 'normal' },
    { path: './fonts/PlusJakartaSans-latin-ext.woff2', style: 'normal' },
  ],
  variable: '--font-display',
  display: 'swap',
  fallback: ['Gilroy', 'Helvetica', 'Arial', 'sans-serif'],
});

const sans = localFont({
  src: [
    { path: './fonts/Inter-latin.woff2', style: 'normal' },
    { path: './fonts/Inter-latin-ext.woff2', style: 'normal' },
  ],
  variable: '--font-sans',
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: {
    default: 'Hawaiian Telcom Fioptics Fiber Internet, TV & Home Phone | Authorized Retailer',
    template: '%s | Hawaiian Telcom Authorized Retailer',
  },
  description:
    'Order Hawaiian Telcom Fioptics 100% fiber internet from $30/mo — symmetrical speeds to 3 Gbps, no data caps, free activation. Fioptics+ TV and home phone available. Independent authorized retailer.',
  keywords: [
    'Hawaiian Telcom',
    'Fioptics',
    'fiber internet Hawaii',
    'Honolulu internet',
    'Maui fiber internet',
    'Fioptics+ TV',
  ],
  openGraph: {
    title: 'Hawaiian Telcom Fioptics Fiber Internet | Authorized Retailer',
    description:
      '100% real fiber from $30/mo. Symmetrical speeds to 3 Gbps, no data caps, free activation.',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        // JPEG on purpose — some social scrapers still refuse WebP.
        url: '/images/og-share.jpg',
        width: 1408,
        height: 768,
        alt: 'Hawaiian Telcom Fioptics fiber internet, authorized retailer.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hawaiian Telcom Fioptics Fiber Internet | Authorized Retailer',
    description:
      '100% real fiber from $30/mo. Symmetrical speeds to 3 Gbps, no data caps, free activation.',
    images: ['/images/og-share.jpg'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#012639',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <SmoothScroll />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ht-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: site.retailerName,
              description: site.disclosureShort,
              telephone: site.salesPhone,
              areaServed: { '@type': 'State', name: 'Hawaii' },
            }),
          }}
        />
      </body>
    </html>
  );
}
