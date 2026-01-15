"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, ArrowRight, Command } from "lucide-react";
import { useRouter } from "next/navigation";

export function CommandMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const router = useRouter();

    // Toggle with Cmd+K
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const commands = [
        { id: "home", label: "Go Home", action: () => { router.push("/"); setIsOpen(false); } },
        { id: "projects", label: "View Projects", action: () => { router.push("#projects"); setIsOpen(false); } },
        { id: "about", label: "About Me", action: () => { router.push("#about"); setIsOpen(false); } },
        { id: "contact", label: "Contact", action: () => { window.open("mailto:sravan.krishna@example.com", "_self"); setIsOpen(false); } },
    ];

    const filteredCommands = commands.filter(cmd =>
        cmd.label.toLowerCase().includes(input.toLowerCase())
    );

    return (
        <>


            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="relative w-full max-w-lg overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] shadow-2xl shadow-cyan-500/10"
                        >
                            <div className="flex items-center border-b border-white/10 px-4 py-3">
                                <Command className="mr-3 h-5 w-5 text-slate-500" />
                                <input
                                    autoFocus
                                    placeholder="Type a command or search..."
                                    className="flex-1 bg-transparent text-lg text-white placeholder-slate-500 outline-none"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                />
                                <button onClick={() => setIsOpen(false)}>
                                    <X className="h-5 w-5 text-slate-500 hover:text-white" />
                                </button>
                            </div>

                            <div className="p-2 max-h-[300px] overflow-y-auto">
                                <div className="mb-2 px-2 text-xs font-mono text-slate-500 uppercase tracking-wider">Suggestions</div>
                                {filteredCommands.length === 0 ? (
                                    <div className="p-4 text-center text-slate-500 text-sm">No results found.</div>
                                ) : (
                                    filteredCommands.map((cmd) => (
                                        <button
                                            key={cmd.id}
                                            onClick={cmd.action}
                                            className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-slate-200 hover:bg-white/5 hover:text-cyan-400 focus:bg-white/5 focus:text-cyan-400 outline-none transition-colors group"
                                        >
                                            <span>{cmd.label}</span>
                                            <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                        </button>
                                    ))
                                )}
                            </div>

                            <div className="border-t border-white/10 px-4 py-2 flex justify-between items-center bg-white/5">
                                <div className="text-[10px] text-slate-500 font-mono">
                                    <span className="px-1.5 py-0.5 rounded border border-white/10 bg-black mr-2">Esc</span>
                                    to close
                                </div>
                                <div className="text-[10px] text-slate-500 font-mono">
                                    <span className="text-cyan-400">CyberSec</span> Terminal v1.0
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
