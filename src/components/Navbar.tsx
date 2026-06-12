import { scrollToHash } from "@/lib/utils";

const LINKS = [
    { name: "about", href: "#about" },
    { name: "work", href: "#projects" },
    { name: "stack", href: "#stack" },
    { name: "contact", href: "#contact" },
];

export function Navbar() {
    const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        scrollToHash(href);
    };

    return (
        // mix-blend-difference: the bar stays legible over every ink block
        <header className="fixed inset-x-0 top-0 z-40 mix-blend-difference">
            <nav
                aria-label="Main"
                className="container-default flex h-16 items-center justify-between text-white"
            >
                <a
                    href="#main-content"
                    onClick={(e) => handleNav(e, "#main-content")}
                    className="font-[family-name:var(--font-display)] text-lg font-bold lowercase tracking-tight"
                >
                    sravan<span aria-hidden="true">✶</span>
                </a>

                <div className="flex items-center gap-4 sm:gap-7">
                    {LINKS.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNav(e, link.href)}
                            className="sweep-link hidden font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.08em] sm:inline-block"
                        >
                            {link.name}
                        </a>
                    ))}
                    {/* phones keep the two that matter */}
                    <a
                        href="#projects"
                        onClick={(e) => handleNav(e, "#projects")}
                        className="sweep-link font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.08em] sm:hidden"
                    >
                        work
                    </a>
                    <a
                        href="#contact"
                        onClick={(e) => handleNav(e, "#contact")}
                        className="sweep-link font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.08em] sm:hidden"
                    >
                        contact
                    </a>
                    <a
                        href="/cv.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-current px-3 py-1.5 font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.08em] transition-colors hover:bg-white hover:text-black hover:mix-blend-normal"
                    >
                        cv
                    </a>
                </div>
            </nav>
        </header>
    );
}
