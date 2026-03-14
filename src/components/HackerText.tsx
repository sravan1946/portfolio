"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface HackerTextProps {
    text: string;
    className?: string;
}

const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>/?~0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function HackerText({ text, className = "" }: HackerTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isHovered) {
            let iteration = 0;

            interval = setInterval(() => {
                setDisplayText((prev) =>
                    text
                        .split("")
                        .map((letter, index) => {
                            if (index < iteration) {
                                return text[index];
                            }
                            return CHARS[Math.floor(Math.random() * CHARS.length)];
                        })
                        .join("")
                );

                if (iteration >= text.length) {
                    clearInterval(interval);
                }

                iteration += 1 / 3;
            }, 30);
        } else {
            setDisplayText(text);
        }

        return () => clearInterval(interval);
    }, [isHovered, text]);

    return (
        <motion.span
            className={className}
            onMouseEnter={() => setIsHovered(true)}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            onViewportEnter={() => setIsHovered(true)} // Trigger once when scrolled into view
        >
            {displayText}
        </motion.span>
    );
}
