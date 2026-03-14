"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PERSONAL_DATA } from "@/lib/data";
import { HackerText } from "./HackerText";
import { MagneticButton } from "./MagneticButton";
import { FULL_TECH_STACK } from "@/lib/data";

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Grid */}
            <div className="absolute inset-0 grid-pattern pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Main Headline */}
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 mb-4 sm:mb-8 py-2 leading-[1.1]">
                        {PERSONAL_DATA.name.split(" ")[0]} <br className="md:hidden" />
                        <span className="hidden md:inline"> </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--green-400)] to-[var(--green-400)] relative">
                            <HackerText text="Krishna" />
                            <motion.span
                                className="absolute -inset-1 bg-gradient-to-r from-green-500/10 to-green-500/10 blur-xl -z-10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 1 }}
                            />
                        </span>
                    </h1>

                    {/* Bio / Description */}
                    <p className="text-base sm:text-lg md:text-xl text-[var(--slate-400)] max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2 sm:px-0">
                        Computer Science Student specializing in <span className="text-[var(--green-400)] font-medium">Cybersecurity</span>.
                        Engineering secure systems and exploring the depths of digital defense.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-16 w-full px-4 sm:px-0">
                        <div className="w-full sm:w-auto flex justify-center">
                            <MagneticButton>
                                <motion.a
                                    href="#projects"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 w-full sm:w-auto min-w-[200px] bg-[var(--green-400)] text-black rounded-full font-medium hover:bg-[var(--green-500)] transition-colors flex items-center justify-center gap-2"
                                >
                                    View My Work
                                    <ArrowRight size={18} />
                                </motion.a>
                            </MagneticButton>
                        </div>

                        <div className="w-full sm:w-auto flex justify-center mt-2 sm:mt-0">
                            <MagneticButton>
                                <motion.a
                                    href="#contact"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 w-full sm:w-auto min-w-[200px] bg-white/5 border border-white/10 text-white rounded-full font-medium hover:bg-white/10 transition-colors backdrop-blur-md flex items-center justify-center"
                                    data-cursor="email"
                                >
                                    Contact Me
                                </motion.a>
                            </MagneticButton>
                        </div>
                    </div>

                    {/* Tech Ticker / Skills Mini-View */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className="flex justify-center items-center gap-4 sm:gap-6 md:gap-8 flex-wrap opacity-40 grayscale hover:grayscale-0 transition-all duration-500"
                    >
                        {/* Tech Stack Icons with Full Color on Hover */}
                        {FULL_TECH_STACK.filter(t => ["Python", "Flutter", "Docker", "Arch Linux", "Burp Suite"].includes(t.name)).map((tech) => (
                            <div key={tech.name} className="relative group cursor-pointer">
                                <img
                                    src={tech.url}
                                    alt={tech.name}
                                    width={40}
                                    height={40}
                                    loading="lazy"
                                    className="w-6 h-6 md:w-8 md:h-8 object-contain opacity-60 grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                                    title={tech.name}
                                />
                            </div>
                        ))}
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
}
