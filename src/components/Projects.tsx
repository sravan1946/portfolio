import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/lib/data";

function ProjectRow({ project, index }: { project: (typeof PROJECTS)[0]; index: number }) {
    return (
        <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block border-t border-[var(--line-on-blue)] transition-colors duration-300 hover:bg-[var(--coral)] focus-visible:bg-[var(--coral)]"
        >
            <div className="container-default grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 py-7 transition-colors duration-300 group-hover:text-[var(--ink)] sm:gap-x-8 sm:py-9">
                <span className="margin-note text-[var(--coral)] transition-colors duration-300 group-hover:text-[var(--ink)]">
                    {String(index + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0">
                    <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.7rem,4.5vw,3rem)] font-bold lowercase leading-none tracking-[-0.015em]">
                        {project.title}
                    </h3>
                    <p className="mt-2.5 max-w-[52ch] text-[0.95rem] leading-relaxed text-[var(--paper-dim)] transition-colors duration-300 group-hover:text-[var(--ink-soft)]">
                        {project.tagline.replace(/\n/g, " ")}
                    </p>
                    <p className="margin-note mt-3 text-[var(--paper-dim)] transition-colors duration-300 group-hover:text-[var(--ink-soft)]">
                        {project.tech.map((t) => t.toLowerCase()).join(" · ")}
                        {project.demoUrl && (
                            <>
                                {"   "}
                                <span
                                    role="link"
                                    tabIndex={0}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        window.open(project.demoUrl, "_blank", "noopener");
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            window.open(project.demoUrl, "_blank", "noopener");
                                        }
                                    }}
                                    className="sweep-link ml-3 inline-block cursor-pointer text-[var(--coral)] group-hover:text-[var(--ink)]"
                                >
                                    demo ↗
                                </span>
                            </>
                        )}
                    </p>
                </div>

                <div className="flex flex-col items-end gap-2 self-start text-right">
                    <span className="font-[family-name:var(--font-mono)] text-[0.72rem] text-[var(--paper)] transition-colors duration-300 group-hover:text-[var(--ink)]">
                        {project.year}
                    </span>
                    <span className="margin-note hidden text-[var(--paper-dim)] transition-colors duration-300 group-hover:text-[var(--ink-soft)] sm:block">
                        {project.category.toLowerCase()}
                    </span>
                    <ArrowUpRight
                        size={22}
                        className="mt-1 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                    />
                </div>
            </div>
        </a>
    );
}

export function Projects() {
    return (
        <section id="projects" className="py-[clamp(5rem,10vw,8.5rem)]">
            <div className="container-default mb-[clamp(3rem,6vw,5rem)] flex flex-wrap items-end justify-between gap-4">
                <h2 className="section-word">work</h2>
                <div className="flex flex-col items-end gap-1.5">
                    <p className="margin-note text-[var(--paper-dim)]">four picks · 2023 — 2024</p>
                    <a
                        href="https://github.com/sravan1946?tab=repositories"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sweep-link font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.08em] text-[var(--coral)]"
                    >
                        all repos ↗
                    </a>
                </div>
            </div>

            <div className="border-b border-[var(--line-on-blue)]">
                {PROJECTS.map((project, i) => (
                    <ProjectRow key={project.title} project={project} index={i} />
                ))}
            </div>
        </section>
    );
}
