import type { Config } from 'tailwindcss';

/**
 * EXACT Hawaiian Telcom palette, read from live computed styles on
 * hawaiiantel.com. No invented tints, no generated ramps — every value below
 * appears verbatim in their stylesheet. The site is light and vibrant, the way
 * theirs is: white surfaces, #4294F7 doing the heavy lifting, #101014 for type.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ht: {
          blue: '#4294F7', // primary CTA blue
          'blue-deep': '#005BB5', // hover / pressed
          'blue-navy': '#072B6F', // deep accent
          navy: '#012639', // dark bars, footer
          ink: '#101014', // headings + body ink
          slate: '#394758', // body copy on white
          gray: '#515156', // secondary copy
          muted: '#82939B', // captions, meta
          border: '#C6C6CA', // standard border
          'border-light': '#EBEBED', // hairline border
          tint: '#EDF5FF', // pale blue surface
          surface: '#F6F6FA', // alternating section surface
          teal: '#22D3C5',
          green: '#3DC37F',
          orange: '#FC8A52',
          gold: '#F6D051',
          pink: '#ED358E',
          red: '#EB3853',
          purple: '#7D61B3',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Gilroy', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['var(--font-display)', 'Gilroy', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 5.4vw, 4.5rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2rem, 3.9vw, 3.25rem)', { lineHeight: '1.06', letterSpacing: '-0.028em' }],
        'display-md': ['clamp(1.625rem, 2.9vw, 2.5rem)', { lineHeight: '1.12', letterSpacing: '-0.024em' }],
        'display-sm': ['clamp(1.25rem, 2vw, 1.75rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        eyebrow: ['0.75rem', { lineHeight: '1', letterSpacing: '0.16em' }],
      },
      maxWidth: { shell: '78rem' },
      borderRadius: { '4xl': '1.75rem', '5xl': '2.5rem' },
      boxShadow: {
        card: '0 1px 2px rgba(16,16,20,0.04), 0 10px 24px -14px rgba(16,16,20,0.16)',
        'card-lg': '0 2px 4px rgba(16,16,20,0.04), 0 26px 52px -22px rgba(16,16,20,0.22)',
        blue: '0 10px 28px -10px rgba(66,148,247,0.55)',
      },
      keyframes: {
        marquee: { from: { transform: 'translate3d(0,0,0)' }, to: { transform: 'translate3d(-50%,0,0)' } },
        // Transform only — NO opacity. A heading must be legible at every frame
        // of this animation, including frame zero. Browsers freeze animations in
        // a background tab, and any opacity-based entrance leaves the heading
        // invisible until the tab is focused; a 14px offset costs nothing.
        rise: {
          from: { transform: 'translate3d(0,14px,0)' },
          to: { transform: 'translate3d(0,0,0)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.6' },
          '70%': { transform: 'scale(1.3)', opacity: '0' },
          '100%': { transform: 'scale(1.3)', opacity: '0' },
        },
        /* Vibrant brand-gradient field. Blobs drift on transform only, so the
           whole effect stays on the compositor and never triggers layout. */
        'drift-a': {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '33%': { transform: 'translate3d(6%,-8%,0) scale(1.12)' },
          '66%': { transform: 'translate3d(-5%,6%,0) scale(0.94)' },
        },
        'drift-b': {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '33%': { transform: 'translate3d(-7%,5%,0) scale(0.92)' },
          '66%': { transform: 'translate3d(5%,-6%,0) scale(1.14)' },
        },
        /* Gradient sweeps — background-position only. */
        'sweep': {
          from: { backgroundPosition: '0% 50%' },
          to: { backgroundPosition: '200% 50%' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-120%) skewX(-18deg)' },
          '100%': { transform: 'translateX(320%) skewX(-18deg)' },
        },
        'float-y': {
          '0%,100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-9px,0)' },
        },
        /* Marker highlight that wipes in behind a phrase. */
        'marker': {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
        /* Gradient travelling through clipped text. */
        'text-sweep': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '300% 50%' },
        },
        /* Conic halo rotating behind the photo frame. */
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        /* Very slow scale drift on the photograph — a restrained Ken Burns. */
        'drift-scale': {
          '0%,100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.06)' },
        },
        /* Scroll cue. */
        'cue': {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '30%': { opacity: '1' },
          '100%': { transform: 'translateY(11px)', opacity: '0' },
        },
        /* Aurora ribbon sweeping across a section background. */
        'ribbon': {
          '0%,100%': { transform: 'translate3d(-8%,0,0) rotate(-6deg)', opacity: '0.55' },
          '50%': { transform: 'translate3d(8%,0,0) rotate(-2deg)', opacity: '0.9' },
        },
      },
      animation: {
        marquee: 'marquee 46s linear infinite',
        rise: 'rise 0.6s cubic-bezier(0.22,1,0.36,1) forwards',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.22,1,0.36,1) infinite',
        'drift-a': 'drift-a 22s ease-in-out infinite',
        'drift-b': 'drift-b 27s ease-in-out infinite',
        sweep: 'sweep 7s linear infinite',
        shimmer: 'shimmer 5.5s cubic-bezier(0.22,1,0.36,1) infinite',
        'float-y': 'float-y 6s ease-in-out infinite',
        marker: 'marker 0.75s cubic-bezier(0.22,1,0.36,1) 0.5s forwards',
        'text-sweep': 'text-sweep 9s linear infinite',
        'spin-slow': 'spin-slow 26s linear infinite',
        'drift-scale': 'drift-scale 24s ease-in-out infinite',
        cue: 'cue 2s cubic-bezier(0.22,1,0.36,1) infinite',
        ribbon: 'ribbon 19s ease-in-out infinite',
      },
      transitionTimingFunction: {
        lux: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
