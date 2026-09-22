'use client';

import { useEffect, useState } from 'react';

/**
 * Fail-safe for scroll-triggered reveals.
 *
 * Every reveal on this site starts hidden and animates in when it enters the
 * viewport. That is only safe if IntersectionObserver actually delivers
 * callbacks — if it does not (no IO support, or an embedded renderer that
 * starves the callback queue), the content would stay invisible forever.
 *
 * On first use we observe a throwaway 1px element. A healthy browser fires the
 * initial callback on the next frame. If nothing arrives within the grace
 * window we mark IO as broken, and every reveal renders in its visible state
 * with no animation.
 *
 * The probe deliberately waits for the document to become visible before it
 * starts judging. Browsers suspend requestAnimationFrame in a background tab,
 * and IntersectionObserver delivery rides the same frame pipeline — so a
 * hidden tab looks exactly like a broken one. Measuring there would disable
 * the animations permanently for a visitor who simply had the tab in the
 * background, which is worse than the problem being guarded against. Nothing
 * is being missed in the meantime: while the tab is hidden, nobody is looking.
 */
type Health = 'unknown' | 'ok' | 'broken';

let health: Health = 'unknown';
let started = false;
const waiters = new Set<(value: Health) => void>();
const GRACE_MS = 1200;

function settle(value: Health) {
  if (health !== 'unknown') return;
  health = value;
  waiters.forEach((notify) => notify(value));
  waiters.clear();
}

function probe() {
  if (typeof IntersectionObserver === 'undefined') {
    settle('broken');
    return;
  }

  const target = document.createElement('div');
  target.setAttribute('aria-hidden', 'true');
  target.style.cssText =
    'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none';
  document.body.appendChild(target);

  let finished = false;
  const cleanup = () => {
    finished = true;
    observer.disconnect();
    target.remove();
  };

  const observer = new IntersectionObserver(() => {
    if (finished) return;
    cleanup();
    settle('ok');
  });
  observer.observe(target);

  window.setTimeout(() => {
    if (finished) return;
    cleanup();
    // Re-check visibility: the tab may have been backgrounded mid-probe, which
    // would starve the callback for reasons that say nothing about IO support.
    if (document.visibilityState !== 'visible') {
      started = false; // let the next visible moment try again
      return;
    }
    settle('broken');
  }, GRACE_MS);
}

function startProbe() {
  if (started || health !== 'unknown') return;

  if (document.visibilityState !== 'visible') {
    // Try again once the page is actually on screen.
    const onVisible = () => {
      if (document.visibilityState !== 'visible') return;
      document.removeEventListener('visibilitychange', onVisible);
      startProbe();
    };
    document.addEventListener('visibilitychange', onVisible);
    return;
  }

  started = true;
  probe();
}

/** True once we know IntersectionObserver will not drive the reveals here. */
export function useIOBroken(): boolean {
  const [broken, setBroken] = useState(false);

  useEffect(() => {
    startProbe();

    if (health === 'ok') return;
    if (health === 'broken') {
      setBroken(true);
      return;
    }

    const notify = (value: Health) => {
      if (value === 'broken') setBroken(true);
    };
    waiters.add(notify);
    return () => {
      waiters.delete(notify);
    };
  }, []);

  return broken;
}
