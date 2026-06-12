import { LOG } from "@/lib/data";

export function Experience() {
    return (
        <section id="education" className="py-[clamp(4.5rem,8vw,7rem)]">
            <div className="container-default">
                <div className="mb-[clamp(2.5rem,5vw,4rem)] flex flex-wrap items-end justify-between gap-4">
                    <h2 className="section-word">log</h2>
                    <p className="margin-note text-[var(--paper-dim)]">work &amp; education, newest first</p>
                </div>

                <div className="border-b border-[var(--line-on-blue)]">
                    {LOG.map((entry) => (
                        <div
                            key={entry.period}
                            className="grid items-baseline gap-x-8 gap-y-2 border-t border-[var(--line-on-blue)] py-7 sm:grid-cols-[minmax(9rem,auto)_1fr_auto]"
                        >
                            <span className="font-[family-name:var(--font-display)] text-[clamp(1.4rem,3vw,2rem)] font-bold tabular-nums tracking-tight text-[var(--paper)]">
                                {entry.period.replace(/\s/g, "")}
                            </span>
                            <div>
                                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--paper)]">
                                    {entry.credential}
                                    <span className="text-[var(--coral)]"> @ {entry.institution}</span>
                                </h3>
                                <p className="mt-1 text-[0.95rem] text-[var(--paper-dim)]">
                                    {entry.detail.toLowerCase().replace(/\.$/, "")}
                                </p>
                            </div>
                            <div className="flex items-center gap-3 self-center">
                                <span className="margin-note text-[var(--paper-dim)]">{entry.kind}</span>
                                {entry.current && (
                                    <span className="margin-note border border-[var(--coral)] px-2.5 py-1 text-[var(--coral)]">
                                        current
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
