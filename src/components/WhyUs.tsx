'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import whyNeighborhood from '../../public/images/why-neighborhood.webp';
import GradientField from './GradientField';
import Icon from './Icons';
import { Heading, Reveal, StaggerGrid, StaggerItem } from './motion-primitives';
import { features, whyLede } from '@/lib/content';

/** The three figures worth leading with, pulled from the feature set. */
const HEADLINE_METRICS = [
  { value: '3 Gbps', label: 'Symmetrical peak speed' },
  { value: '99.99%', label: 'Network reliability' },
  { value: '1883', label: 'Established in Hawaiʻi' },
] as const;

export default function WhyUs() {
  const reduced = useReducedMotion();

  return (
    <section id="why" className="relative overflow-hidden bg-white">
      <GradientField variant="teal" />

      <div className="shell relative py-16 sm:py-20 lg:py-24">
        <div className="section-head">
          <p className="eyebrow">Why Hawaiian Telcom</p>
          <Heading
            text="Infrastructure engineered for the Hawaiian Islands."
            accentFrom={3}
            className="text-display-lg font-extrabold"
          />
          <p className="text-lg leading-relaxed text-ht-slate">{whyLede}</p>
        </div>

        {/* ------------------------- Headline metrics ------------------------- */}
        <Reveal delay={0.05} className="mt-12">
          <div className="relative overflow-hidden rounded-4xl bg-ht-navy px-8 py-10 sm:px-12">
            {/* Brand-gradient wash inside the panel */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  'radial-gradient(60% 120% at 10% 0%, rgba(66,148,247,0.55) 0%, rgba(66,148,247,0) 60%), radial-gradient(50% 120% at 85% 100%, rgba(34,211,197,0.42) 0%, rgba(34,211,197,0) 60%)',
              }}
            />
            <dl className="relative grid gap-9 sm:grid-cols-3 sm:gap-6">
              {HEADLINE_METRICS.map((m, i) => (
                <motion.div
                  key={m.value}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="sm:border-l sm:border-white/15 sm:pl-6 sm:first:border-l-0 sm:first:pl-0"
                >
                  <dt className="sr-only">{m.label}</dt>
                  <dd>
                    <p className="font-display text-[clamp(2.25rem,4vw,3rem)] font-extrabold leading-none tracking-[-0.04em] text-white">
                      {m.value}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-white/70">{m.label}</p>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </Reveal>

        {/* ---------------------------- Feature grid --------------------------- */}
        <StaggerGrid className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <StaggerItem key={feature.id} className="h-full">
              <article className="group relative h-full overflow-hidden rounded-4xl border border-ht-border-light bg-white p-7 transition-shadow duration-500 ease-lux hover:shadow-card-lg">
                {/* Gradient rule that draws across the top edge on hover */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 ease-lux group-hover:scale-x-100"
                  style={{ backgroundImage: 'linear-gradient(90deg,#4294F7 0%,#22D3C5 55%,#3DC37F 100%)' }}
                />
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ht-tint text-ht-blue transition-colors duration-500 ease-lux group-hover:bg-ht-blue group-hover:text-white">
                    <Icon name={feature.icon} />
                  </span>
                  {feature.metric && (
                    <span className="font-display text-base font-extrabold tracking-[-0.02em] text-ht-muted transition-colors duration-500 group-hover:text-ht-blue">
                      {feature.metric}
                    </span>
                  )}
                </div>
                <h3 className="mt-6 font-display text-lg font-bold leading-snug tracking-[-0.02em] text-ht-ink">
                  {feature.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ht-slate">{feature.body}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGrid>

        {/* ------------------------------- Banner ------------------------------ */}
        <Reveal delay={0.06} className="mt-6">
          <figure className="relative overflow-hidden rounded-4xl shadow-card-lg">
            <Image
              src={whyNeighborhood}
              alt="A residential street of plantation-style homes in late afternoon light, with steep green mountain ridges rising behind them."
              sizes="(min-width: 1280px) 1216px, 100vw"
              placeholder="blur"
              className="h-[clamp(15rem,30vw,24rem)] w-full object-cover"
            />
            <figcaption
              style={{
                backgroundImage:
                  'linear-gradient(to top, rgba(1,38,57,0.94) 0%, rgba(1,38,57,0.72) 38%, rgba(1,38,57,0.28) 70%, rgba(1,38,57,0) 100%)',
              }}
              className="absolute inset-x-0 bottom-0 px-7 pb-8 pt-24 sm:px-10"
            >
              <p className="max-w-xl font-display text-xl font-extrabold leading-tight tracking-[-0.02em] text-white sm:text-2xl">
                Expanding across the islands, address by address.
              </p>
              <p className="mt-2.5 max-w-xl text-[0.9375rem] leading-relaxed text-white/80">
                The fiber build progresses neighborhood by neighborhood, which is why
                availability is confirmed against your specific service address rather
                than by ZIP code alone.
              </p>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
