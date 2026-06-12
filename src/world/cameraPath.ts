import * as THREE from "three";

/**
 * The journey: a descent through the machine.
 * POST grid → $HOME → process rack → dependency constellation →
 * riding the git main branch → network egress.
 *
 * Tagged points are camera poses for a section (1 = parked stop,
 * 2 = a slow dolly across the dwell). Untagged points shape transits
 * (hatch, aisle, veil, the bank onto main, the final rise).
 */

export type SectionId = "hero" | "about" | "projects" | "stack" | "education" | "contact";

export const SECTION_IDS: SectionId[] = ["hero", "about", "projects", "stack", "education", "contact"];

interface PathPoint {
    pos: [number, number, number];
    /** Present only on section stops. */
    section?: SectionId;
    look?: [number, number, number];
}

// Scene anchors that zones also build around.
export const ANCHORS = {
    gridY: 0,
    homeTree: [1.5, -7.2, -6] as const, // hangs from the chamber ceiling, above the content band
    rackBladeX: -4,                       // blades sit left of the aisle
    rackZ: [-16, -22, -28, -34] as const, // one per project
    constellation: [0, -10.5, -62] as const,
    branchY: -22,
    branchZ: -66,
    branchStartX: -6,
    branchEndX: 16,                       // where the unfinished line draws toward
    portRing: [12, -6, -90] as const,
};

const POINTS: PathPoint[] = [
    // 0 · HERO — hovering above the boot grid
    { pos: [0, 2.2, 9], section: "hero", look: [0, 0.6, 0] },
    // hatch descent through the grid
    { pos: [0, -3.5, 6] },
    // 1 · ABOUT — $HOME chamber, tree hanging overhead
    { pos: [-1.5, -9.5, 1], section: "about", look: [1.5, -9.4, -5] },
    // into the rack aisle
    { pos: [1.5, -11, -9] },
    // 2 · PROJECTS — slow dolly past the blades (left side)
    { pos: [2.5, -11, -13], section: "projects", look: [-4, -11, -19] },
    { pos: [2.5, -11, -31], section: "projects", look: [-4, -11, -37] },
    // through the point veil
    { pos: [1, -11, -42] },
    // 3 · STACK — open volume, constellations ahead
    { pos: [0, -10.5, -50], section: "stack", look: [0, -10.5, -62] },
    // the hinge: bank down onto the branch line
    { pos: [-4, -15, -58] },
    { pos: [-6, -20.5, -63] },
    // 4 · EDUCATION — riding main toward HEAD; the label stays right-of-center
    { pos: [-6, -20.4, -62.2], section: "education", look: [1, -22.3, -66.5] },
    { pos: [-1, -20.4, -62.2], section: "education", look: [6, -22.3, -66.5] },
    // rise toward egress, fog thinning
    { pos: [10.5, -14, -70] },
    // 5 · CONTACT — facing the port ring
    { pos: [12, -6, -80], section: "contact", look: [12, -6, -92] },
];

export interface StopInfo {
    section: SectionId;
    /** Arc-length curve parameter(s): [u] parked, [uA, uB] dolly. */
    u: number[];
    quaternions: THREE.Quaternion[];
    positions: THREE.Vector3[];
}

export interface CameraPath {
    curve: THREE.CatmullRomCurve3;
    stops: StopInfo[];
    /** Ordered tagged points: u + quaternion, for orientation blending. */
    keys: { u: number; q: THREE.Quaternion }[];
}

function quaternionFor(pos: THREE.Vector3, look: THREE.Vector3): THREE.Quaternion {
    const m = new THREE.Matrix4().lookAt(pos, look, new THREE.Vector3(0, 1, 0));
    return new THREE.Quaternion().setFromRotationMatrix(m);
}

export function buildCameraPath(): CameraPath {
    const vecs = POINTS.map((p) => new THREE.Vector3(...p.pos));
    const curve = new THREE.CatmullRomCurve3(vecs, false, "centripetal", 0.5);

    // Map each point index to its arc-length u by dense sampling.
    const SAMPLES = 600;
    const sampled: THREE.Vector3[] = [];
    for (let i = 0; i <= SAMPLES; i++) sampled.push(curve.getPointAt(i / SAMPLES));
    const uForIndex = (idx: number): number => {
        const target = vecs[idx];
        let best = 0;
        let bestD = Infinity;
        for (let i = 0; i <= SAMPLES; i++) {
            const d = sampled[i].distanceToSquared(target);
            if (d < bestD) {
                bestD = d;
                best = i / SAMPLES;
            }
        }
        return best;
    };

    const stops: StopInfo[] = [];
    const keys: { u: number; q: THREE.Quaternion }[] = [];

    POINTS.forEach((p, idx) => {
        if (!p.section || !p.look) return;
        const u = uForIndex(idx);
        const pos = vecs[idx];
        const q = quaternionFor(pos, new THREE.Vector3(...p.look));
        keys.push({ u, q });
        const existing = stops.find((s) => s.section === p.section);
        if (existing) {
            existing.u.push(u);
            existing.quaternions.push(q);
            existing.positions.push(pos);
        } else {
            stops.push({ section: p.section, u: [u], quaternions: [q], positions: [pos] });
        }
    });

    // Endpoint keys so orientation is defined over the full curve.
    if (keys[0].u > 0) keys.unshift({ u: 0, q: keys[0].q });
    if (keys[keys.length - 1].u < 1) keys.push({ u: 1, q: keys[keys.length - 1].q });

    return { curve, stops, keys };
}

export function smoothstep01(x: number): number {
    const t = Math.min(1, Math.max(0, x));
    return t * t * (3 - 2 * t);
}

/**
 * Piecewise scroll→curve remap with dwell plateaus.
 * Built from measured section scroll centers + the path's stop u values.
 * Keypoints are (scrollProgress, curveU) pairs; between keypoints we
 * smoothstep, which yields near-zero camera velocity inside dwells and
 * eased launches/arrivals through transits.
 */
export function buildRemap(
    centers: number[],            // per section, normalized scroll progress at section center
    stops: StopInfo[],
): (p: number) => number {
    const DWELL = 0.7; // fraction of each inter-section gap consumed by dwell
    const keypoints: [number, number][] = [];

    centers.forEach((c, i) => {
        const leftGap = i === 0 ? c : (c - centers[i - 1]) / 2;
        const rightGap = i === centers.length - 1 ? 1 - c : (centers[i + 1] - c) / 2;
        const us = stops[i].u;
        const uA = us[0];
        const uB = us[us.length - 1];
        keypoints.push([Math.max(0, c - DWELL * leftGap), uA]);
        keypoints.push([Math.min(1, c + DWELL * rightGap), uB]);
    });

    // Pin the ends.
    if (keypoints[0][0] > 0) keypoints.unshift([0, keypoints[0][1]]);
    else keypoints[0][0] = 0;
    if (keypoints[keypoints.length - 1][0] < 1) keypoints.push([1, keypoints[keypoints.length - 1][1]]);

    return (p: number): number => {
        const x = Math.min(1, Math.max(0, p));
        for (let i = 0; i < keypoints.length - 1; i++) {
            const [pa, ua] = keypoints[i];
            const [pb, ub] = keypoints[i + 1];
            if (x <= pb || i === keypoints.length - 2) {
                if (pb === pa) return ub;
                return ua + (ub - ua) * smoothstep01((x - pa) / (pb - pa));
            }
        }
        return keypoints[keypoints.length - 1][1];
    };
}

/** Orientation at curve u: slerp between surrounding tagged keys. */
export function orientationAt(
    keys: { u: number; q: THREE.Quaternion }[],
    u: number,
    out: THREE.Quaternion,
): THREE.Quaternion {
    for (let i = 0; i < keys.length - 1; i++) {
        const a = keys[i];
        const b = keys[i + 1];
        if (u <= b.u || i === keys.length - 2) {
            if (b.u === a.u) return out.copy(b.q);
            const t = smoothstep01((u - a.u) / (b.u - a.u));
            return out.copy(a.q).slerp(b.q, Math.min(1, Math.max(0, t)));
        }
    }
    return out.copy(keys[keys.length - 1].q);
}
