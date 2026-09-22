'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import GradientField from './GradientField';
import { Reveal, Heading, LUX_EASE } from './motion-primitives';
import MagneticButton from './MagneticButton';
import { faqs, site } from '@/lib/content';

function Row({
  q,
  a,
  open,
  onToggle,
  index,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
  index: number;
}) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div
      className={`overflow-hidden rounded-3xl border bg-white transition-colors duration-500 ease-lux ${
        open ? 'border-ht-blue shadow-card' : 'border-ht-border-light hover:border-ht-border'
      }`}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left sm:px-7"
        >
          <span className="font-display text-[1.0625rem] font-bold leading-snug tracking-[-0.015em] text-ht-ink">
            {q}
          </span>
          <span
            aria-hidden
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-lux ${
              open ? 'rotate-45 border-ht-blue bg-ht-blue text-white' : 'border-ht-border text-ht-gray'
            }`}
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
              <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: LUX_EASE }}
          >
            <p className="px-6 pb-6 text-[0.9375rem] leading-relaxed text-ht-slate sm:px-7 sm:pr-14">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-white">
      <GradientField variant="violet" />
      <div className="shell relative py-16 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">Questions, answered</p>
            <Heading
              text="Everything worth knowing before you order."
              accentFrom={4}
              className="mt-3 text-display-md font-extrabold"
            />
            <p className="mt-4 text-lg leading-relaxed text-ht-slate">
              Our Hawaiʻi-based sales team will review every tier available at your address and
              confirm the exact monthly cost before anything is ordered.
            </p>
            <Reveal delay={0.12}>
              <MagneticButton href={site.salesPhoneHref} variant="primary" className="mt-7">
                Call to order
              </MagneticButton>
            </Reveal>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={Math.min(i * 0.04, 0.24)}>
                <Row
                  q={faq.q}
                  a={faq.a}
                  index={i}
                  open={open === i}
                  onToggle={() => setOpen(open === i ? null : i)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
