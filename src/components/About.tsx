export function About() {
    return (
        <section id="about" className="bg-[var(--paper)] py-[clamp(5rem,10vw,8.5rem)] text-[var(--ink)]">
            <div className="container-default">
                <div className="mb-[clamp(3rem,6vw,5rem)] flex flex-wrap items-end justify-between gap-4">
                    <h2 className="section-word">about</h2>
                    <p className="margin-note text-[var(--ink-soft)]">fig. 01 — the operator</p>
                </div>

                <div className="grid items-start gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
                    <div>
                        <p className="max-w-[24ch] font-[family-name:var(--font-display)] text-[clamp(1.7rem,3.6vw,2.6rem)] font-semibold leading-tight">
                            i like knowing how things work, and why they fail.
                        </p>

                        <div className="mt-9 max-w-[58ch] space-y-5 text-[1.05rem] leading-relaxed text-[var(--ink-soft)]">
                            <p>
                                I build random stuff. Scripts that automate things nobody asked me to automate,
                                apps for problems I ran into exactly once, and half-finished experiments that
                                taught me more than the finished ones did.
                            </p>
                            <p>
                                Most of it lives on GitHub, some of it even works. The security habit grew out
                                of that: build enough things and you start wanting to know exactly how they
                                break.
                            </p>
                        </div>

                        <dl className="mt-10 max-w-md">
                            {[
                                ["daily driver", "arch linux + hyprland"],
                                ["sharpest tools", "python · flutter · burp suite"],
                                ["weekend habit", "ctfs & random builds"],
                            ].map(([key, value]) => (
                                <div
                                    key={key}
                                    className="flex items-baseline justify-between gap-6 border-t border-[var(--line-on-paper)] py-2.5"
                                >
                                    <dt className="margin-note text-[var(--coral-deep)]">{key}</dt>
                                    <dd className="font-[family-name:var(--font-mono)] text-[0.72rem]">{value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    {/* duotone print photo with offset plate */}
                    <figure className="relative mx-auto w-full max-w-sm lg:mt-4">
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 translate-x-3.5 translate-y-3.5 bg-[var(--blue)]"
                        />
                        <div className="relative aspect-[4/5] overflow-hidden">
                            <img
                                src="/profile-background.png"
                                alt=""
                                loading="lazy"
                                className="h-full w-full object-cover"
                            />
                            <img
                                src="/profile-foreground.png"
                                alt="Sravan, off-duty"
                                loading="lazy"
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        </div>
                        <figcaption className="margin-note mt-3 flex justify-between text-[var(--ink-soft)]">
                            <span>the operator, off-duty</span>
                            <span aria-hidden="true">✶</span>
                        </figcaption>
                    </figure>
                </div>
            </div>
        </section>
    );
}
