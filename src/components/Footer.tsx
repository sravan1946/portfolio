"use client";

import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import { PERSONAL_DATA } from "@/lib/data";

export function Footer() {
    const socialLinks = PERSONAL_DATA.socials;
    const currentYear = new Date().getFullYear();

    const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        // @ts-expect-error - lenis is on window
        window.lenis?.scrollTo("#main-content", { duration: 1.2 });
    };

    return (
        <footer className="border-t border-white/5 py-8 sm:py-10">
            <div className="container-default">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    {/* Left: Copyright */}
                    <div className="flex items-center gap-2 text-[var(--slate-500)] font-[family-name:var(--font-jetbrains-mono)] text-xs">
                        <span className="text-[var(--green-400)]">$</span>
                        <span>© {currentYear} Sravan Krishna C M</span>
                    </div>

                    {/* Center: Social Links */}
                    <div className="flex items-center gap-3">
                        {socialLinks.map((social) => {
                            const Icon = social.icon;
                            return (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 text-[var(--slate-500)] hover:text-[var(--green-400)] focus-visible:text-[var(--green-400)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-400)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded-lg transition-colors"
                                    aria-label={social.name}
                                >
                                    <Icon size={20} />
                                </a>
                            );
                        })}
                    </div>

                    {/* Right: Back to top */}
                    <a
                        href="#main-content"
                        onClick={scrollToTop}
                        className="text-[var(--slate-500)] hover:text-[var(--green-400)] focus-visible:text-[var(--green-400)] font-[family-name:var(--font-jetbrains-mono)] text-xs transition-colors flex items-center gap-1.5 group"
                    >
                        <span className="group-hover:translate-x-0.5 transition-transform">&larr;</span>
                        <span>top</span>
                    </a>
                </div>
            </div>
        </footer>
    );
}
