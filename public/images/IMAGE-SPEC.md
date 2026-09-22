# Site imagery

All seven images are live. Replace any file in place using the **same filename**
and it will be picked up automatically — the components import these paths
directly, so a missing or renamed file fails the build rather than shipping a
broken image.

| Filename | Where it appears | Rendered box (desktop) |
|----------|------------------|------------------------|
| `hero-home.webp` | Hero background, full-bleed behind the headline | ~1425 × 819 |
| `fiber-install.webp` | Fiber section, full-width band with an overlaid caption | ~1168 × 416 |
| `bundle-living-room.webp` | Bundles section, split panel (image left) | ~556 × 352 |
| `tv-fioptics.webp` | TV section, split panel (image right) | ~556 × 352 |
| `phone-kupuna.webp` | Home phone section, split panel (image left) | ~556 × 352 |
| `why-neighborhood.webp` | Why Hawaiian Telcom, full-width banner with caption | ~1168 × 384 |
| `og-share.jpg` | Social share card — metadata only, never rendered on the page | 1200 × 630 slot |

## How they are served

`next/image` with **static imports**, so intrinsic dimensions and a blur
placeholder are generated at build time. Every slot reserves its box before the
image arrives, so there is no layout shift. The hero carries `priority`
(it is the largest contentful paint); everything else lazy-loads.

Next caps generated variants at the source resolution and never upscales.

## Known limitations of the current set

1. **Visible AI watermark.** Each image carries Gemini's ✦ sparkle mark inset
   from the bottom-right corner. It is clearly visible on the hero. It has been
   left in place deliberately — it marks the image as AI-generated, and stripping
   it removes a provenance signal. To remove it properly, regenerate on a tier
   that does not apply the visible mark. Invisible SynthID watermarking remains
   either way.
2. **Source width is 1408px.** The hero renders ~1425 CSS px wide, so on a 2×
   display it is slightly soft. It sits behind a white scrim, which hides this
   well, but a higher-resolution regeneration would sharpen it.
3. **Third-party logo.** A laptop with a visible Apple mark appears in
   `hero-home.webp`. Incidental, but this site publishes a Trademarks policy —
   worth a look before launch.

## Replacing an image

Any aspect ratio works; each slot uses `object-cover` with a fixed height, so
the image is cropped to fit rather than distorted. Keep the subject away from
the edges. Convert to WebP (quality ~78) and keep files under ~220 KB.
