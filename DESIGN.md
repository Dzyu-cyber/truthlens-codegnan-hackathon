---
name: TruthLens
colors:
  surface: '#0c160e'
  surface-dim: '#0c160e'
  surface-bright: '#323c32'
  surface-container-lowest: '#071009'
  surface-container-low: '#141e16'
  surface-container: '#18221a'
  surface-container-high: '#222c24'
  surface-container-highest: '#2d372e'
  on-surface: '#dae6d8'
  on-surface-variant: '#b9cbb9'
  inverse-surface: '#dae6d8'
  inverse-on-surface: '#29332a'
  outline: '#849585'
  outline-variant: '#3b4b3d'
  surface-tint: '#00e479'
  primary: '#f1ffef'
  on-primary: '#003919'
  primary-container: '#00ff88'
  on-primary-container: '#007139'
  inverse-primary: '#006d37'
  secondary: '#b3c8eb'
  on-secondary: '#1c314d'
  secondary-container: '#364a67'
  on-secondary-container: '#a5b9dc'
  tertiary: '#fffaf7'
  on-tertiary: '#3d2f00'
  tertiary-container: '#ffdb79'
  on-tertiary-container: '#795f01'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#60ff99'
  primary-fixed-dim: '#00e479'
  on-primary-fixed: '#00210c'
  on-primary-fixed-variant: '#005228'
  secondary-fixed: '#d4e3ff'
  secondary-fixed-dim: '#b3c8eb'
  on-secondary-fixed: '#041c37'
  on-secondary-fixed-variant: '#344865'
  tertiary-fixed: '#ffe08d'
  tertiary-fixed-dim: '#e5c364'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#584400'
  background: '#0c160e'
  on-background: '#dae6d8'
  surface-variant: '#2d372e'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.08em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
  container-max: 1440px
---

## Brand & Style
The design system for this fact-checking dashboard merges the high-density, data-driven intensity of a Bloomberg Terminal with the vibrant, immersive aesthetic of modern Indian OTT platforms. The brand personality is authoritative, surgical, and urgent. 

The visual style is **Cyber-Professional Glassmorphism**. It utilizes a deep-space color palette punctuated by neon "truth-state" indicators. Backgrounds feature subtle technical patterns (grids and dots) to evoke a sense of digital scanning and forensic analysis. Components utilize translucent layers and frosted glass effects to maintain depth without sacrificing the density required for a real-time information dashboard. The emotional response should be one of absolute clarity amidst a chaos of information.

## Colors
This system uses a tiered dark-mode architecture. The foundation is a "near-black" midnight blue (#0a0a0f), providing maximum contrast for functional colors. 

- **Functional Signaling:** Color is used strictly for semantic meaning. **Electric Green** indicates verified truth, **Vivid Red** marks disinformation, and **Amber** warns of misleading contexts.
- **Accents:** **Steel Blue** is used for neutral data points and secondary interactions, ensuring the UI doesn't feel overly aggressive when information is unverified.
- **Surface & Borders:** Layers are defined by hex #111118 with subtle #1e1e2e borders to maintain a structured, grid-like feel common in financial terminals.

## Typography
Inter is used exclusively for its high legibility in dense data environments and its neutral, systematic character. 

- **Headlines:** Use tighter letter spacing and heavier weights to create an editorial, "breaking news" feel.
- **Labels:** Utilize uppercase and increased letter spacing for technical metadata (e.g., timestamps, source reliability scores).
- **Body:** Standardized for maximum readability in multi-paragraph debunking articles.
- **Mobile:** Scale large headlines down to maintain a compact, "feed" feel on smaller devices.

## Layout & Spacing
The layout follows a **Fixed-Fluid Hybrid Grid**. On desktop, a 12-column grid is used with fixed margins to mimic a command center. 

- **Rhythm:** An 8px base unit drives all spacing, but 4px increments are allowed for tight data-dense components (terminal rows).
- **Density:** Information density should be high. Use 16px gutters to ensure clear separation between disparate data modules.
- **Pattern:** Use a subtle 24px dot-matrix background pattern aligned to the grid to reinforce the "forensic" aesthetic.

## Elevation & Depth
Depth is created through **Luminance and Blurs** rather than traditional drop shadows.

- **Background:** Primary background is #0a0a0f.
- **Surfaces:** Floating cards use #111118 with a `backdrop-filter: blur(12px)` and 10% opacity white borders.
- **Glows:** High-importance elements (like a "Breaking" fact-check) use a 20px outer glow tinted with the functional color (e.g., #00ff88 for verified items).
- **Interactions:** Hover states should slightly increase the surface luminance or the intensity of the border-glow, creating a "tactile light" response.

## Shapes
The shape language balances modern app softness with technical precision.

- **Cards/Modules:** 12px border radius provides a modern, premium feel.
- **Chips/Status Tags:** 8px border radius distinguishes metadata from structural containers.
- **Buttons:** Match the card radius (12px) for a unified look.
- **Input Fields:** 8px radius with a subtle 1px inner stroke.

## Components
- **Fact-Check Cards:** Feature a left-hand "Truth Bar" (a 4px vertical line) colored by status. The background should be a subtle glassmorphic surface.
- **Gauge Sweeps:** For "Reliability Scores," use circular gauges with a glowing sweep animation that fills from 0 to the current score upon page load.
- **Status Chips:** Small, high-contrast badges with 8px radius. Use semi-transparent backgrounds of the status color with 100% opacity text.
- **Terminal Inputs:** Search and filter bars should use monospaced text for the cursor and a "scanning" animation pulse on focus.
- **Action Buttons:** Primary buttons use a solid fill of the functional color with dark text; secondary buttons use a ghost style with a tinted border.
- **Live Feed List:** Rows should have a staggered fade-in animation (20ms delay per row) to create a sense of real-time data streaming.