"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

export function SmoothScrolling({ children }: { children: ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Expose lenis instance to window for other components if needed, 
        // though using a context or event listener is cleaner implementation,
        // for this scale, direct access or just letting it run is fine.
        // Ideally we might want a Context if we need to access `lenis` instance elsewhere.
        // For now, let's keep it simple as a setup wrapper.
        // We can also attach it to the window object to be accessible.
        // @ts-expect-error - Adding lenis to window
        window.lenis = lenis;

        return () => {
            lenis.destroy();
            // @ts-expect-error - Removing lenis from window
            delete window.lenis;
        };
    }, []);

    return <>{children}</>;
}
