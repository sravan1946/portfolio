import { Card3D } from "./Card3D";

export function About() {
    return (
        <section id="about">
            <div className="container-default">
                <div className="section-head">
                    <h2>About</h2>
                    <span className="section-meta">~/about</span>
                </div>

                <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-16 lg:gap-20">
                    <div className="scrim max-w-[58ch] space-y-5 text-base leading-relaxed text-[var(--ink-muted)] sm:text-lg md:flex-1">
                        <p>
                            I'm a Computer Science student with a passion for{" "}
                            <span className="text-[var(--accent)]">building</span> and{" "}
                            <span className="text-[var(--accent)]">breaking</span> things.
                        </p>
                        <p>
                            I spend most of my time coding: automating tasks with{" "}
                            <span className="font-medium text-[var(--ink)]">Python</span>, building apps with{" "}
                            <span className="font-medium text-[var(--ink)]">Flutter</span>, and deep-diving into{" "}
                            <span className="font-medium text-[var(--ink)]">DevOps</span>.
                        </p>
                        <p>
                            Away from the keyboard I'm usually elbow-deep in hardware: wiring sensors to{" "}
                            <span className="text-[var(--accent)]">Arduinos</span> or taking laptops apart to see
                            how they tick. A builder at heart, exploring{" "}
                            <span className="text-[var(--accent)]">security</span> one project at a time.
                        </p>
                    </div>

                    <div className="shrink-0">
                        <Card3D />
                    </div>
                </div>
            </div>
        </section>
    );
}
