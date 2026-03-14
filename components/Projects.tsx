"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, Terminal } from "lucide-react";
import React, { useState } from "react";
import { PROJECTS } from "@/lib/data";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ProjectStatsCard = ({ project, hovered }: { project: typeof PROJECTS[0]; hovered: boolean }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{
                opacity: hovered ? 1 : 0,
                x: hovered ? 0 : 20,
                scale: hovered ? 1 : 0.9,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-50 hidden md:block w-[300px]"
        >
            <div className="glass-card p-5 shadow-[0_0_30px_rgba(74,222,128,0.1)] relative group/card">
                {/* Header */}
                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
                    <div className="flex gap-2 items-center">
                        <Terminal className="w-4 h-4 text-[var(--green-400)]" />
                        <span className="text-xs font-[family-name:var(--font-jetbrains-mono)] text-[var(--green-400)] font-bold tracking-widest">COMMAND CENTER</span>
                    </div>
                    <span className="text-[10px] font-[family-name:var(--font-jetbrains-mono)] text-[var(--slate-500)] border border-white/10 px-1.5 py-0.5 rounded">
                        {project.year}
                    </span>
                </div>

                {/* Tech Cloud */}
                <div className="mb-5">
                    <span className="text-[10px] uppercase text-[var(--slate-500)] font-[family-name:var(--font-jetbrains-mono)] mb-2 block tracking-wider">Technologies</span>
                    <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                            <span key={t} className="text-[11px] px-2 py-1 rounded-sm bg-[var(--green-400)]/10 text-[var(--green-400)] border border-[var(--green-400)]/20 font-[family-name:var(--font-jetbrains-mono)]">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <Link
                        href={project.url}
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-[var(--green-400)]/20 border border-white/10 hover:border-[var(--green-400)]/50 text-[var(--slate-300)] hover:text-white py-2 rounded-lg transition-all duration-300 group/btn"
                    >
                        <Github className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                        <span className="text-xs font-semibold uppercase tracking-wider">Code</span>
                    </Link>

                    {project.demoUrl && (
                        <Link
                            href={project.demoUrl}
                            target="_blank"
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 flex items-center justify-center gap-2 bg-[var(--green-400)]/10 hover:bg-[var(--green-400)]/20 border border-[var(--green-400)]/20 hover:border-[var(--green-400)]/50 text-[var(--green-400)] hover:text-white py-2 rounded-lg transition-all duration-300 group/btn"
                        >
                            <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                            <span className="text-xs font-semibold uppercase tracking-wider">Demo</span>
                        </Link>
                    )}
                </div>

                {/* Decorative corners */}
                <div className="absolute -top-px -left-px w-3 h-3 border-t border-l border-[var(--green-400)]" />
                <div className="absolute -bottom-px -right-px w-3 h-3 border-b border-r border-[var(--green-400)]" />
            </div>
        </motion.div>
    );
};

const ProjectItem = ({
    project,
    index,
    hoveredIndex,
    setHoveredIndex,
    expandedIndex,
    setExpandedIndex,
}: {
    project: typeof PROJECTS[0];
    index: number;
    hoveredIndex: number | null;
    setHoveredIndex: (index: number | null) => void;
    expandedIndex: number | null;
    setExpandedIndex: (index: number | null) => void;
}) => {
    const isHovered = hoveredIndex === index;
    const isExpanded = expandedIndex === index;
    const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

    return (
        <Link
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
        >
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => setHoveredIndex(index)}
                onBlur={() => setHoveredIndex(null)}
                data-cursor="project"
                className={cn(
                    "group relative border-b border-white/5 py-8 md:py-12 transition-all duration-500 cursor-none",
                    isDimmed ? "md:opacity-30 md:blur-[1px]" : "opacity-100"
                )}
            >
                {/* Hover Background Gradient */}
                <div
                    className={cn(
                        "absolute inset-0 bg-gradient-to-r from-[var(--green-400)]/5 to-transparent opacity-0 transition-opacity duration-500",
                        isHovered && "opacity-100"
                    )}
                />

                {/* Holographic Stats Card - Fixed Right Position */}
                <ProjectStatsCard project={project} hovered={isHovered || isExpanded} />

                    <div className="container-default relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start md:items-center">
                        {/* Index & Title - Left Aligned */}
                        <div className="md:col-span-5 flex items-center gap-4 md:gap-8">
                            <span className="font-[family-name:var(--font-jetbrains-mono)] text-sm md:text-base text-[var(--slate-500)] group-hover:text-[var(--green-400)] transition-colors w-8">
                                0{index + 1}
                            </span>
                            <h3
                                className={cn(
                                    "text-3xl md:text-5xl font-black uppercase tracking-tighter transition-all duration-300",
                                    isHovered ? "text-white translate-x-2" : "text-[var(--slate-400)]"
                                )}
                            >
                                {project.title}
                            </h3>
                        </div>

                        {/* Category Column - Fixed Width */}
                        <div className="md:col-span-3 flex flex-col gap-1 md:text-right">
                            <span className="text-[10px] font-[family-name:var(--font-jetbrains-mono)] uppercase tracking-widest text-[var(--slate-500)]">
                                Category
                            </span>
                            <span className="text-sm md:text-base font-medium text-[var(--slate-300)] group-hover:text-[var(--green-400)] transition-colors">
                                {project.category}
                            </span>
                        </div>

                        {/* Tech Stack Column - Fixed Width */}
                        <div className="md:col-span-4 flex flex-col gap-1 md:text-right">
                            <span className="text-[10px] font-[family-name:var(--font-jetbrains-mono)] uppercase tracking-widest text-[var(--slate-500)]">
                                Tech Stack
                            </span>
                            <div className="flex gap-2 text-sm text-[var(--slate-400)] md:justify-end">
                                {project.tech.slice(0, 2).join(" / ")}
                                {project.tech.length > 2 && "..."}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Project Description - Always visible on mobile */}
                <div className="md:hidden pt-2 pb-4">
                    <p className="text-[var(--slate-400)] text-sm leading-relaxed">
                        {project.description}
                    </p>
                    <div className="mt-3 flex gap-2 flex-wrap">
                        {project.tech.map(t => (
                            <span key={t} className="text-[10px] px-2 py-1 rounded bg-white/5 text-[var(--slate-300)] border border-white/10">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Expanded Content (Desktop Only - Hover) */}
                <motion.div
                    initial={false}
                    animate={{
                        height: (isHovered || isExpanded) ? "auto" : 0,
                        opacity: (isHovered || isExpanded) ? 1 : 0
                    }}
                    className="overflow-hidden relative z-10 hidden md:block"
                >
                    <div className="pt-4 md:pt-6 container-default">
                        <p className="max-w-xl text-[var(--slate-400)] text-sm md:text-base leading-relaxed border-l-2 border-[var(--green-400)]/30 pl-4">
                            {project.description}
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </Link>
    );
};

export function Projects() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    return (
        <section id="projects" className="relative z-10">
            {/* Section Header */}
            <div className="container-default mb-16 md:mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6"
                >
                    <div className="section-header">
                        <span className="section-eyebrow">
                            <Terminal className="w-5 h-5" />
                            Featured Work
                        </span>
                        <h2 className="section-title">Selected Works</h2>
                    </div>
                    <div className="w-full md:w-auto h-px md:h-auto md:w-64 bg-white/10" />
                </motion.div>
            </div>

            {/* Project List */}
            <div className="border-t border-white/10">
                {PROJECTS.map((project, index) => (
                    <ProjectItem
                        key={project.title}
                        project={project}
                        index={index}
                        hoveredIndex={hoveredIndex}
                        setHoveredIndex={setHoveredIndex}
                        expandedIndex={expandedIndex}
                        setExpandedIndex={setExpandedIndex}
                    />
                ))}
            </div>

            {/* Decorative Footer */}
            <div className="container-default mt-8 flex justify-end">
                <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[var(--slate-600)] uppercase tracking-widest">
                    /// End of index
                </p>
            </div>
        </section>
    );
}
