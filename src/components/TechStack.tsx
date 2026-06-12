import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FULL_TECH_STACK } from "@/lib/data";

const TECH_FACTS: Record<string, string[]> = {
    Python: [
        "Exponentially faster than writing C++",
        "Has a type system if you squint hard enough",
        "Picked by 54% of hackers... allegedly",
    ],
    Dart: [
        "The lang that time forgot (until Flutter)",
        "Guaranteed to make JS devs say 'huh?'",
        "Strongly typed but somehow feels playful",
    ],
    Flutter: [
        "Write once, debug everywhere (love)",
        "Hot reload: because waiting is for losers",
        "The only framework that judges you back",
    ],
    Bash: [
        "Dark magic for the command line",
        "pipelines > your entire career",
        "rm -rf /: the final boss of shell scripting",
    ],
    GitHub: [
        "Where code goes to become someone else's problem",
        "Commit early, commit often, commit regret",
        "Git blame: the sport of finding who broke prod",
    ],
    Docker: [
        "It works on my machine™️ certified",
        "Containerization: because bare metal is scary",
        "Dockerfile > your documentation",
    ],
    Firebase: [
        "Google's 'we'll monetize this later' platform",
        "Free tier: 0 to infinite in 3 months",
        "Serverless means no servers = no problems (right?)",
    ],
    Cloudflare: [
        "The only CDN that doesn't cost your firstborn",
        "DDoS protection: thanks, Minecraft kids",
        "Workers: because servers are so 2019",
    ],
    Linux: [
        "BTW I use Arch (mandatory disclosure)",
        "Gentoo users are in a cult",
        "sudo: we trust you, probably",
    ],
    "Arch Linux": [
        "BTW I use Arch",
        "You've manifested this moment",
        "RTFM or GTFO, choose wisely",
    ],
    Hyprland: [
        "tiling window manager > your mental health",
        "配置文件: 1, Sanity: 0",
        "Xorg? Never heard of her",
    ],
    "Burp Suite": [
        "OWASP Top 10 in a GUI",
        "Proxy: because privacy is a suggestion",
        "The only tool where scrolling is productive",
    ],
};

/** Types out a fact like terminal output. */
function TypedFact({ text }: { text: string }) {
    const reduced = useReducedMotion();
    const [count, setCount] = useState(reduced ? text.length : 0);

    useEffect(() => {
        if (reduced) {
            setCount(text.length);
            return;
        }
        setCount(0);
        const timer = setInterval(() => {
            setCount((c) => {
                if (c + 1 >= text.length) clearInterval(timer);
                return c + 1;
            });
        }, 16);
        return () => clearInterval(timer);
    }, [text, reduced]);

    return (
        <span className="text-[var(--ink-muted)]">
            {text.slice(0, count)}
            {count < text.length && <span className="caret !h-[0.85em] !w-[0.4em]" aria-hidden="true" />}
        </span>
    );
}

function StackItem({ item }: { item: (typeof FULL_TECH_STACK)[0] }) {
    const facts = TECH_FACTS[item.name] ?? ["Systems ready."];
    const [factIndex, setFactIndex] = useState(-1);
    const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const reduced = useReducedMotion();

    useEffect(() => () => { if (hideTimer.current) clearTimeout(hideTimer.current); }, []);

    const open = factIndex >= 0;

    return (
        <li
            onMouseEnter={() => { if (hideTimer.current) clearTimeout(hideTimer.current); }}
            onMouseLeave={() => {
                hideTimer.current = setTimeout(() => setFactIndex(-1), 1500);
            }}
        >
            <button
                onClick={() => setFactIndex((i) => (i + 1) % facts.length)}
                onMouseEnter={() => window.dispatchEvent(new CustomEvent("world:ping", { detail: item.name }))}
                aria-label={`${item.name}. Activate for a fact.`}
                aria-expanded={open}
                className="group flex w-full items-center gap-3 rounded-[var(--radius-sm)] px-2 py-2 -mx-2 text-left transition-colors hover:bg-[var(--accent-tint)]"
            >
                <img
                    src={item.url}
                    alt=""
                    width={20}
                    height={20}
                    loading="lazy"
                    className="h-5 w-5 object-contain grayscale opacity-60 transition-all duration-200 group-hover:grayscale-0 group-hover:opacity-100"
                />
                <span className="font-[family-name:var(--font-mono)] text-[13px] text-[var(--ink-muted)] transition-colors group-hover:text-[var(--ink)]">
                    {item.name.toLowerCase()}
                </span>
                <span className="ml-auto font-[family-name:var(--font-mono)] text-[10px] text-[var(--ink-faint)] opacity-0 transition-opacity group-hover:opacity-100">
                    {item.category.toLowerCase()}
                </span>
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.p
                        initial={reduced ? false : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={reduced ? undefined : { opacity: 0, height: 0 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="overflow-hidden pl-10 pr-2 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed"
                    >
                        <span className="text-[var(--accent)]">❯ </span>
                        <TypedFact text={facts[factIndex]} />
                    </motion.p>
                )}
            </AnimatePresence>
        </li>
    );
}

const GROUPS = [
    {
        title: "languages & frameworks",
        names: ["Python", "Dart", "Flutter", "Bash"],
    },
    {
        title: "infra & cloud",
        names: ["GitHub", "Docker", "Firebase", "Cloudflare"],
    },
    {
        title: "os & security",
        names: ["Linux", "Arch Linux", "Hyprland", "Burp Suite"],
    },
];

export function TechStack() {
    return (
        <section id="stack">
            <div className="container-default">
                <div className="section-head">
                    <h2>Stack</h2>
                    <span className="section-meta">click anything for a hot take</span>
                </div>

                <div className="scrim grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-14">
                    {GROUPS.map((group) => (
                        <div key={group.title}>
                            <h3 className="mb-4 border-b border-[var(--line)] pb-2 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.04em] text-[var(--accent)]">
                                {group.title}
                            </h3>
                            <ul className="space-y-1">
                                {FULL_TECH_STACK.filter((t) => group.names.includes(t.name)).map((item) => (
                                    <StackItem key={item.name} item={item} />
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
