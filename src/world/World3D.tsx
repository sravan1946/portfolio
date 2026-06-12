import { useEffect, useMemo, useState } from "react";
import { Canvas, invalidate, useThree } from "@react-three/fiber";
import { buildCameraPath, type SectionId } from "./cameraPath";
import { BootHUD } from "./BootHUD";
import { useSectionCenters } from "./useSectionWaypoints";
import { CameraRig } from "./CameraRig";
import { Zone } from "./Zone";
import { WORLD } from "./palette";
import { HeroZone } from "./zones/HeroZone";
import { AboutZone } from "./zones/AboutZone";
import { ProjectsZone } from "./zones/ProjectsZone";
import { StackZone } from "./zones/StackZone";
import { EducationZone } from "./zones/EducationZone";
import { ContactZone } from "./zones/ContactZone";

/** Pre-compiles the scene, then renders one frame and reports readiness. */
function ReadySignal({ onReady }: { onReady: () => void }) {
    const gl = useThree((s) => s.gl);
    const scene = useThree((s) => s.scene);
    const camera = useThree((s) => s.camera);
    useEffect(() => {
        let cancelled = false;
        const compiled: Promise<unknown> = gl.compileAsync
            ? gl.compileAsync(scene, camera)
            : Promise.resolve();
        compiled
            .catch(() => undefined)
            .then(() => {
                if (cancelled) return;
                invalidate();
                onReady();
            });
        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return null;
}

export default function World3D() {
    const centers = useSectionCenters();
    const path = useMemo(() => buildCameraPath(), []);
    const [ready, setReady] = useState(false);

    const range = (id: SectionId): [number, number] => {
        const stop = path.stops.find((s) => s.section === id)!;
        return [stop.u[0], stop.u[stop.u.length - 1]];
    };

    if (!centers) return null;

    // Static quality ladder: weak hardware gets a lower pixel-ratio ceiling.
    // (drei's PerformanceMonitor mis-measures under frameloop="demand".)
    const maxDpr = (navigator.hardwareConcurrency ?? 8) <= 4 ? 1.25 : 1.75;

    return (
        <>
        <div
            className="fixed inset-0 z-0 pointer-events-none"
            aria-hidden="true"
            style={{ opacity: ready ? 1 : 0, transition: "opacity 600ms ease-out" }}
        >
            <Canvas
                frameloop="demand"
                dpr={[1, maxDpr]}
                camera={{ fov: 55, near: 0.1, far: 90, position: [0, 2.2, 9] }}
                gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
                onCreated={({ gl }) => {
                    gl.setClearColor(WORLD.bg);
                    gl.domElement.addEventListener("webglcontextlost", (e) => {
                        e.preventDefault();
                        // GPU gave up: fall back to the flat site silently.
                        window.dispatchEvent(new Event("world:dead"));
                    });
                }}
            >
                <ReadySignal onReady={() => setReady(true)} />
                <fogExp2 attach="fog" args={[WORLD.bg, 0.026]} />
                <CameraRig centers={centers} path={path} />
                <Zone uRange={range("hero")} pad={0.2}>
                    <HeroZone />
                </Zone>
                <Zone uRange={range("about")}>
                    <AboutZone />
                </Zone>
                <Zone uRange={range("projects")}>
                    <ProjectsZone />
                </Zone>
                <Zone uRange={range("stack")}>
                    <StackZone uRange={range("stack")} />
                </Zone>
                <Zone uRange={range("education")}>
                    <EducationZone />
                </Zone>
                <Zone uRange={range("contact")} pad={0.2}>
                    <ContactZone />
                </Zone>
            </Canvas>
        </div>
        <BootHUD ready={ready} />
        </>
    );
}
