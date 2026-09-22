'use client';

import Image, { type StaticImageData } from 'next/image';
import PlanCard from './PlanCard';
import GradientField from './GradientField';
import { Reveal, Heading, ClipWipe } from './motion-primitives';
import type { PlanItem } from '@/lib/content';

export interface SectionMedia {
  src: StaticImageData;
  alt: string;
  /** `band` spans the full width; `split` sits beside supporting copy. */
  layout: 'band' | 'split';
  /** Which side the image takes in a split. Ignored for a band. */
  side?: 'left' | 'right';
  /** Overlaid on a band, or set beside the image in a split. */
  title?: string;
  body?: string;
}

/**
 * One service line — heading block, optional photography, and the plan grid.
 * Every service section renders through this component so the rhythm, spacing
 * and card treatment stay identical across fiber, bundles, TV and phone.
 */
export default function ServiceSection({
  id,
  eyebrow,
  title,
  accentFrom,
  intro,
  plans,
  tone = 'white',
  media,
  footnote,
  columns,
  gradient = 'blue',
}: {
  id: string;
  eyebrow: string;
  title: string;
  accentFrom?: number;
  intro: string;
  plans: PlanItem[];
  tone?: 'white' | 'surface' | 'tint';
  media?: SectionMedia;
  footnote?: string;
  columns?: 2 | 3 | 4;
  gradient?: 'blue' | 'teal' | 'green' | 'violet' | 'sunrise';
}) {
  const cols = columns ?? Math.min(plans.length, 4);

  const gridCols =
    cols === 2
      ? 'sm:grid-cols-2'
      : cols === 3
        ? 'sm:grid-cols-2 lg:grid-cols-3'
        : 'sm:grid-cols-2 xl:grid-cols-4';

  const surface =
    tone === 'surface' ? 'bg-ht-surface' : tone === 'tint' ? 'bg-ht-tint' : 'bg-white';

  return (
    <section id={id} className={`relative overflow-hidden ${surface}`}>
      <GradientField variant={gradient} />
      <div className="shell relative py-16 sm:py-20 lg:py-24">
        <div className="section-head">
          <p className="eyebrow">{eyebrow}</p>
          <Heading text={title} accentFrom={accentFrom} className="text-display-lg font-extrabold" />
          <p className="text-lg leading-relaxed text-ht-slate">{intro}</p>
        </div>

        {/* ------------------------------ Media ------------------------------ */}
        {media?.layout === 'band' && (
          <Reveal delay={0.06} className="mt-12">
            <figure className="relative overflow-hidden rounded-4xl shadow-card-lg">
              <Image
                src={media.src}
                alt={media.alt}
                sizes="(min-width: 1280px) 1216px, 100vw"
                placeholder="blur"
                className="h-[clamp(16rem,34vw,26rem)] w-full object-cover"
              />
              {(media.title || media.body) && (
                <figcaption
                  // Inline gradient rather than Tailwind stop utilities: an
                  // unrecognised opacity modifier on the `from-` stop leaves
                  // --tw-gradient-from undefined, which invalidates the whole
                  // var(--tw-gradient-stops) chain and silently drops the scrim
                  // to `none` — taking the caption's legibility with it.
                  style={{ backgroundImage: 'linear-gradient(to top, rgba(1,38,57,0.94) 0%, rgba(1,38,57,0.72) 38%, rgba(1,38,57,0.28) 70%, rgba(1,38,57,0) 100%)' }}
                  className="absolute inset-x-0 bottom-0 px-7 pb-8 pt-24 sm:px-10"
                >
                  {media.title && (
                    <p className="max-w-xl font-display text-xl font-extrabold leading-tight tracking-[-0.02em] text-white sm:text-2xl">
                      {media.title}
                    </p>
                  )}
                  {media.body && (
                    <p className="mt-2.5 max-w-xl text-[0.9375rem] leading-relaxed text-white/80">
                      {media.body}
                    </p>
                  )}
                </figcaption>
              )}
            </figure>
          </Reveal>
        )}

        {media?.layout === 'split' && (
          <Reveal delay={0.06} className="mt-12">
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <div
                className={`overflow-hidden rounded-4xl shadow-card-lg ${
                  media.side === 'right' ? 'lg:order-2' : ''
                }`}
              >
                <Image
                  src={media.src}
                  alt={media.alt}
                  sizes="(min-width: 1024px) 592px, 100vw"
                  placeholder="blur"
                  className="h-[clamp(14rem,30vw,22rem)] w-full object-cover"
                />
              </div>
              <div className={media.side === 'right' ? 'lg:order-1' : ''}>
                {media.title && (
                  <h3 className="font-display text-2xl font-extrabold leading-tight tracking-[-0.025em] text-ht-ink sm:text-3xl">
                    {media.title}
                  </h3>
                )}
                {media.body && (
                  <p className="mt-4 text-[1.0625rem] leading-relaxed text-ht-slate">{media.body}</p>
                )}
              </div>
            </div>
          </Reveal>
        )}

        <ClipWipe className={`mt-12 grid gap-6 ${gridCols}`}>
          {plans.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} index={i} />
          ))}
        </ClipWipe>

        {footnote && (
          <Reveal delay={0.08}>
            <p className="mt-9 max-w-4xl text-sm leading-relaxed text-ht-muted">{footnote}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
