"use client";

import { HTMLMotionProps, motion, useMotionValue, useSpring } from "framer-motion";
import { MouseEvent, ReactNode, useRef } from "react";

export function MagneticButton({ children, className, onClick, ...props }: { children: ReactNode, className?: string, onClick?: () => void } & HTMLMotionProps<"div">) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    function onMouseMove({ clientX, clientY }: MouseEvent) {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();

        const center = { x: left + width / 2, y: top + height / 2 };

        // Calculate distance from center
        const distance = { x: clientX - center.x, y: clientY - center.y };

        // Move button slightly towards mouse (magnetic effect)
        x.set(distance.x * 0.15);
        y.set(distance.y * 0.15);
    }

    function onMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{ x: mouseX, y: mouseY }}
            className={className}
            onClick={onClick}
            {...props}
        >
            {children}
        </motion.div>
    );
}
