import type { PlanItem } from '@/lib/content';

/**
 * The one price typography lockup used everywhere on the site.
 *
 * Layout: a raised dollar sign, a large tabular integer (2.5rem–3.5rem via the
 * `size` prop), muted cents raised to the same baseline as the dollar sign, and
 * the qualifier underneath. Plans with no listed price fall back to a
 * "Custom pricing" treatment that keeps the vertical rhythm identical so cards
 * in the same row never jump.
 */
export default function PriceLockup({
  plan,
  size = 'lg',
  tone = 'light',
  className = '',
}: {
  plan: PlanItem;
  size?: 'md' | 'lg';
  tone?: 'light' | 'dark';
  className?: string;
}) {
  const dark = tone === 'dark';

  // 2.5rem at md, 3.5rem at lg — per the lockup spec.
  const integerSize = size === 'lg' ? 'text-[3.5rem]' : 'text-[2.5rem]';
  const affixSize = size === 'lg' ? 'text-2xl' : 'text-xl';

  const integerTone = dark ? 'text-white' : 'text-ht-ink';
  const affixTone = dark ? 'text-white/60' : 'text-ht-muted';
  const qualifierTone = dark ? 'text-white/60' : 'text-ht-gray';

  if (typeof plan.price !== 'number') {
    return (
      <div className={className}>
        <div className="flex items-end gap-2">
          <span
            className={`font-display font-extrabold leading-[0.85] tracking-[-0.04em] ${integerSize} ${integerTone}`}
          >
            Custom
          </span>
        </div>
        <p className={`mt-3 text-sm leading-snug ${qualifierTone}`}>
          {plan.promoQualifier ?? 'Priced to your household'}
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Digits are split for typography, so hide them from assistive tech and
          expose one clean spoken string instead. */}
      <div className="flex items-start gap-1 tabular" aria-hidden>
        <span
          className={`mt-[0.55em] font-display font-semibold leading-none ${affixSize} ${affixTone}`}
          aria-hidden
        >
          $
        </span>
        <span
          className={`font-display font-extrabold leading-[0.85] tracking-[-0.045em] ${integerSize} ${integerTone}`}
        >
          {plan.price}
        </span>
        {plan.cents && (
          <span
            className={`mt-[0.55em] font-display font-semibold leading-none ${affixSize} ${affixTone}`}
          >
            {plan.cents}
          </span>
        )}
      </div>
      <span className="sr-only">
        {`$${plan.price}.${plan.cents ?? '00'} ${plan.promoQualifier ?? 'per month'}`}
      </span>
      {plan.promoQualifier && (
        <p aria-hidden className={`mt-3 text-sm leading-snug ${qualifierTone}`}>
          {plan.promoQualifier}
        </p>
      )}
    </div>
  );
}
