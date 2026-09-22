'use client';

import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { useRef, type MouseEvent } from 'react';
import PriceLockup from './PriceLockup';
import MagneticButton from './MagneticButton';
import { useIOBroken } from './useIOHealth';
import Icon, { type IconName } from './Icons';
import { ctaLabel, site, type PlanItem } from '@/lib/content';

/** Each service line gets its own mark, so the card is identifiable at a glance. */
const LINE_ICON: Record<PlanItem['serviceLine'], IconName> = {
  fiber: 'fiber',
  cable: 'fiber',
  bundle: 'bundle',
  tv: 'tv',
  mobile: 'wifi',
  phone: 'phone',
};

function formatSpeed(mbps: number) {
  return mbps >= 1000 ? `${mbps / 1000} Gbps` : `${mbps} Mbps`;
}

function Check() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="mt-[3px] h-[18px] w-[18px] shrink-0 text-ht-blue"
      fill="none"
      aria-hidden
    >
      <circle cx="10" cy="10" r="9" className="fill-ht-blue/10" />
      <path
        d="M6 10.2l2.6 2.6L14 7.4"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Pricing card with a 3D tilt that tracks the pointer. The tilt is driven by
 * springs on rotateX/rotateY, with the price block and badge lifted along the
 * Z axis so the card gains real depth rather than just skewing.
 */
export default function PlanCard({ plan, index = 0 }: { plan: PlanItem; index?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const ioBroken = useIOBroken();
  const noEntrance = Boolean(reduced) || ioBroken;

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 170, damping: 20, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [0, 1], [7.5, -7.5]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-9, 9]), spring);
  // Live template so the glare actually follows the cursor each frame.
  const glareX = useTransform(px, [0, 1], ['0%', '100%']);
  const glareY = useTransform(py, [0, 1], ['0%', '100%']);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX} ${glareY}, rgba(66,148,247,0.10), transparent 62%)`;

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  const popular = plan.isPopular;

  return (
    <div style={{ perspective: 1300 }} className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={reduced ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        // Changing the key remounts the card, so switching to the static
        // fallback cannot leave it stranded at a half-applied transform.
        key={noEntrance ? 'static' : 'animated'}
        initial={noEntrance ? false : { opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.72, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        className={`group relative flex h-full flex-col overflow-hidden rounded-4xl border p-7 transition-shadow duration-500 ease-lux sm:p-8 lg:will-change-transform ${
          popular
            ? 'border-ht-blue bg-white shadow-card-lg ring-1 ring-ht-blue'
            : 'border-ht-border-light bg-white shadow-card hover:shadow-card-lg'
        }`}
      >
        {/* Cursor-tracking glare */}
        {!reduced && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: glare }}
          />
        )}

        <div className="relative" style={reduced ? undefined : { transform: 'translateZ(34px)' }}>
          {/* The badge gets its own row, and the row is reserved on every card.
              Sitting beside the title it stole width from the one card that had
              it, wrapping that plan name onto two lines and knocking the whole
              row of titles out of alignment. */}
          <div className="mb-4 flex h-[26px] items-center justify-between gap-3">
            <span
              className={`grid h-[26px] w-[26px] place-items-center rounded-lg transition-colors duration-500 ease-lux ${
                popular ? 'bg-ht-blue text-white' : 'bg-ht-tint text-ht-blue group-hover:bg-ht-blue group-hover:text-white'
              }`}
            >
              <Icon name={LINE_ICON[plan.serviceLine]} className="h-4 w-4" />
            </span>
            {popular && (
              <span className="inline-flex rounded-full bg-ht-blue px-3 py-1.5 text-[0.6875rem] font-bold uppercase leading-none tracking-[0.12em] text-white">
                Most popular
              </span>
            )}
          </div>
          <h3 className="font-display text-xl font-bold tracking-[-0.02em] text-ht-ink">
            {plan.name}
          </h3>
          {/* "600 Mbps down · 600 Mbps up" was the one string long enough to wrap
              at a quarter-width card. Every Fioptics tier is symmetrical, so this
              says the same thing in a single line. */}
          {plan.speedDown && plan.speedUp && (
            <p className="mt-1.5 whitespace-nowrap text-sm font-semibold text-ht-blue-deep">
              {formatSpeed(plan.speedDown)} symmetrical
            </p>
          )}
        </div>

        <PriceLockup
          plan={plan}
          size="lg"
          className="relative mt-7"
        />

        <ul className="relative mt-7 flex-1 space-y-3.5 border-t border-ht-border-light pt-7">
          {plan.features.map((feature) => (
            <li key={feature} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ht-slate">
              <Check />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="relative mt-8 space-y-4" style={reduced ? undefined : { transform: 'translateZ(26px)' }}>
          <MagneticButton
            href={site.salesPhoneHref}
            variant={popular ? 'primary' : 'light'}
            className="w-full"
            ariaLabel={`${ctaLabel(plan)} — ${plan.name}`}
          >
            {ctaLabel(plan)}
          </MagneticButton>

          <dl className="space-y-1.5 text-xs leading-relaxed text-ht-gray">
            {plan.equipmentFee && (
              <div className="flex gap-1.5">
                <dt className="font-semibold text-ht-slate">Equipment:</dt>
                <dd>{plan.equipmentFee}</dd>
              </div>
            )}
            {plan.dataPolicy && (
              <div className="flex gap-1.5">
                <dt className="font-semibold text-ht-slate">Data:</dt>
                <dd>{plan.dataPolicy}</dd>
              </div>
            )}
            {plan.contractTerm && (
              <div className="flex gap-1.5">
                <dt className="font-semibold text-ht-slate">Term:</dt>
                <dd>{plan.contractTerm}</dd>
              </div>
            )}
          </dl>
        </div>
      </motion.div>
    </div>
  );
}
