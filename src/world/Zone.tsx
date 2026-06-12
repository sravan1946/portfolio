import { ReactNode, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { rigState } from "./CameraRig";

/**
 * Visibility culling on top of fog: a zone only renders while the camera's
 * curve parameter is inside its window. Fog (colored to --bg) makes the
 * toggle invisible.
 */
export function Zone({
    uRange,
    pad = 0.16,
    children,
}: {
    uRange: [number, number];
    pad?: number;
    children: ReactNode;
}) {
    const ref = useRef<THREE.Group>(null);
    useFrame(() => {
        const g = ref.current;
        if (!g) return;
        const visible = rigState.u > uRange[0] - pad && rigState.u < uRange[1] + pad;
        if (g.visible !== visible) g.visible = visible;
    });
    return <group ref={ref}>{children}</group>;
}
