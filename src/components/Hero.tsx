import { motion, useReducedMotion } from "framer-motion";
import { PressMark } from "./PressMark";

const SPEC = [
    ["role", "cybersecurity · devops · flutter"],
    ["day job", "devops intern @ shopdeck"],
    ["also", "b.tech cse, final year"],
    ["base", "bangalore, india · utc+5:30"],
    ["status", "open to collaborate"],
];

const TICKER = ["cybersecurity", "devops", "flutter", "python", "arch linux", "ctf", "open source", "hardware"];

export function Hero() {
    const reduced = useReducedMotion();
    const rise = (delay: number) => ({
        initial: reduced ? false : { y: 28, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
    });

    return (
        <section className="relative flex min-h-svh flex-col justify-between pt-24">
            <div className="container-default flex w-full grow flex-col justify-center pb-12">
                <motion.p {...rise(0.05)} className="margin-note mb-6 text-[var(--paper-dim)]">
                    portfolio of a builder &amp; breaker — 2026
                </motion.p>

                <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-14">
                    <motion.h1
                        {...rise(0.12)}
                        className="font-[family-name:var(--font-display)] text-[clamp(3.4rem,11.5vw,6rem)] font-extrabold leading-[0.93] tracking-[-0.025em] text-[var(--paper)]"
                    >
                        sravan
                        <span className="ml-[0.18em] inline-block align-baseline text-[var(--coral)]">
                            <PressMark className="spin-slow h-[0.42em] w-[0.42em]" />
                        </span>
                        <br />
                        krishna
                    </motion.h1>

                    {/* spec sheet */}
                    <motion.dl {...rise(0.3)} className="w-full max-w-sm self-end lg:w-auto lg:min-w-[22rem]">
                        {SPEC.map(([key, value]) => (
                            <div
                                key={key}
                                className="flex items-baseline justify-between gap-8 border-t border-[var(--line-on-blue)] py-2.5"
                            >
                                <dt className="margin-note text-[var(--coral)]">{key}</dt>
                                <dd className="font-[family-name:var(--font-mono)] text-[0.72rem] text-[var(--paper)]">
                                    {value}
                                </dd>
                            </div>
                        ))}
                    </motion.dl>
                </div>

                <motion.p
                    {...rise(0.2)}
                    className="mt-12 max-w-[24ch] font-[family-name:var(--font-display)] text-[clamp(1.3rem,2.6vw,1.9rem)] font-medium leading-snug text-[var(--paper)]"
                >
                    builds secure systems. <span className="text-[var(--coral)]">breaks</span> insecure ones.
                </motion.p>
            </div>

            {/* ticker */}
            <div className="marquee border-y border-[var(--line-on-blue)] py-3" aria-hidden="true">
                <div className="marquee-track">
                    {[0, 1].map((copy) => (
                        <div key={copy} className="flex shrink-0 items-center">
                            {TICKER.map((item) => (
                                <span
                                    key={`${copy}-${item}`}
                                    className="flex items-center font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.08em] text-[var(--paper-dim)]"
                                >
                                    <span className="px-5">{item}</span>
                                    <span className="text-[var(--coral)]">✶</span>
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
