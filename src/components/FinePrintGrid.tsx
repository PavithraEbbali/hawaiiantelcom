'use client';

import GradientField from './GradientField';
import Icon from './Icons';
import { Reveal, Heading, StaggerGrid, StaggerItem } from './motion-primitives';
import { finePrint, finePrintLede } from '@/lib/content';

const COLUMNS = [
  { key: 'fiber', label: 'Fiber Internet' },
  { key: 'tv', label: 'Fioptics+ TV' },
  { key: 'phone', label: 'Home Phone' },
] as const;

/**
 * Inclusions and fees laid out plainly. Renders as a true table on desktop for
 * scannability, and collapses into per-row cards on mobile so no column ever
 * gets squeezed into unreadable width.
 */
export default function FinePrintGrid() {
  return (
    <section id="fine-print" className="relative overflow-hidden bg-white">
      <GradientField variant="sunrise" />
      <div className="shell relative py-16 sm:py-20 lg:py-24">
        <div className="section-head">
          <p className="eyebrow">Plan inclusions &amp; fees</p>
          <Heading
            text="Complete disclosure of inclusions and applicable fees."
            accentFrom={3}
            className="text-display-lg font-extrabold"
          />
          <p className="text-lg leading-relaxed text-ht-slate">{finePrintLede}</p>
        </div>

        {/* Desktop table */}
        <Reveal delay={0.08} className="mt-12 hidden lg:block">
          <div className="overflow-hidden rounded-4xl border border-ht-border-light shadow-card">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Inclusions and fees by service line</caption>
              <thead>
                <tr className="bg-ht-navy">
                  <th scope="col" className="w-[22%] px-7 py-5 font-display text-sm font-bold text-white">
                    Detail
                  </th>
                  {COLUMNS.map((c) => (
                    <th key={c.key} scope="col" className="px-7 py-5 font-display text-sm font-bold text-white">
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {finePrint.map((row, i) => (
                  <tr
                    key={row.item}
                    className={`border-t border-ht-border-light transition-colors duration-300 hover:bg-ht-tint ${
                      i % 2 ? 'bg-ht-surface' : 'bg-white'
                    }`}
                  >
                    <th
                      scope="row"
                      className="px-7 py-5 align-top font-display text-[0.9375rem] font-bold text-ht-ink"
                    >
                      <span className="flex items-start gap-2.5">
                        <Icon name={row.icon} className="mt-[1px] h-[18px] w-[18px] shrink-0 text-ht-blue" />
                        {row.item}
                      </span>
                    </th>
                    {COLUMNS.map((c) => (
                      <td key={c.key} className="px-7 py-5 align-top text-[0.9375rem] leading-relaxed text-ht-slate">
                        {row[c.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Mobile / tablet cards */}
        <StaggerGrid className="mt-10 grid gap-5 sm:grid-cols-2 lg:hidden">
          {finePrint.map((row) => (
            <StaggerItem key={row.item}>
              <div className="card h-full p-6">
                <h3 className="flex items-center gap-2.5 font-display text-base font-bold text-ht-ink">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-ht-tint text-ht-blue">
                    <Icon name={row.icon} className="h-[18px] w-[18px]" />
                  </span>
                  {row.item}
                </h3>
                <dl className="mt-5 space-y-4">
                  {COLUMNS.map((c) => (
                    <div key={c.key}>
                      <dt className="text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-ht-blue">
                        {c.label}
                      </dt>
                      <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-ht-slate">{row[c.key]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
