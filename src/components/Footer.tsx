import { PERSONAL_DATA } from "@/lib/data";
import { scrollToHash } from "@/lib/utils";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative z-10 border-t border-[var(--line)] py-8">
            <div className="container-default flex flex-col items-center justify-between gap-6 sm:flex-row">
                {/* Left: sign-off */}
                <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--ink-faint)]">
                    <span className="text-[var(--accent)]">$</span> exit
                    <span className="mx-2 text-[var(--line-strong)]">·</span>© {currentYear} Sravan Krishna C M
                </p>

                {/* Center: socials */}
                <div className="flex items-center gap-1">
                    {PERSONAL_DATA.socials.map((social) => (
                        <a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-[var(--radius-sm)] p-2.5 text-[var(--ink-faint)] transition-colors hover:text-[var(--accent)] focus-visible:text-[var(--accent)]"
                            aria-label={social.name}
                        >
                            <social.icon size={18} />
                        </a>
                    ))}
                </div>

                {/* Right: back to top */}
                <a
                    href="#main-content"
                    onClick={(e) => { e.preventDefault(); scrollToHash("#main-content"); }}
                    className="mono-link"
                >
                    cd ~
                </a>
            </div>
        </footer>
    );
}
