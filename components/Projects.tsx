"use client";

"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { PROJECTS } from "@/lib/data";

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function onMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } }}
            viewport={{ once: true, margin: "-50px" }}
            className={cn(
                "group relative rounded-3xl bg-white/5 border border-white/10 overflow-hidden hover:border-white/20 transition-colors project-card h-full min-h-[400px]",
                project.size
            )}
            onMouseMove={onMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(147, 51, 234, 0.15),
              transparent 80%
            )
          `,
                }}
            />

            <div className="h-full flex flex-col p-6 sm:p-8">
                <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
                        <ArrowUpRight className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="flex gap-2">
                        {project.tech.map((t) => (
                            <span key={t} className="px-3 py-1 text-[10px] font-mono tracking-widest text-slate-400 border border-white/5 rounded-full uppercase bg-white/5">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-auto">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                    <p className="text-slate-400 font-medium mb-1">{project.category}</p>
                    <p className="text-sm text-slate-500 line-clamp-2">{project.description}</p>
                </div>
            </div>
        </motion.div>
    );
}

export function Projects({ limit }: { limit?: number }) {
    const displayedProjects = limit ? PROJECTS.slice(0, limit) : PROJECTS;

    return (
        <section id="projects" className="py-24 px-6 relative z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Selected Works</h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr">
                    {displayedProjects.map((project) => (
                        <ProjectCard key={project.title} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
}
