'use client';

import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { useIOBroken } from './useIOHealth';

/** Shared easing — matches the Lenis scroll curve. */
export const LUX_EASE = [0.22, 1, 0.36, 1] as const;

/**
 * True when reveal animations must not run: the visitor asked for reduced
 * motion, or IntersectionObserver is not delivering callbacks here. The
 * primitives then render plain elements instead of motion elements, so the
 * swap forces a clean remount with no stranded transform.
 */
function useStatic(): boolean {
  const reduced = useReducedMotion();
  const ioBroken = useIOBroken();
  return Boolean(reduced) || ioBroken;
}

/* -------------------------------------------------------------------------- */
/* Heading — entrance driven purely by CSS                                    */
/* -------------------------------------------------------------------------- */
/**
 * Section headings animate with the CSS `rise` keyframe rather than a
 * scroll-triggered transform, and this is deliberate.
 *
 * The previous implementation clipped each word in an `overflow-hidden` span
 * and pushed it down by 108% until it scrolled into view. IntersectionObserver
 * clips a target's intersection rect against its ancestors' overflow, so a word
 * parked entirely outside its own clipping parent reports isIntersecting:false
 * permanently — the reveal could never fire and every H2 on the site stayed
 * invisible in a perfectly healthy browser.
 *
 * A CSS animation with `animation-fill-mode: both` cannot fail that way: it
 * always settles on the final, visible frame, and reduced-motion simply
 * collapses the duration. Headings are the last thing that should ever be at
 * the mercy of an observer.
 */
export function Heading({
  text,
  className,
  accentFrom,
  as: Tag = 'h2',
}: {
  text: string;
  className?: string;
  /** Word index from which the blue accent takes over. */
  accentFrom?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p';
}) {
  const words = text.split(' ');
  const lead = accentFrom === undefined ? text : words.slice(0, accentFrom).join(' ');
  const accent = accentFrom === undefined ? '' : words.slice(accentFrom).join(' ');

  return (
    <Tag className={`animate-rise ${className ?? ''}`}>
      {lead}
      {accent && (
        <>
          {lead ? ' ' : ''}
          <span className="text-ht-blue">{accent}</span>
        </>
      )}
    </Tag>
  );
}

/** Backwards-compatible alias — same component, no word-clipping. */
export const TextReveal = Heading;

/* -------------------------------------------------------------------------- */
/* Reveal — a single element easing up as it enters the viewport              */
/* -------------------------------------------------------------------------- */
export function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const isStatic = useStatic();
  if (isStatic) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: LUX_EASE }}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Stagger — grid container + item pair for staggered entrances               */
/* -------------------------------------------------------------------------- */
const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: LUX_EASE } },
};

export function StaggerGrid({ children, className }: { children: ReactNode; className?: string }) {
  const isStatic = useStatic();
  if (isStatic) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const isStatic = useStatic();
  if (isStatic) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} variants={staggerChild}>
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Parallax — depth drift on background imagery, GPU-composited only          */
/* -------------------------------------------------------------------------- */
export function Parallax({
  children,
  distance = 60,
  className,
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduced ? undefined : { y }}>
        {children}
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* ClipWipe — clip-path wipe transition between major service sections        */
/* -------------------------------------------------------------------------- */
export function ClipWipe({
  children,
  className,
  from = 'bottom',
}: {
  children: ReactNode;
  className?: string;
  from?: 'bottom' | 'left';
}) {
  const isStatic = useStatic();
  if (isStatic) return <div className={className}>{children}</div>;

  const closed =
    from === 'bottom' ? 'inset(100% 0% 0% 0% round 1.75rem)' : 'inset(0% 100% 0% 0% round 1.75rem)';

  return (
    <motion.div
      className={className}
      initial={{ clipPath: closed, opacity: 0.5 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 1.75rem)', opacity: 1 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.9, ease: LUX_EASE }}
    >
      {children}
    </motion.div>
  );
}
