"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorPhase = "default" | "link" | "project" | "text" | "code" | "loading" | "disabled" | "grab" | "media" | "copy" | "external" | "submit" | "glitch" | "email";

export function CyberCursor() {
    const [phase, setPhase] = useState<CursorPhase>("default");
    const [glitchText, setGlitchText] = useState("");
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const isTouch = window.matchMedia("(pointer: coarse)").matches;
            setIsMobile(isTouch);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Spring configuration (snappier)
    const springConfig = { damping: 25, stiffness: 400, mass: 0.15 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (phase === "glitch") {
            const chars = "!@#$%^&*()<>?{}[]";
            interval = setInterval(() => {
                setGlitchText(
                    Array(3).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join("")
                );
            }, 100);
        }
        return () => clearInterval(interval);
    }, [phase]);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Check for explicit data-cursor attributes first (highest priority)
            const cursorType = target.closest("[data-cursor]")?.getAttribute("data-cursor");
            if (cursorType) {
                setPhase(cursorType as CursorPhase);
                return;
            }

            // Check standard interactive elements
            if (target.closest("a, button, .interactive")) {
                const el = target.closest("a, button") as HTMLAnchorElement | HTMLButtonElement;
                if (el instanceof HTMLAnchorElement && el.target === "_blank") {
                    setPhase("external");
                    return;
                }
                setPhase("link");
                return;
            }

            // Check if inside specific sections
            if (target.closest(".project-card")) {
                setPhase("project");
                return;
            }

            // Check for text inputs
            if (target.matches("input, textarea") || window.getComputedStyle(target).cursor === "text") {
                setPhase("text");
                return;
            }

            // Check for code blocks
            if (target.closest("pre, code")) {
                setPhase("code");
                return;
            }

            // Check for loading state
            if (target.matches("[aria-busy='true'], .loading")) {
                setPhase("loading");
                return;
            }

            // Check for disabled elements
            if (target.matches(":disabled, [aria-disabled='true'], .disabled")) {
                setPhase("disabled");
                return;
            }

            // Check for draggable elements
            if (target.matches("[draggable='true'], .grab, .dragger")) {
                setPhase("grab");
                return;
            }

            // Check for media elements
            if (target.closest("video, audio, .media")) {
                setPhase("media");
                return;
            }

            setPhase("default");
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY]);

    if (isMobile) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none flex items-center justify-center"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                translateX: "-50%",
                translateY: "-50%",
                zIndex: 2147483647 // Max Z-Index
            }}
        >
            {/* 
               Single persistent container.
               Content changes conditionally, but the container NEVER unmounts.
            */}

            <div className="flex items-center justify-center drop-shadow-[0_1px_4px_rgba(0,0,0,1)]">
                {/* Left Bracket / Icon */}
                <motion.span
                    animate={{
                        color: phase === "link" ? "#22d3ee" :
                            phase === "project" ? "#ffffff" :
                                phase === "code" ? "#4ade80" :
                                    phase === "disabled" ? "#ef4444" :
                                        phase === "loading" ? "#facc15" :
                                            phase === "grab" ? "#f97316" :
                                                phase === "media" ? "#a855f7" :
                                                    phase === "copy" ? "#10b981" :
                                                        phase === "external" ? "#818cf8" :
                                                            phase === "submit" ? "#22d3ee" :
                                                                phase === "glitch" ? "#f472b6" :
                                                                    phase === "email" ? "#22d3ee" :
                                                                        "#22d3ee",
                        scale: phase === "link" || phase === "media" ? 1.2 : 1
                    }}
                    className="font-mono text-xl mr-1 font-black drop-shadow-[0_0_5px_currentColor]"
                >
                    {phase === "project" ? "<" :
                        phase === "code" ? "{" :
                            phase === "media" ? "(" :
                                phase === "grab" ? "|" :
                                    phase === "external" ? "[" :
                                        phase === "copy" ? "[" :
                                            phase === "submit" ? "[" :
                                                phase === "glitch" ? ">" :
                                                    phase === "email" ? "[" :
                                                        phase === "link" ? "[" : "["}
                </motion.span>

                {/* Center Content */}
                <motion.div>
                    {phase === "default" && (
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-2 h-2 bg-white rounded-full shadow-[0_0_8px_white]"
                        />
                    )}
                    {phase === "link" && (
                        <span className="text-white font-mono text-sm font-bold shadow-white drop-shadow-[0_0_5px_white]">
                            CLICK
                        </span>
                    )}
                    {phase === "project" && (
                        <span className="text-white font-mono text-sm tracking-widest font-bold">VIEW</span>
                    )}
                    {phase === "text" && (
                        <span className="text-white font-mono text-sm font-bold">I</span>
                    )}
                    {phase === "code" && (
                        <div className="w-2 h-2 bg-green-400 rounded-full shadow-[0_0_8px_currentColor]" />
                    )}
                    {phase === "loading" && (
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full"
                        />
                    )}
                    {phase === "disabled" && (
                        <span className="text-red-500 font-mono text-sm font-bold">X</span>
                    )}
                    {phase === "grab" && (
                        <span className="text-orange-500 font-mono text-sm font-bold">::</span>
                    )}
                    {phase === "media" && (
                        <span className="text-purple-500 font-mono text-sm font-bold">▶</span>
                    )}
                    {phase === "copy" && (
                        <span className="text-green-400 font-mono text-sm font-bold">COPY</span>
                    )}
                    {phase === "external" && (
                        <span className="text-indigo-400 font-mono text-sm font-bold">↗</span>
                    )}
                    {phase === "submit" && (
                        <span className="text-cyan-400 font-mono text-sm font-bold">SEND</span>
                    )}
                    {phase === "glitch" && (
                        <span className="text-pink-400 font-mono text-sm font-bold">{glitchText}</span>
                    )}
                    {phase === "email" && (
                        <span className="text-cyan-400 font-mono text-sm font-bold drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]">EMAIL</span>
                    )}
                </motion.div>

                {/* Right Bracket / Icon */}
                <motion.span
                    animate={{
                        color: phase === "link" ? "#22d3ee" :
                            phase === "project" ? "#ffffff" :
                                phase === "code" ? "#4ade80" :
                                    phase === "disabled" ? "#ef4444" :
                                        phase === "loading" ? "#facc15" :
                                            phase === "grab" ? "#f97316" :
                                                phase === "media" ? "#a855f7" :
                                                    phase === "copy" ? "#10b981" :
                                                        phase === "external" ? "#818cf8" :
                                                            phase === "submit" ? "#22d3ee" :
                                                                phase === "glitch" ? "#f472b6" :
                                                                    "#22d3ee",
                        scale: phase === "link" || phase === "media" ? 1.2 : 1
                    }}
                    className="font-mono text-xl ml-1 font-black drop-shadow-[0_0_5px_currentColor]"
                >
                    {phase === "project" ? "/>" :
                        phase === "code" ? "}" :
                            phase === "media" ? ")" :
                                phase === "grab" ? "|" :
                                    phase === "external" ? "]" :
                                        phase === "copy" ? "]" :
                                            phase === "submit" ? "]" :
                                                phase === "glitch" ? "<" :
                                                    phase === "email" ? "]" :
                                                        phase === "link" ? "]" : "]"}
                </motion.span>
            </div >
        </motion.div >
    );
}
