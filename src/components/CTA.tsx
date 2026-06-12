import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { PERSONAL_DATA } from "@/lib/data";
import { PressMark } from "./PressMark";

type Field = "name" | "email" | "message";

export function CTA() {
    const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
    const [formData, setFormData] = useState<Record<Field, string>>({ name: "", email: "", message: "" });
    const [errors, setErrors] = useState<Record<Field, string>>({ name: "", email: "", message: "" });
    const [submitError, setSubmitError] = useState("");

    const socials = PERSONAL_DATA.socials.filter((s) => s.name !== "Email");

    const setField = (field: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    const validate = () => {
        const next: Record<Field, string> = { name: "", email: "", message: "" };
        if (!formData.name.trim()) next.name = "your name, please";
        if (!formData.email.trim()) next.email = "an email to reply to";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) next.email = "that email doesn't parse";
        if (!formData.message.trim()) next.message = "the message is the point";
        else if (formData.message.length < 10) next.message = "a little more detail";
        setErrors(next);
        return !next.name && !next.email && !next.message;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setSubmitError("");
        setFormState("submitting");
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            if (response.ok) {
                setFormState("success");
                setFormData({ name: "", email: "", message: "" });
            } else {
                setFormState("idle");
                setSubmitError(result.error || "something went wrong. email me directly?");
            }
        } catch {
            setFormState("idle");
            setSubmitError("network hiccup. email me directly?");
        }
    };

    return (
        <section id="contact" className="bg-[var(--coral)] py-[clamp(5rem,10vw,8.5rem)] text-[var(--ink)]">
            <div className="container-default">
                <div className="mb-[clamp(3rem,6vw,5rem)] flex flex-wrap items-end justify-between gap-4">
                    <h2 className="section-word">hello</h2>
                    <p className="margin-note text-[var(--ink-soft)]">no recruiters-only forms here</p>
                </div>

                <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
                    <div>
                        <p className="max-w-[20ch] font-[family-name:var(--font-display)] text-[clamp(1.9rem,4.2vw,3.1rem)] font-bold leading-tight">
                            got a project, a ctf team, or a bug worth reporting?
                        </p>

                        <a
                            href={`mailto:${PERSONAL_DATA.email}`}
                            className="sweep-link mt-9 inline-block font-[family-name:var(--font-mono)] text-[clamp(1rem,2.4vw,1.5rem)] font-bold"
                        >
                            {PERSONAL_DATA.email}
                        </a>

                        <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3">
                            {socials.map((s) => (
                                <a
                                    key={s.name}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="sweep-link font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.08em]"
                                >
                                    {s.name.toLowerCase()} ↗
                                </a>
                            ))}
                        </div>
                    </div>

                    {formState === "success" ? (
                        <div className="flex flex-col items-start justify-center gap-5">
                            <PressMark size={56} className="spin-slow text-[var(--ink)]" />
                            <p className="font-[family-name:var(--font-display)] text-3xl font-bold">sent.</p>
                            <p className="max-w-[36ch] text-[var(--ink-soft)]">
                                Thanks for writing. I read everything and reply to most of it; give me a day.
                            </p>
                            <button
                                onClick={() => setFormState("idle")}
                                className="margin-note border border-[var(--ink)] px-4 py-2 transition-colors hover:bg-[var(--ink)] hover:text-[var(--coral)]"
                            >
                                write another
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-7" noValidate>
                            <div>
                                <label htmlFor="name" className="margin-note text-[var(--ink-soft)]">
                                    name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    autoComplete="name"
                                    className="field-input mt-1"
                                    placeholder="ada lovelace"
                                    value={formData.name}
                                    onChange={setField("name")}
                                    disabled={formState === "submitting"}
                                    aria-invalid={!!errors.name}
                                />
                                {errors.name && <p className="margin-note mt-1.5 font-bold">{errors.name}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="margin-note text-[var(--ink-soft)]">
                                    email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    className="field-input mt-1"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={setField("email")}
                                    disabled={formState === "submitting"}
                                    aria-invalid={!!errors.email}
                                />
                                {errors.email && <p className="margin-note mt-1.5 font-bold">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="message" className="margin-note text-[var(--ink-soft)]">
                                    message
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="field-input mt-1 resize-none"
                                    placeholder="what's on your mind?"
                                    value={formData.message}
                                    onChange={setField("message")}
                                    disabled={formState === "submitting"}
                                    aria-invalid={!!errors.message}
                                />
                                {errors.message && <p className="margin-note mt-1.5 font-bold">{errors.message}</p>}
                            </div>

                            {submitError && <p className="margin-note font-bold">{submitError}</p>}

                            <button
                                type="submit"
                                disabled={formState === "submitting"}
                                className="group mt-1 flex items-center justify-between gap-4 bg-[var(--ink)] px-6 py-4 font-[family-name:var(--font-mono)] text-[0.78rem] font-bold uppercase tracking-[0.08em] text-[var(--paper)] transition-colors hover:bg-[var(--blue-deep)] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {formState === "submitting" ? "sending…" : "send message"}
                                <ArrowRight
                                    size={16}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                    aria-hidden="true"
                                />
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
