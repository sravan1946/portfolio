import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ANCHORS } from "../cameraPath";
import { WORLD } from "../palette";
import { makeGlowSprite, makeTextSprite } from "../sprites";

interface Node {
    label: string;
    pos: [number, number, number];
    dim?: boolean;     // ~/.ssh tier
    accent?: boolean;  // ~/.config/hypr
    note?: string;     // tiny secondary label ("700")
}

// Real paths only (honest-content law). Positions relative to the tree root.
const NODES: Node[] = [
    { label: "~", pos: [0, 0, 0] },
    { label: "~/dev", pos: [-2.2, -1.6, 0.6] },
    { label: "~/ctf", pos: [-0.7, -2.1, -0.8] },
    { label: "~/.config", pos: [1.6, -1.7, 0.3] },
    { label: "~/.config/hypr", pos: [2.6, -3.2, -0.4], accent: true },
    { label: "~/.ssh", pos: [0.4, -3.4, 0.9], dim: true, note: "700" },
];

const EDGES: [number, number][] = [
    [0, 1],
    [0, 2],
    [0, 3],
    [3, 4],
    [0, 5],
];

/**
 * $HOME: the home directory as a hanging tree. One accent glow in the
 * whole chamber: the hyprland config node, slowly pulsing.
 */
export function AboutZone() {
    const root = useMemo(() => new THREE.Vector3(...ANCHORS.homeTree), []);
    const hyprGlow = useMemo(() => makeGlowSprite(WORLD.accent, 0.9, 0.8), []);
    const clock = useRef(0);

    const edgeGeometry = useMemo(() => {
        const positions: number[] = [];
        for (const [a, b] of EDGES) {
            positions.push(...NODES[a].pos, ...NODES[b].pos);
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        return geo;
    }, []);

    const nodeGeometry = useMemo(() => new THREE.EdgesGeometry(new THREE.OctahedronGeometry(0.12)), []);

    const labels = useMemo(
        () =>
            NODES.map((n) => {
                const color = n.accent ? "#35f385" : n.dim ? "#4d5a52" : "#717e76";
                const sprite = makeTextSprite(n.label, { color, worldHeight: 0.22 });
                sprite.position.set(n.pos[0], n.pos[1] - 0.34, n.pos[2]);
                return sprite;
            }),
        [],
    );

    const noteSprites = useMemo(
        () =>
            NODES.filter((n) => n.note).map((n) => {
                const sprite = makeTextSprite(n.note!, { color: "#4d5a52", worldHeight: 0.14 });
                sprite.position.set(n.pos[0] + 0.55, n.pos[1] - 0.06, n.pos[2]);
                return sprite;
            }),
        [],
    );

    useEffect(
        () => () => {
            edgeGeometry.dispose();
            nodeGeometry.dispose();
        },
        [edgeGeometry, nodeGeometry],
    );

    useFrame((_, rawDt) => {
        clock.current += Math.min(rawDt, 0.05);
        // 2s pulse on the hypr node — the chamber's single accent.
        const pulse = 0.55 + 0.35 * (0.5 + 0.5 * Math.sin((clock.current * Math.PI * 2) / 2));
        hyprGlow.material.opacity = pulse;
    });

    const hypr = NODES.find((n) => n.accent)!;

    return (
        <group position={root}>
            <lineSegments geometry={edgeGeometry}>
                <lineBasicMaterial color={WORLD.faint} transparent opacity={0.5} fog />
            </lineSegments>
            {NODES.map((n) => (
                <lineSegments key={n.label} geometry={nodeGeometry} position={n.pos}>
                    <lineBasicMaterial
                        color={n.accent ? WORLD.accent : WORLD.muted}
                        transparent
                        opacity={n.dim ? 0.3 : n.accent ? 0.9 : 0.6}
                        fog
                    />
                </lineSegments>
            ))}
            <primitive object={hyprGlow} position={hypr.pos} />
            {labels.map((s, i) => (
                <primitive key={NODES[i].label} object={s} />
            ))}
            {noteSprites.map((s, i) => (
                <primitive key={`note-${i}`} object={s} />
            ))}
        </group>
    );
}
