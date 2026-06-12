import { useEffect, useMemo, useState } from "react";

function detect(): boolean {
    if (typeof window === "undefined") return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    if (window.innerWidth < 768) return false;
    type ConnectionNav = Navigator & { connection?: { saveData?: boolean } };
    if ((navigator as ConnectionNav).connection?.saveData) return false;
    if (new URLSearchParams(window.location.search).has("flat")) return false;
    try {
        if (localStorage.getItem("mode") === "flat") return false;
    } catch {
        /* storage blocked: ignore */
    }
    const canvas = document.createElement("canvas");
    // WebGL2-only: GPUs without it get the flat site rather than a bad time.
    return !!canvas.getContext("webgl2");
}

/**
 * Decides once whether this visit gets the 3D world. Flips to false at
 * runtime if reduced-motion is enabled mid-session; never flips to true
 * (no surprise scene loads).
 */
export function use3DCapable(): boolean {
    const initial = useMemo(detect, []);
    const [capable, setCapable] = useState(initial);

    useEffect(() => {
        if (!capable) return;
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const onChange = () => {
            if (mq.matches) setCapable(false);
        };
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, [capable]);

    return capable;
}

/** User-facing escape hatch, used by Terminal and CommandMenu. */
export function setSiteMode(mode: "3d" | "flat") {
    try {
        if (mode === "flat") localStorage.setItem("mode", "flat");
        else localStorage.removeItem("mode");
    } catch {
        /* storage blocked: reload still applies media/url factors */
    }
    window.location.reload();
}
