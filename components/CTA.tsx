"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, Instagram, Send, CheckCircle2, AlertCircle, Terminal, Copy, Check } from "lucide-react";

export function CTA() {
    const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [copiedEmail, setCopiedEmail] = useState(false);

    const validateForm = () => {
        let text = "";
        let newErrors = { name: "", email: "", message: "" };
        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = "ERR_NAME_REQUIRED";
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = "ERR_EMAIL_REQUIRED";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "ERR_INVALID_FORMAT";
            isValid = false;
        }

        if (!formData.message.trim()) {
            newErrors.message = "ERR_MSG_EMPTY";
            isValid = false;
        } else if (formData.message.length < 10) {
            newErrors.message = "ERR_MSG_TOO_SHORT_MIN_10_CHARS";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setFormState("submitting");

        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 2000));
        setFormState("success");
        setFormData({ name: "", email: "", message: "" });
    };

    const copyToClipboard = () => {
        const email = "sravan@p1ng.me";
        navigator.clipboard.writeText(email);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
    };

    return (
        <section id="contact" className="py-40 px-6 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 relative z-10">
                {/* Left Column: Info */}
                <div
                    className="flex flex-col justify-between"
                >
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-6">
                            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                            OPEN FOR WORK
                        </div>
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-white">
                            Let's build <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                                something epic.
                            </span>
                        </h2>
                        <p className="text-lg text-slate-400 mb-8 max-w-md leading-relaxed">
                            I'm currently accessible for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex gap-4">
                            {[
                                { icon: Github, href: "https://github.com/sravan1946" },
                                { icon: Linkedin, href: "https://linkedin.com/in/sravan-krishna/" },
                                { icon: Instagram, href: "https://instagram.com/sravan_krishna_c_m" },
                            ].map(({ icon: Icon, href }, i) => (
                                <motion.a
                                    key={i}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, color: "#22d3ee" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-4 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:bg-white/10 transition-colors"
                                >
                                    <Icon size={24} />
                                </motion.a>
                            ))}
                        </div>

                        <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between max-w-md group">
                            <div className="flex items-center gap-3">
                                <Mail className="text-cyan-400" size={20} />
                                <span className="text-slate-300 font-mono text-sm">sravan@p1ng.me</span>
                            </div>
                            <button
                                onClick={copyToClipboard}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white"
                                title="Copy Email"
                                data-cursor="copy"
                            >
                                {copiedEmail ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Terminal Interface (Form) */}
                <div
                    className="relative"
                >
                    {/* Decorators */}
                    <div className="absolute -top-10 -right-10 text-slate-800/20 pointer-events-none">
                        <Terminal size={240} strokeWidth={0.5} />
                    </div>

                    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-2xl relative z-10 h-full flex flex-col">
                        {/* Terminal Header */}
                        <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5 shrink-0">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
                                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30" />
                            </div>
                            <div className="ml-auto flex items-center gap-2 text-[10px] font-mono text-slate-500">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                secure_connection_active
                            </div>
                        </div>

                        <div className="p-8 md:p-10 flex-grow flex flex-col justify-center">
                            <AnimatePresence mode="wait">
                                {formState === "success" ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="h-full flex flex-col items-center justify-center text-center space-y-6 min-h-[400px]"
                                    >
                                        <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center relative">
                                            <div className="absolute inset-0 border border-green-500/20 rounded-full animate-ping opacity-20" />
                                            <CheckCircle2 size={48} className="text-green-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white font-mono mb-2">Transmission Complete</h3>
                                            <p className="text-slate-400 font-mono">
                                                Packet delivered successfully.<br />
                                                Stand by for acknowledgment sequence.
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setFormState("idle")}
                                            className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-sm font-mono text-cyan-400 transition-colors"
                                        >
                                            [INITIATE_NEW_SEQUENCE]
                                        </button>
                                    </motion.div>
                                ) : (
                                    <form key="form" onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                                        <div className="space-y-1.5">
                                            <label htmlFor="name" className="text-sm font-mono text-cyan-400 flex items-center gap-2">
                                                <span className="text-slate-600">$</span> input.name
                                            </label>
                                            <div className="relative group">
                                                <input
                                                    type="text"
                                                    id="name"
                                                    value={formData.name}
                                                    onChange={(e) => {
                                                        setFormData(prev => ({ ...prev, name: e.target.value }));
                                                        if (errors.name) setErrors(prev => ({ ...prev, name: "" }));
                                                    }}
                                                    disabled={formState === "submitting"}
                                                    className={`w-full bg-black/50 border ${errors.name ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-cyan-500/50"} rounded-lg px-4 py-3.5 text-base text-white focus:outline-none focus:bg-white/5 transition-all font-mono`}
                                                    placeholder="_"
                                                />
                                                {errors.name && (
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        className="absolute right-3 top-3.5 text-red-400"
                                                    >
                                                        <AlertCircle size={18} />
                                                    </motion.div>
                                                )}
                                            </div>
                                            {errors.name && <p className="text-xs text-red-400 font-mono pl-2">{`>> ${errors.name}`}</p>}
                                        </div>

                                        <div className="space-y-1.5">
                                            <label htmlFor="email" className="text-sm font-mono text-purple-400 flex items-center gap-2">
                                                <span className="text-slate-600">$</span> input.email
                                            </label>
                                            <div className="relative group">
                                                <input
                                                    type="email"
                                                    id="email"
                                                    value={formData.email}
                                                    onChange={(e) => {
                                                        setFormData(prev => ({ ...prev, email: e.target.value }));
                                                        if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                                                    }}
                                                    disabled={formState === "submitting"}
                                                    className={`w-full bg-black/50 border ${errors.email ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-purple-500/50"} rounded-lg px-4 py-3.5 text-base text-white focus:outline-none focus:bg-white/5 transition-all font-mono`}
                                                    placeholder="_"
                                                />
                                                {errors.email && (
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        className="absolute right-3 top-3.5 text-red-400"
                                                    >
                                                        <AlertCircle size={18} />
                                                    </motion.div>
                                                )}
                                            </div>
                                            {errors.email && <p className="text-xs text-red-400 font-mono pl-2">{`>> ${errors.email}`}</p>}
                                        </div>

                                        <div className="space-y-1.5">
                                            <label htmlFor="message" className="text-sm font-mono text-green-400 flex items-center gap-2">
                                                <span className="text-slate-600">$</span> input.message
                                            </label>
                                            <div className="relative group">
                                                <textarea
                                                    id="message"
                                                    rows={6}
                                                    value={formData.message}
                                                    onChange={(e) => {
                                                        setFormData(prev => ({ ...prev, message: e.target.value }));
                                                        if (errors.message) setErrors(prev => ({ ...prev, message: "" }));
                                                    }}
                                                    disabled={formState === "submitting"}
                                                    className={`w-full bg-black/50 border ${errors.message ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-green-500/50"} rounded-lg px-4 py-3.5 text-base text-white focus:outline-none focus:bg-white/5 transition-all font-mono resize-none`}
                                                    placeholder="_"
                                                />
                                                {errors.message && (
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        className="absolute right-3 top-3.5 text-red-400"
                                                    >
                                                        <AlertCircle size={18} />
                                                    </motion.div>
                                                )}
                                            </div>
                                            {errors.message && <p className="text-xs text-red-400 font-mono pl-2">{`>> ${errors.message}`}</p>}
                                        </div>

                                        <motion.button
                                            type="submit"
                                            disabled={formState === "submitting"}
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            className="w-full bg-gradient-to-r from-cyan-900/20 to-purple-900/20 hover:from-cyan-900/40 hover:to-purple-900/40 border border-cyan-500/20 hover:border-cyan-500/50 text-cyan-400 font-mono py-5 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden shadow-lg shadow-cyan-900/10"
                                            data-cursor="submit"
                                        >
                                            <div className={`absolute inset-0 bg-cyan-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ${formState === "submitting" ? "translate-y-0" : ""}`} />
                                            {formState === "submitting" ? (
                                                <span className="flex items-center gap-3 text-base font-semibold tracking-wide">
                                                    <span className="w-5 h-5 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                                                    TRANSMITTING...
                                                </span>
                                            ) : (
                                                <div className="flex items-center gap-3 text-base font-semibold tracking-wide">
                                                    <span>EXECUTE_TRANSMISSION</span>
                                                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            )}
                                        </motion.button>
                                    </form>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
