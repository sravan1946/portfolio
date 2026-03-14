"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Building2 } from "lucide-react";
import { EXPERIENCES } from "@/lib/data";

function ExperienceCard({ experience, index }: { experience: typeof EXPERIENCES[0], index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: "-100px" });
    
    const isEven = index % 2 === 0;

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ 
                duration: 0.7, 
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="relative flex items-center"
        >
            {/* Timeline dot - positioned on the line */}
            <motion.div 
                className="absolute left-3 sm:left-5 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/10 bg-[var(--slate-950)] shadow z-10"
            >
                <motion.div 
                    className="w-3 h-3 bg-[var(--green-400)] rounded-full"
                    animate={{ 
                        boxShadow: [
                            "0 0 0px rgba(74,222,128,0.4)",
                            "0 0 10px rgba(74,222,128,0.6)",
                            "0 0 0px rgba(74,222,128,0.4)"
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>

            {/* Card - positioned left on even, right on odd */}
            <div className={`w-[calc(100%-3rem)] sm:w-[calc(100%-4rem)] ml-auto md:w-[calc(50%-3rem)] p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--green-400)]/30 transition-colors duration-300 ${isEven ? 'md:mr-auto md:ml-0 md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                {/* Content */}
                <div className="relative z-10">
                    <div className="flex flex-col gap-1 sm:gap-0 sm:flex-row justify-between sm:items-center mb-3">
                        <h3 className="font-semibold text-lg sm:text-xl text-white">
                            {experience.company}
                        </h3>
                        <span className="text-[10px] sm:text-xs font-[family-name:var(--font-jetbrains-mono)] text-[var(--green-400)] border border-[var(--green-400)]/20 px-2 py-0.5 sm:py-1 rounded bg-[var(--green-400)]/5 mt-1 sm:mt-0 self-start sm:self-auto">
                            {experience.period}
                        </span>
                    </div>
                    <motion.div 
                        className="text-[var(--slate-300)] font-medium mb-3 flex items-center gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: index * 0.15 + 0.2, duration: 0.5 }}
                    >
                        <Building2 size={14} className="text-[var(--slate-500)]" />
                        {experience.role}
                    </motion.div>
                    <motion.p 
                        className="text-[var(--slate-400)] text-sm leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
                    >
                        {experience.description}
                    </motion.p>
                </div>
            </div>
        </motion.div>
    );
}

export function Experience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <section id="experience" className="relative">
            <div className="container-default" ref={containerRef}>
                <div className="section-header section-header--centered">
                    <motion.span 
                        className="section-eyebrow"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <GraduationCap size={14} />
                        Experience
                    </motion.span>
                    <motion.h2 
                        className="section-title"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        My Learning Journey
                    </motion.h2>
                </div>

                {/* Timeline container */}
                <div className="relative">
                    {/* Timeline line - centered */}
                    <div className="absolute left-3 sm:left-5 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 z-0">
                        {/* Background line */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--slate-800)] to-transparent" />
                        
                        {/* Animated green line */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--green-400)] to-transparent origin-top"
                            initial={{ scaleY: 0 }}
                            animate={isInView ? { scaleY: 1 } : {}}
                            transition={{ duration: 2, ease: "easeOut" }}
                        />
                    </div>

                    {/* Cards container */}
                    <div className="space-y-8 sm:space-y-12 relative z-10">
                        {EXPERIENCES.map((experience, index) => (
                            <ExperienceCard 
                                key={experience.company + experience.period} 
                                experience={experience} 
                                index={index} 
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
