import { useEffect, useMemo, useRef } from "react";
import { invalidate, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { WORLD } from "../palette";
import { makeGlowSprite } from "../sprites";

const EXTENT = 60;
const CELL = 2.5;
const HATCH = { x: 0, z: 7, r: 4.5 }; // hole the camera descends through

/**
 * POST: a void, one blinking cursor, and a floor grid that draws itself
 * outward from beneath it. The grid's outer edge is deliberately
 * unfinished; a hatch gap near the descent point lets the camera through.
 */
export function HeroZone() {
    const lines = useRef<THREE.LineSegments>(null);
    const cursor = useMemo(() => makeGlowSprite(WORLD.accent, 1.1), []);
    const boot = useRef({ t: 0, done: false });
    const clock = useRef(0);

    const geometry = useMemo(() => {
        const positions: number[] = [];
        const half = EXTENT / 2;
        const rng = mulberry32(1337);
        const keep = (x: number, z: number) => {
            const dHatch = Math.hypot(x - HATCH.x, z - HATCH.z);
            if (dHatch < HATCH.r) return false;
            const dCenter = Math.hypot(x, z);
            // unfinished outer ring: drop ~35% of far segments
            if (dCenter > half * 0.72 && rng() < 0.35) return false;
            return true;
        };
        for (let x = -half; x <= half; x += CELL) {
            for (let z = -half; z < half; z += CELL) {
                if (keep(x, z + CELL / 2)) positions.push(x, 0, z, x, 0, z + CELL);
            }
        }
        for (let z = -half; z <= half; z += CELL) {
            for (let x = -half; x < half; x += CELL) {
                if (keep(x + CELL / 2, z)) positions.push(x, 0, z, x + CELL, 0, z);
            }
        }

        // Sort segments by distance from origin so drawRange grows outward.
        const segments: number[][] = [];
        for (let i = 0; i < positions.length; i += 6) segments.push(positions.slice(i, i + 6));
        segments.sort((a, b) => Math.hypot(a[0], a[2]) - Math.hypot(b[0], b[2]));

        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.Float32BufferAttribute(segments.flat(), 3));
        return geo;
    }, []);

    useEffect(() => () => geometry.dispose(), [geometry]);

    const totalVerts = geometry.attributes.position.count;

    useFrame((_, rawDt) => {
        const dt = Math.min(rawDt, 0.05);
        clock.current += dt;

        // cursor blink (step, like a terminal)
        const blinkOn = clock.current % 1.1 < 0.6;
        cursor.material.opacity = blinkOn ? 0.95 : 0.15;

        if (!boot.current.done && lines.current) {
            boot.current.t += dt / 1.6; // 1.6s draw-in
            const eased = 1 - Math.pow(1 - Math.min(1, boot.current.t), 3);
            const verts = Math.floor((totalVerts * eased) / 2) * 2;
            lines.current.geometry.setDrawRange(0, verts);
            if (boot.current.t >= 1) boot.current.done = true;
            invalidate();
        }
    });

    return (
        <group>
            <lineSegments ref={lines} geometry={geometry}>
                <lineBasicMaterial color={WORLD.faint} transparent opacity={0.55} fog />
            </lineSegments>
            <primitive object={cursor} position={[0, 0.55, 0]} />
        </group>
    );
}

// Tiny deterministic PRNG so the "unfinished" edge is stable across renders.
function mulberry32(seed: number) {
    let a = seed;
    return () => {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}
