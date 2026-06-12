import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Copy, Mail, Send } from "lucide-react";
import { PERSONAL_DATA } from "@/lib/data";
import { cn } from "@/lib/utils";

type Field = "name" | "email" | "message";

const inputClass = (hasError: boolean) =>
    cn(
        "w-full rounded-[var(--radius-sm)] border bg-[var(--slate-950)] px-4 py-3 font-[family-name:var(--font-mono)] text-sm text-[var(--ink)] transition-colors focus:outline-none",
        hasError
            ? "border-[var(--red)]/60 focus:border-[var(--red)]"
            : "border-[var(--line-strong)] focus:border-[var(--accent-line)]"
    );

export function CTA() {
    const reduced = useReducedMotion();
    const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
    const [formData, setFormData] = useState<Record<Field, string>>({ name: "", email: "", message: "" });
    const [errors, setErrors] = useState<Record<Field, string>>({ name: "", email: "", message: "" });
    const [submitError, setSubmitError] = useState("");
    const [copiedEmail, setCopiedEmail] = useState(false);

    const socialLinks = PERSONAL_DATA.socials.filter((s) => s.name !== "Email");

    const setField = (field: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    const validateForm = () => {
        const newErrors: Record<Field, string> = { name: "", email: "", message: "" };
        if (!formData.name.trim()) newErrors.name = "ERR_NAME_REQUIRED";
        if (!formData.email.trim()) newErrors.email = "ERR_EMAIL_REQUIRED";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "ERR_INVALID_FORMAT";
        if (!formData.message.trim()) newErrors.message = "ERR_MSG_EMPTY";
        else if (formData.message.length < 10) newErrors.message = "ERR_MSG_TOO_SHORT_MIN_10_CHARS";
        setErrors(newErrors);
        return !newErrors.name && !newErrors.email && !newErrors.message;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
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
                // the packet leaves the box (3D world reacts; no-op in flat mode)
                window.dispatchEvent(new CustomEvent("world:packet"));
            } else {
                setFormState("idle");
                setSubmitError(result.error || "Something went wrong. Try again, or email me directly.");
            }
        } catch {
            setFormState("idle");
            setSubmitError("Network error. Try again, or email me directly.");
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(PERSONAL_DATA.email);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
    };

    const fieldError = (field: Field) =>
        errors[field] && (
            <p className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--red)]" role="alert">
                &gt;&gt; {errors[field]}
            </p>
        );

    return (
        <section id="contact">
            <div className="container-default">
                <div className="section-head">
                    <h2>Contact</h2>
                    <a href={`mailto:${PERSONAL_DATA.email}`} className="section-meta transition-colors hover:text-[var(--accent)]">
                        {PERSONAL_DATA.email}
                    </a>
                </div>

                <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
                    {/* Left: pitch + direct channels */}
                    <div className="scrim flex flex-col gap-8">
                        <div>
                            <p className="inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[11px] text-[var(--accent)]">
                                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
                                open to collaborate
                            </p>
                            <h3 className="mt-5 max-w-[24ch] text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
                                Got a project, a CTF team, or a bug worth reporting?
                            </h3>
                            <p className="mt-4 max-w-[48ch] text-base leading-relaxed text-[var(--ink-muted)]">
                                Send a message and it lands straight in my inbox. Questions, collaborations,
                                or just saying hi all count.
                            </p>
                        </div>

                        <div className="mt-auto space-y-5">
                            <div className="flex max-w-md items-center justify-between gap-3 rounded-[var(--radius-md)] border border-[var(--line-strong)] bg-[var(--surface)]/60 px-4 py-3">
                                <div className="flex min-w-0 items-center gap-3">
                                    <Mail className="shrink-0 text-[var(--accent)]" size={17} />
                                    <span className="truncate font-[family-name:var(--font-mono)] text-xs text-[var(--ink-muted)] sm:text-sm">
                                        {PERSONAL_DATA.email}
                                    </span>
                                </div>
                                <button
                                    onClick={copyToClipboard}
                                    className="rounded-[var(--radius-sm)] p-2 text-[var(--ink-faint)] transition-colors hover:bg-[var(--accent-tint)] hover:text-[var(--ink)]"
                                    aria-label="Copy email address"
                                >
                                    {copiedEmail ? <Check size={16} className="text-[var(--accent)]" /> : <Copy size={16} />}
                                </button>
                            </div>

                            <div className="flex gap-2">
                                {socialLinks.map(({ icon: Icon, href, name }) => (
                                    <a
                                        key={name}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={name}
                                        className="rounded-[var(--radius-sm)] border border-[var(--line)] p-3 text-[var(--ink-muted)] transition-colors hover:border-[var(--accent-line)] hover:text-[var(--accent)]"
                                    >
                                        <Icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: terminal form */}
                    <div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--line-strong)] bg-[var(--surface)]/60">
                        <div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-2.5">
                            <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--ink-faint)]">
                                sravan@p1ng<span className="text-[var(--ink-faint)]">:</span>
                                <span className="text-[var(--accent)]">~/contact</span>
                            </span>
                            <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--ink-faint)]">mail.send</span>
                        </div>

                        <div className="p-5 sm:p-8">
                            <AnimatePresence mode="wait" initial={false}>
                                {formState === "success" ? (
                                    <motion.div
                                        key="success"
                                        initial={reduced ? false : { opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={reduced ? undefined : { opacity: 0 }}
                                        className="flex min-h-[360px] flex-col items-start justify-center gap-4 font-[family-name:var(--font-mono)]"
                                    >
                                        <p className="text-sm text-[var(--accent)]">✓ message sent</p>
                                        <p className="text-sm leading-relaxed text-[var(--ink-muted)]">
                                            Thanks for reaching out. I read everything and I'll get back to you soon.
                                        </p>
                                        <button
                                            onClick={() => setFormState("idle")}
                                            className="btn btn-outline mt-2"
                                        >
                                            send another message
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={reduced ? false : { opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={reduced ? undefined : { opacity: 0 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-5"
                                    >
                                        <div className="space-y-1.5">
                                            <label htmlFor="name" className="block font-[family-name:var(--font-mono)] text-xs text-[var(--accent)]">
                                                <span className="text-[var(--ink-faint)]">$ </span>name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                autoComplete="name"
                                                value={formData.name}
                                                onChange={setField("name")}
                                                disabled={formState === "submitting"}
                                                className={inputClass(!!errors.name)}
                                                placeholder="your name"
                                                aria-required="true"
                                                aria-invalid={!!errors.name}
                                            />
                                            {fieldError("name")}
                                        </div>

                                        <div className="space-y-1.5">
                                            <label htmlFor="email" className="block font-[family-name:var(--font-mono)] text-xs text-[var(--accent)]">
                                                <span className="text-[var(--ink-faint)]">$ </span>email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                autoComplete="email"
                                                value={formData.email}
                                                onChange={setField("email")}
                                                disabled={formState === "submitting"}
                                                className={inputClass(!!errors.email)}
                                                placeholder="you@example.com"
                                                aria-required="true"
                                                aria-invalid={!!errors.email}
                                            />
                                            {fieldError("email")}
                                        </div>

                                        <div className="space-y-1.5">
                                            <label htmlFor="message" className="block font-[family-name:var(--font-mono)] text-xs text-[var(--accent)]">
                                                <span className="text-[var(--ink-faint)]">$ </span>message
                                            </label>
                                            <textarea
                                                id="message"
                                                rows={6}
                                                value={formData.message}
                                                onChange={setField("message")}
                                                disabled={formState === "submitting"}
                                                className={cn(inputClass(!!errors.message), "resize-none")}
                                                placeholder="what's on your mind?"
                                                aria-required="true"
                                                aria-invalid={!!errors.message}
                                            />
                                            {fieldError("message")}
                                        </div>

                                        {submitError && (
                                            <p className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--red)]" role="alert">
                                                &gt;&gt; {submitError}
                                            </p>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={formState === "submitting"}
                                            className="btn btn-solid w-full disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            {formState === "submitting" ? (
                                                <>
                                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--accent-ink)]/30 border-t-[var(--accent-ink)]" aria-hidden="true" />
                                                    sending...
                                                </>
                                            ) : (
                                                <>
                                                    send message
                                                    <Send size={14} />
                                                </>
                                            )}
                                        </button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
