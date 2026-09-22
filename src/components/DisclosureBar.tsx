import { site } from '@/lib/content';

/**
 * Persistent retailer disclosure. Sits above the sticky header so the
 * relationship is stated before anything else on the page.
 */
export default function DisclosureBar() {
  return (
    <div className="relative z-[60] bg-ht-navy text-white">
      <div className="shell flex items-center justify-center gap-2.5 py-2.5 text-center">
        <span aria-hidden className="h-1.5 w-1.5 shrink-0 rotate-45 bg-ht-blue" />
        <p className="text-[0.75rem] font-medium tracking-[0.01em] text-white/80 sm:text-[0.8125rem]">
          {site.disclosureShort}
        </p>
      </div>
    </div>
  );
}
