import { useEffect, useMemo, useRef } from "react";
import { invalidate, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ANCHORS } from "../cameraPath";
import { WORLD } from "../palette";
import { makeGlowSprite } from "../sprites";

const RING = new THREE.Vector3(...ANCHORS.portRing);
const LAUNCH = new THREE.Vector3(RING.x, RING.y, RING.z + 5); // in front of the form
const PEER = new THREE.Vector3(RING.x + 7, RING.y + 3.5, RING.z - 24);

type PacketPhase = "idle" | "handshake" | "streak";

/**
 * Egress: the NIC. A port ring frames the contact form; far peer nodes
 * wait in deep fog. On a real form success, the message leaves the box:
 * a three-pulse handshake, then the brightest streak in the world.
 */
export function ContactZone() {
    const ringGeometry = useMemo(() => {
        const points = new THREE.EllipseCurve(0, 0, 2.4, 2.4, 0, Math.PI * 2, false, 0).getPoints(72);
        return new THREE.BufferGeometry().setFromPoints(points);
    }, []);
    const innerRingGeometry = useMemo(() => {
        const points = new THREE.EllipseCurve(0, 0, 2.0, 2.0, 0, Math.PI * 2, false, 0).getPoints(64);
        return new THREE.BufferGeometry().setFromPoints(points);
    }, []);

    const rings = useMemo(() => {
        const outer = new THREE.LineLoop(
            ringGeometry,
            new THREE.LineBasicMaterial({ color: WORLD.muted, transparent: true, opacity: 0.7, fog: true }),
        );
        const inner = new THREE.LineLoop(
            innerRingGeometry,
            new THREE.LineBasicMaterial({ color: WORLD.faint, transparent: true, opacity: 0.4, fog: true }),
        );
        outer.position.copy(RING);
        inner.position.copy(RING);
        return [outer, inner];
    }, [ringGeometry, innerRingGeometry]);

    // Far peers: sparse points deep in the fog.
    const peers = useMemo(() => {
        const rng = mulberry32(404);
        const positions: number[] = [];
        for (let i = 0; i < 26; i++) {
            positions.push(
                RING.x + (rng() - 0.5) * 36,
                RING.y + (rng() - 0.5) * 20,
                RING.z - 12 - rng() * 22,
            );
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({
            color: WORLD.faint,
            size: 0.3,
            transparent: true,
            opacity: 0.5,
            sizeAttenuation: true,
            fog: true,
        });
        return new THREE.Points(geo, material);
    }, []);

    const packetGlow = useMemo(() => makeGlowSprite(WORLD.accent, 0.9, 0), []);
    const packet = useRef<{ phase: PacketPhase; t: number }>({ phase: "idle", t: 0 });

    useEffect(() => {
        const onSend = () => {
            packet.current = { phase: "handshake", t: 0 };
            invalidate();
        };
        window.addEventListener("world:packet", onSend);
        return () => window.removeEventListener("world:packet", onSend);
    }, []);

    useEffect(
        () => () => {
            ringGeometry.dispose();
            innerRingGeometry.dispose();
            peers.geometry.dispose();
            (peers.material as THREE.Material).dispose();
            rings.forEach((r) => (r.material as THREE.Material).dispose());
        },
        [ringGeometry, innerRingGeometry, peers, rings],
    );

    useFrame((_, rawDt) => {
        const dt = Math.min(rawDt, 0.05);
        const p = packet.current;
        if (p.phase === "idle") {
            if (packetGlow.material.opacity > 0) packetGlow.material.opacity = 0;
            return;
        }

        p.t += dt;
        if (p.phase === "handshake") {
            // SYN / SYN-ACK / ACK: three ~120ms pulses alternating ends.
            const step = Math.floor(p.t / 0.12);
            if (step >= 3) {
                p.phase = "streak";
                p.t = 0;
            } else {
                packetGlow.position.copy(step % 2 === 0 ? LAUNCH : RING);
                packetGlow.scale.setScalar(0.7);
                packetGlow.material.opacity = 0.9 * (1 - (p.t % 0.12) / 0.12);
            }
            invalidate();
        }
        if (p.phase === "streak") {
            const k = Math.min(1, p.t / 1.6);
            const eased = 1 - Math.pow(1 - k, 2);
            // launch → through ring → far peer
            if (eased < 0.3) {
                packetGlow.position.lerpVectors(LAUNCH, RING, eased / 0.3);
            } else {
                packetGlow.position.lerpVectors(RING, PEER, (eased - 0.3) / 0.7);
            }
            packetGlow.scale.setScalar(0.9 - 0.5 * eased);
            packetGlow.material.opacity = k < 0.9 ? 1 : 1 - (k - 0.9) / 0.1;
            if (k >= 1) {
                p.phase = "idle";
                p.t = 0;
                packetGlow.material.opacity = 0;
            }
            invalidate();
        }
    });

    return (
        <group>
            <primitive object={rings[0]} />
            <primitive object={rings[1]} />
            <primitive object={peers} />
            <primitive object={packetGlow} />
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
