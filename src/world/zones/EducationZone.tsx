import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ANCHORS } from "../cameraPath";
import { WORLD } from "../palette";
import { makeGlowSprite, makeTextSprite } from "../sprites";

const Y = ANCHORS.branchY;
const Z = ANCHORS.branchZ;
const HEAD_X = 2;
const LINE_END_X = 10.5; // the line is still being written past HEAD
const MERGE_X = -4;

/**
 * Riding main: the camera rail is revealed to be the git history.
 * A side branch (school) merges in behind; HEAD -> main sits just ahead;
 * past it the line runs on, unfinished, ending in a blinking cursor.
 */
export function EducationZone() {
    const clock = useRef(0);
    const cursorRef = useRef<THREE.Mesh>(null);
    const headGlow = useMemo(() => makeGlowSprite(WORLD.accent, 0.85, 0.8), []);

    const mainLine = useMemo(() => {
        const curve = new THREE.LineCurve3(
            new THREE.Vector3(ANCHORS.branchStartX, Y, Z),
            new THREE.Vector3(LINE_END_X, Y, Z),
        );
        return new THREE.TubeGeometry(curve, 1, 0.018, 6, false);
    }, []);

    const sideBranch = useMemo(() => {
        const curve = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(-10, Y + 2.4, Z - 3),
            new THREE.Vector3(-6.5, Y, Z - 0.6),
            new THREE.Vector3(MERGE_X, Y, Z),
        );
        const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(40));
        const material = new THREE.LineBasicMaterial({
            color: WORLD.faint,
            transparent: true,
            opacity: 0.5,
            fog: true,
        });
        return new THREE.Line(geo, material);
    }, []);

    const nodeGeometry = useMemo(() => new THREE.EdgesGeometry(new THREE.OctahedronGeometry(0.18)), []);

    const labels = useMemo(() => {
        const head = makeTextSprite("HEAD -> main", { color: "#35f385", worldHeight: 0.26, weight: 700 });
        head.position.set(HEAD_X + 2.1, Y + 0.55, Z);
        const lpu = makeTextSprite("2023 – 2027 · b.tech cse", { color: "#a1afa6", worldHeight: 0.18 });
        lpu.position.set(HEAD_X + 0.4, Y - 0.85, Z);
        const school = makeTextSprite("2021 – 2023", { color: "#717e76", worldHeight: 0.18 });
        school.position.set(-7.4, Y + 1.5, Z - 1.8);
        const init = makeTextSprite("init", { color: "#4d5a52", worldHeight: 0.16 });
        init.position.set(-5.6, Y - 0.5, Z);
        return [head, lpu, school, init];
    }, []);

    useEffect(
        () => () => {
            mainLine.dispose();
            sideBranch.geometry.dispose();
            (sideBranch.material as THREE.Material).dispose();
            nodeGeometry.dispose();
        },
        [mainLine, sideBranch, nodeGeometry],
    );

    useFrame((_, rawDt) => {
        clock.current += Math.min(rawDt, 0.05);
        // The future blinks at the same cadence as the hero cursor.
        const on = clock.current % 1.1 < 0.6;
        if (cursorRef.current) {
            (cursorRef.current.material as THREE.MeshBasicMaterial).opacity = on ? 0.95 : 0.3;
        }
        headGlow.material.opacity = 0.55 + 0.25 * Math.sin((clock.current * Math.PI * 2) / 4);
    });

    const commits: { x: number; tier: "faint" | "muted" | "accent" }[] = [
        { x: -5.6, tier: "faint" },          // init
        { x: MERGE_X, tier: "muted" },       // school merges in
        { x: -1, tier: "faint" },
        { x: HEAD_X, tier: "accent" },       // enrollment, where we are
    ];

    return (
        <group>
            <mesh geometry={mainLine}>
                <meshBasicMaterial color={WORLD.faint} transparent opacity={0.7} fog />
            </mesh>
            <primitive object={sideBranch} />
            {commits.map((c) => (
                <lineSegments key={c.x} geometry={nodeGeometry} position={[c.x, Y, Z]}>
                    <lineBasicMaterial
                        color={c.tier === "accent" ? WORLD.accent : c.tier === "muted" ? WORLD.muted : WORLD.faint}
                        transparent
                        opacity={c.tier === "faint" ? 0.45 : 0.85}
                        fog
                    />
                </lineSegments>
            ))}
            <primitive object={headGlow} position={[HEAD_X, Y, Z]} />
            {/* the uncommitted future */}
            <mesh ref={cursorRef} position={[LINE_END_X + 0.35, Y, Z]}>
                <boxGeometry args={[0.18, 0.32, 0.06]} />
                <meshBasicMaterial color={WORLD.accent} transparent opacity={0.95} depthWrite={false} fog />
            </mesh>
            {labels.map((s, i) => (
                <primitive key={i} object={s} />
            ))}
        </group>
    );
}
