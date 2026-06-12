# Design

Terminal-native portfolio. The voice is "quiet competence": one signature effect (text decode), honest content, man-page structure. Decoration that imitates a terminal is banned; the working in-page terminal and command menu are the proof instead.

## Color

OKLCH throughout, defined in `src/index.css`. Phosphor green on green-tinted near-black.

| Token | Value | Use |
|---|---|---|
| `--bg` | `oklch(0.16 0.01 160)` | page background |
| `--surface` | `oklch(0.19 0.012 160)` | panels, cards |
| `--ink` | `oklch(0.94 0.012 160)` | headings, emphasized text |
| `--ink-muted` | `oklch(0.74 0.02 160)` | body copy (≥8:1 on bg) |
| `--ink-faint` | `oklch(0.58 0.02 160)` | metadata, small mono labels |
| `--accent` | `oklch(0.85 0.21 152)` | phosphor green: links, keys, status |
| `--accent-ink` | `oklch(0.2 0.03 152)` | text on accent buttons |
| `--amber` / `--red` | warm signals | git hashes, errors only |

Legacy aliases (`--green-400`, `--slate-*`, `--font-jetbrains-mono`) remap to these tokens so Terminal.tsx and CommandMenu.tsx work unchanged.

## Typography

Two families, hard cap:

- **Martian Mono** (400/500/700/800): display (hero name, section heads), all labels, metadata, terminal UI. Structure and data are mono.
- **Archivo** (400/500/600): paragraphs and descriptions. Prose is sans.

Hero name: lowercase, weight 800, `clamp(2.6rem, 9vw, 5.25rem)`, tracking -0.03em. Section heads: uppercase mono 700 with a green `## ` prefix (man-page system) and a right-aligned mono meta on a hairline rule (`.section-head` / `.section-meta`).

## Signature motion

One effect: **text decode** (`DecodeText.tsx`) — characters resolve left to right. Used for the hero boot sequence (`$ whoami` types, name decodes) and on hero-name hover. Nothing else scramble-animates.

Rules:
- Reveals are state-driven CSS (`revealStyle` in Hero), never rAF-gated visibility; content must land even when animation frames don't run.
- No scroll-triggered opacity gating on sections; content is visible by default.
- Everything respects `prefers-reduced-motion` (global kill switch in index.css + `useReducedMotion` checks).
- Ease: `cubic-bezier(0.22, 1, 0.36, 1)`, 150–500ms.

## Components & patterns

- **Radii**: 3/6/10px (`--radius-sm/md/lg`). No pills.
- **Buttons**: `.btn-solid` (green bg, dark text, mono lowercase, verb + object) and `.btn-outline`.
- **Mono links**: `.mono-link` renders `[label]`; brackets light up on hover.
- **Hairlines over cards**: projects are border-separated rows with a year gutter, not card grids.
- **Panels** (neofetch, contact form): 1px `--line-strong` border, `--surface` bg, mono header strip. No macOS traffic lights.
- **z-scale**: `--z-nav` 40 → `--z-toast` 70. No arbitrary z-indexes.

## Banned

Matrix rain, scanlines, noise overlays, glitch animation, custom cursors, magnetic buttons, glassmorphism, gradient text, fake data (star counts, npm commands, version numbers, "secure connection" theater).
