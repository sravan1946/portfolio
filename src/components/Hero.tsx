import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { NEOFETCH, PERSONAL_DATA } from "@/lib/data";
import { DecodeText } from "./DecodeText";
import { scrollToHash } from "@/lib/utils";

/** Types out a shell command character by character. */
function TypedCommand({ text, start, onDone }: { text: string; start: boolean; onDone: () => void }) {
    const reduced = useReducedMotion();
    const [count, setCount] = useState(0);
    const done = count >= text.length;

    useEffect(() => {
        if (!start) return;
        if (reduced) {
            setCount(text.length);
            onDone();
            return;
        }
        const timer = setInterval(() => {
            setCount((c) => {
                if (c + 1 >= text.length) {
                    clearInterval(timer);
                    setTimeout(onDone, 220);
                }
                return c + 1;
            });
        }, 65);
        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [start, reduced, text]);

    return (
        <p className="font-[family-name:var(--font-mono)] text-sm sm:text-base text-[var(--ink-muted)]">
            <span className="text-[var(--accent)]">~</span>
            <span className="text-[var(--ink-faint)]"> $ </span>
            {text.slice(0, count)}
            {!done && <span className="caret ml-0.5" aria-hidden="true" />}
        </p>
    );
}

// Classic terminal ANSI palette row, the neofetch sign-off.
const ANSI = ["#1b201d", "#d8615c", "#56c878", "#d8a85c", "#5c9ad8", "#b07ad0", "#5cc0c0", "#e8ede9"];

// State-driven CSS reveal (not rAF-driven) so content still lands in
// environments where animation frames never run.
const revealStyle = (shown: boolean): React.CSSProperties => ({
    opacity: shown ? 1 : 0,
    transform: shown ? "none" : "translateY(14px)",
    transition: "opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1)",
});

function NeofetchPanel({ visible }: { visible: boolean }) {
    const reduced = useReducedMotion();
    return (
        <aside
            style={revealStyle(visible || !!reduced)}
            className="w-full lg:w-[21rem] shrink-0 rounded-[var(--radius-md)] border border-[var(--line-strong)] bg-[var(--surface)]/60 p-5 sm:p-6 font-[family-name:var(--font-mono)] text-[12px] sm:text-[13px] leading-relaxed"
            aria-label="System information"
        >
            <p className="text-[var(--accent)] font-bold">sravan@p1ng.me</p>
            <p className="text-[var(--ink-faint)] select-none" aria-hidden="true">─────────────────</p>
            <dl className="mt-2 space-y-1.5">
                {NEOFETCH.map((row) => (
                    <div key={row.key} className="flex gap-3">
                        <dt className="w-16 shrink-0 text-[var(--accent)]">{row.key}</dt>
                        <dd className={row.accent ? "text-[var(--ink)]" : "text-[var(--ink-muted)]"}>{row.value}</dd>
                    </div>
                ))}
            </dl>
            <div className="mt-5 flex gap-1.5" aria-hidden="true">
                {ANSI.map((c) => (
                    <span key={c} className="h-3.5 w-3.5 rounded-[2px]" style={{ backgroundColor: c }} />
                ))}
            </div>
        </aside>
    );
}

export function Hero() {
    const reduced = useReducedMotion();
    const [booted, setBooted] = useState(false);
    const [cmdDone, setCmdDone] = useState(false);
    const [firstNameDone, setFirstNameDone] = useState(false);
    const [nameDone, setNameDone] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setBooted(true), 250);
        return () => clearTimeout(t);
    }, []);

    return (
        <section className="relative flex min-h-[92svh] items-center pt-28 pb-16">
            <div className="container-default w-full">
                <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
                    <div className="max-w-2xl">
                        <TypedCommand text="whoami" start={booted} onDone={() => setCmdDone(true)} />

                        <h1 className="mt-5 font-[family-name:var(--font-mono)] text-[clamp(2.6rem,9vw,5.25rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-[var(--ink)]">
                            <DecodeText text="sravan" start={cmdDone} onDone={() => setFirstNameDone(true)} redecodeOnHover />
                            <br />
                            <DecodeText text="krishna" start={firstNameDone} onDone={() => setNameDone(true)} redecodeOnHover />
                            <span className="text-[var(--accent)]" style={{ animation: "caret-blink 1.4s step-end infinite" }}>_</span>
                        </h1>

                        <div style={revealStyle(nameDone || !!reduced)}>
                            <p className="mt-6 font-[family-name:var(--font-mono)] text-xs sm:text-sm tracking-[0.04em] text-[var(--accent)]">
                                {PERSONAL_DATA.role.toLowerCase()}
                            </p>
                            <p className="mt-4 max-w-[52ch] text-base sm:text-lg leading-relaxed text-[var(--ink-muted)]">
                                {PERSONAL_DATA.bio}
                            </p>

                            <div className="mt-9 flex flex-wrap items-center gap-4">
                                <a
                                    href="#projects"
                                    onClick={(e) => { e.preventDefault(); scrollToHash("#projects"); }}
                                    className="btn btn-solid"
                                >
                                    view projects
                                    <ArrowRight size={15} />
                                </a>
                                <a
                                    href="#contact"
                                    onClick={(e) => { e.preventDefault(); scrollToHash("#contact"); }}
                                    className="btn btn-outline"
                                >
                                    get in touch
                                </a>
                            </div>
                        </div>
                    </div>

                    <NeofetchPanel visible={nameDone} />
                </div>
            </div>
        </section>
    );
}
