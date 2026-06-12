# Design

A riso-print poster site: three solid inks, oversized type, print-shop details. No WebGL, no scroll hijacking beyond Lenis smoothing; the craft is typographic.

## Color

Three inks used like silkscreen layers (OKLCH in `src/index.css`). Sections are solid color blocks; rhythm comes from flipping ink and paper.

| Token | Value | Use |
|---|---|---|
| `--blue` | `oklch(0.38 0.13 265)` | ultramarine, the site's body (hero, work, log) |
| `--blue-deep` | `oklch(0.30 0.12 265)` | footer, pressed states |
| `--paper` | `oklch(0.95 0.012 265)` | cool paper blocks (about, stack); text on blue |
| `--coral` | `oklch(0.70 0.19 38)` | signal coral: contact block, accents, hover inversion |
| `--ink` | `oklch(0.24 0.07 265)` | near-black blue, text on paper/coral |

Rules: coral text on blue only at large/bold sizes (3.5:1); body on blue is `--paper`/`--paper-dim`; body on paper/coral is `--ink`/`--ink-soft`. A faint SVG grain (`body::after`, 4.5%) is the print texture over everything.

## Typography

- **Bricolage Grotesque** (300–800, optical sizes): display and body. Lowercase display voice.
- **Martian Mono** (400/700): margin notes, spec sheets, meta — always small, uppercase, tracked (`.margin-note`).

Section headers are one giant outlined lowercase verb (`.section-word`: stroke = currentColor, fill transparent via `-webkit-text-fill-color`) with a mono margin note at the baseline: about / work / stack / log / hello.

## Signature elements

- **Press mark**: the 12-spoke asterisk (`PressMark.tsx`), spinning slowly next to the name and as the "sent" stamp. `✶` recurs in the ticker, logotype, captions.
- **Plated photo**: the portrait runs full color on an offset ultramarine plate with a mono caption; the plate, not a filter, carries the print feel.
- **Catalog rows**: projects are full-bleed index rows that invert to coral with ink text on hover. Cards are banned.
- **Spec sheets**: hairline-ruled key/value tables (`dt` mono coral, `dd` mono) in hero and about.
- **Ticker**: one marquee strip in the hero (`.marquee`), items separated by coral `✶`.
- **Ruled form**: contact inputs are bottom-border-only lines on the coral block, like a print form.

## Motion

Lenis smooth scroll. Hero content rises once on load (framer, reduced-motion aware). Everything else is CSS: marquee, slow spin, `.sweep-link` underline sweeps, row color inversion, arrow nudges. No scroll-triggered opacity gating; content is always visible by default. Eases: `cubic-bezier(0.22, 1, 0.36, 1)`.

## Layout

`.container-default` 80rem. Section padding `clamp(5rem, 10vw, 8.5rem)`. Surfaces alternate: blue (hero) → paper (about) → blue (work) → paper (stack) → blue (log) → coral (hello) → deep blue (footer). The fixed navbar uses `mix-blend-difference` so it stays legible over every block.

## Banned

WebGL/3D, terminal cosplay in the main UI, cards with icon+heading+text, glassmorphism, gradient text, cream/beige backgrounds, fake data. (See PRODUCT.md for the strategic principles.)
