import { useEffect, useMemo, useRef } from "react";
import { invalidate, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { damp } from "maath/easing";
import { onScrollWake, scrollBus } from "./scrollBus";
import { buildRemap, orientationAt, type CameraPath } from "./cameraPath";

const MAX_LOOK_YAW = 0.026;   // ~1.5°, cursor reaction ceiling
const MAX_LOOK_PITCH = 0.018;
const IDLE_FPS_MS = 66;       // idle drift renders at ~15fps

/** Exposes the damped curve parameter so zones can react to camera proximity. */
export const rigState = {
    u: 0,
};

export function CameraRig({ centers, path }: { centers: number[]; path: CameraPath }) {
    const camera = useThree((s) => s.camera);
    const remap = useMemo(() => buildRemap(centers, path.stops), [centers, path]);

    const progress = useRef({ p: scrollBus.progress });
    const pointer = useRef({ x: 0, y: 0, ox: 0, oy: 0 });
    const clock = useRef(0);
    const idleTimer = useRef(0);

    const tmpQ = useMemo(() => new THREE.Quaternion(), []);
    const offsetQ = useMemo(() => new THREE.Quaternion(), []);
    const offsetE = useMemo(() => new THREE.Euler(), []);

    useEffect(() => onScrollWake(() => invalidate()), []);

    // Wake one frame when the tab becomes visible again (idle loop self-stops
    // while hidden, so it needs a kick to resume).
    useEffect(() => {
        const onVisible = () => {
            if (!document.hidden) invalidate();
        };
        document.addEventListener("visibilitychange", onVisible);
        return () => document.removeEventListener("visibilitychange", onVisible);
    }, []);

    useEffect(() => {
        const onMove = (e: PointerEvent) => {
            pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
            invalidate();
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
    }, []);

    useEffect(() => () => window.clearTimeout(idleTimer.current), []);

    useFrame((_, rawDt) => {
        const dt = Math.min(rawDt, 0.05);
        clock.current += dt;

        damp(progress.current, "p", scrollBus.progress, 0.18, dt);
        const u = remap(progress.current.p);
        rigState.u = u;

        path.curve.getPointAt(u, camera.position);
        orientationAt(path.keys, u, tmpQ);

        // Cursor look-at offset (damped) + idle sine drift, both tiny.
        damp(pointer.current, "ox", pointer.current.x * MAX_LOOK_YAW, 0.35, dt);
        damp(pointer.current, "oy", pointer.current.y * MAX_LOOK_PITCH, 0.35, dt);
        const t = clock.current;
        const driftYaw = Math.sin((t * Math.PI * 2) / 11) * 0.004;
        const driftPitch = Math.sin((t * Math.PI * 2) / 13 + 1.7) * 0.003;
        offsetE.set(-pointer.current.oy + driftPitch, -pointer.current.ox + driftYaw, 0);
        offsetQ.setFromEuler(offsetE);
        camera.quaternion.copy(tmpQ).multiply(offsetQ);

        const settling = Math.abs(progress.current.p - scrollBus.progress) > 1e-5;
        if (settling) {
            invalidate();
        } else if (!idleTimer.current && !scrollBus.suspended && !document.hidden) {
            // Self-throttled heartbeat keeps the idle drift breathing cheaply.
            idleTimer.current = window.setTimeout(() => {
                idleTimer.current = 0;
                if (!scrollBus.suspended && !document.hidden) invalidate();
            }, IDLE_FPS_MS);
        }
    });

    return null;
}
