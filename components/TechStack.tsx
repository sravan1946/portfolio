"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { MouseEvent } from "react";

interface TechCardProps {
    item: {
        name: string;
        url: string;
        color: string;
        category: string;
    };
    index: number;
}

export function TechCard({ item, index }: TechCardProps) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function onMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        x.set(clientX - left);
        //y.set(clientY - top); // This line is missing in the original thought, adding it here.
        y.set(clientY - top);
    }

    // 3D Tilt Logic
    const rotateX = useSpring(0, { stiffness: 100, damping: 30 });
    const rotateY = useSpring(0, { stiffness: 100, damping: 30 });

    function onMouseMove3D({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const offsetX = clientX - centerX;
        const offsetY = clientY - centerY;

        rotateX.set((offsetY / height) * -20); // Max tilt 20deg
        rotateY.set((offsetX / width) * 20);

        // Also set spotlight position
        x.set(clientX - left);
        y.set(clientY - top);
    }

    function onMouseLeave() {
        rotateX.set(0);
        rotateY.set(0);
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            style={{
                perspective: 1000,
                rotateX,
                rotateY,
            }}
            onMouseMove={onMouseMove3D}
            onMouseLeave={onMouseLeave}
            className="group relative flex flex-col items-center justify-center p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-colors duration-500 hover:border-white/20"
        >
            {/* Spotlight Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 rounded-3xl z-0"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${item.color}15,
              transparent 80%
            )
          `,
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-6">
                {/* Floating Icon */}
                <motion.div
                    animate={{
                        y: [0, -10, 0],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2, // Stagger animations
                    }}
                    className="w-20 h-20 relative filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]"
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={item.url}
                        alt={item.name}
                        className="w-full h-full object-contain"
                    />
                </motion.div>

                <div className="text-center">
                    <h3 className="text-xl font-bold text-slate-300 group-hover:text-white transition-colors tracking-wide">
                        {item.name}
                    </h3>
                    <span className="text-xs font-mono text-cyan-400/0 group-hover:text-cyan-400/100 transition-all duration-500 uppercase tracking-widest mt-2 block transform translate-y-2 group-hover:translate-y-0">
                        {item.category}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

import { FULL_TECH_STACK } from "@/lib/data";

const stack = FULL_TECH_STACK;

export function TechStack() {
    return (
        <section id="stack" className="py-32 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="mb-24 text-center">

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-500 drop-shadow-2xl"
                    >
                        Tech Arsenal
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stack.map((item, index) => (
                        <TechCard key={item.name} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
