import type { SVGProps } from 'react';

/**
 * The site's single icon set.
 *
 * Every glyph is drawn on the same 24×24 grid at 1.7 stroke with round caps and
 * joins, and inherits `currentColor` — so an icon picks up whatever colour its
 * container sets and never needs a fill override. Keeping them in one file is
 * the point: the feature grid previously carried its own private copy, which is
 * how two icon styles drift apart on the same page.
 *
 * Icons here are decorative. Each one is rendered inside an element that
 * already carries the meaning in text, so they are hidden from assistive
 * technology rather than given labels that would be read out twice.
 */
export type IconName =
  // service lines
  | 'fiber'
  | 'bundle'
  | 'tv'
  | 'phone'
  // feature grid
  | 'shield'
  | 'sync'
  | 'price'
  | 'island'
  | 'wifi'
  // plan inclusions & fees
  | 'data'
  | 'activation'
  | 'equipment'
  | 'billing'
  | 'term'
  | 'speed'
  | 'availability';

const PATHS: Record<IconName, React.ReactNode> = {
  /* ------------------------------ service lines ----------------------------- */
  fiber: (
    <>
      <path d="M3 12h4M17 12h4" />
      <circle cx="12" cy="12" r="3" />
      <path d="M7 12a5 5 0 015-5M17 12a5 5 0 01-5 5" />
    </>
  ),
  bundle: (
    <>
      <path d="M12 3l8 4.2-8 4.2-8-4.2L12 3z" />
      <path d="M4 12.2l8 4.2 8-4.2" />
      <path d="M4 16.6l8 4.2 8-4.2" />
    </>
  ),
  tv: (
    <>
      <rect x="3" y="5" width="18" height="12" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  phone: (
    <path d="M5 3h3l1.6 4-2 1.5a11 11 0 005.9 5.9l1.5-2 4 1.6v3a2 2 0 01-2.2 2A15.6 15.6 0 013 5.2 2 2 0 015 3z" />
  ),

  /* ------------------------------ feature grid ------------------------------ */
  shield: (
    <>
      <path d="M12 3l7 3v5.5c0 4.2-2.9 8-7 9.5-4.1-1.5-7-5.3-7-9.5V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  sync: <path d="M4 9h12l-3-3M20 15H8l3 3" />,
  price: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M14.5 9.2a2.8 2.8 0 00-2.5-1.2c-1.5 0-2.6.8-2.6 2s1 1.7 2.6 2 2.7.8 2.7 2-1.1 2-2.7 2a2.9 2.9 0 01-2.6-1.3M12 6.4v11.2" />
    </>
  ),
  island: (
    <>
      <path d="M3 19c2-1.4 3.5-1.4 5.5 0 2-1.4 3.5-1.4 5.5 0 2-1.4 3.5-1.4 5.5 0" />
      <path d="M12 15V8M12 8c0-2 1.6-3.4 3.6-3.2M12 8c0-1.8-1.5-3-3.4-2.8" />
    </>
  ),
  wifi: (
    <>
      <path d="M4.5 9.5a11 11 0 0115 0M7.5 13a7 7 0 019 0" />
      <circle cx="12" cy="17" r="1.25" fill="currentColor" stroke="none" />
    </>
  ),

  /* -------------------------- inclusions & fees ----------------------------- */
  // Unlimited data — a lemniscate.
  data: (
    <path d="M9.2 12c0 1.7-1.2 3-2.8 3s-2.9-1.3-2.9-3 1.3-3 2.9-3c2.8 0 3.8 6 6.6 6 1.6 0 2.9-1.3 2.9-3s-1.3-3-2.9-3c-1.4 0-2.5 1-2.8 2.3" />
  ),
  activation: <path d="M13 3L5.5 13H11l-1 8 8-10.5h-5.5L13 3z" />,
  // Router with signal arcs.
  equipment: (
    <>
      <rect x="3" y="14" width="18" height="6" rx="1.8" />
      <path d="M7 17h.01M10.5 17h3.5" />
      <path d="M8.5 10.2a5 5 0 017 0M6 7.6a8.6 8.6 0 0112 0" />
    </>
  ),
  billing: (
    <>
      <path d="M6 3h9l4 4v12.5a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 015 19.5v-15A1.5 1.5 0 016.5 3z" />
      <path d="M14.5 3v4.5H19M8.5 13h7M8.5 16.5h4.5" />
    </>
  ),
  term: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  // Gauge with a needle.
  speed: (
    <>
      <path d="M4 17a8.5 8.5 0 1116 0" />
      <path d="M12 17l4-4.5" />
      <circle cx="12" cy="17" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  availability: (
    <>
      <path d="M12 21s7-5.8 7-11a7 7 0 10-14 0c0 5.2 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
};

export default function Icon({
  name,
  className = 'h-6 w-6',
  ...rest
}: { name: IconName; className?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      {...rest}
    >
      {PATHS[name]}
    </svg>
  );
}
