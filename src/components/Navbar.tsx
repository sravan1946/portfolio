import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Github, Menu, X } from "lucide-react";
import { useState } from "react";
import { PERSONAL_DATA } from "@/lib/data";
import { scrollToHash } from "@/lib/utils";

const navItems = [
    { name: "about", href: "#about" },
    { name: "projects", href: "#projects" },
    { name: "stack", href: "#stack" },
    { name: "education", href: "#education" },
];

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const reduced = useReducedMotion();

    const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        scrollToHash(href);
    };

    const github = PERSONAL_DATA.socials.find((s) => s.name === "GitHub");

    return (
        <header className="fixed inset-x-0 top-0 z-[var(--z-nav)] border-b border-[var(--line)] bg-[var(--bg)]/85 backdrop-blur-sm">
            <nav className="container-default flex h-14 items-center justify-between" aria-label="Main">
                {/* Logotype */}
                <a
                    href="#main-content"
                    onClick={(e) => handleNav(e, "#main-content")}
                    className="flex items-baseline gap-0.5 font-[family-name:var(--font-mono)] text-[13px] font-bold"
                >
                    <span className="text-[var(--accent)]">sravan@p1ng</span>
                    <span className="text-[var(--ink-faint)]">:~</span>
                    <span className="caret ml-1 !h-[0.9em] !w-[0.45em]" aria-hidden="true" />
                </a>

                {/* Desktop nav */}
                <div className="hidden items-center gap-7 md:flex">
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            onClick={(e) => handleNav(e, item.href)}
                            className="font-[family-name:var(--font-mono)] text-xs text-[var(--ink-muted)] transition-colors hover:text-[var(--ink)]"
                        >
                            {item.name}
                        </a>
                    ))}

                    <span className="h-4 w-px bg-[var(--line-strong)]" aria-hidden="true" />

                    <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="mono-link">
                        cv
                    </a>
                    {github && (
                        <a
                            href={github.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub profile"
                            className="text-[var(--ink-muted)] transition-colors hover:text-[var(--accent)]"
                        >
                            <Github size={16} />
                        </a>
                    )}
                </div>

                {/* Mobile toggle */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-[var(--ink-muted)] hover:text-[var(--ink)] md:hidden"
                    aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMobileMenuOpen}
                >
                    {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
            </nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={reduced ? false : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={reduced ? undefined : { opacity: 0, height: 0 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="overflow-hidden border-t border-[var(--line)] bg-[var(--bg)] md:hidden"
                    >
                        <div className="container-default flex flex-col py-3">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={(e) => handleNav(e, item.href)}
                                    className="py-3 font-[family-name:var(--font-mono)] text-sm text-[var(--ink-muted)] transition-colors hover:text-[var(--ink)]"
                                >
                                    <span className="text-[var(--ink-faint)]">./</span>
                                    {item.name}
                                </a>
                            ))}
                            <div className="mt-2 flex items-center gap-5 border-t border-[var(--line)] pt-4 pb-1">
                                <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="mono-link">
                                    cv
                                </a>
                                {PERSONAL_DATA.socials.map((s) => (
                                    <a
                                        key={s.name}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={s.name}
                                        className="text-[var(--ink-muted)] transition-colors hover:text-[var(--accent)]"
                                    >
                                        <s.icon size={17} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
