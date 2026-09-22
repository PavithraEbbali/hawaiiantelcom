import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import DisclosureBar from '@/components/DisclosureBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getLegalDoc, legalDocs } from '@/lib/legal';
import { legalPages, site } from '@/lib/content';

export function generateStaticParams() {
  return legalDocs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) return { title: 'Not found' };
  return {
    title: doc.title,
    description: doc.summary,
    robots: { index: true, follow: true },
  };
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) notFound();

  return (
    <>
      <DisclosureBar />
      <Header />

      <main id="main">
        {/* Masthead */}
        <section className="relative bg-ht-navy">
          <div className="shell py-14 sm:py-16 lg:py-20">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm text-white/50">
                <li>
                  <Link href="/" className="transition-colors hover:text-ht-blue">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="text-white/80">{doc.title}</li>
              </ol>
            </nav>
            <h1 className="mt-6 max-w-3xl text-display-lg font-extrabold text-white">{doc.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">{doc.summary}</p>
          </div>
        </section>

        {/* Body + policy index */}
        <section className="bg-white">
          <div className="shell grid gap-12 py-16 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16 lg:py-20">
            <article className="max-w-3xl">
              {doc.sections.map((section) => (
                <div key={section.heading} className="mb-12 last:mb-0">
                  <h2 className="font-display text-xl font-bold tracking-[-0.02em] text-ht-ink sm:text-2xl">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {section.body.map((paragraph, i) => (
                      <p key={i} className="text-[1.0625rem] leading-relaxed text-ht-slate">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}

              <div className="mt-14 rounded-3xl border border-ht-border-light bg-ht-surface p-7">
                <p className="text-[0.9375rem] leading-relaxed text-ht-slate">
                  Questions about this policy? Call{' '}
                  <a
                    href={site.salesPhoneHref}
                    className="font-semibold text-ht-blue-deep underline underline-offset-4"
                  >
                    {site.salesPhone}
                  </a>
                  .
                </p>
              </div>
            </article>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-ht-muted">
                All policies
              </h2>
              <ul className="mt-5 space-y-1">
                {legalPages.map((page) => {
                  const isCurrent = page.href === `/legal/${doc.slug}`;
                  return (
                    <li key={page.href}>
                      <Link
                        href={page.href}
                        aria-current={isCurrent ? 'page' : undefined}
                        className={`block rounded-xl px-4 py-2.5 text-[0.9375rem] transition-colors duration-300 ${
                          isCurrent
                            ? 'bg-ht-tint font-semibold text-ht-blue-deep'
                            : 'text-ht-slate hover:bg-ht-surface hover:text-ht-ink'
                        }`}
                      >
                        {page.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
