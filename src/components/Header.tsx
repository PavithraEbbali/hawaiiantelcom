'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MagneticButton from './MagneticButton';
import { navLinks, site } from '@/lib/content';

/** Retailer mark — concentric fiber rings in the brand gradient. */
function Logo({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const ink = tone === 'dark' ? 'text-ht-ink' : 'text-white';
  const sub = tone === 'dark' ? 'text-ht-gray' : 'text-white/60';
  return (
    <a href="#top" className="group flex items-center gap-3" aria-label={`${site.retailerName} — home`}>
      <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-2xl bg-ht-tint">
        <svg viewBox="0 0 44 44" className="h-11 w-11" fill="none" aria-hidden>
          <defs>
          </defs>
          <circle cx="22" cy="22" r="3.6" fill="#4294F7" />
          <path d="M14.6 29.4a10.5 10.5 0 010-14.8" stroke="#4294F7" strokeWidth="2.1" strokeLinecap="round" />
          <path d="M29.4 14.6a10.5 10.5 0 010 14.8" stroke="#4294F7" strokeWidth="2.1" strokeLinecap="round" />
          <path d="M9.6 34.4a17.5 17.5 0 010-24.8" stroke="#22D3C5" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M34.4 9.6a17.5 17.5 0 010 24.8" stroke="#22D3C5" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        {/* Held on one line: at 320px the wordmark otherwise breaks across two
            rows and the lockup stops reading as a mark. */}
        <span
          className={`whitespace-nowrap font-display text-[0.9375rem] font-extrabold tracking-[-0.025em] sm:text-[1.0625rem] ${ink}`}
        >
          {site.retailerName}
        </span>
        {/* The disclosure bar directly above already states the relationship in
            full, so dropping this line on the narrowest screens loses nothing. */}
        <span
          className={`mt-1 hidden whitespace-nowrap text-[0.6875rem] font-medium tracking-[0.02em] sm:block ${sub}`}
        >
          Authorized Retailer
        </span>
      </span>
    </a>
  );
}

function PhoneIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`h-[17px] w-[17px] ${className}`} fill="none" aria-hidden>
      <path
        d="M4.2 3h2.6l1.3 3.3-1.6 1.2a9.4 9.4 0 004.9 4.9l1.2-1.6L16 12.2v2.6a1.9 1.9 0 01-2.1 1.9A13.3 13.3 0 013.3 5.1 1.9 1.9 0 014.2 3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight whichever anchored section currently owns the viewport.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => Boolean(el));

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.6] },
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Lock the page behind the mobile sheet.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ease-lux ${
        scrolled
          ? 'border-b border-ht-border-light bg-white/95 shadow-card backdrop-blur-xl'
          : 'border-b border-ht-border-light bg-white'
      }`}
    >
      <div className="shell flex h-[4.75rem] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`relative whitespace-nowrap rounded-full px-3.5 py-2 text-[0.875rem] font-medium transition-colors duration-300 ${
                      isActive ? 'text-ht-blue-deep' : 'text-ht-slate hover:text-ht-ink'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-ht-tint"
                        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <MagneticButton
            href={site.salesPhoneHref}
            variant="primary"
            className="hidden whitespace-nowrap px-6 py-3 text-sm sm:inline-flex"
            ariaLabel={`Call ${site.salesPhone}`}
          >
            <PhoneIcon />
            Call {site.salesPhone}
          </MagneticButton>

          <a
            href={site.salesPhoneHref}
            className="grid h-11 w-11 place-items-center rounded-full bg-ht-blue text-white shadow-blue sm:hidden"
            aria-label={`Call ${site.salesPhone}`}
          >
            <PhoneIcon />
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-11 w-11 place-items-center rounded-full border border-ht-border text-ht-ink transition-colors hover:bg-ht-surface xl:hidden"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden>
              <path
                d={open ? 'M5 5l10 10M15 5L5 15' : 'M3 6h14M3 10h14M3 14h14'}
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-ht-border-light bg-white xl:hidden"
          >
            <ul className="shell flex flex-col gap-1 py-5">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-lg font-semibold text-ht-ink transition-colors hover:bg-ht-tint"
                  >
                    {link.label}
                    <svg viewBox="0 0 20 20" className="h-4 w-4 text-ht-blue" fill="none" aria-hidden>
                      <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </motion.li>
              ))}
              <li className="mt-3 px-1">
                <a
                  href={site.salesPhoneHref}
                  className="flex items-center justify-center gap-2.5 rounded-full bg-ht-blue px-6 py-4 font-display font-bold text-white shadow-blue"
                >
                  <PhoneIcon />
                  Call {site.salesPhone}
                </a>
                <p className="mt-3 text-center text-xs text-ht-gray">{site.hours}</p>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
