"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { PERSONAL_DATA } from "@/lib/data";
import { Card3D } from "./Card3D";

export function About() {
    return (
        <section id="about" className="py-24 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                    <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                        <Card3D />
                    </div>

                    {/* Content Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">About Me</h2>
                        <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
                            <p>
                                I'm a Computer Science student with a passion for <span className="text-cyan-400">building</span> and <span className="text-purple-400">breaking</span> things.
                            </p>
                            <p>
                                I spend most of my time coding. I love automating tasks with <span className="text-slate-200 font-medium">Python</span>, building apps with <span className="text-slate-200 font-medium">Flutter</span>, and deep-diving into <span className="text-slate-200 font-medium">DevOps</span>.
                            </p>
                            <p>
                                When I'm away from the keyboard, I'm usually tinkering with hardware. You'll find me messing with <span className="text-cyan-400">Arduinos</span>, wiring up sensors, or taking apart laptops to see how they tick. I'm a builder at heart, exploring <span className="text-purple-400">security</span> and tech one project at a time.
                            </p>


                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
