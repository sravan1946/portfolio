"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { MouseEvent } from "react";
import { Cpu } from "lucide-react";
import { FULL_TECH_STACK } from "@/lib/data";

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

    // 3D Tilt Logic
    const rotateX = useSpring(0, { stiffness: 100, damping: 30 });
    const rotateY = useSpring(0, { stiffness: 100, damping: 30 });

    function onMouseMove3D({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const offsetX = clientX - centerX;
        const offsetY = clientY - centerY;

        rotateX.set((offsetY / height) * -20);
        rotateY.set((offsetX / width) * 20);

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
            className="group relative flex flex-col items-center justify-center p-2 md:p-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-colors duration-500 hover:border-white/20"
        >
            {/* Spotlight Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 rounded-xl z-0"
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
            <div className="relative z-10 flex flex-col items-center gap-2 md:gap-6">
                {/* Floating Icon */}
                <motion.div
                    animate={{
                        y: [0, -10, 0],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2,
                    }}
                    className="w-10 h-10 md:w-20 md:h-20 relative filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]"
                >
                    <img
                        src={item.url}
                        alt={item.name}
                        className="w-full h-full object-contain"
                    />
                </motion.div>

                <div className="text-center">
                    <h3 className="text-xs md:text-lg font-semibold text-[var(--slate-300)] group-hover:text-white transition-colors tracking-wide">
                        {item.name}
                    </h3>
                    <span className="text-[10px] md:text-xs font-[family-name:var(--font-jetbrains-mono)] text-[var(--cyan-400)]/0 group-hover:text-[var(--cyan-400)]/100 transition-all duration-500 uppercase tracking-widest mt-1 md:mt-2 block transform translate-y-2 group-hover:translate-y-0">
                        {item.category}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

export function TechStack() {
    return (
        <section id="stack" className="relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)] pointer-events-none" />

            <div className="container-default relative z-10">
                <div className="section-header section-header--centered">
                    <span className="section-eyebrow">
                        <Cpu size={14} />
                        Tools & Technologies
                    </span>
                    <h2 className="section-title">Tech Arsenal</h2>
                </div>

                <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-6">
                    {FULL_TECH_STACK.map((item, index) => (
                        <TechCard key={item.name} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
