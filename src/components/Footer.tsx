import { PERSONAL_DATA } from "@/lib/data";
import { scrollToHash } from "@/lib/utils";

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-[var(--blue-deep)] py-12 text-[var(--paper)]">
            <div className="container-default">
                <div className="flex flex-wrap items-center justify-between gap-6 border-b border-[var(--line-on-blue)] pb-8">
                    <p className="font-[family-name:var(--font-display)] text-2xl font-bold lowercase tracking-tight">
                        sravan<span className="text-[var(--coral)]" aria-hidden="true">✶</span>
                    </p>
                    <a
                        href="#main-content"
                        onClick={(e) => { e.preventDefault(); scrollToHash("#main-content"); }}
                        className="sweep-link font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.08em] text-[var(--paper-dim)]"
                    >
                        back to top ↑
                    </a>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 pt-7">
                    <p className="margin-note max-w-md text-[var(--paper-dim)]">
                        set in bricolage grotesque &amp; martian mono · © {year} sravan krishna c m
                    </p>
                    <div className="flex gap-6">
                        {PERSONAL_DATA.socials.map((s) => (
                            <a
                                key={s.name}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="sweep-link font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.08em] text-[var(--paper-dim)]"
                            >
                                {s.name.toLowerCase()}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
