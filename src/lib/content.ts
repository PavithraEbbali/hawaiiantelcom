/* =============================================================================
   SINGLE SOURCE OF TRUTH
   -----------------------------------------------------------------------------
   Every price, speed, plan name and promotional line rendered anywhere on this
   site is read from this file. To update pricing after a rate change, edit the
   values below ONLY — no component file needs to be touched.

   All plan data below was audited against https://www.hawaiiantel.com.
   Service lines Hawaiian Telcom does not sell (cable, mobile/wireless) are
   intentionally absent, and their sections are omitted from the page entirely.
============================================================================= */

export interface PlanItem {
  id: string;
  name: string;
  serviceLine: 'fiber' | 'cable' | 'bundle' | 'tv' | 'mobile' | 'phone';
  speedDown?: number;
  speedUp?: number;
  price?: number;
  cents?: string;
  promoQualifier?: string;
  equipmentFee?: string;
  dataPolicy?: string;
  contractTerm?: string;
  features: string[];
  isPopular?: boolean;
}

/* -----------------------------------------------------------------------------
   RETAILER IDENTITY
   ⚠️ REPLACE `salesPhone` WITH YOUR OWN TRACKED SALES NUMBER BEFORE LAUNCH.
   The number below is a reserved fictional number (NANP 555-01xx test range)
   used as a safe placeholder so no real party receives misdirected calls.
----------------------------------------------------------------------------- */
export const site = {
  retailerName: 'Hawaiian Telcom',
  brand: 'Hawaiian Telcom',
  salesPhone: '(808) 555-0142',
  get salesPhoneHref() {
    return `tel:+1${this.salesPhone.replace(/\D/g, '')}`;
  },
  disclosureShort: 'Independent Authorized Retailer of Hawaiian Telcom.',
  disclosureLong:
    'This website is operated by an independent authorized retailer of Hawaiian Telcom, not by the carrier. Hawaiian Telcom, Fioptics and Fioptics+ are trademarks of their respective owner. All service marks, logos and brand names referenced on this site are the property of their respective owners and are used here for identification purposes only. Use of these names does not imply endorsement. The retailer may be compensated when a visitor orders service through this site.',
  hours: 'Sales team available 7 days a week, 6am – 9pm HST',
} as const;

/* -----------------------------------------------------------------------------
   NAVIGATION — anchors are generated from the service lines that actually exist
----------------------------------------------------------------------------- */
export const navLinks = [
  { label: 'Fiber Internet', href: '#fiber' },
  { label: 'Bundles', href: '#bundles' },
  { label: 'TV', href: '#tv' },
  { label: 'Home Phone', href: '#phone' },
  { label: 'Why Us', href: '#why' },
  { label: 'FAQ', href: '#faq' },
] as const;

/* -----------------------------------------------------------------------------
   HERO — live promotions currently running on hawaiiantel.com
----------------------------------------------------------------------------- */
export const hero = {
  headline: '100% Real Fiber Internet.',
  headlineAccent: 'Prices starting at just $30/mo.',
  subhead:
    'Order Hawaiian Telcom Fioptics with symmetrical upload and download speeds, 99.99% reliability and no data caps. Multi-gig service now reaches homes from Honolulu to Kīpahulu.',
  promoFlags: [
    'Fiber now live across Maui',
    '1 month free on 1 Gig & 3 Gig',
    'Free activation',
  ],
  featuredPromo: {
    label: 'Current offer',
    title: 'Free Netflix for a year on Fioptics 3 Gig',
    body:
      'New 3 Gbps residential customers get 12 months of a streaming service on us through MyBundle, plus a free eero Pro 7 and one month free.',
  },
} as const;

/* -----------------------------------------------------------------------------
   MARQUEE TRUST MARKERS
----------------------------------------------------------------------------- */
export const marqueeItems = [
  '100% Real Fiber',
  '3 Gbps Symmetrical',
  '99.99% Reliability',
  'No Data Caps',
  'Free Activation',
  'Fioptics+ Powered by TiVo',
  'eero Pro 7 Wi-Fi',
  'Local Hawaiʻi Technicians',
  'Plans From $30/mo',
  'Symmetrical Upload Speeds',
] as const;

/* =============================================================================
   SERVICE LINE 1 — FIBER (Hawaiian Telcom Fioptics Fiber Internet)
   Source: hawaiiantel.com /Offers/Plans-And-Pricing
============================================================================= */
export const fiberPlans: PlanItem[] = [
  {
    id: 'fioptics-100',
    name: 'Fioptics 100',
    serviceLine: 'fiber',
    speedDown: 100,
    speedUp: 100,
    price: 30,
    cents: '00',
    promoQualifier: 'Per mo. for 1 year with eBill',
    equipmentFee: 'Equipment not included',
    dataPolicy: 'No data caps',
    contractTerm: '1-year term',
    features: [
      'Symmetrical 100 Mbps up and down',
      'Free professional activation',
      'Ideal for streaming, email and everyday browsing',
      'Supports 5–10 connected devices comfortably',
    ],
  },
  {
    id: 'fioptics-600',
    name: 'Fioptics 600',
    serviceLine: 'fiber',
    speedDown: 600,
    speedUp: 600,
    price: 40,
    cents: '00',
    promoQualifier: 'Per mo. for 1 year with eBill',
    equipmentFee: 'Equipment not included',
    dataPolicy: 'No data caps',
    contractTerm: '1-year term',
    features: [
      'Symmetrical 600 Mbps up and down',
      'Free professional activation',
      'Meets the 400 Mbps minimum for Fioptics+ TV',
      'Built for 4K streaming and work-from-home video calls',
    ],
  },
  {
    id: 'fioptics-1-gig',
    name: 'Fioptics 1 Gig',
    serviceLine: 'fiber',
    speedDown: 1000,
    speedUp: 1000,
    price: 50,
    cents: '00',
    promoQualifier: 'Per mo. for 2 years with eBill',
    equipmentFee: 'Equipment not included',
    dataPolicy: 'No data caps',
    contractTerm: '2-year term',
    isPopular: true,
    features: [
      'Symmetrical 1 Gbps up and down',
      '1 month free',
      'Free professional activation',
      'Handles a full household of 4K streams, gaming and large uploads',
    ],
  },
  {
    id: 'fioptics-3-gig',
    name: 'Fioptics 3 Gig',
    serviceLine: 'fiber',
    speedDown: 3000,
    speedUp: 3000,
    price: 80,
    cents: '00',
    promoQualifier: 'Per mo. for 2 years with eBill',
    equipmentFee: 'Free eero Pro 7 equipment included',
    dataPolicy: 'No data caps',
    contractTerm: '2-year term',
    features: [
      'Symmetrical 3 Gbps up and down',
      '1 month free',
      'Free eero Pro 7 Wi-Fi system',
      'Free Netflix for a year via MyBundle',
    ],
  },
];

/* =============================================================================
   SERVICE LINE 2 — BUNDLES (Internet + TV / Phone)
   Source: hawaiiantel.com — "Get Fioptics Internet and TV for $30/mo. each
   when bundled" + "Build your Internet, TV and Home Phone bundle"
============================================================================= */
export const bundlePlans: PlanItem[] = [
  {
    id: 'bundle-internet-tv',
    name: 'Fioptics Internet + TV',
    serviceLine: 'bundle',
    price: 30,
    cents: '00',
    promoQualifier: 'Per mo. each service when bundled',
    equipmentFee: 'Fioptics+ receiver required',
    dataPolicy: 'No data caps',
    contractTerm: 'Term varies by speed tier',
    isPopular: true,
    features: [
      'Fioptics fiber internet plus Basic TV at $30/mo. each',
      '55+ live and local channels',
      'One guide for live TV and your streaming apps',
      'OnDemand, Restart TV and Cloud DVR included',
    ],
  },
  {
    id: 'bundle-triple',
    name: 'Internet + TV + Home Phone',
    serviceLine: 'bundle',
    promoQualifier: 'Built to your household',
    equipmentFee: 'Fioptics+ receiver required',
    dataPolicy: 'No data caps',
    contractTerm: 'Term varies by services selected',
    features: [
      'Combine any Fioptics speed with any Fioptics+ TV tier',
      'Add myChoice Basic Plus home phone with 13 calling features',
      'One bill for every service on the account',
      'We price the exact combination for your address on the call',
    ],
  },
];

/* =============================================================================
   SERVICE LINE 3 — TV (Fioptics+ powered by TiVo)
   Source: hawaiiantel.com /TV/Fioptics-Plus
============================================================================= */
export const tvPlans: PlanItem[] = [
  {
    id: 'tv-basic',
    name: 'Basic TV',
    serviceLine: 'tv',
    price: 30,
    cents: '00',
    promoQualifier: 'Per mo. internet subscription required',
    equipmentFee: 'One Fioptics+ receiver required per account',
    contractTerm: 'Requires Fioptics internet of 400 Mbps or higher',
    features: [
      '55+ live and local channels',
      'Stream on any device with one guide for all your apps',
      'OnDemand, Restart TV and Cloud DVR',
      'Voice search and Google Assistant on the remote',
    ],
  },
  {
    id: 'tv-advantage',
    name: 'Advantage TV',
    serviceLine: 'tv',
    price: 90,
    cents: '00',
    promoQualifier: 'Per mo. internet subscription required',
    equipmentFee: 'One Fioptics+ receiver required per account',
    contractTerm: 'Requires Fioptics internet of 400 Mbps or higher',
    isPopular: true,
    features: [
      '175+ live and local channels',
      'Stream on any device with one guide for all your apps',
      'OnDemand, Restart TV and Cloud DVR',
      'Expanded sports and entertainment lineup',
    ],
  },
  {
    id: 'tv-advantage-plus',
    name: 'Advantage Plus TV',
    serviceLine: 'tv',
    price: 100,
    cents: '00',
    promoQualifier: 'Per mo. internet subscription required',
    equipmentFee: 'One Fioptics+ receiver required per account',
    contractTerm: 'Requires Fioptics internet of 400 Mbps or higher',
    features: [
      '215+ live and local channels',
      'Stream on any device with one guide for all your apps',
      'OnDemand, Restart TV and Cloud DVR',
      'The widest Fioptics+ channel lineup available',
    ],
  },
];

/* =============================================================================
   SERVICE LINE 4 — HOME PHONE
   Source: hawaiiantel.com /Phone/Phone-Overview
============================================================================= */
export const phonePlans: PlanItem[] = [
  {
    id: 'mychoice-basic-plus',
    name: 'myChoice Basic Plus',
    serviceLine: 'phone',
    price: 29,
    cents: '95',
    promoQualifier: 'Per mo. for 3 years',
    contractTerm: '3-year term',
    isPopular: true,
    features: [
      'Unlimited calls within the U.S.',
      'Includes 13 calling features',
      'Caller ID, Call Waiting and Three-Way Calling',
      'Keep your existing Hawaiʻi phone number',
    ],
  },
  {
    id: 'home-voicemail',
    name: 'Home Voicemail',
    serviceLine: 'phone',
    price: 7,
    cents: '99',
    promoQualifier: 'Per mo. standard rate',
    equipmentFee: '$10 one-time activation fee',
    features: [
      '$6.04/mo. when paired with Go Local Plus',
      'Wake-up service and reminder messages',
      'View and manage voice messages online',
      'Adds to any Hawaiian Telcom home phone line',
    ],
  },
];

/* =============================================================================
   HONEST FINE PRINT — inclusions and fees, stated plainly
============================================================================= */
export interface FinePrintRow {
  item: string;
  /** Icon key from the shared set in components/Icons.tsx. */
  icon: 'data' | 'activation' | 'equipment' | 'billing' | 'term' | 'speed' | 'availability';
  fiber: string;
  tv: string;
  phone: string;
}

export const finePrintLede =
  'Every condition that applies to the advertised rates is set out below. Any term not shown here will be confirmed in writing before your order is submitted.';

export const finePrint: FinePrintRow[] = [
  {
    item: 'Data allowance',
    icon: 'data',
    fiber: 'Unlimited — no data caps',
    tv: 'Streams over your fiber line',
    phone: 'Unlimited U.S. calling',
  },
  {
    item: 'Activation',
    icon: 'activation',
    fiber: 'Free activation',
    tv: 'Installed with your internet',
    phone: '$10 one-time for voicemail',
  },
  {
    item: 'Equipment',
    icon: 'equipment',
    fiber: 'Not included on 100/600/1 Gig · free eero Pro 7 on 3 Gig',
    tv: 'One Fioptics+ receiver required per account',
    phone: 'No equipment required',
  },
  {
    item: 'Advertised price requires',
    icon: 'billing',
    fiber: 'Enrollment in eBill',
    tv: 'An active Fioptics internet subscription',
    phone: 'A 3-year term on myChoice Basic Plus',
  },
  {
    item: 'Term length',
    icon: 'term',
    fiber: '1 year on 100 & 600 · 2 years on 1 Gig & 3 Gig',
    tv: 'Matches your internet agreement',
    phone: '3 years',
  },
  {
    item: 'Speed requirement',
    icon: 'speed',
    fiber: 'Symmetrical up to 3 Gbps',
    tv: 'Fioptics internet of 400 Mbps or higher',
    phone: 'None',
  },
  {
    item: 'Availability',
    icon: 'availability',
    fiber: 'Not available at every address — we confirm before you order',
    tv: 'Follows fiber availability',
    phone: 'Statewide',
  },
];

/* =============================================================================
   WHY HAWAIIAN TELCOM — feature grid
============================================================================= */
export interface FeatureItem {
  id: string;
  title: string;
  body: string;
  metric?: string;
  icon: 'fiber' | 'shield' | 'sync' | 'price' | 'island' | 'wifi';
}

export const whyLede =
  'Hawaiian Telcom has served these islands since 1883. Fioptics is the current generation of that network: fiber optic infrastructure carried the full distance to the home and engineered for local conditions.';

export const features: FeatureItem[] = [
  {
    id: 'multi-gig',
    title: 'Multi-gig fiber to the home',
    body: 'Fioptics runs 100% real fiber the whole way to your house — not fiber to a neighborhood box and copper the rest of the way. Speeds scale to 3 Gbps.',
    metric: '3 Gbps',
    icon: 'fiber',
  },
  {
    id: 'reliable',
    title: '99.99% reliability',
    body: 'Glass does not slow down in the afternoon heat or degrade in heavy rain. Hawaiian Telcom engineers the network for uptime you stop thinking about.',
    metric: '99.99%',
    icon: 'shield',
  },
  {
    id: 'symmetrical',
    title: 'Upload as fast as you download',
    body: 'Every Fioptics tier is symmetrical. Cloud backups, video calls, large file handoffs and live streams move at full speed in both directions.',
    metric: '1:1',
    icon: 'sync',
  },
  {
    id: 'pricing',
    title: 'Pricing that holds',
    body: 'No bundle is required to get a good rate, and the advertised price is locked for the length of your term with eBill enrollment.',
    metric: 'From $30',
    icon: 'price',
  },
  {
    id: 'local',
    title: 'A network built for these islands',
    body: 'Hawaiian Telcom has served Hawaiʻi since 1883. Fiber now reaches across Maui, from Wailuku to Kīpahulu, with the buildout continuing statewide.',
    metric: 'Since 1883',
    icon: 'island',
  },
  {
    id: 'wifi',
    title: 'Whole-home Wi-Fi that reaches',
    body: 'Add Fioptics Home for an eero gateway, a Wi-Fi extender, premium tech support and in-home wiring care with no surprise out-of-pocket costs.',
    metric: 'eero Pro 7',
    icon: 'wifi',
  },
];

/* =============================================================================
   FAQ
============================================================================= */
export interface FaqItem {
  q: string;
  a: string;
}

export const faqs: FaqItem[] = [
  {
    q: 'What speeds can I actually get at my address?',
    a: 'Fioptics offers 100 Mbps, 600 Mbps, 1 Gbps and 3 Gbps, all symmetrical. The 1 Gig and 3 Gig symmetrical tiers are not available at every address, so we confirm exactly which tiers your specific address qualifies for before any order is placed.',
  },
  {
    q: 'Is Fioptics really 100% fiber?',
    a: 'Yes. Fioptics is fiber optic the entire way to the home rather than fiber to a neighborhood cabinet with copper for the final stretch. That is what allows the upload speed to match the download speed on every tier.',
  },
  {
    q: 'Are there data caps?',
    a: 'No. Fioptics internet plans do not have data caps, so streaming, gaming, cloud backups and working from home will not push you into an overage.',
  },
  {
    q: 'Do I need internet to get Fioptics+ TV?',
    a: 'Yes. Fioptics+ TV requires an active Fioptics internet subscription of at least 400 Mbps, which means the Fioptics 600, 1 Gig or 3 Gig tiers. A minimum of one Fioptics+ receiver is required per account.',
  },
  {
    q: 'Why does the advertised price mention eBill?',
    a: 'The advertised internet rates reflect enrollment in eBill, Hawaiian Telcom’s paperless billing. It is a free enrollment, and we set it up with you at the time of the order so your rate matches what you were quoted.',
  },
  {
    q: 'Can I keep my current phone number?',
    a: 'In most cases yes. Existing Hawaiʻi numbers can typically transfer to a Hawaiian Telcom home phone line. We check portability for your specific number while you are on the call.',
  },
  {
    q: 'What does the free Netflix offer include?',
    a: 'New residential customers who order Fioptics 3 Gig receive 12 months of one streaming service through MyBundle. The 3 Gbps service must be maintained monthly and the account kept in good standing for the credits to continue.',
  },
  {
    q: 'How long does installation take?',
    a: 'A standard fiber installation is typically completed in a single appointment. When you order, we schedule the install window with you and confirm what the technician will need access to at the property.',
  },
];

/* =============================================================================
   FOOTER — 8 mandated legal pages
============================================================================= */
/* -----------------------------------------------------------------------------
   FOOTER — column structure
----------------------------------------------------------------------------- */
export const footerShop = [
  { label: 'Fiber Internet', href: '#fiber' },
  { label: 'Internet + TV Bundles', href: '#bundles' },
  { label: 'Fioptics+ TV', href: '#tv' },
  { label: 'Home Phone', href: '#phone' },
  { label: 'Check Availability', href: '#top' },
] as const;

export const footerLearn = [
  { label: 'Why 100% Fiber', href: '#why' },
  { label: 'Plan Inclusions & Fees', href: '#fine-print' },
  { label: 'Frequently Asked Questions', href: '#faq' },
] as const;

export const legalPages = [
  { label: 'Privacy & Data Protection', href: '/legal/privacy' },
  { label: 'Disclaimer', href: '/legal/disclaimer' },
  { label: 'Cookies Policy', href: '/legal/cookies' },
  { label: 'TCPA Policy', href: '/legal/tcpa' },
  { label: 'Trademarks', href: '/legal/trademarks' },
  { label: 'Marketing Policy', href: '/legal/marketing' },
  { label: 'Service Fulfillment', href: '/legal/service-fulfillment' },
  { label: 'PCI DSS', href: '/legal/pci-dss' },
] as const;

/* -----------------------------------------------------------------------------
   CTA LABELS — a plan with a price says "Call to order", a plan without a
   listed price says "Call for pricing". Never a raw phone number.
----------------------------------------------------------------------------- */
export function ctaLabel(plan: PlanItem): string {
  return typeof plan.price === 'number' ? 'Call to order' : 'Call for pricing';
}
