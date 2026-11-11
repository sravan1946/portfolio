# Design: dark and techy

Third look of 2026-11-11's rewrite. Blue-black page, one hot orange, chunky lowercase sans with mono notes, and things that move.

Retired directions: terminal, 3D world, riso poster (blue/coral), the `awwwards-rebuild` branch ("Stage", "Seed", "Cards on the table", "One ping away", "Build / break in three inks"), and "Type and nothing else" (white page, thin serif, mint/grey/orange: rejected for the font, the emptiness, the colours and being static).

## System

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0a0c0f` | the page |
| `--raise` | `#11151a` | ticker and about band |
| `--line` | `#242b34` | hairlines between rows and cells |
| `--ink` / `--muted` | `#e8ecf1` / `#8b96a5` | text / mono notes |
| `--hot` | `#ff5b2e` | the one accent: second name line, buttons, row hover, the whole contact block |

- **Geist** 800 with tight tracking for the name, section heads, project and tool names; 400/500 for text.
- **Geist Mono** for small notes, labels, nav and buttons, always lowercase.
- Square corners everywhere. Buttons are solid orange, outlined, or dark on the orange block.

## Composition

```
BAR      fixed: p1ng.me · work, about, stack, contact · cv button
HERO     pinging dot grid behind · status line · sravan / krishna (white / orange, fills the width)
         · "builds secure systems. breaks insecure ones." | download cv, ping me
TICKER   every tool, scrolling
STATS    #30 · 70+ · 2019, three ruled cells
WORK     seven ruled rows: number, name, line + meta, arrow. A row floods orange on hover.
ABOUT    raised band: lead sentence + two paragraphs | doing / studying log
STACK    21-part bill of materials (number, name, kind) in two columns; press a part and its hot take
         types out on a sticky ❯ prompt line. List taken from what shows up in daily work.
CONTACT  full orange block: "ping me" at full width · note, email, socials | form
FOOTER   one mono line
```

## Motion

- Hero canvas: a grid of dots; rings spread from random points every few seconds and from the pointer, lighting dots orange as they pass. Runs only while the hero is on screen.
- Hero text rises once on load; the status dot blinks; the ticker scrolls.
- Section parts rise as they scroll in (CSS scroll timelines, inline in `index.astro` because the minifier breaks them in the stylesheet). Content is visible without them.
- Hover: work rows flood orange and the name slides, stack parts light up and shift, buttons lift. Pressing a part types out its next hot take.
- `prefers-reduced-motion` turns all of it off and leaves the dot grid static.

## Banned

A photo of the owner, cards, screenshots or code in projects, WebGL and scroll hijacking, terminal cosplay (matrix rain, scanlines, phosphor green), thin serif display type, white or pastel pages, fake stats.
