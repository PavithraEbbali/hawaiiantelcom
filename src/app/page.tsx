import DisclosureBar from '@/components/DisclosureBar';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ServiceSection from '@/components/ServiceSection';
import FinePrintGrid from '@/components/FinePrintGrid';
import WhyUs from '@/components/WhyUs';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';
import { bundlePlans, fiberPlans, phonePlans, tvPlans } from '@/lib/content';

import fiberInstall from '@/assets/images/fiber-install.webp';
import bundleLivingRoom from '@/assets/images/bundle-living-room.webp';
import tvFioptics from '@/assets/images/tv-fioptics.webp';
import phoneKupuna from '@/assets/images/phone-kupuna.webp';

/**
 * Section order is fixed:
 *   Disclosure → Header → Hero → Fiber → Bundles → TV → Phone
 *   → Fine print → Why us → FAQ → Footer
 *
 * Cable and Mobile are absent by design: an audit of hawaiiantel.com confirms
 * Hawaiian Telcom sells neither (the network is 100% fiber, and there is no
 * wireless line of business), so no placeholder sections are rendered.
 */
export default function Home() {
  return (
    <>
      <DisclosureBar />
      <Header />

      <main id="main">
        <Hero />

        {/* ---------------------------- 1. FIBER ---------------------------- */}
        <ServiceSection
          id="fiber"
          eyebrow="Fioptics Fiber Internet"
          title="Fiber optic service delivered directly to the residence."
          accentFrom={5}
          intro="Fioptics runs 100% fiber straight to your home — no copper for the last stretch. Every tier uploads as fast as it downloads, and none of them have a data cap."
          plans={fiberPlans}
          columns={4}
          gradient="blue"
          media={{
            src: fiberInstall,
            alt: 'A Hawaiian Telcom technician splicing fiber optic cable on the lanai of a plantation-style home, with green mountain ridges behind.',
            layout: 'band',
            title: 'Fiber terminated at your property.',
            body: 'A technician terminates the strand at the premises on installation day, so the connection remains fiber optic end to end rather than reverting to copper for the final segment.',
          }}
          footnote="Advertised rates reflect enrollment in eBill and are available to new residential customers. The 1 Gig and 3 Gig symmetrical tiers are not available at every address — we confirm which tiers your address qualifies for before any order is placed."
        />

        {/* --------------------------- 2. BUNDLES --------------------------- */}
        <ServiceSection
          id="bundles"
          eyebrow="Internet + TV + Phone"
          title="Combine services and reduce your monthly rate."
          accentFrom={4}
          intro="Pair Fioptics internet with Fioptics+ TV at $30/mo. each, then add home phone if you want it. One account, one bill, one install appointment."
          plans={bundlePlans}
          tone="surface"
          columns={2}
          gradient="teal"
          media={{
            src: bundleLivingRoom,
            alt: 'A family sitting together on a sofa at night watching television in their living room.',
            layout: 'split',
            side: 'left',
            title: 'A single account, one bill, one installation.',
            body: 'Bundled services are provisioned under one account and installed in a single appointment. The combined monthly rate is confirmed with you before the order is submitted.',
          }}
          footnote="Bundle pricing varies with the speed tier and TV package selected. Tell us which services you want and we will price the exact combination for your address on the call."
        />

        {/* ----------------------------- 3. TV ------------------------------ */}
        <ServiceSection
          id="tv"
          eyebrow="Fioptics+ TV"
          title="Live television and streaming, unified in one guide."
          accentFrom={4}
          intro="Fioptics+ is powered by TiVo, so local channels and the apps you already pay for sit in the same search. Voice remote, Cloud DVR, Restart TV and OnDemand come standard."
          plans={tvPlans}
          columns={3}
          gradient="violet"
          media={{
            src: tvFioptics,
            alt: 'A wall-mounted television in a living room during the evening, with a streaming receiver and remote on the shelf below.',
            layout: 'split',
            side: 'right',
            title: 'Channels and applications in a single interface.',
            body: 'Fioptics+ presents live and local channels alongside your existing streaming subscriptions in one guide and one search, delivered through a receiver compact enough to mount behind the display.',
          }}
          footnote="Fioptics+ TV requires an active Fioptics internet subscription of at least 400 Mbps, and a minimum of one Fioptics+ receiver per account. Channel counts and programming are subject to change."
        />

        {/* --------------------------- 4. PHONE ----------------------------- */}
        <ServiceSection
          id="phone"
          eyebrow="Home Phone"
          title="Home voice service built for reliability."
          accentFrom={4}
          intro="Unlimited calling across the U.S. with 13 calling features included, on a line that keeps working when the power and the Wi-Fi do not."
          plans={phonePlans}
          tone="surface"
          columns={2}
          gradient="green"
          media={{
            src: phoneKupuna,
            alt: 'An older woman standing in her kitchen talking on a corded home telephone in morning light.',
            layout: 'split',
            side: 'left',
            title: 'Service that remains available during an outage.',
            body: 'A home line operates independently of handset battery and home Wi-Fi. For many households it remains the primary contact number, and existing numbers can usually be transferred.',
          }}
          footnote="myChoice Basic Plus is offered on a 3-year term. Home Voicemail is $7.99/mo. at the standard rate, or $6.04/mo. when paired with Go Local Plus, plus a $10 one-time activation fee. Number portability is confirmed per line."
        />

        {/* ------------------- 5. HONEST FINE-PRINT GRID -------------------- */}
        <FinePrintGrid />

        {/* ----------------------- 6. WHY / FEATURES ------------------------ */}
        <WhyUs />

        {/* ------------------------------ 7. FAQ ---------------------------- */}
        <Faq />
      </main>

      <Footer />
    </>
  );
}
