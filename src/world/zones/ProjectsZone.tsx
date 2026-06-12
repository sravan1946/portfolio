import { useEffect, useMemo, useRef } from "react";
import { invalidate, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PROJECTS } from "@/lib/data";
import { ANCHORS } from "../cameraPath";
import { WORLD } from "../palette";
import { makeGlowSprite } from "../sprites";

const BLADE = { w: 0.5, h: 5, d: 3.6 };

/**
 * The process rack: one wireframe blade per real repo. As the camera
 * comes abeam of a blade, an accent outline traces it once (a clone tick).
 * The archived repo never gets the trace; it idles dim with a single
 * amber point — the only amber in the whole world.
 */
export function ProjectsZone() {
    const bladeGeometry = useMemo(
        () => new THREE.EdgesGeometry(new THREE.BoxGeometry(BLADE.w, BLADE.h, BLADE.d)),
        [],
    );

    const traces = useRef(
        PROJECTS.map(() => ({ state: "idle" as "idle" | "tracing" | "done", t: 0 })),
    );
    const traceRefs = useRef<(THREE.LineSegments | null)[]>([]);

    const amber = useMemo(() => makeGlowSprite(WORLD.amber, 0.5, 0.75), []);

    useEffect(() => () => bladeGeometry.dispose(), [bladeGeometry]);

    const totalVerts = bladeGeometry.attributes.position.count;

    useFrame((state, rawDt) => {
        const dt = Math.min(rawDt, 0.05);
        const camZ = state.camera.position.z;
        const inAisle = camZ < -9 && camZ > -40;

        PROJECTS.forEach((p, i) => {
            const trace = traces.current[i];
            const mesh = traceRefs.current[i];
            if (!mesh) return;
            const material = mesh.material as THREE.LineBasicMaterial;

            if (!inAisle) {
                // left the rack: rearm so a second pass replays the ticks
                trace.state = "idle";
                trace.t = 0;
                material.opacity = 0;
                return;
            }
            if (p.status === "archived") return; // never traced

            if (trace.state === "idle" && Math.abs(camZ - ANCHORS.rackZ[i]) < 1.6) {
                trace.state = "tracing";
                trace.t = 0;
            }
            if (trace.state === "tracing") {
                trace.t += dt / 0.8;
                const eased = 1 - Math.pow(1 - Math.min(1, trace.t), 2);
                mesh.geometry.setDrawRange(0, Math.floor((totalVerts * eased) / 2) * 2);
                material.opacity = 0.9;
                if (trace.t >= 1) {
                    trace.state = "done";
                    trace.t = 0;
                }
                invalidate();
            } else if (trace.state === "done" && material.opacity > 0) {
                trace.t += dt / 0.6;
                material.opacity = Math.max(0, 0.9 * (1 - trace.t));
                invalidate();
            }
        });
    });

    const archivedIndex = PROJECTS.findIndex((p) => p.status === "archived");

    return (
        <group>
            {PROJECTS.map((p, i) => (
                <group key={p.title} position={[ANCHORS.rackBladeX, -11, ANCHORS.rackZ[i]]}>
                    <lineSegments geometry={bladeGeometry}>
                        <lineBasicMaterial
                            color={WORLD.faint}
                            transparent
                            opacity={p.status === "archived" ? 0.28 : 0.55}
                            fog
                        />
                    </lineSegments>
                    <lineSegments
                        geometry={bladeGeometry.clone()}
                        ref={(el) => {
                            traceRefs.current[i] = el;
                        }}
                    >
                        <lineBasicMaterial color={WORLD.accent} transparent opacity={0} fog />
                    </lineSegments>
                </group>
            ))}
            {archivedIndex >= 0 && (
                <primitive
                    object={amber}
                    position={[ANCHORS.rackBladeX, -11 + BLADE.h / 2 - 0.4, ANCHORS.rackZ[archivedIndex] + BLADE.d / 2 - 0.4]}
                />
            )}
        </group>
    );
}
