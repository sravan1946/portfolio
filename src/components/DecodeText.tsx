import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const CHARS = "!<>-_\\/[]{}=+*^?#abcdefghijklmnopqrstuvwxyz0123456789";

function scramble(text: string) {
    return text
        .split("")
        .map((ch) => (ch === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]))
        .join("");
}

interface DecodeTextProps {
    text: string;
    /** Decode begins when this flips to true. */
    start?: boolean;
    /** Re-scramble on hover after the initial decode. */
    redecodeOnHover?: boolean;
    className?: string;
    onDone?: () => void;
}

/**
 * The site's one signature effect: text resolves out of scrambled
 * characters, left to right. Holds layout (mono-friendly) and renders
 * the plain string immediately under prefers-reduced-motion.
 */
export function DecodeText({ text, start = true, redecodeOnHover = false, className, onDone }: DecodeTextProps) {
    const reduced = useReducedMotion();
    const [display, setDisplay] = useState(() => scramble(text));
    const [done, setDone] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const onDoneRef = useRef(onDone);
    onDoneRef.current = onDone;

    const run = (fromHover: boolean) => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        let iteration = 0;
        intervalRef.current = setInterval(() => {
            setDisplay(
                text
                    .split("")
                    .map((ch, i) => (ch === " " ? " " : i < iteration ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]))
                    .join("")
            );
            if (iteration >= text.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setDone(true);
                if (!fromHover) onDoneRef.current?.();
            }
            iteration += 1 / 2;
        }, 26);
    };

    useEffect(() => {
        if (!start) return;
        if (reduced) {
            setDisplay(text);
            setDone(true);
            onDoneRef.current?.();
            return;
        }
        run(false);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [start, reduced, text]);

    return (
        <span
            aria-label={text}
            className={className}
            style={{ visibility: start || reduced ? "visible" : "hidden" }}
            onMouseEnter={redecodeOnHover && done && !reduced ? () => run(true) : undefined}
        >
            <span aria-hidden="true">{display}</span>
        </span>
    );
}
