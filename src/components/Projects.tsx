import { motion } from "framer-motion";
import { Github, ExternalLink, Terminal, Package, Star, Archive, GitBranch } from "lucide-react";
import { PROJECTS } from "@/lib/data";
import { cn } from "@/lib/utils";

const StatusBadge = ({ status }: { status: "maintained" | "archived" | "deprecated" }) => {
    const config = {
        maintained: { label: "● maintained", class: "text-[var(--green-400)]" },
        archived: { label: "○ archived", class: "text-[var(--slate-500)]" },
        deprecated: { label: "◉ deprecated", class: "text-[var(--red-400)]" },
    };
    return <span className={cn("font-[family-name:var(--font-jetbrains-mono)] text-xs", config[status].class)}>{config[status].label}</span>;
};

const ProjectRow = ({
    project,
    index,
    isHovered,
    onHover,
}: {
    project: typeof PROJECTS[0];
    index: number;
    isHovered: boolean;
    onHover: (hovered: boolean) => void;
}) => {
    return (
        <motion.a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
            className="group relative block"
        >
            <div
                className={cn(
                    "relative overflow-hidden rounded-lg border bg-[var(--slate-900)]/50 transition-all duration-300",
                    isHovered
                        ? "border-[var(--green-400)]/40 shadow-[0_0_30px_rgba(74,222,128,0.1)]"
                        : "border-white/5 hover:border-white/10"
                )}
            >
                {/* Terminal-style window header */}
                <div className="flex items-center gap-2 px-3 sm:px-4 py-2 border-b border-white/5 bg-black/20">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-[var(--red-400)]/60" />
                        <div className="w-3 h-3 rounded-full bg-[var(--yellow-400)]/60" />
                        <div className="w-3 h-3 rounded-full bg-[var(--green-400)]/60" />
                    </div>
                    <div className="flex-1 text-center">
                        <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-[var(--slate-500)] truncate max-w-[150px] sm:max-w-none">
                            ~/projects/{project.title.toLowerCase().replace(/\s+/g, "-")}
                        </span>
                    </div>
                    <StatusBadge status={project.status} />
                </div>

                {/* Package info */}
                <div className="p-3 sm:p-4">
                    <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                            <div className={cn(
                                "w-10 h-10 rounded-lg flex items-center justify-center",
                                isHovered ? "bg-[var(--green-400)]/20" : "bg-white/5"
                            )}>
                                <Package className={cn(
                                    "w-5 h-5",
                                    isHovered ? "text-[var(--green-400)]" : "text-[var(--slate-400)]"
                                )} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white group-hover:text-[var(--green-400)] transition-colors">
                                    {project.title}
                                </h3>
                                <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[var(--slate-500)]">
                                    v1.0.0-{project.year} • {project.category}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-[var(--slate-500)]" />
                            <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[var(--slate-500)]">{project.stars}</span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-[var(--slate-400)] leading-relaxed mb-4 font-[family-name:var(--font-jetbrains-mono)]">
                        {project.description}
                    </p>

                    {/* Dependencies / Tech */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tech.map((t) => (
                            <span
                                key={t}
                                className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] px-2 py-0.5 rounded bg-[var(--slate-800)] text-[var(--slate-400)] border border-white/5"
                            >
                                {t}
                            </span>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                        <span className="hidden sm:inline font-[family-name:var(--font-jetbrains-mono)] text-xs text-[var(--slate-600)]">
                            npm i {project.title.toLowerCase().replace(/\s+/g, "-")}
                        </span>
                        <div className="flex-1" />
                        <a
                            href={project.url}
                            target="_blank"
                            onClick={(e) => e.stopPropagation()}
                            className={cn(
                                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-[family-name:var(--font-jetbrains-mono)] transition-all",
                                isHovered
                                    ? "bg-[var(--green-400)]/10 text-[var(--green-400)] border border-[var(--green-400)]/30"
                                    : "bg-white/5 text-[var(--slate-400)] border border-white/5"
                            )}
                        >
                            <Github className="w-3.5 h-3.5" />
                            source
                        </a>
                        {project.demoUrl && (
                            <a
                                href={project.demoUrl}
                                target="_blank"
                                onClick={(e) => e.stopPropagation()}
                                className={cn(
                                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-[family-name:var(--font-jetbrains-mono)] transition-all",
                                    isHovered
                                        ? "bg-[var(--green-400)] text-[var(--slate-900)]"
                                        : "bg-white/10 text-[var(--slate-300)]"
                                )}
                            >
                                <ExternalLink className="w-3.5 h-3.5" />
                                demo
                            </a>
                        )}
                    </div>
                </div>

                {/* Cursor line */}
                <div className={cn(
                    "absolute bottom-0 left-0 h-0.5 bg-[var(--green-400)] transition-all duration-300",
                    isHovered ? "w-full" : "w-0"
                )} />
            </div>
        </motion.a>
    );
};


export function Projects() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section id="projects" className="relative z-10">
            {/* Section Header - Terminal style */}
            <div className="container-default mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <Terminal className="w-5 h-5 text-[var(--green-400)]" />
                        <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[var(--slate-500)] uppercase tracking-widest">
                            ~/workspace
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                        Projects
                    </h2>
                    <p className="text-[var(--slate-400)] max-w-xl font-[family-name:var(--font-jetbrains-mono)] text-sm">
                        <span className="text-[var(--green-400)]">$</span> ls -la ./projects
                        <br />
                        <span className="text-[var(--slate-500)]">{PROJECTS.length} packages installed</span>
                    </p>
                </motion.div>
            </div>

            {/* Package list */}
            <div className="container-default">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {PROJECTS.map((project, index) => (
                        <div key={project.title} className="relative">
                            <ProjectRow
                                project={project}
                                index={index}
                                isHovered={hoveredIndex === index}
                                onHover={(hovered) => setHoveredIndex(hovered ? index : null)}
                            />
                        </div>
                    ))}
                </div>
            </div>


            {/* Footer */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="container-default mt-12"
            >
                <a
                    href="https://github.com/sravan1946?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-3 py-3 px-4 rounded-lg border border-dashed border-white/10 hover:border-[var(--green-400)]/30 transition-all"
                >
                    <GitBranch className="w-4 h-4 text-[var(--slate-500)] group-hover:text-[var(--green-400)] transition-colors" />
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[var(--slate-500)] group-hover:text-[var(--slate-300)] transition-colors">
                        View more projects on GitHub
                    </span>
                </a>
            </motion.div>

            <div className="container-default mt-8 flex justify-center">
                <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[var(--slate-600)]">
                    <span className="text-[var(--green-400)]">➜</span> <span className="text-[var(--slate-500)]">~</span> echo "End of projects"
                </p>
            </div>
        </section>
    );
}

import { useState } from "react";
