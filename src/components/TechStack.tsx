import { useState } from "react";
import { FULL_TECH_STACK, TECH_FACTS } from "@/lib/data";

/** The stack as a bill of materials; click a part, get a hot take. */
export function TechStack() {
    const [take, setTake] = useState<{ name: string; index: number } | null>(null);

    const pick = (name: string) => {
        setTake((prev) => ({ name, index: prev?.name === name ? prev.index + 1 : 0 }));
    };

    const takes = take ? TECH_FACTS[take.name] ?? ["systems ready."] : null;
    const takeText = takes ? takes[take!.index % takes.length] : null;

    const half = Math.ceil(FULL_TECH_STACK.length / 2);
    const columns = [FULL_TECH_STACK.slice(0, half), FULL_TECH_STACK.slice(half)];

    return (
        <section id="stack" className="bg-[var(--paper)] py-[clamp(5rem,10vw,8.5rem)] text-[var(--ink)]">
            <div className="container-default">
                <div className="mb-[clamp(3rem,6vw,5rem)] flex flex-wrap items-end justify-between gap-4">
                    <h2 className="section-word">stack</h2>
                    <p className="margin-note text-[var(--ink-soft)]">
                        bill of materials — press a part for a hot take
                    </p>
                </div>

                <div className="grid gap-x-16 lg:grid-cols-2">
                    {columns.map((column, c) => (
                        <ul key={c} className={c === 0 ? "border-t border-[var(--line-on-paper)]" : "lg:border-t lg:border-[var(--line-on-paper)]"}>
                            {column.map((item, i) => {
                                const index = c * half + i + 1;
                                const active = take?.name === item.name;
                                return (
                                    <li key={item.name} className="border-b border-[var(--line-on-paper)]">
                                        <button
                                            onClick={() => pick(item.name)}
                                            aria-pressed={active}
                                            className={`group flex w-full items-baseline gap-5 py-3.5 text-left transition-colors ${
                                                active ? "text-[var(--coral-deep)]" : "hover:text-[var(--coral-deep)]"
                                            }`}
                                        >
                                            <span className="margin-note w-9 shrink-0 text-[var(--ink-soft)] transition-colors group-hover:text-[var(--coral-deep)]">
                                                {String(index).padStart(3, "0")}
                                            </span>
                                            <span className="font-[family-name:var(--font-display)] text-[1.35rem] font-semibold lowercase leading-none">
                                                {item.name}
                                            </span>
                                            <span className="margin-note ml-auto shrink-0 text-[var(--ink-soft)]">
                                                {item.category.toLowerCase()}
                                            </span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    ))}
                </div>

                {/* the hot take prints here; height reserved so rows don't jump */}
                <p className="mt-8 min-h-[1.6rem] font-[family-name:var(--font-mono)] text-[0.78rem] leading-relaxed">
                    {takeText ? (
                        <>
                            <span className="text-[var(--coral-deep)]">❯ </span>
                            <span className="text-[var(--ink-soft)]">
                                {take!.name.toLowerCase()}: {takeText.toLowerCase()}
                            </span>
                        </>
                    ) : (
                        <span className="text-[oklch(0.24_0.07_265/0.4)]">❯ awaiting selection…</span>
                    )}
                </p>
            </div>
        </section>
    );
}
