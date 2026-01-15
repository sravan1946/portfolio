"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function GlobalSpotlight() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400, mass: 0.5 });
    const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400, mass: 0.5 });

    useEffect(() => {
        function onMouseMove({ clientX, clientY }: MouseEvent) {
            mouseX.set(clientX);
            mouseY.set(clientY);
        }

        window.addEventListener("mousemove", onMouseMove);
        return () => window.removeEventListener("mousemove", onMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500"
            style={{
                background: useMotionTemplate`
                    radial-gradient(
                        600px circle at ${smoothX}px ${smoothY}px,
                        rgba(34, 211, 238, 0.04),
                        transparent 80%
                    )
                `,
            }}
        />
    );
}
