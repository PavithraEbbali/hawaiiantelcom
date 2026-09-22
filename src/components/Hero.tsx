'use client';

import { useRef, useState, type FormEvent, type MouseEvent } from 'react';
import Image from 'next/image';
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import heroHome from '@/assets/images/hero-home.webp';
import MagneticButton from './MagneticButton';
import Marquee from './Marquee';
import GradientField from './GradientField';
import { hero, marqueeItems, site } from '@/lib/content';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Entrance choreography, mount-driven rather than scroll-driven. The hero sits
 * above the fold, so nothing in it may wait on an observer to become visible.
 */
function useStep(delay: number) {
  const reduced = useReducedMotion();
  if (reduced) return {};
  return {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  };
}

/**
 * Headline that resolves word by word.
 *
 * Words are NOT clipped by an overflow-hidden parent — that construction hides
 * the element outside the very box an observer measures, which is what left
 * every heading on this site permanently invisible once before. These animate
 * on mount, on transform and opacity only, and settle visible regardless.
 */
function WordReveal({
  text,
  className = '',
  delay = 0,
  gradient = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  gradient?: boolean;
}) {
  const reduced = useReducedMotion();
  const words = text.split(' ');

  // The gradient class goes on each WORD, never on the wrapper. A transformed
  // child establishes its own painting context, so a parent's
  // background-clip:text cannot clip to the child's glyphs — while
  // `color: transparent` still inherits straight down. Put those together and
  // the headline renders as nothing at all.
  const wordClass = gradient ? 'inline-block text-gradient-sweep' : 'inline-block';

  if (reduced) {
    return (
      <span className={`block ${className}`}>
        {gradient ? <span className="text-gradient-sweep">{text}</span> : text}
      </span>
    );
  }

  return (
    <span className={`block ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className={wordClass}
          initial={{ opacity: 0, y: 26, rotateX: -35 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.85, delay: delay + i * 0.07, ease: EASE }}
          style={{ transformOrigin: 'bottom center' }}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </span>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 20 20" className="h-[18px] w-[18px] shrink-0 text-ht-green" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.14" />
      <path
        d="M6 10.2l2.6 2.6L14 7.4"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon({ className = 'h-[17px] w-[17px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" aria-hidden>
      <path
        d="M4.2 3h2.6l1.3 3.3-1.6 1.2a9.4 9.4 0 004.9 4.9l1.2-1.6L16 12.2v2.6a1.9 1.9 0 01-2.1 1.9A13.3 13.3 0 013.3 5.1 1.9 1.9 0 014.2 3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ZipCheck() {
  const [zip, setZip] = useState('');
  const [state, setState] = useState<'idle' | 'error' | 'ready'>('idle');

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setState(/^\d{5}$/.test(zip.trim()) ? 'ready' : 'error');
  };

  return (
    <div className="w-full max-w-lg">
      <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <label htmlFor="zip" className="sr-only">
            Enter your ZIP code to check Fioptics availability
          </label>
          <svg
            viewBox="0 0 20 20"
            className="pointer-events-none absolute left-5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-ht-muted"
            fill="none"
            aria-hidden
          >
            <path
              d="M10 17.5s6-5 6-9.4A6 6 0 004 8.1c0 4.4 6 9.4 6 9.4z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <circle cx="10" cy="8" r="2.1" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          <input
            id="zip"
            name="zip"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            placeholder="Enter your ZIP code"
            value={zip}
            onChange={(e) => {
              setZip(e.target.value.replace(/\D/g, ''));
              if (state !== 'idle') setState('idle');
            }}
            aria-invalid={state === 'error'}
            aria-describedby="zip-help"
            className={`h-14 w-full rounded-full border-2 bg-white/90 pl-[3.25rem] pr-5 font-display text-base font-semibold text-ht-ink shadow-card backdrop-blur-sm transition-colors duration-300 placeholder:font-sans placeholder:font-normal placeholder:text-ht-muted focus:outline-none ${
              state === 'error' ? 'border-ht-red' : 'border-ht-border-light focus:border-ht-blue'
            }`}
          />
        </div>

        <MagneticButton type="submit" variant="primary" className="h-14 shrink-0 px-8">
          Check availability
        </MagneticButton>
      </form>

      <div id="zip-help" aria-live="polite" className="min-h-[1.5rem] pt-3">
        <AnimatePresence mode="wait">
          {state === 'error' && (
            <motion.p
              key="err"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm font-medium text-ht-red"
            >
              Please enter a valid 5-digit ZIP code.
            </motion.p>
          )}
          {state === 'ready' && (
            <motion.p
              key="ok"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-ht-gray"
            >
              Availability is confirmed per address.{' '}
              <a href={site.salesPhoneHref} className="font-semibold text-ht-blue underline underline-offset-4">
                Call to order
              </a>{' '}
              and we will verify {zip} against the live coverage map while you are on the line.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/** Floating statistic pinned to the photo frame. */
function StatChip({
  value,
  label,
  className,
  delay,
  float,
}: {
  value: string;
  label: string;
  className: string;
  delay: number;
  float: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, scale: 0.85, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.75, delay, ease: EASE }}
      className={`absolute z-20 hidden rounded-2xl border border-white/70 bg-white/90 px-5 py-3.5 shadow-card-lg backdrop-blur-md lg:block ${className} ${
        reduced ? '' : float
      }`}
    >
      <p className="font-display text-xl font-extrabold leading-none tracking-[-0.03em] text-ht-ink">{value}</p>
      <p className="mt-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ht-blue">{label}</p>
    </motion.div>
  );
}

/**
 * The promotion reads as a tag clipped to the photograph rather than a panel
 * parked beside it: an animated gradient rule down the leading edge, a live
 * indicator, the rate set large, and a sheen that passes across on a loop.
 */
function OfferTag() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 26, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.85, delay: 0.75, ease: EASE }}
      className="relative z-20 w-full max-w-[24rem] overflow-hidden rounded-3xl bg-white shadow-card-lg lg:absolute lg:-bottom-12 lg:-left-10 lg:w-[22.5rem]"
    >
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-[5px] animate-sweep"
        style={{
          backgroundImage: 'linear-gradient(180deg,#4294F7 0%,#22D3C5 35%,#3DC37F 65%,#4294F7 100%)',
          backgroundSize: '100% 200%',
        }}
      />
      {!reduced && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-ht-tint to-transparent opacity-60"
        />
      )}

      <div className="relative py-6 pl-7 pr-6">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-ht-green" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ht-green" />
          </span>
          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ht-gray">
            {hero.featuredPromo.label}
          </p>
        </div>

        <p className="mt-3 font-display text-[1.375rem] font-extrabold leading-[1.15] tracking-[-0.025em] text-ht-ink">
          {hero.featuredPromo.title}
        </p>

        <div className="mt-5 flex items-end justify-between gap-4 border-t border-ht-border-light pt-5">
          <div>
            <p className="font-display text-[0.8125rem] font-bold text-ht-ink">Fioptics 3 Gig</p>
            <p className="mt-0.5 text-[0.75rem] text-ht-muted">Symmetrical · 2-year term</p>
          </div>
          <p className="tabular flex items-start gap-0.5" aria-hidden>
            <span className="mt-[0.45em] font-display text-lg font-semibold text-ht-muted">$</span>
            <span className="font-display text-[2.75rem] font-extrabold leading-[0.8] tracking-[-0.045em] text-ht-ink">
              80
            </span>
            <span className="mt-[1.6em] text-xs font-medium text-ht-muted">/mo.</span>
          </p>
          <span className="sr-only">80 dollars per month</span>
        </div>

        <MagneticButton href={site.salesPhoneHref} variant="primary" className="mt-5 w-full py-3.5 text-sm">
          <PhoneIcon />
          Call to order
        </MagneticButton>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  /* Cursor-tracking spotlight. Skipped for reduced motion and coarse pointers. */
  const px = useMotionValue(50);
  const py = useMotionValue(40);
  const sx = useSpring(px, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 60, damping: 20, mass: 0.6 });
  const spotlight = useMotionTemplate`radial-gradient(38rem circle at ${sx}% ${sy}%, rgba(66,148,247,0.16), rgba(34,211,197,0.07) 42%, transparent 68%)`;

  const onMove = (event: MouseEvent<HTMLElement>) => {
    if (reduced || !sectionRef.current) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = sectionRef.current.getBoundingClientRect();
    px.set(((event.clientX - rect.left) / rect.width) * 100);
    py.set(((event.clientY - rect.top) / rect.height) * 100);
  };

  /* Parallax drift on the photo frame as the hero scrolls away. */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const frameY = useTransform(scrollYProgress, [0, 1], [0, 56]);

  return (
    <section
      ref={sectionRef}
      id="top"
      onMouseMove={onMove}
      className="relative overflow-hidden bg-white"
    >
      <GradientField variant="blue" intensity="bold" />
      {!reduced && (
        <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />
      )}

      <div className="shell relative grid items-center gap-16 py-14 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-20 lg:py-24">
        <div>
          <motion.div {...useStep(0)} className="flex items-center gap-2.5">
            <span className="h-px w-8 bg-ht-blue" aria-hidden />
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-ht-blue">
              Fioptics Fiber Internet
            </p>
          </motion.div>

          <h1 className="mt-6 text-display-xl font-extrabold text-ht-ink" style={{ perspective: 800 }}>
            <WordReveal text={hero.headline} delay={0.1} />
            <span className="relative mt-1 block">
              {/* Marker wipe behind the rate line — the single most important
                  phrase in the hero, so it carries the emphasis. */}
              <span
                aria-hidden
                className={`absolute -inset-x-2 bottom-1 top-2 -z-10 origin-left rounded-lg ${
                  reduced ? '' : 'animate-marker'
                }`}
                style={{
                  // Held at full strength for most of its length rather than
                  // fading out immediately, so the whole rate line sits on an
                  // even backing instead of trailing off into the colour field.
                  backgroundImage:
                    'linear-gradient(90deg,#EDF5FF 0%,#EDF5FF 68%,rgba(237,245,255,0) 100%)',
                  transform: reduced ? 'scaleX(1)' : undefined,
                }}
              />
              <WordReveal text={hero.headlineAccent} delay={0.34} gradient />
            </span>
          </h1>

          <motion.p {...useStep(0.6)} className="mt-7 max-w-xl text-lg leading-relaxed text-ht-slate">
            {hero.subhead}
          </motion.p>

          <motion.ul {...useStep(0.7)} className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
            {hero.promoFlags.map((flag) => (
              <li key={flag} className="flex items-center gap-2.5 text-[0.9375rem] font-semibold text-ht-ink">
                <Check />
                {flag}
              </li>
            ))}
          </motion.ul>

          <motion.div {...useStep(0.8)} className="mt-9">
            <ZipCheck />
          </motion.div>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.25, ease: EASE }}
          style={reduced ? undefined : { y: frameY }}
          className="relative lg:pb-16"
        >
          <div className="relative">
            {/* A soft, static glow bedded under the frame.
                The rotating conic border this replaces threw hard-edged wedges
                past the corners and read as a gimmick rather than a finish. A
                still, blurred brand glow is quieter and more expensive-looking,
                and it costs nothing to composite. */}
            <span
              aria-hidden
              className="absolute -inset-5 -z-10 rounded-[2.75rem] opacity-70 blur-2xl"
              style={{
                background:
                  'linear-gradient(135deg, rgba(66,148,247,0.45) 0%, rgba(34,211,197,0.30) 50%, rgba(125,97,179,0.30) 100%)',
              }}
            />

            <div className="relative overflow-hidden rounded-[2rem] shadow-card-lg">
              <Image
                src={heroHome}
                alt="A family at home in Hawaiʻi using a laptop and tablet on the sofa, with louvered windows and mountain ridges behind them."
                priority
                sizes="(min-width: 1024px) 596px, 100vw"
                placeholder="blur"
                className={`h-[clamp(17rem,44vw,32rem)] w-full object-cover object-[62%_center] ${
                  reduced ? '' : 'animate-drift-scale'
                }`}
              />
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-32 lg:h-40"
                style={{
                  backgroundImage: 'linear-gradient(to top, rgba(1,38,57,0.42) 0%, rgba(1,38,57,0) 100%)',
                }}
              />
            </div>
          </div>

          <StatChip value="3 Gbps" label="Up &amp; down" className="-right-3 top-6" delay={0.85} float="animate-float-y" />
          <StatChip
            value="99.99%"
            label="Reliability"
            className="-left-7 top-[30%]"
            delay={1}
            float="animate-float-y [animation-delay:-3s]"
          />

          <div className="mt-6 lg:mt-0">
            <OfferTag />
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      {!reduced && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          aria-hidden
          className="pointer-events-none absolute bottom-20 left-1/2 hidden -translate-x-1/2 lg:block"
        >
          <span className="flex h-9 w-6 items-start justify-center rounded-full border-2 border-ht-border pt-1.5">
            <span className="h-1.5 w-1 animate-cue rounded-full bg-ht-blue" />
          </span>
        </motion.div>
      )}

      <div className="relative bg-ht-blue">
        <Marquee items={marqueeItems} tone="blue" />
      </div>
    </section>
  );
}
