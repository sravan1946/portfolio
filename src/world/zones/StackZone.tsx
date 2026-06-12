import { useEffect, useMemo, useRef } from "react";
import { invalidate, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { FULL_TECH_STACK } from "@/lib/data";
import { ANCHORS } from "../cameraPath";
import { WORLD } from "../palette";
import { rigState } from "../CameraRig";
import { makeGlowSprite, makeTextSprite } from "../sprites";

// Cluster layout relative to the constellation anchor.
// Clusters live in the top-left / bottom-center / top-right bands so the
// full-width DOM panel keeps a clear exclusion zone in the middle.
const CLUSTERS: Record<string, [number, number, number]> = {
    langs: [-8, 4.2, 0],
    infra: [0, -4.5, -2],
    sec: [8, 4, 0.5],
};

const MEMBERS: Record<string, string[]> = {
    langs: ["Python", "Dart", "Flutter", "Bash"],
    infra: ["GitHub", "Docker", "Firebase", "Cloudflare"],
    sec: ["Linux", "Arch Linux", "Hyprland", "Burp Suite"],
};

// Node offsets within a cluster (asterism shapes, not blobs).
const OFFSETS: [number, number, number][] = [
    [0, 1.1, 0],
    [-1.4, -0.4, 0.5],
    [1.3, -0.2, -0.4],
    [0.2, -1.3, 0.6],
];

const CROSS_LINKS: [string, string][] = [
    ["Python", "Burp Suite"],
    ["Arch Linux", "GitHub"],
];

interface NodeDef {
    name: string;
    target: THREE.Vector3;
    seed: THREE.Vector3;
}

/**
 * The dependency constellation: scattered points sort themselves into
 * three asterisms as the camera arrives. Hovering a tool in the DOM list
 * pings its node (the section's only accent).
 */
export function StackZone({ uRange }: { uRange: [number, number] }) {
    const anchor = useMemo(() => new THREE.Vector3(...ANCHORS.constellation), []);

    const nodes = useMemo<NodeDef[]>(() => {
        const rng = mulberry32(2026);
        const defs: NodeDef[] = [];
        (Object.keys(MEMBERS) as (keyof typeof MEMBERS)[]).forEach((cluster) => {
            MEMBERS[cluster].forEach((name, i) => {
                const c = CLUSTERS[cluster];
                const o = OFFSETS[i];
                defs.push({
                    name,
                    target: new THREE.Vector3(c[0] + o[0], c[1] + o[1], c[2] + o[2]),
                    seed: new THREE.Vector3((rng() - 0.5) * 26, (rng() - 0.5) * 14, (rng() - 0.5) * 18),
                });
            });
        });
        return defs;
    }, []);

    const nodeGeometry = useMemo(() => new THREE.EdgesGeometry(new THREE.OctahedronGeometry(0.16)), []);
    const groupRefs = useRef<(THREE.Group | null)[]>([]);
    const edgesRef = useRef<THREE.LineSegments>(null);
    const sort = useRef({ t: 0, active: false, done: false });
    const ping = useRef<{ index: number; t: number } | null>(null);
    const pingGlow = useMemo(() => makeGlowSprite(WORLD.accent, 1.0, 0), []);

    const labels = useMemo(
        () =>
            nodes.map((n) => {
                const sprite = makeTextSprite(n.name.toLowerCase(), { color: "#717e76", worldHeight: 0.2 });
                sprite.position.copy(n.target).add(new THREE.Vector3(0, -0.42, 0));
                return sprite;
            }),
        [nodes],
    );

    // intra-cluster edges + two deliberate cross-links
    const edgePairs = useMemo(() => {
        const indexOf = (name: string) => nodes.findIndex((n) => n.name === name);
        const pairs: [number, number][] = [];
        (Object.keys(MEMBERS) as (keyof typeof MEMBERS)[]).forEach((cluster) => {
            const ids = MEMBERS[cluster].map(indexOf);
            for (let i = 0; i < ids.length - 1; i++) pairs.push([ids[i], ids[i + 1]]);
            pairs.push([ids[0], ids[ids.length - 1]]);
        });
        CROSS_LINKS.forEach(([a, b]) => pairs.push([indexOf(a), indexOf(b)]));
        return pairs;
    }, [nodes]);

    const edgeGeometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.Float32BufferAttribute(edgePairs.length * 6, 3));
        return geo;
    }, [edgePairs]);

    // DOM → world handshake: TechStack rows dispatch world:ping on hover.
    useEffect(() => {
        const onPing = (e: Event) => {
            const name = (e as CustomEvent<string>).detail;
            const index = nodes.findIndex((n) => n.name === name);
            if (index >= 0 && sort.current.done) {
                ping.current = { index, t: 0 };
                invalidate();
            }
        };
        window.addEventListener("world:ping", onPing);
        return () => window.removeEventListener("world:ping", onPing);
    }, [nodes]);

    useEffect(
        () => () => {
            nodeGeometry.dispose();
            edgeGeometry.dispose();
        },
        [nodeGeometry, edgeGeometry],
    );

    useFrame((_, rawDt) => {
        const dt = Math.min(rawDt, 0.05);
        const s = sort.current;

        if (!s.active && !s.done && rigState.u > uRange[0] - 0.1) {
            s.active = true;
        }
        if (s.active && !s.done) {
            s.t += dt / 1.2;
            if (s.t >= 1) {
                s.t = 1;
                s.done = true;
                s.active = false;
            }
            invalidate();
        }
        const eased = 1 - Math.pow(1 - Math.min(1, s.t), 3);

        const positions = edgeGeometry.attributes.position as THREE.BufferAttribute;
        nodes.forEach((n, i) => {
            const g = groupRefs.current[i];
            if (!g) return;
            g.position.lerpVectors(n.seed, n.target, eased);
        });
        edgePairs.forEach(([a, b], i) => {
            const ga = groupRefs.current[a];
            const gb = groupRefs.current[b];
            if (!ga || !gb) return;
            positions.setXYZ(i * 2, ga.position.x, ga.position.y, ga.position.z);
            positions.setXYZ(i * 2 + 1, gb.position.x, gb.position.y, gb.position.z);
        });
        positions.needsUpdate = true;
        if (edgesRef.current) {
            (edgesRef.current.material as THREE.LineBasicMaterial).opacity = 0.35 * eased;
        }

        // labels fade in only once sorted
        labels.forEach((l) => {
            (l.material as THREE.SpriteMaterial).opacity = eased;
        });

        if (ping.current) {
            ping.current.t += dt / 0.6;
            const p = ping.current;
            const node = groupRefs.current[p.index];
            if (node && p.t < 1) {
                pingGlow.position.copy(node.position);
                pingGlow.material.opacity = 0.85 * Math.sin(Math.PI * Math.min(1, p.t));
                pingGlow.scale.setScalar(0.7 + 0.9 * p.t);
                invalidate();
            } else {
                pingGlow.material.opacity = 0;
                ping.current = null;
            }
        }
    });

    return (
        <group position={anchor}>
            <lineSegments ref={edgesRef} geometry={edgeGeometry}>
                <lineBasicMaterial color={WORLD.faint} transparent opacity={0} fog />
            </lineSegments>
            {nodes.map((n, i) => (
                <group
                    key={n.name}
                    ref={(el) => {
                        groupRefs.current[i] = el;
                    }}
                >
                    <lineSegments geometry={nodeGeometry}>
                        <lineBasicMaterial color={WORLD.muted} transparent opacity={0.65} fog />
                    </lineSegments>
                </group>
            ))}
            {labels.map((s, i) => (
                <primitive key={nodes[i].name} object={s} />
            ))}
            <primitive object={pingGlow} />
        </group>
    );
}

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
