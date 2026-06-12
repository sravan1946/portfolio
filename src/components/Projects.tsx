import { ExternalLink, Github } from "lucide-react";
import { PROJECTS } from "@/lib/data";
import { cn } from "@/lib/utils";

function StatusBadge({ status }: { status: "maintained" | "archived" | "deprecated" }) {
    const config = {
        maintained: { dot: "bg-[var(--accent)]", text: "text-[var(--accent)]" },
        archived: { dot: "bg-[var(--ink-faint)]", text: "text-[var(--ink-faint)]" },
        deprecated: { dot: "bg-[var(--red)]", text: "text-[var(--red)]" },
    }[status];

    return (
        <span className={cn("inline-flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[11px]", config.text)}>
            <span className={cn("h-1.5 w-1.5 rounded-full", config.dot)} aria-hidden="true" />
            {status}
        </span>
    );
}

function ProjectRow({ project }: { project: (typeof PROJECTS)[0] }) {
    return (
        <article className="group relative grid gap-2 border-t border-[var(--line)] py-7 transition-colors duration-200 hover:bg-[var(--accent-tint)] sm:py-8 md:grid-cols-[6.5rem_1fr] md:gap-x-8 md:px-4 md:-mx-4">
            {/* Year gutter */}
            <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--ink-faint)] md:pt-1.5">
                {project.year}
            </p>

            <div>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="font-[family-name:var(--font-mono)] text-lg font-bold text-[var(--ink)] transition-colors group-hover:text-[var(--accent)] sm:text-xl">
                        {/* Stretched link: the whole row opens the repo */}
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0">
                            {project.title}
                        </a>
                    </h3>
                    <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--ink-faint)]">
                        {project.category.toLowerCase()}
                    </span>
                    <StatusBadge status={project.status} />
                </div>

                <p className="mt-2.5 max-w-[62ch] text-[15px] leading-relaxed text-[var(--ink-muted)]">
                    {project.description}
                </p>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
                    <p className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--ink-faint)]">
                        {project.tech.map((t) => t.toLowerCase()).join(" · ")}
                    </p>
                    <div className="relative z-10 flex items-center gap-4">
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mono-link inline-flex items-center gap-1.5"
                            aria-label={`${project.title} source code on GitHub`}
                        >
                            <Github size={12} />
                            source
                        </a>
                        {project.demoUrl && (
                            <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mono-link inline-flex items-center gap-1.5"
                                aria-label={`${project.title} demo`}
                            >
                                <ExternalLink size={12} />
                                demo
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}

export function Projects() {
    return (
        <section id="projects">
            <div className="container-default">
                <div className="section-head">
                    <h2>Projects</h2>
                    <a
                        href="https://github.com/sravan1946?tab=repositories"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="section-meta transition-colors hover:text-[var(--accent)]"
                    >
                        {PROJECTS.length} selected · all repos on github ↗
                    </a>
                </div>

                <div className="border-b border-[var(--line)]">
                    {PROJECTS.map((project) => (
                        <ProjectRow key={project.title} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
}
