/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Static HTML export.
   *
   * `next build` now emits a plain `out/` folder — real .html files plus the
   * CSS, JS and media they reference. It runs on any static host (Apache,
   * nginx, S3, Netlify, shared hosting) with no Node process behind it.
   *
   * Nothing about the site changes: the markup, styling, framer-motion
   * choreography, CSS gradient fields, glows and hover states are the same
   * code, simply pre-rendered instead of rendered on request. This works here
   * only because the site has no API routes, middleware or server actions, and
   * the one dynamic route (/legal/[slug]) supplies generateStaticParams.
   */
  output: 'export',

  /**
   * Directory-style URLs: /legal/privacy/index.html rather than
   * /legal/privacy.html. Static hosts serve that without rewrite rules, so the
   * export drops onto cheap hosting without a config file.
   */
  trailingSlash: true,

  /**
   * The Next image optimizer is a server feature and cannot run in an export,
   * so images are served exactly as they sit in public/images. That is fine
   * here: they were already re-encoded to WebP at 0.71 MB for the whole set,
   * and blur placeholders still work because they are inlined as base64 at
   * build time.
   */
  images: { unoptimized: true },

  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
