import * as THREE from "three";

/**
 * Mono text label rendered to a canvas texture. Uses the page's already
 * loaded Martian Mono, so no extra font fetch for the world.
 */
export function makeTextSprite(
    text: string,
    opts: { color?: string; worldHeight?: number; weight?: number } = {},
): THREE.Sprite {
    const { color = "#a1afa6", worldHeight = 0.28, weight = 500 } = opts;
    const px = 56;
    const pad = 12;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const font = `${weight} ${px}px "Martian Mono", monospace`;
    ctx.font = font;
    const w = Math.ceil(ctx.measureText(text).width) + pad * 2;
    const h = px + pad * 2;
    canvas.width = w;
    canvas.height = h;
    const ctx2 = canvas.getContext("2d")!;
    ctx2.font = font;
    ctx2.fillStyle = color;
    ctx2.textBaseline = "middle";
    ctx2.fillText(text, pad, h / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
        fog: true,
    });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(worldHeight * (w / h), worldHeight, 1);
    return sprite;
}

let glowTexture: THREE.Texture | null = null;

/** Shared radial-falloff texture: the local "phosphor glow" (no postprocessing). */
export function getGlowTexture(): THREE.Texture {
    if (glowTexture) return glowTexture;
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.25, "rgba(255,255,255,0.5)");
    g.addColorStop(0.6, "rgba(255,255,255,0.12)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    glowTexture = new THREE.CanvasTexture(canvas);
    glowTexture.colorSpace = THREE.SRGBColorSpace;
    return glowTexture;
}

export function makeGlowSprite(color: number, scale: number, opacity = 0.9): THREE.Sprite {
    const material = new THREE.SpriteMaterial({
        map: getGlowTexture(),
        color,
        transparent: true,
        opacity,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        fog: true,
    });
    const sprite = new THREE.Sprite(material);
    sprite.scale.setScalar(scale);
    return sprite;
}
