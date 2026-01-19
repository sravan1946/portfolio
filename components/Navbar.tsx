"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FileText, Menu, X, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { MagneticButton } from "./MagneticButton";
import { PERSONAL_DATA } from "@/lib/data";

const navItems = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Stack", href: "#stack" },
    { name: "Experience", href: "#experience" },
];

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const scrollToSection = (href: string) => {
        setIsMobileMenuOpen(false);
        // @ts-expect-error - lenis is on window
        window.lenis?.scrollTo(href);
    };

    const socials = PERSONAL_DATA.socials.filter((s) => s.name !== "Email");

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 sm:gap-4 px-2 py-2 rounded-full border border-white/10 bg-black/50 backdrop-blur-xl shadow-lg shadow-cyan-500/5 max-w-[95vw] sm:max-w-none"
            >
                {/* Desktop Nav Items */}
                <div className="hidden md:flex items-center gap-1 pl-4 pr-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection(item.href);
                            }}
                        >
                            <MagneticButton className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors relative group">
                                {item.name}
                                <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </MagneticButton>
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden pl-3 pr-1">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-slate-300 hover:text-white p-1"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <div className="h-6 w-px bg-white/10 hidden md:block" />

                {/* Socials & Contact */}
                <div className="flex items-center gap-1 sm:gap-2 pr-1 sm:pr-2">
                    <div className="hidden md:flex md:items-center md:gap-2">
                        {socials.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-white/5 rounded-full transition-all"
                                aria-label={item.name}
                            >
                                <item.icon size={18} />
                            </a>
                        ))}
                    </div>


                </div>

                {/* CV Button */}
                <div className="pl-1 sm:pl-2 pr-1 sm:pr-2 border-l border-white/10">
                    <a
                        href={"/cv.pdf"}
                        target="_blank"
                        className="group relative flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest rounded-full transition-all border border-cyan-500/20 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                        <FileText size={14} className="transition-transform duration-300" />
                        <span className="font-bold">CV</span>
                    </a>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-x-4 top-24 z-40 p-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 md:hidden flex flex-col gap-4 shadow-2xl shadow-cyan-500/10"
                    >
                        <div className="flex flex-col gap-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection(item.href);
                                    }}
                                    className="px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        <div className="h-px bg-white/10" />

                        <div className="flex justify-center gap-4">
                            {socials.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 text-slate-400 hover:text-cyan-400 hover:bg-white/5 rounded-full transition-all"
                                >
                                    <item.icon size={20} />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
