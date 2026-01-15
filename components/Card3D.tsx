"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import React from "react";

export function Card3D() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        x.set(clientX - left - width / 2);
        y.set(clientY - top - height / 2);
    }

    const rotateX = useTransform(mouseY, [-200, 200], [5, -5]);
    const rotateY = useTransform(mouseX, [-200, 200], [-5, 5]);
    const imageX = useTransform(mouseX, [-200, 200], [-25, 25]);
    const imageY = useTransform(mouseY, [-200, 200], [-25, 25]);

    // Background moves less to create depth/distance
    const bgX = useTransform(mouseX, [-200, 200], [-10, 10]);
    const bgY = useTransform(mouseY, [-200, 200], [-10, 10]);

    return (
        <motion.div
            style={{ perspective: 1000 }}
            className="relative w-72 h-72 md:w-[420px] md:h-[500px]"
            onMouseMove={onMouseMove}
            onMouseLeave={() => {
                x.set(0);
                y.set(0);
            }}
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative w-full h-full rounded-2xl bg-black/50 border border-white/10 backdrop-blur-sm shadow-2xl overflow-hidden group"
            >
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/20 to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                {/* Layer 1: Background (Slower movement) */}
                <motion.div
                    style={{ x: bgX, y: bgY, scale: 1.1 }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src="/profile-background.png"
                        alt="Background"
                        fill
                        className="object-cover"
                    />
                </motion.div>

                {/* Layer 2: Subject (Faster movement = Pop effect) */}
                <motion.div
                    style={{ x: imageX, y: imageY, scale: 1.1 }}
                    className="absolute inset-0 z-10"
                >
                    <Image
                        src="/profile-foreground.png"
                        alt="Sravan"
                        fill
                        className="object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 grayscale-[0.7] group-hover:grayscale-0"
                    />
                </motion.div>

                {/* Grid Overlay (keep this as it is static and nice) */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_4px,6px_100%] pointer-events-none" />

            </motion.div>
        </motion.div>
    );
}
