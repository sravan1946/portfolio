"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, Minus, Square, Maximize2 } from "lucide-react";

interface Command {
    cmd: string;
    output: React.ReactNode;
}

const FILES = {
    "about.txt": "I am a full-stack developer with a passion for cybersecurity and interactive web experiences. \nBuilding systems that are both beautiful and secure.",
    "skills.json": `
{
  "frontend": ["React", "Next.js", "Tailwind", "Framer Motion"],
  "backend": ["Node.js", "PostgreSQL", "Rust"],
  "tools": ["Git", "Docker", "Linux"]
}`,
    "contact.md": "Email: sravan.krishna@example.com\nGitHub: github.com/sravan",
    "secret.log": "ACCESS DENIED. ENCRYPTED. TRY 'sudo access'",
};

export function Terminal() {
    const [isOpen, setIsOpen] = useState(false);
    const [history, setHistory] = useState<Command[]>([
        { cmd: "init", output: "Welcome to SravanOS v1.0.0. Type 'help' to get started." }
    ]);
    const [input, setInput] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom of terminal
    useEffect(() => {
        if (isOpen) {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [history, isOpen]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // Keyboard shortcut to toggle (Alt + T)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.altKey && e.key.toLowerCase() === 't') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [suggestionIndex, setSuggestionIndex] = useState(-1);

    const COMMANDS = ["help", "ls", "whoami", "date", "clear", "exit", "cat", "sudo"];

    // Reset suggestions when input changes manually
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        setSuggestions([]);
        setSuggestionIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Navigation: Arrow Keys
        if (suggestions.length > 0) {
            if (e.key === "ArrowRight" || e.key === "Tab") {
                e.preventDefault();
                setSuggestionIndex((prev) => (prev + 1) % suggestions.length);
                return;
            }
            if (e.key === "ArrowLeft") {
                e.preventDefault();
                setSuggestionIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
                return;
            }
            if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                e.preventDefault(); // Prevent history navigation if suggesting
                // Simple grid navigation logic could trigger here, for now just cycle like left/right or do nothing
                // Let's make Up/Down cycle too for simplicity in 1D list, or jump if we had grid
                const direction = e.key === "ArrowDown" ? 1 : -1;
                setSuggestionIndex((prev) => (prev + direction + suggestions.length) % suggestions.length);
                return;
            }
            if (e.key === "Enter") {
                if (suggestionIndex >= 0) {
                    e.preventDefault();
                    // Complete the selected suggestion
                    const selected = suggestions[suggestionIndex];

                    // Determine if we are completing a command or a file
                    const curr = input.toLowerCase();
                    if (curr.startsWith("cat ")) {
                        setInput(`cat ${selected}`);
                    } else {
                        setInput(selected);
                    }

                    setSuggestions([]);
                    setSuggestionIndex(-1);
                    return;
                }
            }
            if (e.key === "Escape") {
                setSuggestions([]);
                setSuggestionIndex(-1);
                return;
            }
        }

        if (e.key === "Tab") {
            e.preventDefault();
            const curr = input.toLowerCase();
            let matches: string[] = [];

            // 1. File Autocomplete for 'cat'
            if (curr.startsWith("cat ")) {
                const parts = curr.split(" ");
                const partial = parts.length === 2 ? parts[1] : "";
                matches = Object.keys(FILES).filter(f => f.startsWith(partial));
            }
            // 2. Command Autocomplete
            else if (!curr.includes(" ")) {
                matches = COMMANDS.filter(c => c.startsWith(curr));
            }

            if (matches.length === 1) {
                // Single match: Complete immediately
                const selected = matches[0];
                if (curr.startsWith("cat ")) {
                    setInput(`cat ${selected}`);
                } else {
                    setInput(selected);
                }
                setSuggestions([]);
                setSuggestionIndex(-1);
            } else if (matches.length > 1) {
                // Multiple matches: Show suggestions
                setSuggestions(matches);
                setSuggestionIndex(0); // Select first immediately on Tab
            }
        }
    };

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();

        // If we have active suggestions and Enter is pressed, handleKeyDown handles it.
        // But native form submission might fire if handleKeyDown didn't preventDefault (e.g. if index was -1)

        const cmd = input.trim();
        const lowerCmd = cmd.toLowerCase();

        let output: React.ReactNode = "";

        if (cmd) {
            setSuggestions([]); // Clear suggestions on submit
            setSuggestionIndex(-1);

            switch (lowerCmd) {
                case "help":
                    output = (
                        <div className="grid grid-cols-2 gap-2 text-cyan-200/80">
                            <span>ls</span><span>List directory contents</span>
                            <span>cat [file]</span><span>Print file content</span>
                            <span>whoami</span><span>Display current user</span>
                            <span>clear</span><span>Clear terminal screen</span>
                            <span>date</span><span>Show current date/time</span>
                            <span>exit</span><span>Close terminal</span>
                        </div>
                    );
                    break;

                case "ls":
                    output = (
                        <div className="flex gap-4 text-cyan-400 font-bold">
                            {Object.keys(FILES).map(f => <span key={f}>{f}</span>)}
                        </div>
                    );
                    break;

                case "whoami":
                    output = "user@portfolio:~/guest";
                    break;

                case "date":
                    output = new Date().toString();
                    break;

                case "clear":
                    setHistory([]);
                    setInput("");
                    return;

                case "exit":
                    setIsOpen(false);
                    setInput("");
                    return;

                case "sudo access":
                    output = <span className="text-red-500 font-bold blink">PERMISSION DENIED. INCIDENT REPORTED.</span>;
                    break;

                default:
                    if (lowerCmd.startsWith("cat ")) {
                        const file = cmd.split(" ")[1];
                        if (FILES[file as keyof typeof FILES]) {
                            output = <pre className="whitespace-pre-wrap text-cyan-100">{FILES[file as keyof typeof FILES]}</pre>;
                        } else {
                            output = <span className="text-red-400">Error: File not found: {file}</span>;
                        }
                    } else {
                        output = <span className="text-red-400">Command not found: {cmd}. Type 'help' for options.</span>;
                    }
            }
        }

        setHistory([...history, { cmd: input, output }]);
        setInput("");
    };

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 p-4 bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-cyan-900/40 hover:border-cyan-400 transition-all shadow-lg group"
                aria-label="Toggle Terminal"
            >
                <TerminalIcon className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-auto"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Terminal Window */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="w-full max-w-3xl bg-black/90 backdrop-blur-xl border border-white/15 rounded-lg overflow-hidden shadow-2xl font-mono text-sm md:text-base relative pointer-events-auto flex flex-col max-h-[80vh]"
                        >
                            {/* Terminal Header */}
                            <div
                                className="bg-white/5 border-b border-white/10 p-3 flex items-center justify-between select-none cursor-move text-slate-400"

                            >
                                <div className="flex items-center gap-2 group">
                                    <button onClick={() => setIsOpen(false)} className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
                                </div>
                                <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
                                    <TerminalIcon size={12} className="text-cyan-500" />
                                    <span>user@portfolio:~</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-500">
                                    <span className="text-[10px] hidden sm:inline-block">Alt + T to toggle</span>
                                </div>
                            </div>

                            {/* Terminal Body */}
                            <div
                                className="p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent flex-1 min-h-[300px]"
                                onClick={() => inputRef.current?.focus()}
                            >
                                {history.map((entry, i) => (
                                    <div key={i} className="mb-2">
                                        <div className="flex gap-2 text-slate-400">
                                            <span className="text-green-400">➜</span>
                                            <span className="text-cyan-400">~</span>
                                            <span className="text-slate-200">{entry.cmd}</span>
                                        </div>
                                        {entry.output && (
                                            <div className="pl-6 mt-1 text-slate-300 break-words output-text leading-relaxed">
                                                {entry.output}
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* Input Line with Suggestions */}
                                <div className="relative">
                                    <form onSubmit={handleCommand} className="flex gap-2 text-slate-400 items-center">
                                        <span className="text-green-400">➜</span>
                                        <span className="text-cyan-400">~</span>
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={input}
                                            onChange={handleInputChange}
                                            onKeyDown={handleKeyDown}
                                            className="bg-transparent outline-none border-none flex-1 text-slate-200 placeholder-white/20"
                                            autoFocus
                                            autoComplete="off"
                                            spellCheck="false"
                                        />
                                    </form>

                                    {/* Suggestions Grid */}
                                    {suggestions.length > 0 && (
                                        <div className="mt-2 ml-6 flex flex-wrap gap-2">
                                            {suggestions.map((suggestion, idx) => (
                                                <div
                                                    key={suggestion}
                                                    className={`px-2 py-1 rounded text-sm cursor-pointer transition-colors ${idx === suggestionIndex
                                                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50"
                                                        : "bg-white/5 text-slate-400 border border-white/5"
                                                        }`}
                                                    onClick={() => {
                                                        // Allow mouse click selection too
                                                        const curr = input.toLowerCase();
                                                        if (curr.startsWith("cat ")) {
                                                            setInput(`cat ${suggestion}`);
                                                        } else {
                                                            setInput(suggestion);
                                                        }
                                                        setSuggestions([]);
                                                        setSuggestionIndex(-1);
                                                        inputRef.current?.focus();
                                                    }}
                                                >
                                                    {suggestion}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div ref={bottomRef} />
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
