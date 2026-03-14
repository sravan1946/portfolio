"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useState, useCallback, useMemo } from "react";
import { Cpu, Terminal, Shield, Wrench, Code2, Sparkles } from "lucide-react";
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
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const [isClicked, setIsClicked] = useState(false);
    const [showFact, setShowFact] = useState(false);
    const [factIndex, setFactIndex] = useState(0);

    const mouseX = useSpring(x, { stiffness: 400, damping: 25 });
    const mouseY = useSpring(y, { stiffness: 400, damping: 25 });

    const rotateX = useSpring(0, { stiffness: 150, damping: 20 });
    const rotateY = useSpring(0, { stiffness: 150, damping: 20 });

    function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        const { currentTarget, clientX, clientY } = e;
        const rect = currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        rotateX.set(((clientY - centerY) / rect.height) * -12);
        rotateY.set(((clientX - centerX) / rect.width) * 12);
        x.set(clientX - rect.left);
        y.set(clientY - rect.top);
    }

    function onMouseLeave() {
        rotateX.set(0);
        rotateY.set(0);
        x.set(0);
        y.set(0);
        setTimeout(() => setShowFact(false), 400);
    }

    const handleClick = useCallback(() => {
        setIsClicked(true);
        const facts = TECH_FACTS[item.name] || ["Click to reveal secrets..."];
        setFactIndex(prev => (prev + 1) % facts.length);
        setShowFact(true);
        setTimeout(() => setIsClicked(false), 120);
    }, [item.name]);

    const facts = TECH_FACTS[item.name] || ["Click to reveal secrets..."];
    const currentFact = facts[factIndex];

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
            style={{ perspective: 1000, rotateX, rotateY }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onClick={handleClick}
            onKeyDown={(e) => e.key === 'Enter' && handleClick()}
            tabIndex={0}
            role="button"
            aria-label={`${item.name} - ${item.category}. Click to reveal a fact.`}
            className="group relative cursor-pointer outline-none"
        >
            <motion.div
                animate={{
                    scale: isClicked ? 0.96 : 1,
                }}
                transition={{ duration: 0.1 }}
                className="relative p-4 md:p-6 rounded-xl border border-white/[0.08] bg-[#080808]/60 backdrop-blur-sm transition-colors duration-300 hover:border-white/[0.15]"
            >
                <motion.div
                    className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-xl z-0"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(650px circle at ${mouseX}px ${mouseY}px, ${item.color}18, transparent 80%)
                        `,
                    }}
                />

                <div className="relative z-10 flex flex-col items-center gap-3">
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
                            className="w-full h-full object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 ease-out"
                        />
                        
                        <AnimatePresence mode="wait">
                            {showFact && (
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                                    className="absolute -top-1 -right-1"
                                >
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-yellow-400/50 blur-md rounded-full" />
                                        <Sparkles className="relative w-4 h-4 text-yellow-400" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    <div className="text-center">
                        <h3 className="text-sm md:text-base font-semibold text-[var(--slate-400)] group-hover:text-white transition-colors duration-300 tracking-wide">
                            {item.name}
                        </h3>
                        <motion.span 
                            className="text-[10px] md:text-xs font-[family-name:var(--font-jetbrains-mono)] text-[var(--green-400)]/70 block mt-1.5 uppercase tracking-widest"
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
                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 350, damping: 28 }}
                            className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-44 md:w-52 bg-[#0c0c0c] border border-[var(--green-400)]/25 rounded-lg p-2.5 z-50 shadow-2xl shadow-black/50"
                        >
                            <div className="text-[11px] md:text-xs text-[var(--slate-400)] font-[family-name:var(--font-jetbrains-mono)] leading-relaxed">
                                <span className="text-[var(--green-400)]">▸ </span>
                                {currentFact}
                            </div>
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#0c0c0c] border-t border-l border-[var(--green-400)]/25 rotate-45" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <motion.div
                className="absolute inset-0 rounded-xl -z-10 bg-gradient-to-b from-[var(--green-400)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            />
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
