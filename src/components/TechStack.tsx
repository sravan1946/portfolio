"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { Cpu, Terminal, Shield, Wrench, Code2 } from "lucide-react";
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

interface TechCardProps {
    item: {
        name: string;
        url: string;
        color: string;
        category: string;
    };
    index: number;
}

function TechCard({ item, index }: TechCardProps) {
    const [isClicked, setIsClicked] = useState(false);
    const [showFact, setShowFact] = useState(false);
    const [factIndex, setFactIndex] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const facts = useMemo(() => TECH_FACTS[item.name] || ["Systems ready."], [item.name]);

    // Typing effect logic
    const [typedText, setTypedText] = useState("");

    useEffect(() => {
        if (!showFact) {
            setTypedText("");
            return;
        }

        let i = 0;
        const text = facts[factIndex];
        setTypedText("");

        const timer = setInterval(() => {
            setTypedText(text.slice(0, i + 1));
            i++;
            if (i >= text.length) clearInterval(timer);
        }, 20); // Fast typing speed

        return () => clearInterval(timer);
    }, [showFact, factIndex, facts]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    function onMouseEnter() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }

    function onMouseLeave() {
        timeoutRef.current = setTimeout(() => {
            setShowFact(false);
        }, 1000); // Stay for 1 seconds
    }

    const handleClick = useCallback(() => {
        setIsClicked(true);
        setFactIndex(prev => (prev + 1) % facts.length);
        setShowFact(true);
        setTimeout(() => setIsClicked(false), 120);
    }, [facts.length]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                delay: index * 0.05,
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1]
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={handleClick}
            onKeyDown={(e) => e.key === 'Enter' && handleClick()}
            tabIndex={0}
            role="button"
            aria-label={`${item.name} - ${item.category}. Click to reveal a fact.`}
            className="group relative outline-none focus-visible:ring-4 focus-visible:ring-[var(--green-400)] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505]"
        >
            <motion.div
                animate={{
                    scale: isClicked ? 0.98 : 1,
                }}
                transition={{ duration: 0.1 }}
                className="relative p-6 md:p-8 bg-[#050505] border-2 border-[#1a1a1a] transition-all duration-300 hover:border-[var(--green-400)] hover:-translate-y-2 hover:translate-x-[-4px] hover:shadow-[6px_6px_0px_0px_var(--green-400)] group"
            >
                <div className="relative z-10 flex flex-col items-start gap-4">
                    <motion.div
                        animate={{
                            y: [0, -4, 0],
                            scale: showFact ? 1.08 : 1,
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.15,
                        }}
                        className="w-14 h-14 md:w-16 md:h-16 relative"
                    >
                        <img
                            src={item.url}
                            alt={item.name}
                            width={64}
                            height={64}
                            loading="lazy"
                            className="w-full h-full object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                        />
                    </motion.div>

                    <div className="text-left mt-2">
                        <h3 className="text-lg md:text-xl font-bold text-white tracking-widest uppercase">
                            {item.name}
                        </h3>
                        <motion.span
                            className="text-[10px] md:text-xs font-[family-name:var(--font-jetbrains-mono)] text-[var(--slate-400)] block mt-1 uppercase tracking-wider"
                            animate={{
                                opacity: showFact ? 1 : 0.6,
                                y: showFact ? 0 : 2
                            }}
                        >
                            {item.category}
                        </motion.span>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {showFact && (
                        <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 12 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className="absolute z-50 top-full left-[-4px] right-[-4px] bg-[#050505] border-2 border-[var(--green-400)] p-3 shadow-[6px_6px_0px_0px_var(--green-400)] pointer-events-none"
                        >
                            <div className="text-[10px] md:text-xs font-[family-name:var(--font-jetbrains-mono)] flex items-start gap-2 text-left">
                                <span className="text-[var(--green-400)] font-black mt-0.5">{">_"}</span>
                                <span className="leading-relaxed whitespace-pre-wrap text-white">
                                    {typedText}
                                    <span className="inline-block w-1.5 h-3.5 bg-[var(--green-400)] ml-0.5 align-middle animate-pulse" />
                                </span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
}

function TechCategory({
    title,
    icon: Icon,
    description,
    techs,
    index
}: {
    title: string;
    icon: React.ElementType;
    description: string;
    techs: typeof FULL_TECH_STACK;
    index: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.15, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-10 md:mb-14"
        >
            <div className="flex items-center gap-3 mb-5">
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.2, type: "spring", stiffness: 400, damping: 20 }}
                    className="w-9 h-9 rounded-lg bg-[var(--green-400)]/8 border border-[var(--green-400)]/15 flex items-center justify-center"
                >
                    <Icon className="w-4 h-4 text-[var(--green-400)]" />
                </motion.div>
                <div>
                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wider">
                        {title}
                    </h3>
                    <p className="text-xs md:text-sm text-[var(--slate-500)] font-[family-name:var(--font-jetbrains-mono)]">
                        {description}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {techs.map((item, idx) => (
                    <TechCard
                        key={item.name}
                        item={item}
                        index={idx}
                    />
                ))}
            </div>
        </motion.div>
    );
}

export function TechStack() {
    const categories = [
        {
            title: "The Creator",
            icon: Code2,
            description: "Languages & Frameworks",
            techs: FULL_TECH_STACK.filter(t => ["Python", "Dart", "Flutter", "Bash"].includes(t.name)),
        },
        {
            title: "The Builder",
            icon: Wrench,
            description: "Tools & Cloud",
            techs: FULL_TECH_STACK.filter(t => ["GitHub", "Docker", "Firebase", "Cloudflare"].includes(t.name)),
        },
        {
            title: "The Hacker",
            icon: Shield,
            description: "OS & Security",
            techs: FULL_TECH_STACK.filter(t => ["Linux", "Arch Linux", "Hyprland", "Burp Suite"].includes(t.name)),
        },
    ];

    return (
        <section id="stack" className="relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(74,222,128,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(74,222,128,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)] pointer-events-none" />

            <div className="container-default relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="section-header section-header--centered"
                >
                    <span className="section-eyebrow">
                        <Cpu size={14} />
                        Tools & Technologies
                    </span>
                    <h2 className="section-title">Tech Arsenal</h2>
                </motion.div>

                <div className="space-y-2">
                    {categories.map((cat, idx) => (
                        <TechCategory
                            key={cat.title}
                            {...cat}
                            index={idx}
                        />
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="mt-10 text-center text-xs text-[var(--slate-600)] font-[family-name:var(--font-jetbrains-mono)]"
                >
                    // built with chaos & curiosity
                </motion.p>
            </div>
        </section>
    );
}
