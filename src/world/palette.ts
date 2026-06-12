// sRGB equivalents of the CSS OKLCH tokens in src/index.css.
// three.js can't parse oklch(); keep these in sync with the token file.
// Tier law (DESIGN.md): faint = ambient structure, muted = mid structure,
// accent = focal/active only (≤10% of visible line-pixels per frame).

export const WORLD = {
    bg: 0x0a0f0c,        // --bg          oklch(0.16 0.01 160)
    faint: 0x717e76,     // --ink-faint   oklch(0.58 0.02 160)
    muted: 0xa1afa6,     // --ink-muted   oklch(0.74 0.02 160)
    accent: 0x35f385,    // --accent      oklch(0.85 0.21 152)
    amber: 0xfab72a,     // --amber       oklch(0.82 0.16 80)
} as const;
