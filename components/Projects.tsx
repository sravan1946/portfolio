"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, Terminal, ChevronDown } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
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
            <div className="bg-black/90 backdrop-blur-xl border border-cyan-500/30 p-5 rounded-lg shadow-[0_0_30px_rgba(34,211,238,0.15)] relative group/card">
                {/* Header */}
                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
                    <div className="flex gap-2 items-center">
                        <Terminal className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs font-mono text-cyan-400 font-bold tracking-widest">COMMAND CENTER</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 border border-white/10 px-1.5 py-0.5 rounded">
                        {project.year}
                    </span>
                </div>

                {/* Tech Cloud */}
                <div className="mb-5">
                    <span className="text-[10px] uppercase text-slate-500 font-mono mb-2 block tracking-wider">Technologies</span>
                    <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                            <span key={t} className="text-[11px] px-2 py-1 rounded-sm bg-cyan-900/20 text-cyan-100 border border-cyan-500/20 font-mono">
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
                        onClick={(e) => e.stopPropagation()} // Prevent row click
                        className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/50 text-slate-300 hover:text-white py-2 rounded transition-all duration-300 group/btn"
                    >
                        <Github className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                        <span className="text-xs font-bold uppercase tracking-wider">Code</span>
                    </Link>

                    {project.demoUrl && (
                        <Link
                            href={project.demoUrl}
                            target="_blank"
                            onClick={(e) => e.stopPropagation()} // Prevent row click
                            className="flex-1 flex items-center justify-center gap-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 hover:border-cyan-500/50 text-cyan-300 hover:text-cyan-100 py-2 rounded transition-all duration-300 group/btn"
                        >
                            <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                            <span className="text-xs font-bold uppercase tracking-wider">Demo</span>
                        </Link>
                    )}
                </div>

                {/* Decorative corners */}
                <div className="absolute -top-px -left-px w-3 h-3 border-t border-l border-cyan-500" />
                <div className="absolute -bottom-px -right-px w-3 h-3 border-b border-r border-cyan-500" />
            </div>
        </motion.div>
    );
};

const ProjectItem = ({
    project,
    index,
    hoveredIndex,
    setHoveredIndex,
}: {
    project: typeof PROJECTS[0];
    index: number;
    hoveredIndex: number | null;
    setHoveredIndex: (index: number | null) => void;
}) => {
    const isHovered = hoveredIndex === index;
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
                data-cursor="project"
                className={cn(
                    "group relative border-b border-white/5 py-8 md:py-12 transition-all duration-500 cursor-none",
                    isDimmed ? "opacity-30 blur-[1px]" : "opacity-100"
                )}
            >
                {/* Hover Background Gradient */}
                <div
                    className={cn(
                        "absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-transparent opacity-0 transition-opacity duration-500",
                        isHovered && "opacity-100"
                    )}
                />

                {/* Holographic Stats Card - Fixed Right Position */}
                <ProjectStatsCard project={project} hovered={isHovered} />

                <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8">
                    {/* Index & Title */}
                    <div className="flex items-center justify-between md:justify-start w-full md:w-auto gap-4 md:gap-8">
                        <div className="flex items-baseline gap-4 md:gap-8">
                            <span className="font-mono text-sm md:text-base text-slate-500 group-hover:text-cyan-400 transition-colors">
                                0{index + 1}
                            </span>
                            <h3
                                className={cn(
                                    "text-3xl md:text-5xl font-black uppercase tracking-tighter transition-all duration-300",
                                    isHovered ? "text-white translate-x-2" : "text-slate-400"
                                )}
                            >
                                {project.title}
                            </h3>
                        </div>

                        {/* Mobile Expansion Toggle */}
                        <div
                            className="md:hidden p-2 text-slate-500 group-hover:text-cyan-400 transition-colors"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setHoveredIndex(isHovered ? null : index);
                            }}
                        >
                            <ChevronDown className={cn("w-6 h-6 transition-transform duration-300", isHovered ? "rotate-180 text-cyan-400" : "")} />
                        </div>
                    </div>

                    {/* Metadata & Tech */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12">
                        <div className="hidden md:block w-px h-8 bg-white/10" />

                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                                Category
                            </span>
                            <span className="text-sm md:text-base font-medium text-slate-300 group-hover:text-cyan-300 transition-colors">
                                {project.category}
                            </span>
                        </div>

                        <div className="hidden md:block w-px h-8 bg-white/10" />

                        <div className="flex flex-col gap-1 min-w-[120px]">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                                Tech Stack
                            </span>
                            <div className="flex gap-2 text-sm text-slate-400">
                                {project.tech.slice(0, 2).join(" / ")}
                                {project.tech.length > 2 && "..."}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Expanded Content (Mobile Friendly) */}
                <motion.div
                    initial={false}
                    animate={{
                        height: isHovered ? "auto" : 0,
                        opacity: isHovered ? 1 : 0
                    }}
                    className="overflow-hidden relative z-10" // Ensure z-10 is kept
                >
                    <div className="pt-4 md:pt-6 container mx-auto px-4 md:px-6">
                        <p className="max-w-xl text-slate-400 text-sm md:text-base leading-relaxed border-l-2 border-cyan-500/30 pl-4">
                            {project.description}
                        </p>
                        <div className="mt-4 flex gap-2 md:hidden">
                            {project.tech.map(t => (
                                <span key={t} className="text-[10px] px-2 py-1 rounded bg-white/5 text-slate-300 border border-white/10">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </Link >
    );
};

export function Projects() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section id="projects" className="py-24 md:py-32 relative z-10">
            {/* Section Header */}
            <div className="container mx-auto px-4 md:px-6 mb-16 md:mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6"
                >
                    <div >
                        <div className="flex items-center gap-2 mb-4 text-cyan-400">
                            <Terminal className="w-5 h-5" />
                            <span className="font-mono text-sm tracking-widest uppercase">System Projects</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
                            Selected Works
                        </h2>
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
                    />
                ))}
            </div>

            {/* Decorative Footer */}
            <div className="container mx-auto px-4 md:px-6 mt-8 flex justify-end">
                <p className="font-mono text-xs text-slate-600 uppercase tracking-widest">
                    /// End of index
                </p>
            </div>
        </section>
    );
}
