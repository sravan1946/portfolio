"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorPhase = "default" | "link" | "project" | "text" | "code" | "loading" | "disabled" | "grab" | "media" | "copy" | "external" | "submit" | "glitch" | "email";

// Extracted cursor config — single source of truth for color, brackets, and content
const CURSOR_CONFIG: Record<CursorPhase, { color: string; left: string; right: string }> = {
    default:  { color: "#22d3ee", left: "[",  right: "]"  },
    link:     { color: "#22d3ee", left: "[",  right: "]"  },
    project:  { color: "#ffffff", left: "<",  right: "/>" },
    text:     { color: "#22d3ee", left: "[",  right: "]"  },
    code:     { color: "#4ade80", left: "{",  right: "}"  },
    loading:  { color: "#facc15", left: "[",  right: "]"  },
    disabled: { color: "#ef4444", left: "[",  right: "]"  },
    grab:     { color: "#f97316", left: "|",  right: "|"  },
    media:    { color: "#a855f7", left: "(",  right: ")"  },
    copy:     { color: "#10b981", left: "[",  right: "]"  },
    external: { color: "#818cf8", left: "[",  right: "]"  },
    submit:   { color: "#22d3ee", left: "[",  right: "]"  },
    glitch:   { color: "#f472b6", left: ">",  right: "<"  },
    email:    { color: "#22d3ee", left: "[",  right: "]"  },
};

export function CyberCursor() {
    const [phase, setPhase] = useState<CursorPhase>("default");
    const [glitchText, setGlitchText] = useState("");
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const isTouch = window.matchMedia("(pointer: coarse)").matches;
            setIsMobile(isTouch);
            
            // Apply cursor-none-active only on non-touch devices
            if (!isTouch) {
                document.documentElement.classList.add("cursor-none-active");
            } else {
                document.documentElement.classList.remove("cursor-none-active");
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => {
            window.removeEventListener('resize', checkMobile);
            document.documentElement.classList.remove("cursor-none-active");
        };
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

    const config = CURSOR_CONFIG[phase];
    const scaleUp = phase === "link" || phase === "media";

    // Content renderer for the center of the cursor
    const renderContent = () => {
        switch (phase) {
            case "default":
                return (
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 bg-white rounded-full shadow-[0_0_8px_white]"
                    />
                );
            case "link":
                return <span className="text-white font-mono text-sm font-bold shadow-white drop-shadow-[0_0_5px_white]">CLICK</span>;
            case "project":
                return <span className="text-white font-mono text-sm tracking-widest font-bold">VIEW</span>;
            case "text":
                return <span className="text-white font-mono text-sm font-bold">I</span>;
            case "code":
                return <div className="w-2 h-2 bg-green-400 rounded-full shadow-[0_0_8px_currentColor]" />;
            case "loading":
                return (
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full"
                    />
                );
            case "disabled":
                return <span className="text-red-500 font-mono text-sm font-bold">X</span>;
            case "grab":
                return <span className="text-orange-500 font-mono text-sm font-bold">::</span>;
            case "media":
                return <span className="text-purple-500 font-mono text-sm font-bold">▶</span>;
            case "copy":
                return <span className="text-green-400 font-mono text-sm font-bold">COPY</span>;
            case "external":
                return <span className="text-indigo-400 font-mono text-sm font-bold">↗</span>;
            case "submit":
                return <span className="text-cyan-400 font-mono text-sm font-bold">SEND</span>;
            case "glitch":
                return <span className="text-pink-400 font-mono text-sm font-bold">{glitchText}</span>;
            case "email":
                return <span className="text-cyan-400 font-mono text-sm font-bold drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]">EMAIL</span>;
        }
    };

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
            <div className="flex items-center justify-center drop-shadow-[0_1px_4px_rgba(0,0,0,1)]">
                {/* Left Bracket */}
                <motion.span
                    animate={{
                        color: config.color,
                        scale: scaleUp ? 1.2 : 1
                    }}
                    className="font-mono text-xl mr-1 font-black drop-shadow-[0_0_5px_currentColor]"
                >
                    {config.left}
                </motion.span>

                {/* Center Content */}
                <motion.div>
                    {renderContent()}
                </motion.div>

                {/* Right Bracket */}
                <motion.span
                    animate={{
                        color: config.color,
                        scale: scaleUp ? 1.2 : 1
                    }}
                    className="font-mono text-xl ml-1 font-black drop-shadow-[0_0_5px_currentColor]"
                >
                    {config.right}
                </motion.span>
            </div>
        </motion.div>
    );
}
