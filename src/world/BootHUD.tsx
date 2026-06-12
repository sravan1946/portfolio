import { useEffect, useState } from "react";

const LINES = [
    "[ ok ] gpu: webgl2 context acquired",
    "[ ok ] world: 6 zones instanced",
    "[ ok ] camera: rail mapped to scroll",
    "[ ok ] compositor: scene ready",
];

/**
 * dmesg-style boot readout, bottom-left, while the world warms up.
 * Purely decorative (aria-hidden); the DOM site is interactive throughout.
 */
export function BootHUD({ ready }: { ready: boolean }) {
    const [shown, setShown] = useState(0);
    const [gone, setGone] = useState(false);

    useEffect(() => {
        if (shown >= LINES.length - 1) return; // last line waits for `ready`
        const t = setTimeout(() => setShown((n) => n + 1), 240);
        return () => clearTimeout(t);
    }, [shown]);

    useEffect(() => {
        if (!ready) return;
        setShown(LINES.length);
        const t = setTimeout(() => setGone(true), 1400);
        return () => clearTimeout(t);
    }, [ready]);

    if (gone) return null;

    return (
        <div
            aria-hidden="true"
            className="fixed bottom-6 left-6 z-30 select-none font-[family-name:var(--font-mono)] text-[11px] leading-relaxed transition-opacity duration-500"
            style={{ opacity: ready && shown >= LINES.length ? 0.6 : 1 }}
        >
            {LINES.slice(0, shown).map((line) => (
                <p key={line}>
                    <span className="text-[var(--accent)]">[ ok ]</span>
                    <span className="text-[var(--ink-faint)]">{line.slice(6)}</span>
                </p>
            ))}
        </div>
    );
}
