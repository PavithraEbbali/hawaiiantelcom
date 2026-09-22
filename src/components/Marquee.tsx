'use client';

/**
 * Infinite trust-marker ticker. The track holds two identical copies of the
 * list and translates a flat -50%, so the loop is seamless with no JS timer —
 * it runs entirely on the compositor.
 */
export default function Marquee({
  items,
  tone = 'blue',
}: {
  items: readonly string[];
  tone?: 'blue' | 'light';
}) {
  const blue = tone === 'blue';

  const Row = ({ ariaHidden }: { ariaHidden?: boolean }) => (
    <ul
      className="flex shrink-0 items-center gap-10 pr-10 sm:gap-14 sm:pr-14"
      aria-hidden={ariaHidden || undefined}
    >
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="flex shrink-0 items-center gap-10 sm:gap-14">
          <span
            className={`whitespace-nowrap font-display text-sm font-bold tracking-[-0.01em] sm:text-[0.9375rem] ${
              blue ? 'text-white' : 'text-ht-ink'
            }`}
          >
            {item}
          </span>
          <span
            aria-hidden
            className={`h-1.5 w-1.5 shrink-0 rotate-45 ${blue ? 'bg-white/50' : 'bg-ht-blue'}`}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="mask-fade-x relative flex overflow-hidden">
      <div className="flex min-w-full animate-marquee py-4">
        <Row />
        <Row ariaHidden />
      </div>
    </div>
  );
}
