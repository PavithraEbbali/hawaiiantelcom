/* =============================================================================
   LEGAL PAGE CONTENT
   -----------------------------------------------------------------------------
   The eight policies linked from the footer. Kept beside content.ts so the
   retailer name and phone number stay in one place, and so counsel can review
   every policy in a single file.

   ⚠️ These are working drafts written to be accurate to how this site operates.
   Have your attorney review them, and fill in the bracketed business details,
   before going live.
============================================================================= */

import { site } from './content';

export interface LegalSection {
  heading: string;
  body: string[];
}

export interface LegalDoc {
  slug: string;
  title: string;
  summary: string;
  sections: LegalSection[];
}

const B = site.brand;
const PHONE = site.salesPhone;

/**
 * The retailer trades under the Hawaiian Telcom name, so the retailer and the
 * carrier share a label. Every policy below therefore refers to the retailer in
 * the first person ("we", "this site") and uses the brand name only for the
 * carrier, so no sentence collapses into "X is an authorized retailer of X".
 */

export const legalDocs: LegalDoc[] = [
  /* ------------------------------------------------------------------ 1 --- */
  {
    slug: 'privacy',
    title: 'Privacy & Data Protection',
    summary: 'How this site collects, uses, protects and shares the information you give us.',
    sections: [
      {
        heading: 'Who we are',
        body: [
          `This website is operated by an independent authorized retailer of ${B}, not by the carrier. We sell and arrange ${B} residential services. We are a separate company from the carrier, and this policy describes only our own handling of your information.`,
        ],
      },
      {
        heading: 'Information we collect',
        body: [
          'When you call our sales line or submit an availability request, we collect the details needed to place an order: your name, service address, contact phone number, email address and the services you are interested in.',
          'Our site collects limited technical information automatically, including IP address, browser type, referring page and pages viewed. This is used to keep the site working and to understand which pages are useful.',
          'We do not ask for, and you should not send us, Social Security numbers, financial account numbers or payment card details through this website.',
        ],
      },
      {
        heading: 'How we use your information',
        body: [
          'To check service availability at your address, quote pricing, place and provision your order, and schedule installation.',
          'To contact you about an order or request you initiated.',
          'To meet our recordkeeping, tax and regulatory obligations.',
          'We do not sell your personal information.',
        ],
      },
      {
        heading: 'Who we share it with',
        body: [
          `We share order information with ${B} for the sole purpose of provisioning the services you requested. We also use service providers — telephony, CRM and hosting vendors — who process data on our behalf under contract and may not use it for their own purposes.`,
          'We may disclose information where required by law, legal process, or to protect our rights and the safety of others.',
        ],
      },
      {
        heading: 'How long we keep it',
        body: [
          'We keep order records for as long as needed to fulfill the order and to satisfy our legal, tax and audit obligations, then delete or de-identify them.',
        ],
      },
      {
        heading: 'Your choices and rights',
        body: [
          'You may ask us to confirm what personal information we hold about you, correct it, or delete it. You may opt out of marketing contact at any time; we will still contact you about an active order.',
          `To exercise any of these, call ${PHONE} or write to us at the address below. We will verify your identity before acting on a request.`,
        ],
      },
      {
        heading: 'Security',
        body: [
          'We use administrative, technical and physical safeguards appropriate to the sensitivity of the information we handle, including encryption in transit and access controls limiting order data to staff who need it. No method of transmission or storage is perfectly secure, and we cannot guarantee absolute security.',
        ],
      },
      {
        heading: "Children's privacy",
        body: [
          'This site is directed to adults. We do not knowingly collect personal information from anyone under 16. If we learn we have, we will delete it.',
        ],
      },
      {
        heading: 'Changes and contact',
        body: [
          'We will post any material change to this policy on this page and update the effective date.',
          `Questions about this policy: call ${PHONE}, or write to us at [Street Address], [City], HI [ZIP].`,
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ 2 --- */
  {
    slug: 'disclaimer',
    title: 'Disclaimer',
    summary: 'The limits of what this website represents, and who operates it.',
    sections: [
      {
        heading: 'Independent retailer',
        body: [
          `This website is operated by an independent authorized retailer of ${B}. We are not ${B} itself, and we are not owned by, operated by, or an agent with authority to bind the carrier. We may be compensated when a visitor orders service through this site.`,
        ],
      },
      {
        heading: 'Pricing and availability',
        body: [
          `All prices, speeds, channel counts, promotional offers and terms shown on this site are provided for general information and are subject to change without notice by ${B}.`,
          'Service availability, actual speeds and final pricing depend on your specific service address, the equipment installed, the plan selected, and any applicable taxes, government fees and surcharges. Nothing on this site is an offer, quote or guarantee of service at a particular address or price.',
          'The binding terms of your service are those presented to you at the time of order and in the service agreement you accept.',
        ],
      },
      {
        heading: 'No professional advice',
        body: [
          'Content on this site is informational. It is not legal, financial or technical advice, and should not be relied on as the sole basis for a purchasing decision.',
        ],
      },
      {
        heading: 'Third-party content and links',
        body: [
          'This site may reference third-party products, services or trademarks. We do not control and are not responsible for third-party content, and a reference is not an endorsement.',
        ],
      },
      {
        heading: 'Limitation of liability',
        body: [
          'This site is provided "as is" and "as available" without warranties of any kind, express or implied, including merchantability, fitness for a particular purpose and non-infringement.',
          'To the fullest extent permitted by law, the operator of this website is not liable for any indirect, incidental, special, consequential or punitive damages arising from your use of, or inability to use, this website.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ 3 --- */
  {
    slug: 'cookies',
    title: 'Cookies Policy',
    summary: 'What we store on your device, why, and how to turn it off.',
    sections: [
      {
        heading: 'What cookies are',
        body: [
          'Cookies are small text files a website stores on your device. Similar technologies — local storage, pixels and SDKs — do comparable things. This policy covers all of them.',
        ],
      },
      {
        heading: 'Categories we use',
        body: [
          'Strictly necessary: required for the site to load, to keep it secure and to remember your cookie choices. These cannot be switched off.',
          'Performance and analytics: aggregate measurement of which pages are viewed and how the site performs, so we can fix problems and improve layout.',
          'Functional: remembers preferences such as a dismissed banner.',
          'Advertising and attribution: where enabled, measures which campaign led to a call or form submission. We do not use cookies to build profiles for sale.',
        ],
      },
      {
        heading: 'Managing cookies',
        body: [
          'Every major browser lets you block or delete cookies in its settings, and you can set it to warn you before one is stored. Blocking strictly necessary cookies may stop parts of this site from working.',
          'Most browsers also send a Global Privacy Control or Do Not Track signal. We honour Global Privacy Control signals where applicable law requires it.',
        ],
      },
      {
        heading: 'Changes',
        body: [
          'If we add or remove a cookie category we will update this page. Questions: call ' + PHONE + '.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ 4 --- */
  {
    slug: 'tcpa',
    title: 'TCPA Policy',
    summary: 'How we handle consent for calls and text messages under the Telephone Consumer Protection Act.',
    sections: [
      {
        heading: 'Our commitment',
        body: [
          "We comply with the Telephone Consumer Protection Act (47 U.S.C. \u00a7 227), the FCC's implementing rules, and applicable state telemarketing law.",
        ],
      },
      {
        heading: 'Consent',
        body: [
          'By providing your telephone number on this website or to our representative and agreeing to be contacted, you give prior express consent for us to contact you at that number about the services you inquired about. This may include calls and SMS messages, which may be placed using automated technology.',
          'Consent to receive marketing calls or texts is not a condition of purchasing any goods or services. You may buy service without agreeing to marketing contact.',
          'Message and data rates may apply. Message frequency varies.',
        ],
      },
      {
        heading: 'Revoking consent',
        body: [
          'You may revoke consent at any time and by any reasonable means. Reply STOP to any text message, tell our representative on a call, or call ' + PHONE + ' and ask to be placed on our internal do-not-call list.',
          'We honour revocation requests promptly and, in any event, within the time required by law. Reply HELP to a text for assistance.',
        ],
      },
      {
        heading: 'Do-not-call lists',
        body: [
          'We maintain an internal do-not-call list and scrub our outbound calling against the National Do Not Call Registry and applicable state registries. Once you are on our internal list we retain that record as required.',
        ],
      },
      {
        heading: 'Calling hours and identification',
        body: [
          `We place calls only within the hours permitted by federal and state law for the called party. Our representatives identify themselves by name and state that they are calling from an independent authorized retailer of ${B}, not from the carrier, at the start of every call.`,
        ],
      },
      {
        heading: 'Recording',
        body: [
          'Calls may be monitored or recorded for quality and training. Where notice or consent is required, it is given at the start of the call.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ 5 --- */
  {
    slug: 'trademarks',
    title: 'Trademarks',
    summary: 'Ownership of the marks referenced on this site, and the basis on which we use them.',
    sections: [
      {
        heading: 'Third-party marks',
        body: [
          `${B}, Fioptics, Fioptics+ and all associated names, logos and service marks are the property of their respective owners. TiVo and the TiVo logo are trademarks or registered trademarks of TiVo Inc. and its subsidiaries. eero is a trademark of its respective owner. Netflix is a trademark of Netflix, Inc.`,
          'We claim no ownership of these marks.',
        ],
      },
      {
        heading: 'Basis of use',
        body: [
          `We use these names and marks solely to identify the products and services we are authorized to sell as an independent retailer of ${B}. This is nominative use for identification purposes only.`,
          'Use of these names and marks on this site does not imply endorsement, sponsorship or affiliation beyond the authorized retailer relationship described in our Disclaimer.',
        ],
      },
      {
        heading: 'Our marks',
        body: [
          'The design, layout and original copy of this website are the property of its operator and may not be copied or reused without written permission.',
        ],
      },
      {
        heading: 'Reporting a concern',
        body: [
          'If you believe a mark is used incorrectly on this site, call ' + PHONE + ' and we will review it promptly.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ 6 --- */
  {
    slug: 'marketing',
    title: 'Marketing Policy',
    summary: 'The standards we hold our own advertising to.',
    sections: [
      {
        heading: 'Truthful advertising',
        body: [
          'Our marketing follows the FTC Act and FTC advertising guidance. We describe plans, speeds, terms and promotional offers as they are actually sold, and we do not advertise a rate we cannot deliver at a qualifying address.',
        ],
      },
      {
        heading: 'Clear disclosure of who we are',
        body: [
          `Every channel we advertise through identifies us as an independent authorized retailer of ${B}. We do not present ourselves as the carrier or imply that we are ${B} itself.`,
        ],
      },
      {
        heading: 'Material terms',
        body: [
          'Where a price depends on a condition — a term commitment, paperless billing enrollment, a bundle, a promotional window or an equipment requirement — that condition is disclosed alongside the price rather than buried.',
          'Promotional rates state their duration. Where a rate changes after a promotional period, we say so at the point of sale.',
        ],
      },
      {
        heading: 'No high-pressure tactics',
        body: [
          'We do not use artificial deadlines, fabricated scarcity, or claims designed to alarm. Our representatives will give you the quoted terms in writing before you commit.',
        ],
      },
      {
        heading: 'Email and SMS',
        body: [
          'Marketing email complies with CAN-SPAM: accurate headers and subject lines, a physical mailing address, and a working unsubscribe link honoured within ten business days. SMS marketing follows our TCPA Policy.',
        ],
      },
      {
        heading: 'Reporting a concern',
        body: [
          'If you believe any advertising of ours is inaccurate or misleading, call ' + PHONE + '. We investigate every report and correct what we get wrong.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ 7 --- */
  {
    slug: 'service-fulfillment',
    title: 'Service Fulfillment',
    summary: 'What happens between your call and a working connection.',
    sections: [
      {
        heading: 'What we do',
        body: [
          `We take your order, verify serviceability at your address, select the plan that fits, and submit the order for provisioning. The underlying network, installation and ongoing service are delivered by ${B}.`,
        ],
      },
      {
        heading: 'Order process',
        body: [
          'Availability check. We confirm which service tiers are actually deliverable at your exact address, since fiber availability varies address by address.',
          'Quote. We state the monthly rate, the term, what equipment is included, any one-time charges, and the conditions attached to the advertised price.',
          'Order submission. With your authorization, we submit the order and provide your order reference.',
          'Installation. An install appointment is scheduled with you. Standard fiber installation is typically completed in a single visit.',
          'Confirmation. You receive the service terms directly and can review them before service activates.',
        ],
      },
      {
        heading: 'Timing',
        body: [
          'Installation windows depend on technician availability in your area and on any construction required to reach the property. We give you the current expected window when the order is placed and tell you if it changes.',
        ],
      },
      {
        heading: 'What is not included',
        body: [
          'Quoted rates exclude taxes, government fees and surcharges unless stated otherwise. Non-standard installation work — extended wiring runs, conduit, or repairs to existing in-home wiring — may carry additional cost, which is quoted before any work is performed.',
        ],
      },
      {
        heading: 'Changes and cancellation',
        body: [
          'You may change or cancel an order before installation by calling ' + PHONE + '. After service is installed, cancellation and any early termination terms are governed by the service agreement you accepted.',
        ],
      },
      {
        heading: 'If something goes wrong with an order',
        body: [
          'If an order we placed was provisioned incorrectly, or the rate does not match what we quoted, call ' + PHONE + '. We stay on the order until it matches what you agreed to.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ 8 --- */
  {
    slug: 'pci-dss',
    title: 'PCI DSS',
    summary: 'Our position on payment card data.',
    sections: [
      {
        heading: 'We do not process card payments on this website',
        body: [
          'This website does not accept, transmit or store payment card data. There is no checkout, no payment form and no card field anywhere on this site.',
          'Do not send payment card numbers, CVV codes, bank account numbers or similar details to us by email, text message or any web form.',
        ],
      },
      {
        heading: 'Our standard',
        body: [
          'Where we handle payment card information in the course of taking an order, we do so in accordance with the Payment Card Industry Data Security Standard (PCI DSS) applicable to our merchant level.',
          'Card details taken by phone are entered directly into a PCI-compliant payment environment operated by our payment processor. Our representatives do not write down, retain, or store card numbers, and full card numbers are not held in our systems.',
        ],
      },
      {
        heading: 'Safeguards',
        body: [
          'Cardholder data is encrypted in transit. Access is limited to staff with a business need. Call recordings are paused or masked while payment details are being given, and our processor is independently validated as PCI DSS compliant.',
        ],
      },
      {
        heading: 'Reporting a concern',
        body: [
          'If you believe card information has been handled improperly, call ' + PHONE + ' immediately so we can investigate, and contact your card issuer.',
        ],
      },
    ],
  },
];

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return legalDocs.find((doc) => doc.slug === slug);
}
