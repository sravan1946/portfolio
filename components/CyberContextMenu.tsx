"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, RotateCw, Terminal as TerminalIcon, Home, Briefcase, User, Copy, Share2 } from "lucide-react";

export function CyberContextMenu() {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            setVisible(true);
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleClick = () => setVisible(false);
        const handleScroll = () => setVisible(false);

        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("click", handleClick);
        document.addEventListener("scroll", handleScroll);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("click", handleClick);
            document.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Adjust position if menu goes offscreen
    const menuStyle = {
        top: position.y,
        left: position.x,
    };

    if (typeof window !== "undefined") {
        if (position.x + 200 > window.innerWidth) {
            menuStyle.left = position.x - 200;
        }
        if (position.y + 250 > window.innerHeight) {
            menuStyle.top = position.y - 250;
        }
    }

    const items = [
        { label: "Back", icon: ArrowLeft, action: () => window.history.back(), shortcut: "Alt+Left" },
        { label: "Forward", icon: ArrowRight, action: () => window.history.forward(), shortcut: "Alt+Right" },
        { label: "Reload", icon: RotateCw, action: () => window.location.reload(), shortcut: "Ctrl+R" },
        { type: "separator" },
        { label: "Home", icon: Home, action: () => window.location.href = "/", shortcut: "Alt+H" },
        { label: "Projects", icon: Briefcase, action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }), shortcut: "Alt+P" },
        { label: "About", icon: User, action: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }), shortcut: "Alt+A" },
        { type: "separator" },
        { label: "Copy Signal", icon: Copy, action: () => navigator.clipboard.writeText(window.location.href), shortcut: "Ctrl+C" },
    ];

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    ref={menuRef}
                    initial={{ opacity: 0, scale: 0.9, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 5 }}
                    transition={{ duration: 0.1 }}
                    style={{ position: 'fixed', ...menuStyle, zIndex: 99999 }}
                    className="w-56 bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden py-1"
                >
                    {items.map((item, index) => {
                        if (item.type === "separator") {
                            return <div key={index} className="h-px bg-white/10 my-1 mx-2" />;
                        }

                        const Icon = item.icon as any;

                        return (
                            <button
                                key={index}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    item.action?.();
                                    setVisible(false);
                                }}
                                className="w-full px-3 py-2 flex items-center justify-between text-sm text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400 group transition-colors text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <Icon size={14} className="text-slate-500 group-hover:text-cyan-400 button-icon" />
                                    <span>{item.label}</span>
                                </div>
                                {item.shortcut && (
                                    <span className="text-[10px] text-slate-600 font-mono group-hover:text-cyan-600/50">{item.shortcut}</span>
                                )}
                            </button>
                        );
                    })}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
