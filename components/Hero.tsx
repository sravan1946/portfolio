"use client";

import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import { PERSONAL_DATA } from "@/lib/data";
import { HackerText } from "./HackerText";
import { MagneticButton } from "./MagneticButton";
// import { SiCplusplus, SiPython, SiKalilinux, SiFlutter, SiDocker } from "react-icons/si";

import { FULL_TECH_STACK } from "@/lib/data";

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background enhancement */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)] pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Role Badge */}
                    <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-400 tracking-widest uppercase mb-8 backdrop-blur-md">
                        <Terminal size={12} />
                        {PERSONAL_DATA.role}
                    </span>

                    {/* Main Headline */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 mb-8 py-2">
                        {PERSONAL_DATA.name.split(" ")[0]} <br className="md:hidden" />
                        <span className="hidden md:inline"> </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 relative glitch-text">
                            <HackerText text="Krishna" />
                            <motion.span
                                className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-xl -z-10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 1 }}
                            />
                        </span>
                    </h1>

                    {/* Bio / Description */}
                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Computer Science Student specializing in <span className="text-cyan-300 font-medium">Cybersecurity</span>.
                        Engineering secure systems and exploring the depths of digital defense.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <MagneticButton>
                            <motion.a
                                href="#projects"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-cyan-50 transition-colors flex items-center gap-2"
                            >
                                View My Work
                                <ArrowRight size={18} />
                            </motion.a>
                        </MagneticButton>

                        <MagneticButton>
                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-medium hover:bg-white/10 transition-colors backdrop-blur-md"
                                data-cursor="email"
                            >
                                Contact Me
                            </motion.a>
                        </MagneticButton>
                    </div>

                    {/* Tech Ticker / Skills Mini-View */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className="flex justify-center items-center gap-8 md:gap-12 flex-wrap opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
                    >
                        {/* Tech Stack Icons with Full Color on Hover */}
                        {FULL_TECH_STACK.filter(t => ["Python", "Flutter", "Docker", "Arch Linux", "Burp Suite"].includes(t.name)).map((tech) => (
                            <div key={tech.name} className="relative group cursor-pointer">
                                <img
                                    src={tech.url}
                                    alt={tech.name}
                                    className="w-8 h-8 md:w-10 md:h-10 object-contain opacity-60 grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                                    title={tech.name}
                                />
                            </div>
                        ))}
                    </motion.div>

                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="w-6 h-10 rounded-full border border-white/20 flex justify-center pt-2">
                    <div className="w-1 h-2 bg-cyan-400 rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}

