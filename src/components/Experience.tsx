import { EDUCATION } from "@/lib/data";

// Stable, decorative commit-style ids for the git-log presentation.
function pseudoHash(input: string) {
    let h = 0x811c9dc5;
    for (let i = 0; i < input.length; i++) {
        h ^= input.charCodeAt(i);
        h = Math.imul(h, 0x01000193);
    }
    return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}

export function Experience() {
    return (
        <section id="education">
            <div className="container-default">
                <div className="section-head">
                    <h2>Education</h2>
                    <span className="section-meta">$ git log --oneline</span>
                </div>

                <ol className="relative max-w-3xl space-y-10 border-l border-[var(--line-strong)] pl-8 sm:pl-10">
                    {EDUCATION.map((entry) => (
                        <li key={entry.period} className="relative">
                            {/* Commit node */}
                            <span
                                className={`absolute -left-8 sm:-left-10 top-1.5 h-3 w-3 -translate-x-1/2 ml-px rounded-full border-2 ${
                                    entry.current
                                        ? "border-[var(--accent)] bg-[var(--accent)]"
                                        : "border-[var(--ink-faint)] bg-[var(--bg)]"
                                }`}
                                aria-hidden="true"
                            />

                            <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-[family-name:var(--font-mono)] text-xs">
                                <span className="text-[var(--amber)]">{pseudoHash(entry.credential)}</span>
                                <span className="text-[var(--ink-faint)]">{entry.period}</span>
                                {entry.current && (
                                    <span className="text-[var(--accent)]">(HEAD -&gt; main)</span>
                                )}
                            </p>

                            <h3 className="mt-2 text-base font-semibold text-[var(--ink)] sm:text-lg">
                                {entry.credential}
                            </h3>
                            <p className="mt-1 text-sm leading-relaxed text-[var(--ink-muted)]">
                                {entry.institution}
                                {entry.detail && <span className="text-[var(--ink-faint)]"> · {entry.detail}</span>}
                            </p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
