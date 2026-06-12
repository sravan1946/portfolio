import { useEffect, useState } from "react";
import { SECTION_IDS } from "./cameraPath";

/**
 * Normalized scroll progress (0..1) at which each section's center crosses
 * the viewport center. Re-measured on resize; drives the scroll→curve remap.
 */
export function useSectionCenters(): number[] | null {
    const [centers, setCenters] = useState<number[] | null>(null);

    useEffect(() => {
        let frame = 0;

        const measure = () => {
            const doc = document.documentElement;
            const scrollable = doc.scrollHeight - window.innerHeight;
            if (scrollable <= 0) return;
            const result: number[] = [];
            for (const id of SECTION_IDS) {
                const el = id === "hero"
                    ? document.querySelector<HTMLElement>("#main-content section")
                    : document.getElementById(id);
                if (!el) return; // sections not mounted yet; retry below
                const rect = el.getBoundingClientRect();
                const top = rect.top + window.scrollY;
                const center = (top + rect.height / 2 - window.innerHeight / 2) / scrollable;
                result.push(Math.min(1, Math.max(0, center)));
            }
            // Guarantee strict monotonicity for the remap.
            for (let i = 1; i < result.length; i++) {
                if (result[i] <= result[i - 1]) result[i] = result[i - 1] + 0.001;
            }
            setCenters(result);
        };

        const schedule = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(measure);
        };

        schedule();
        const ro = new ResizeObserver(schedule);
        const main = document.getElementById("main-content");
        if (main) ro.observe(main);
        window.addEventListener("resize", schedule);

        return () => {
            cancelAnimationFrame(frame);
            ro.disconnect();
            window.removeEventListener("resize", schedule);
        };
    }, []);

    return centers;
}
