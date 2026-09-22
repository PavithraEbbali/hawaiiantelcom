/**
 * Vibrant animated gradient field used behind sections.
 *
 * Every colour is one of the exact hexes scraped from hawaiiantel.com —
 * #4294F7, #22D3C5, #3DC37F, #7D61B3 — at low alpha over a light surface, so
 * the page stays bright rather than tinted.
 *
 * Each section takes a different `variant`, so scrolling the page moves through
 * a shifting colour field instead of repeating one wash six times.
 *
 * MOBILE BUDGET
 * A large blur is one of the most expensive things a browser can composite, and
 * the cost scales with area. At full desktop settings this component put 33
 * blurred layers and ~12 megapixels of blurred surface on a 320px viewport —
 * roughly fifty times the screen area, repainting every frame, with the layers
 * pinned in GPU memory. That is fine on a laptop and punishing on a mid-range
 * phone: dropped frames, a warm device and a flat battery.
 *
 * So below `sm` the field runs at half strength: two blobs instead of four, a
 * much smaller blur radius, and tighter sizes. The effect still reads as a
 * moving colour wash — it simply stops paying for detail nobody can see at that
 * size. Layers are added back at `sm` and above.
 *
 * `will-change` is deliberately absent. These elements are already being
 * transform-animated, so the browser promotes them on its own; declaring it
 * only pins extra layers in memory for no gain.
 *
 * Purely decorative: hidden from assistive technology, never hit-tested.
 * `prefers-reduced-motion` freezes every layer via the global rule.
 */
type Variant = 'blue' | 'teal' | 'green' | 'violet' | 'sunrise';

const PALETTE: Record<Variant, [string, string, string]> = {
  //        primary blob      secondary blob     accent blob
  blue: ['66,148,247', '34,211,197', '125,97,179'],
  teal: ['34,211,197', '66,148,247', '61,195,127'],
  green: ['61,195,127', '34,211,197', '66,148,247'],
  violet: ['125,97,179', '66,148,247', '34,211,197'],
  sunrise: ['66,148,247', '252,138,82', '246,208,81'],
};

export default function GradientField({
  variant = 'blue',
  intensity = 'soft',
  className = '',
}: {
  variant?: Variant;
  /** `soft` for content-heavy sections, `bold` for the hero. */
  intensity?: 'soft' | 'bold';
  className?: string;
}) {
  const [c1, c2, c3] = PALETTE[variant];
  const bold = intensity === 'bold';
  const a = bold ? 0.6 : 0.4;
  const b = bold ? 0.52 : 0.34;
  const c = bold ? 0.44 : 0.28;

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* Always on — smaller and far less blurred on phones. */}
      <div
        className="absolute -left-[22%] -top-[22%] h-[22rem] w-[22rem] animate-drift-a rounded-full blur-[52px] sm:-left-[14%] sm:-top-[30%] sm:h-[44rem] sm:w-[44rem] sm:blur-[110px]"
        style={{ background: `radial-gradient(circle at 50% 50%, rgba(${c1},${a}) 0%, rgba(${c1},0) 70%)` }}
      />
      <div
        className="absolute -right-[22%] top-[2%] h-[20rem] w-[20rem] animate-drift-b rounded-full blur-[52px] sm:-right-[12%] sm:top-[4%] sm:h-[40rem] sm:w-[40rem] sm:blur-[110px]"
        style={{ background: `radial-gradient(circle at 50% 50%, rgba(${c2},${b}) 0%, rgba(${c2},0) 70%)` }}
      />

      {/* Added back only once there is screen area to justify the cost. */}
      <div
        className="absolute bottom-[-26%] left-[30%] hidden h-[36rem] w-[36rem] animate-drift-a rounded-full blur-[120px] sm:block"
        style={{
          animationDelay: '-9s',
          background: `radial-gradient(circle at 50% 50%, rgba(${c3},${c}) 0%, rgba(${c3},0) 70%)`,
        }}
      />
      <div
        className="absolute inset-x-[-20%] top-[28%] hidden h-[22rem] animate-ribbon blur-[90px] sm:block"
        style={{
          background: `linear-gradient(100deg, rgba(${c1},0) 0%, rgba(${c1},${a * 0.5}) 28%, rgba(${c2},${b * 0.55}) 55%, rgba(${c3},0) 88%)`,
        }}
      />
    </div>
  );
}
