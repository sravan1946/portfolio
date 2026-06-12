// Module-level scroll state shared between Lenis (DOM side) and the
// camera rig (canvas side). A mutable ref, never React state: the camera
// reads it inside useFrame and must not cause re-renders.

export const scrollBus = {
    /** Normalized page scroll progress, 0..1. */
    progress: 0,
    /** Lenis scroll velocity (px/frame-ish), for ambient effects. */
    velocity: 0,
    /** True while an overlay (Terminal) parks the page: idle rendering pauses. */
    suspended: false,
};

type Listener = () => void;
const listeners = new Set<Listener>();

/** The canvas registers its invalidate() here; lenis pokes it on scroll. */
export function onScrollWake(fn: Listener) {
    listeners.add(fn);
    return () => {
        listeners.delete(fn);
    };
}

export function publishScroll(progress: number, velocity: number) {
    scrollBus.progress = progress;
    scrollBus.velocity = velocity;
    listeners.forEach((fn) => fn());
}
