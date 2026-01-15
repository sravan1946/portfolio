"use client";

import { motion } from "framer-motion";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiPostgresql, SiWebassembly, SiRust } from "react-icons/si";

const stack = [
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" }, // In dark mode white might be better via class
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
    { name: "Rust", icon: SiRust, color: "#DEA584" },
    { name: "WebAssembly", icon: SiWebassembly, color: "#654FF0" },
];

export function TechStack() {
    return (
        <section id="stack" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Technologies</h2>
                    <p className="text-slate-400">The arsenal I use to conquer the digital realm.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stack.map((item, index) => (
                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)", borderColor: item.color }}
                            className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-4 group cursor-default transition-all"
                        >
                            <div
                                className="p-4 rounded-full bg-white/5 text-slate-300 group-hover:text-white transition-all duration-300"
                                style={{ color: item.name === "Next.js" ? "#fff" : undefined }}
                            >
                                <item.icon size={32} style={{ color: "inherit" }} className="group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                            </div>
                            <span
                                className="font-mono text-sm tracking-wider text-slate-400 group-hover:text-white transition-colors"
                                style={{ textShadow: `0 0 20px ${item.color}40` }}
                            >
                                {item.name}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
