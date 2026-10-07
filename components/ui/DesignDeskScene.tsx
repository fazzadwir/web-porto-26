"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { ConvexGeometry } from "three/examples/jsm/geometries/ConvexGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

// Stylized palette — matches the site's category colors
const C = {
  ink: 0x1d1d22,
  desk: 0xf2c38b,
  deskEdge: 0xd99a5b,
  silver: 0xdcdce6,
  silverDark: 0xb9b9c6,
  purple: 0x666bea,
  green: 0x28dfa1,
  leaf: 0x1fb37f,
  lime: 0xdafa4d,
  coral: 0xff6b6b,
  orange: 0xffaa00,
  cream: 0xfaf9f6,
  pot: 0xe07a5f,
  soil: 0x5b3a29,
  blue: 0x0d99ff,
  gray: 0xc9c5c3,
  floor: 0xc4875a,
  wallBack: 0xf3e9dc,
  wallSide: 0xe6d6c3,
  frame: 0xfdfbf7,
  chair: 0x3a3a44,
  bamboo: 0xc8a070,
  sage: 0xa9c4a0,
  sageLight: 0xbad3b1,
  lampGreen: 0x6f8f6a,
  mint: 0x9fd8c0,
  rope: 0x8a6a4a,
  monstera: 0x2f8f5b,
};

/** Golden-hour outdoor view seen through the window: sky, low sun, clouds, hills, trees. */
function drawView(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 400;
  const g = c.getContext("2d")!;
  const sky = g.createLinearGradient(0, 0, 0, 400);
  sky.addColorStop(0, "#8f86d6");
  sky.addColorStop(0.35, "#f6a38a");
  sky.addColorStop(0.7, "#ffc978");
  sky.addColorStop(1, "#ffe3a6");
  g.fillStyle = sky;
  g.fillRect(0, 0, 512, 400);
  // Low sun + glow
  const glow = g.createRadialGradient(330, 245, 10, 330, 245, 170);
  glow.addColorStop(0, "rgba(255,244,204,1)");
  glow.addColorStop(1, "rgba(255,244,204,0)");
  g.fillStyle = glow;
  g.fillRect(0, 0, 512, 400);
  g.fillStyle = "#fff4cc";
  g.beginPath();
  g.arc(330, 245, 34, 0, Math.PI * 2);
  g.fill();
  // Clouds
  g.fillStyle = "rgba(255,214,184,0.9)";
  for (const [x, y, s] of [[90, 90, 1], [250, 55, 0.7], [420, 150, 0.8]]) {
    for (const [dx, dy, r] of [[0, 0, 26], [28, -12, 30], [58, 0, 24], [30, 8, 22]]) {
      g.beginPath();
      g.arc(x + dx * s, y + dy * s, r * s, 0, Math.PI * 2);
      g.fill();
    }
  }
  // Hills
  const hill = (color: string, base: number, amp: number, freq: number, phase: number) => {
    g.fillStyle = color;
    g.beginPath();
    g.moveTo(0, 400);
    for (let x = 0; x <= 512; x += 8) g.lineTo(x, base - Math.sin(x * freq + phase) * amp);
    g.lineTo(512, 400);
    g.fill();
  };
  hill("#d39a8c", 280, 26, 0.012, 0.5);
  hill("#b07a7e", 318, 22, 0.018, 2);
  hill("#82606f", 356, 18, 0.024, 4);
  // Tree silhouettes on the nearest hill
  g.fillStyle = "#5e4a5c";
  for (let x = 12; x < 512; x += 38) {
    const y = 356 - Math.sin(x * 0.024 + 4) * 18;
    const h = 26 + (x % 3) * 8;
    g.beginPath();
    g.moveTo(x, y - h);
    g.lineTo(x - 9, y + 4);
    g.lineTo(x + 9, y + 4);
    g.fill();
  }
  return canvasTexture(c);
}

/** Wood planks with grain; seams adds plank gaps and staggered end joints. */
function drawWood(rgb: [number, number, number], planks: number, seams: boolean): THREE.CanvasTexture {
  const S = 512;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const g = c.getContext("2d")!;
  const pw = S / planks;
  for (let i = 0; i < planks; i++) {
    const shade = 1 + Math.sin(i * 12.9898) * 0.06;
    g.fillStyle = `rgb(${rgb.map((v) => Math.min(255, Math.round(v * shade))).join(",")})`;
    g.fillRect(i * pw, 0, pw, S);
    g.strokeStyle = "rgba(90,50,20,0.12)";
    g.lineWidth = 1.5;
    for (let k = 0; k < 6; k++) {
      const x0 = i * pw + ((k + 0.5) / 6) * pw;
      g.beginPath();
      for (let y = 0; y <= S; y += 16) g.lineTo(x0 + Math.sin(y * 0.02 + i * 3 + k) * 3, y);
      g.stroke();
    }
    if (seams) {
      g.fillStyle = "rgba(60,30,10,0.35)";
      g.fillRect(i * pw, 0, 2, S);
      g.fillRect(i * pw, ((Math.sin(i * 78.233) + 1) / 2) * S, pw, 2);
    }
  }
  const tex = canvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

/** UX wireframe sketch on paper, pinned to the wall. */
function drawWireframe(variant: number): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 340;
  const g = c.getContext("2d")!;
  g.fillStyle = "#fffdf6";
  g.fillRect(0, 0, 256, 340);
  g.strokeStyle = "#5d5d6b";
  g.lineWidth = 4;
  g.lineCap = "round";
  g.beginPath();
  g.roundRect(64, 28, 128, 280, 18);
  g.stroke();
  const line = (x: number, y: number, w: number) => {
    g.beginPath();
    g.moveTo(x, y);
    g.lineTo(x + w, y);
    g.stroke();
  };
  if (variant === 0) {
    g.strokeRect(80, 60, 96, 70);
    g.beginPath();
    g.moveTo(80, 60);
    g.lineTo(176, 130);
    g.moveTo(176, 60);
    g.lineTo(80, 130);
    g.stroke();
    line(80, 155, 90);
    line(80, 175, 60);
    g.fillStyle = "#666bea";
    g.beginPath();
    g.roundRect(80, 255, 96, 26, 13);
    g.fill();
  } else {
    for (let i = 0; i < 5; i++) {
      g.beginPath();
      g.arc(92, 70 + i * 46, 12, 0, Math.PI * 2);
      g.stroke();
      line(114, 64 + i * 46, 60);
      line(114, 80 + i * 46, 40);
    }
  }
  return canvasTexture(c);
}

function canvasTexture(c: HTMLCanvasElement): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

/** Simple typography poster for the side wall. */
function drawPoster(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 300;
  c.height = 400;
  const g = c.getContext("2d")!;
  g.fillStyle = "#666bea";
  g.fillRect(0, 0, 300, 400);
  g.fillStyle = "#dafa4d";
  g.beginPath();
  g.arc(210, 110, 70, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = "#FF6B6B";
  g.fillRect(40, 220, 90, 90);
  g.fillStyle = "#FAF9F6";
  g.font = "900 120px sans-serif";
  g.fillText("Aa", 30, 170);
  g.fillRect(40, 340, 200, 14);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Fake Figma-like UI drawn onto the laptop screen. */
function drawScreen(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 644;
  const g = c.getContext("2d")!;
  const rr = (x: number, y: number, w: number, h: number, r: number, fill: string) => {
    g.fillStyle = fill;
    g.beginPath();
    g.roundRect(x, y, w, h, r);
    g.fill();
  };

  rr(0, 0, 1024, 644, 0, "#1e1e24");
  // Toolbar
  rr(0, 0, 1024, 44, 0, "#2c2c34");
  ["#FF6B6B", "#ffaa00", "#28dfa1"].forEach((col, i) => rr(16 + i * 22, 16, 12, 12, 6, col));
  rr(420, 12, 184, 20, 10, "#3a3a44");
  // Layers panel
  rr(0, 44, 180, 600, 0, "#25252c");
  for (let i = 0; i < 9; i++) rr(18, 70 + i * 36, i % 3 === 0 ? 120 : 96, 12, 6, i === 2 ? "#666bea" : "#3d3d47");
  // Properties panel
  rr(844, 44, 180, 600, 0, "#25252c");
  ["#666bea", "#28dfa1", "#dafa4d", "#FF6B6B", "#ffaa00"].forEach((col, i) =>
    rr(864 + (i % 3) * 48, 80 + Math.floor(i / 3) * 48, 36, 36, 8, col),
  );
  for (let i = 0; i < 5; i++) rr(864, 200 + i * 34, i % 2 ? 100 : 140, 12, 6, "#3d3d47");
  // Artboard
  rr(220, 80, 584, 520, 14, "#FAF9F6");
  rr(220, 80, 584, 64, 14, "#666bea");
  rr(220, 124, 584, 20, 0, "#666bea");
  rr(244, 104, 120, 16, 8, "#ffffff");
  rr(244, 168, 300, 180, 14, "#28dfa1");
  rr(264, 290, 140, 16, 8, "#064f3e");
  rr(264, 316, 90, 12, 6, "#064f3e");
  rr(564, 168, 216, 84, 14, "#dafa4d");
  rr(564, 264, 216, 84, 14, "#FF6B6B");
  rr(244, 372, 536, 204, 14, "#ffffff");
  [70, 120, 95, 150, 110, 170, 130, 160].forEach((h, i) =>
    rr(272 + i * 62, 556 - h, 36, h, 8, i % 2 ? "#666bea" : "#a5a8f5"),
  );
  // Selection box + handles
  g.strokeStyle = "#0d99ff";
  g.lineWidth = 3;
  g.strokeRect(560, 164, 224, 92);
  for (const [x, y] of [[560, 164], [784, 164], [560, 256], [784, 256]]) {
    g.fillStyle = "#ffffff";
    g.fillRect(x - 6, y - 6, 12, 12);
    g.strokeRect(x - 6, y - 6, 12, 12);
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

export default function DesignDeskScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── Renderer / scene / camera ───────────────────────────
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    // Neutral tone mapping keeps the palette saturated (ACES washes it out)
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    // Soft image-based light so nothing falls into flat black
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envMap;
    scene.environmentIntensity = 0.3;

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 200);
    const target = new THREE.Vector3(0.6, 0.4, 0.2);
    const mobileTarget = new THREE.Vector3(0.2, 0.9, 0);
    const camDir = new THREE.Vector3(0.55, 0.5, 1).normalize();

    scene.add(new THREE.HemisphereLight(0xffdcb8, 0x7a4a30, 0.8));
    const fill = new THREE.DirectionalLight(0xffe8d0, 0.6);
    fill.position.set(6, 8, 10);
    scene.add(fill);

    // ── Materials: soft, slightly glossy "clay" look ────────
    const mats = new Map<number, THREE.MeshStandardMaterial>();
    const mat = (color: number) => {
      if (!mats.has(color)) mats.set(color, new THREE.MeshStandardMaterial({ color, roughness: 0.62 }));
      return mats.get(color)!;
    };

    const part = (geo: THREE.BufferGeometry, look: number | THREE.Material) => {
      const mesh = new THREE.Mesh(geo, typeof look === "number" ? mat(look) : look);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      return mesh;
    };

    const rbox = (w: number, h: number, d: number, r = 0.08) =>
      new RoundedBoxGeometry(w, h, d, 3, Math.min(r, Math.min(w, h, d) / 2 - 0.001));

    const at = <T extends THREE.Object3D>(obj: T, x: number, y: number, z: number, ry = 0): T => {
      obj.position.set(x, y, z);
      obj.rotation.y = ry;
      return obj;
    };

    const glowMat = (color: number, intensity: number) =>
      new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: intensity });

    const root = new THREE.Group();
    scene.add(root);

    // ── Room: floor, back wall with window opening, side wall ──
    const FLOOR = -2.6;
    const wall = (w: number, h: number, d: number, color: number, x: number, y: number, z: number) =>
      at(part(new THREE.BoxGeometry(w, h, d), color), x, y, z);
    // Floor and walls run far past the frame so the room fills the whole viewport.
    const FAR = 40;
    const TOP = 20;
    const wallH = TOP - FLOOR;
    const floorTex = drawWood([196, 135, 90], 6, true);
    floorTex.repeat.set((FAR + 6.3) / 4.2, (FAR + 3.35) / 5);
    const floor = at(
      part(new THREE.BoxGeometry(FAR + 6.3, 0.4, FAR + 3.35), new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.55 })),
      (FAR - 6.3) / 2,
      FLOOR - 0.2,
      (FAR - 3.35) / 2,
    );
    floor.castShadow = false;
    root.add(floor);
    // Back wall (inner face z = -3.05): one slab with the window cut out (x 0.9..4.3, y 0.6..3.6)
    const backShape = new THREE.Shape()
      .moveTo(-6.3, FLOOR)
      .lineTo(FAR, FLOOR)
      .lineTo(FAR, TOP)
      .lineTo(-6.3, TOP)
      .closePath();
    backShape.holes.push(new THREE.Path().moveTo(0.9, 0.6).lineTo(0.9, 3.6).lineTo(4.3, 3.6).lineTo(4.3, 0.6).closePath());
    const backWall = at(part(new THREE.ExtrudeGeometry(backShape, { depth: 0.3, bevelEnabled: false }), C.wallBack), 0, 0, -3.35);
    // Inner faces point away from the sun: skip receiving shadows (avoids acne stripes)
    backWall.receiveShadow = false;
    root.add(backWall);
    // Side wall (inner face x = -6)
    const sideWall = wall(0.3, wallH, FAR + 3.35, C.wallSide, -6.15, (TOP + FLOOR) / 2, (FAR - 3.35) / 2);
    sideWall.receiveShadow = false;
    root.add(sideWall);
    // Ceiling: keeps the sun from leaking in over the walls (never in frame)
    root.add(wall(FAR + 6.3, 0.3, FAR + 3.35, C.wallBack, (FAR - 6.3) / 2, TOP + 0.15, (FAR - 3.35) / 2));

    // Window view, frame, mullions, sill and rolled bamboo blind
    const viewTex = drawView();
    const view = new THREE.Mesh(new THREE.PlaneGeometry(6, 4.6), new THREE.MeshBasicMaterial({ map: viewTex, toneMapped: false }));
    root.add(at(view, 2.6, 2.1, -3.8));
    root.add(at(part(rbox(3.6, 0.16, 0.36, 0.04), C.frame), 2.6, 3.6, -3.1));
    root.add(at(part(rbox(3.9, 0.16, 0.6, 0.04), C.frame), 2.6, 0.55, -2.95));
    root.add(at(part(rbox(0.16, 3.2, 0.36, 0.04), C.frame), 0.9, 2.1, -3.1));
    root.add(at(part(rbox(0.16, 3.2, 0.36, 0.04), C.frame), 4.3, 2.1, -3.1));
    root.add(at(part(rbox(0.1, 3.0, 0.12, 0.03), C.frame), 2.6, 2.1, -3.15));
    root.add(at(part(rbox(3.4, 0.1, 0.12, 0.03), C.frame), 2.6, 2.1, -3.15));
    root.add(at(part(new THREE.CylinderGeometry(0.2, 0.2, 3.8, 20).rotateZ(Math.PI / 2), C.bamboo), 2.6, 3.88, -2.85));

    // Golden-hour sun entering through the window (only shadow-casting light,
    // so the wall blocks it and a sun patch lands on the desk/floor)
    const sun = new THREE.DirectionalLight(0xff9e4f, 5);
    sun.position.set(1.2, 9, -12); // x < target.x: side wall faces away, never sun-lit
    sun.target.position.set(2.2, FLOOR, 1.5);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.bias = -0.0005;
    sun.shadow.normalBias = 0.02;
    Object.assign(sun.shadow.camera, { left: -28, right: 28, top: 28, bottom: -28, near: 1, far: 60 });
    root.add(sun, sun.target);

    // Warm bounce glow around the window so the room reads bright, not backlit
    const windowGlow = new THREE.PointLight(0xff9a50, 26, 14, 1.6);
    root.add(at(windowGlow, 2.6, 2.2, -1.8));

    // Visible light shaft: window rectangle projected along the sun direction to the floor
    const sunDir = sun.target.position.clone().sub(sun.position).normalize();
    const shaftPts: THREE.Vector3[] = [];
    for (const [x, y] of [[1.0, 0.65], [4.2, 0.65], [1.0, 3.55], [4.2, 3.55]]) {
      const top = new THREE.Vector3(x, y, -3.05);
      shaftPts.push(top, top.clone().addScaledVector(sunDir, (y - FLOOR) / -sunDir.y));
    }
    const shaft = new THREE.Mesh(
      new ConvexGeometry(shaftPts),
      new THREE.MeshBasicMaterial({
        color: 0xffc87a,
        transparent: true,
        opacity: 0.08,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    root.add(shaft);

    // Shelf with books + poster on the side wall
    root.add(at(part(rbox(0.6, 0.1, 2.4, 0.04), C.frame), -5.7, 2.4, 0.2));
    [[0.7, C.coral], [0.85, C.purple], [0.6, C.lime], [0.75, C.green], [0.5, C.orange]].forEach(([h, color], i) => {
      root.add(at(part(rbox(0.42, h, 0.2, 0.03), color), -5.72, 2.45 + h / 2, -0.7 + i * 0.24));
    });
    root.add(at(part(new THREE.SphereGeometry(0.22, 24, 16), glowMat(0xffd9a0, 1.6)), -5.7, 2.67, 0.95));
    const posterTex = drawPoster();
    root.add(at(part(rbox(0.08, 2.0, 1.55, 0.03), C.ink), -5.96, 2.1, 2.7));
    const poster = new THREE.Mesh(new THREE.PlaneGeometry(1.35, 1.8), new THREE.MeshStandardMaterial({ map: posterTex, roughness: 0.8 }));
    root.add(at(poster, -5.91, 2.1, 2.7, Math.PI / 2));

    // Wireframe sketches pinned on the back wall
    const wireTex = [drawWireframe(0), drawWireframe(1)];
    const pins = [C.coral, C.purple, C.green, C.orange, C.blue];
    [[-5.0, 2.7, 0.05], [-3.9, 3.0, -0.04], [-2.8, 2.6, 0.06], [-4.5, 1.3, -0.05]].forEach(([x, y, rz], i) => {
      const paper = new THREE.Mesh(
        new THREE.PlaneGeometry(0.9, 1.2),
        new THREE.MeshStandardMaterial({ map: wireTex[i % 2], roughness: 0.9 }),
      );
      paper.rotation.z = rz;
      paper.receiveShadow = true;
      root.add(at(paper, x, y, -3.04));
      root.add(at(part(new THREE.SphereGeometry(0.05, 12, 8), pins[i]), x, y + 0.52, -3.0));
    });

    // Rug
    const rug = part(new THREE.CylinderGeometry(2.3, 2.3, 0.04, 48).scale(1.4, 1, 1), C.purple);
    root.add(at(rug, -0.2, FLOOR + 0.02, 3.0));

    // Floor plant (monstera) in the front-left corner
    const monstera = at(new THREE.Group(), -5.0, FLOOR, 3.4);
    monstera.add(at(part(new THREE.CylinderGeometry(0.6, 0.45, 1.1, 24), C.cream), 0, 0.55, 0));
    monstera.add(at(part(new THREE.CylinderGeometry(0.55, 0.55, 0.05, 24), C.soil), 0, 1.08, 0));
    const bigLeaf = new THREE.SphereGeometry(0.5, 20, 14).scale(1, 0.12, 1.3).translate(0, 0, 0.6);
    for (let i = 0; i < 7; i++) {
      const stem = at(new THREE.Group(), 0, 1.1 + (i % 3) * 0.35, 0, (i / 7) * Math.PI * 2);
      const leaf = part(bigLeaf, i % 2 ? C.monstera : C.leaf);
      leaf.rotation.x = -0.5 + (i % 3) * 0.25;
      leaf.position.y = 0.6;
      stem.add(leaf);
      monstera.add(stem);
    }
    root.add(monstera);

    // Hanging plant left of the window, vines trailing down
    const hanging = at(new THREE.Group(), 0.2, 3.5, -2.4);
    hanging.add(at(part(new THREE.SphereGeometry(0.35, 20, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), C.pot), 0, 0, 0));
    hanging.add(at(part(new THREE.CylinderGeometry(0.008, 0.008, 6, 4), C.rope), 0, 3, 0));
    const smallLeaf = new THREE.SphereGeometry(0.11, 10, 8).scale(1, 0.35, 1.4);
    // Strands drape outward and end at different lengths
    [5, 8, 4, 7, 6].forEach((len, strand) => {
      const a = (strand / 5) * Math.PI * 2 + 0.4;
      for (let k = 0; k < len; k++) {
        const leaf = part(smallLeaf, k % 2 ? C.leaf : C.green);
        leaf.rotation.set(0.5, a + (k % 2 ? 1.2 : -1.2), 0.4);
        const r = 0.3 + k * 0.05;
        hanging.add(at(leaf, Math.cos(a) * r, -0.05 - k * 0.2, Math.sin(a) * r));
      }
    });
    root.add(hanging);

    // ── Desk ────────────────────────────────────────────────
    const deskTex = drawWood([242, 195, 139], 4, false);
    root.add(at(part(rbox(9, 0.35, 5, 0.15), new THREE.MeshStandardMaterial({ map: deskTex, roughness: 0.5 })), 0, -0.175, 0));
    root.add(at(part(rbox(8.6, 0.25, 4.6, 0.1), C.deskEdge), 0, -0.45, 0));
    for (const [x, z] of [[-4.1, -2.0], [4.1, -2.0], [-4.1, 2.0], [4.1, 2.0]]) {
      root.add(at(part(rbox(0.28, 2.05, 0.28, 0.06), C.deskEdge), x, (FLOOR - 0.575) / 2, z));
    }

    // Drawer cabinet under the desk (left)
    const cabinet = at(new THREE.Group(), -3.0, FLOOR, -0.6);
    cabinet.add(at(part(rbox(1.7, 1.95, 1.9, 0.08), C.sage), 0, 0.975, 0));
    for (let i = 0; i < 3; i++) {
      cabinet.add(at(part(rbox(1.5, 0.52, 0.06, 0.025), C.sageLight), 0, 0.38 + i * 0.6, 0.97));
      cabinet.add(at(part(rbox(0.5, 0.07, 0.07, 0.03), C.silverDark), 0, 0.52 + i * 0.6, 1.02));
    }
    root.add(cabinet);

    // ── Office chair (facing the desk) ──────────────────────
    const chair = at(new THREE.Group(), -0.3, FLOOR, 3.5, 0.25);
    for (let i = 0; i < 5; i++) {
      const arm = at(new THREE.Group(), 0, 0.25, 0, (i / 5) * Math.PI * 2);
      arm.add(at(part(rbox(0.9, 0.12, 0.18, 0.05), C.chair), 0.45, 0, 0));
      arm.add(at(part(new THREE.SphereGeometry(0.12, 12, 8), C.ink), 0.85, -0.13, 0));
      chair.add(arm);
    }
    chair.add(at(part(new THREE.CylinderGeometry(0.09, 0.09, 1.1, 12), C.silverDark), 0, 0.8, 0));
    chair.add(at(part(rbox(1.5, 0.26, 1.4, 0.12), C.purple), 0, 1.45, 0));
    const back = at(part(rbox(1.4, 1.6, 0.22, 0.1), C.purple), 0, 2.45, 0.68);
    back.rotation.x = 0.12;
    chair.add(back);
    for (const x of [-0.78, 0.78]) {
      chair.add(at(part(rbox(0.1, 0.5, 0.1, 0.04), C.chair), x, 1.75, 0.1));
      chair.add(at(part(rbox(0.16, 0.08, 0.8, 0.04), C.chair), x, 2.02, 0.05));
    }
    root.add(chair);

    // ── Laptop ──────────────────────────────────────────────
    const screenTex = drawScreen();
    const laptop = at(new THREE.Group(), -0.3, 0, 0.1, 0.12);
    const aluminium = new THREE.MeshStandardMaterial({ color: C.silver, roughness: 0.35, metalness: 0.4 });
    laptop.add(at(part(rbox(3.2, 0.16, 2.2), aluminium), 0, 0.08, 0));
    laptop.add(at(part(rbox(2.7, 0.03, 0.95, 0.012), C.ink), 0, 0.17, -0.35));
    laptop.add(at(part(rbox(1.0, 0.02, 0.6, 0.008), C.silverDark), 0, 0.165, 0.6));
    const hinge = at(new THREE.Group(), 0, 0.16, -1.08);
    hinge.rotation.x = -0.28;
    hinge.add(at(part(rbox(3.2, 2.1, 0.1, 0.045), aluminium), 0, 1.05, 0));
    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(2.96, 1.86),
      new THREE.MeshBasicMaterial({ map: screenTex, toneMapped: false }),
    );
    hinge.add(at(screen, 0, 1.05, 0.052));
    laptop.add(hinge);
    root.add(laptop);

    // ── Desk lamp (left), with a real warm light ────────────
    const lamp = at(new THREE.Group(), -3.9, 0, -1.9, -0.4);
    lamp.add(at(part(new THREE.CylinderGeometry(0.4, 0.45, 0.12, 24), C.lampGreen), 0, 0.06, 0));
    const lower = at(new THREE.Group(), 0, 0.12, 0);
    lower.rotation.z = -0.35;
    lower.add(at(part(new THREE.CylinderGeometry(0.05, 0.05, 1.8, 10), C.lampGreen), 0, 0.9, 0));
    const elbow = at(new THREE.Group(), 0, 1.8, 0);
    elbow.add(part(new THREE.SphereGeometry(0.09, 12, 8), C.lampGreen));
    const upper = new THREE.Group();
    upper.rotation.z = -1.5;
    upper.add(at(part(new THREE.CylinderGeometry(0.045, 0.045, 1.3, 10), C.lampGreen), 0, 0.65, 0));
    const head = at(new THREE.Group(), 0, 1.3, 0);
    head.rotation.z = -0.9;
    const shadeMat = new THREE.MeshStandardMaterial({ color: C.lampGreen, roughness: 0.5, side: THREE.DoubleSide });
    head.add(at(part(new THREE.ConeGeometry(0.42, 0.55, 28, 1, true).rotateZ(Math.PI), shadeMat), 0, 0.3, 0));
    head.add(at(part(new THREE.SphereGeometry(0.15, 16, 12), glowMat(0xffe0a8, 3)), 0, 0.42, 0));
    const lampLight = new THREE.PointLight(0xffb870, 18, 7, 1.6);
    head.add(at(lampLight, 0, 0.7, 0));
    upper.add(head);
    elbow.add(upper);
    lower.add(elbow);
    lamp.add(lower);
    root.add(lamp);

    // ── Pencil cup + book stack ─────────────────────────────
    const cup = at(new THREE.Group(), -3.7, 0, -0.55);
    cup.add(at(part(new THREE.CylinderGeometry(0.3, 0.27, 0.65, 20), C.mint), 0, 0.325, 0));
    [C.orange, C.purple, C.coral, C.green].forEach((color, i) => {
      const p = part(new THREE.CylinderGeometry(0.035, 0.035, 1.0, 6), color);
      p.rotation.set(Math.cos(i * 1.6) * 0.18, 0, Math.sin(i * 1.6) * 0.18);
      cup.add(at(p, Math.cos(i * 1.6) * 0.1, 0.75, Math.sin(i * 1.6) * 0.1));
    });
    root.add(cup);

    const books = at(new THREE.Group(), 3.9, 0, -0.45, 0.15);
    [[C.purple, 0.05], [C.green, -0.08], [C.coral, 0.1]].forEach(([color, rot], i) => {
      const book = at(new THREE.Group(), 0, 0.09 + i * 0.19, 0, rot);
      book.add(part(rbox(1.1, 0.18, 0.75, 0.03), color));
      book.add(at(part(rbox(1.04, 0.13, 0.04, 0.015), C.cream), 0, 0, 0.36));
      books.add(book);
    });
    root.add(books);

    // ── Pen tablet + stylus ─────────────────────────────────
    const tablet = at(new THREE.Group(), 2.9, 0, 0.8, -0.3);
    tablet.add(at(part(rbox(2.0, 0.1, 1.4, 0.045), C.ink), 0, 0.05, 0));
    tablet.add(at(part(rbox(1.5, 0.02, 1.05, 0.008), 0x3a3a44), 0.15, 0.105, 0));
    const stylus = at(new THREE.Group(), 0.1, 0.2, 0.1, 0.6);
    stylus.add(part(new THREE.CylinderGeometry(0.06, 0.06, 1.5, 12).rotateZ(Math.PI / 2), C.purple));
    stylus.add(at(part(new THREE.ConeGeometry(0.06, 0.22, 12).rotateZ(-Math.PI / 2), C.ink), 0.86, 0, 0));
    tablet.add(stylus);
    root.add(tablet);

    // ── Color swatch fan ────────────────────────────────────
    const fan = at(new THREE.Group(), -2.8, 0, 1.9);
    [C.purple, C.green, C.lime, C.coral, C.orange, C.cream].forEach((color, i) => {
      const card = part(rbox(0.55, 0.03, 2.0, 0.014).translate(0, 0, -0.9), color);
      fan.add(at(card, 0, 0.02 + i * 0.035, 0, i * 0.16));
    });
    fan.add(at(part(new THREE.CylinderGeometry(0.06, 0.06, 0.3, 12), C.ink), 0, 0.12, 0));
    root.add(fan);

    // ── Mug ─────────────────────────────────────────────────
    const mug = at(new THREE.Group(), -2.7, 0, -1.75);
    const ceramic = new THREE.MeshStandardMaterial({ color: C.coral, roughness: 0.3 });
    mug.add(at(part(new THREE.CylinderGeometry(0.42, 0.38, 0.85, 24), ceramic), 0, 0.425, 0));
    mug.add(at(part(new THREE.CylinderGeometry(0.36, 0.36, 0.02, 24), C.soil), 0, 0.84, 0));
    const handle = part(new THREE.TorusGeometry(0.22, 0.07, 10, 20, Math.PI), ceramic);
    handle.rotation.z = -Math.PI / 2;
    mug.add(at(handle, 0.4, 0.45, 0));
    root.add(mug);

    // ── Plant ───────────────────────────────────────────────
    const plant = at(new THREE.Group(), 3.4, 0, -1.5);
    plant.add(at(part(new THREE.CylinderGeometry(0.45, 0.35, 0.8, 20), C.pot), 0, 0.4, 0));
    plant.add(at(part(new THREE.CylinderGeometry(0.42, 0.42, 0.05, 20), C.soil), 0, 0.79, 0));
    const leafGeo = new THREE.SphereGeometry(0.28, 16, 12).scale(0.6, 1.6, 0.3).translate(0, 0.4, 0);
    for (let i = 0; i < 6; i++) {
      const stem = at(new THREE.Group(), 0, 0.8, 0, (i / 6) * Math.PI * 2);
      const leaf = part(leafGeo, i % 2 ? C.green : C.leaf);
      leaf.rotation.x = 0.35 + (i % 2) * 0.2;
      stem.add(leaf);
      plant.add(stem);
    }
    root.add(plant);

    // ── Sticky notes + pencil ───────────────────────────────
    root.add(at(part(rbox(0.8, 0.03, 0.8, 0.012), C.lime), 2.0, 0.015, -1.6, 0.2));
    root.add(at(part(rbox(0.8, 0.03, 0.8, 0.012), 0xffd84d), 2.1, 0.05, -1.55, -0.15));

    const pencil = at(new THREE.Group(), 0.6, 0.07, 1.9, 0.25);
    pencil.add(part(new THREE.CylinderGeometry(0.07, 0.07, 1.6, 6).rotateZ(Math.PI / 2), C.orange));
    pencil.add(at(part(new THREE.ConeGeometry(0.07, 0.25, 6).rotateZ(-Math.PI / 2), C.desk), 0.925, 0, 0));
    pencil.add(at(part(new THREE.CylinderGeometry(0.07, 0.07, 0.15, 6).rotateZ(Math.PI / 2), C.coral), -0.875, 0, 0));
    root.add(pencil);

    // ── Floating design elements ────────────────────────────
    const floaters: { obj: THREE.Object3D; baseY: number; phase: number; spin: number }[] = [];
    const float = (obj: THREE.Object3D, phase: number, spin = 0) => {
      floaters.push({ obj, baseY: obj.position.y, phase, spin });
      root.add(obj);
    };

    // Cursor arrow with name tag
    const arrow = new THREE.Shape();
    [[0, -1.1], [0.3, -0.82], [0.5, -1.3], [0.66, -1.22], [0.46, -0.76], [0.85, -0.76]].reduce(
      (s, [x, y]) => s.lineTo(x, y),
      arrow.moveTo(0, 0),
    );
    arrow.closePath();
    const cursor = at(new THREE.Group(), 2.3, 3.1, 0.6, 0.45);
    cursor.scale.setScalar(0.7);
    cursor.add(
      part(
        new THREE.ExtrudeGeometry(arrow, {
          depth: 0.1,
          bevelEnabled: true,
          bevelThickness: 0.03,
          bevelSize: 0.03,
          bevelSegments: 2,
        }),
        C.cream,
      ),
    );
    cursor.add(at(part(rbox(0.9, 0.3, 0.06, 0.029), C.coral), 1.0, -1.15, 0));
    float(cursor, 0);

    // Floating UI card
    const card = at(new THREE.Group(), -2.4, 3.3, -0.4, 0.35);
    card.rotation.z = 0.06;
    card.add(part(rbox(1.8, 1.2, 0.08, 0.039), C.cream));
    card.add(at(part(rbox(1.55, 0.22, 0.03, 0.014), C.purple), 0, 0.38, 0.05));
    card.add(at(part(rbox(1.2, 0.08, 0.02, 0.009), C.gray), -0.17, 0.1, 0.05));
    card.add(at(part(rbox(0.9, 0.08, 0.02, 0.009), C.gray), -0.32, -0.06, 0.05));
    card.add(at(part(rbox(0.6, 0.2, 0.03, 0.014), C.green), -0.47, -0.36, 0.05));
    float(card, 1.3);

    // Pen-tool bezier curve with anchors + handles
    const p = [
      new THREE.Vector3(-0.9, -0.3, 0),
      new THREE.Vector3(-0.3, 0.8, 0),
      new THREE.Vector3(0.4, -0.8, 0),
      new THREE.Vector3(1, 0.3, 0),
    ];
    const bezier = at(new THREE.Group(), -3.4, 4.0, -1.6, 0.4);
    bezier.add(part(new THREE.TubeGeometry(new THREE.CubicBezierCurve3(p[0], p[1], p[2], p[3]), 40, 0.035, 8), C.blue));
    const handleLines = new THREE.LineSegments(
      new THREE.BufferGeometry().setFromPoints([p[0], p[1], p[3], p[2]]),
      new THREE.LineBasicMaterial({ color: C.blue }),
    );
    bezier.add(handleLines);
    for (const v of [p[0], p[3]]) bezier.add(at(part(rbox(0.16, 0.16, 0.16, 0.03), C.cream), v.x, v.y, v.z));
    for (const v of [p[1], p[2]]) bezier.add(at(part(new THREE.SphereGeometry(0.07, 12, 8), C.blue), v.x, v.y, v.z));
    float(bezier, 2.4);

    // Primitive shapes
    float(at(part(new THREE.TorusGeometry(0.28, 0.11, 16, 32), C.lime), -0.6, 4.3, -1.6), 0.7, 0.6);
    float(at(part(new THREE.SphereGeometry(0.26, 24, 16), C.orange), 0.9, 4.7, -2.0), 1.9);
    float(at(part(new THREE.ConeGeometry(0.26, 0.5, 24), C.green), -3.7, 2.3, 1.0), 3.1, 0.4);

    // ── Layout: scene sits right on wide screens, top on tall ones ──
    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      const aspect = w / h;
      renderer.setSize(w, h);
      camera.aspect = aspect;
      // Portrait: wider lens instead of pulling back, so the camera stays inside the room
      const portrait = aspect < 1;
      camera.fov = portrait ? 45 : 35;
      // Portrait frames the laptop up close; landscape shows the whole desk
      const focus = portrait ? mobileTarget : target;
      camera.position.copy(focus).addScaledVector(camDir, portrait ? 15 : 18);
      camera.lookAt(focus);
      if (aspect >= 1) camera.setViewOffset(w, h, -0.16 * w, 0.04 * h, w, h);
      else camera.setViewOffset(w, h, 0, 0.26 * h, w, h);
      camera.updateProjectionMatrix();
      // setSize clears the canvas; redraw so it is never blank while the loop is paused
      renderer.render(scene, camera);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    // ── Pointer parallax ────────────────────────────────────
    const pointer = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer);

    // ── Loop (paused when hero is off-screen) ───────────────
    const clock = new THREE.Clock();
    let frameId = 0;
    let visible = true;
    const tick = () => {
      frameId = requestAnimationFrame(tick);
      if (!visible) return;
      const t = clock.getElapsedTime();
      root.rotation.y += (pointer.x * 0.12 + Math.sin(t * 0.2) * 0.04 - root.rotation.y) * 0.05;
      root.rotation.x += (pointer.y * 0.04 - root.rotation.x) * 0.05;
      for (const f of floaters) {
        f.obj.position.y = f.baseY + Math.sin(t * 1.1 + f.phase) * 0.15;
        if (f.spin) f.obj.rotation.x += f.spin * 0.01;
      }
      hanging.rotation.z = Math.sin(t * 0.8) * 0.03;
      renderer.render(scene, camera);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(mount);
    if (reduceMotion) renderer.render(scene, camera);
    else tick();

    return () => {
      cancelAnimationFrame(frameId);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      const geos = new Set<THREE.BufferGeometry>();
      const allMats = new Set<THREE.Material>();
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh || o instanceof THREE.LineSegments) {
          geos.add(o.geometry);
          allMats.add(o.material as THREE.Material);
        }
      });
      geos.forEach((g) => g.dispose());
      allMats.forEach((m) => {
        (m as THREE.MeshStandardMaterial).map?.dispose();
        m.dispose();
      });
      envMap.dispose();
      pmrem.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 h-full w-full" aria-hidden="true" />;
}
