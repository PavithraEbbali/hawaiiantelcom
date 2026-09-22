'use client';

import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { useRef, type ReactNode, type MouseEvent } from 'react';

type Variant = 'primary' | 'ghost' | 'light' | 'dark';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-ht-blue text-white shadow-blue hover:bg-ht-blue-deep',
  ghost: 'border-2 border-ht-blue bg-white text-ht-blue hover:bg-ht-tint',
  light: 'border-2 border-ht-border bg-white text-ht-ink hover:border-ht-blue hover:text-ht-blue',
  dark: 'bg-ht-navy text-white hover:bg-ht-ink',
};

/**
 * CTA with a magnetic hover pull. The wrapper tracks the cursor and springs
 * the button toward it; the inner label trails at a lower ratio for depth.
 * Pointer tracking is skipped for reduced-motion and coarse-pointer devices.
 */
export default function MagneticButton({
  children,
  href,
  variant = 'primary',
  className = '',
  strength = 0.34,
  onClick,
  ariaLabel,
  type = 'button',
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  strength?: number;
  onClick?: () => void;
  ariaLabel?: string;
  type?: 'button' | 'submit';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 220, damping: 18, mass: 0.35 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    'group relative inline-flex items-center justify-center gap-2.5 overflow-hidden whitespace-nowrap rounded-full px-7 py-4 text-[0.9375rem] font-semibold tracking-[-0.01em] transition-[background-color,border-color,color,box-shadow] duration-500 ease-lux';

  const inner = (
    <>
      <motion.span style={reduced ? undefined : { x: sx, y: sy }} className="relative z-10 flex items-center gap-2.5">
        {children}
      </motion.span>
    </>
  );

  const classes = `${base} ${VARIANTS[variant]} ${className}`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={reduced ? undefined : { x: sx, y: sy }}
      className="inline-flex lg:will-change-transform"
    >
      {href ? (
        <a href={href} className={classes} aria-label={ariaLabel}>
          {inner}
        </a>
      ) : (
        <button type={type} onClick={onClick} className={classes} aria-label={ariaLabel}>
          {inner}
        </button>
      )}
    </motion.div>
  );
}
