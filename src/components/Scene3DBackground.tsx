import React, { useEffect, useRef } from 'react';
import { CategoryCluster } from '../data/categoriesData';

interface Scene3DBackgroundProps {
  isDark: boolean;
  activeTab: string;
  categoryId: number;
  cluster: CategoryCluster;
  categoryName?: string;
}

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

interface Particle3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  colorIdx: number;
  pulseOffset: number;
}

interface PaletteConfig {
  primary: string;
  secondary: string;
  tertiary: string;
  glowRgba: string;
  geometryType: 'gyroscope' | 'tesseract' | 'torus' | 'geodesic' | 'helix' | 'crystal';
  modeLabel: string;
}

function getCategory3DConfig(
  activeTab: string,
  categoryId: number,
  cluster: CategoryCluster
): PaletteConfig {
  if (activeTab === 'studio') {
    return {
      primary: '#F5C451',
      secondary: '#A855F7',
      tertiary: '#38BDF8',
      glowRgba: 'rgba(168, 85, 247, 0.18)',
      geometryType: 'torus',
      modeLabel: '3D Prompt Synthesizer Core',
    };
  }
  if (activeTab === 'saved') {
    return {
      primary: '#F5C451',
      secondary: '#10B981',
      tertiary: '#FF9F0A',
      glowRgba: 'rgba(16, 185, 129, 0.16)',
      geometryType: 'crystal',
      modeLabel: '3D Personal Vault Matrix',
    };
  }
  if (activeTab === 'search') {
    return {
      primary: '#38BDF8',
      secondary: '#F5C451',
      tertiary: '#818CF8',
      glowRgba: 'rgba(56, 189, 248, 0.16)',
      geometryType: 'geodesic',
      modeLabel: '3D Neural Search Constellation',
    };
  }

  // Category-specific 3D signatures when viewing a category or filtering clusters
  if (activeTab === 'category_detail' || cluster !== 'All') {
    if (
      cluster === 'Tech, Coding & Cyber' ||
      [8, 9, 11, 34, 37, 40].includes(categoryId)
    ) {
      return {
        primary: '#10B981',
        secondary: '#38BDF8',
        tertiary: '#F5C451',
        glowRgba: 'rgba(16, 185, 129, 0.18)',
        geometryType: 'tesseract',
        modeLabel: '3D Quantum Cyber Tesseract',
      };
    }
    if (
      cluster === 'Creative & Media AI' ||
      [2, 3, 4, 5, 6, 12].includes(categoryId)
    ) {
      return {
        primary: '#F472B6',
        secondary: '#F5C451',
        tertiary: '#A78BFA',
        glowRgba: 'rgba(244, 114, 182, 0.18)',
        geometryType: 'torus',
        modeLabel: '3D Holographic Prism Wave',
      };
    }
    if (
      cluster === 'Monetization & Online Income' ||
      [21, 22, 23, 24, 25, 26, 27, 28, 30, 35].includes(categoryId)
    ) {
      return {
        primary: '#F5C451',
        secondary: '#34D399',
        tertiary: '#FF9F0A',
        glowRgba: 'rgba(245, 196, 81, 0.2)',
        geometryType: 'crystal',
        modeLabel: '3D Diamond Revenue Core',
      };
    }
    if (
      cluster === 'Career, Study & Wellness' ||
      [10, 13, 16, 17, 20, 42].includes(categoryId)
    ) {
      return {
        primary: '#2DD4BF',
        secondary: '#F5C451',
        tertiary: '#818CF8',
        glowRgba: 'rgba(45, 212, 191, 0.17)',
        geometryType: 'helix',
        modeLabel: '3D Bio-Neural Fibonacci Helix',
      };
    }
    return {
      primary: '#F5C451',
      secondary: '#FF9F0A',
      tertiary: '#38BDF8',
      glowRgba: 'rgba(245, 196, 81, 0.19)',
      geometryType: 'geodesic',
      modeLabel: '3D Enterprise Geodesic Core',
    };
  }

  // Default Home 42 Categories 3D Neural Gyroscope
  return {
    primary: '#F5C451',
    secondary: '#FF9F0A',
    tertiary: '#38BDF8',
    glowRgba: 'rgba(245, 196, 81, 0.18)',
    geometryType: 'gyroscope',
    modeLabel: '3D Spatial Neural Core',
  };
}

function buildGeometryVertices(
  type: PaletteConfig['geometryType']
): { vertices: Vec3[]; edges: [number, number][] } {
  const vertices: Vec3[] = [];
  const edges: [number, number][] = [];

  if (type === 'tesseract') {
    // Inner and outer 3D cubes connected in 4D-style hypercube projection
    const scales = [95, 185];
    for (const s of scales) {
      for (const x of [-s, s]) {
        for (const y of [-s, s]) {
          for (const z of [-s, s]) {
            vertices.push({ x, y, z });
          }
        }
      }
    }
    // Connect cube edges
    for (let offset = 0; offset < 16; offset += 8) {
      const cubeEdges: [number, number][] = [
        [0, 1], [0, 2], [0, 4],
        [1, 3], [1, 5],
        [2, 3], [2, 6],
        [3, 7],
        [4, 5], [4, 6],
        [5, 7],
        [6, 7],
      ];
      for (const [a, b] of cubeEdges) {
        edges.push([a + offset, b + offset]);
      }
    }
    // Connect inner to outer vertices
    for (let i = 0; i < 8; i++) {
      edges.push([i, i + 8]);
    }
    return { vertices, edges };
  }

  if (type === 'crystal') {
    // Double Octahedron + Equatorial Ring
    const r = 180;
    vertices.push({ x: 0, y: -r * 1.15, z: 0 }); // 0 top apex
    vertices.push({ x: 0, y: r * 1.15, z: 0 }); // 1 bottom apex
    const ringCount = 8;
    for (let i = 0; i < ringCount; i++) {
      const angle = (i / ringCount) * Math.PI * 2;
      vertices.push({
        x: Math.cos(angle) * r,
        y: (i % 2 === 0 ? -1 : 1) * 28,
        z: Math.sin(angle) * r,
      });
    }
    for (let i = 0; i < ringCount; i++) {
      const curr = 2 + i;
      const next = 2 + ((i + 1) % ringCount);
      edges.push([0, curr]);
      edges.push([1, curr]);
      edges.push([curr, next]);
    }
    return { vertices, edges };
  }

  if (type === 'helix') {
    // Double DNA / Fibonacci 3D Spiral
    const steps = 20;
    const radius = 155;
    for (let i = 0; i < steps; i++) {
      const t = (i / (steps - 1) - 0.5) * 340;
      const angle = i * 0.48;
      vertices.push({
        x: Math.cos(angle) * radius,
        y: t,
        z: Math.sin(angle) * radius,
      });
      vertices.push({
        x: Math.cos(angle + Math.PI) * radius,
        y: t,
        z: Math.sin(angle + Math.PI) * radius,
      });
      const idx = i * 2;
      edges.push([idx, idx + 1]); // rung
      if (i > 0) {
        edges.push([idx - 2, idx]);
        edges.push([idx - 1, idx + 1]);
      }
    }
    return { vertices, edges };
  }

  if (type === 'torus') {
    // 3D Holographic Torus Lattice
    const majorR = 150;
    const minorR = 62;
    const uSteps = 12;
    const vSteps = 6;
    for (let u = 0; u < uSteps; u++) {
      const theta = (u / uSteps) * Math.PI * 2;
      for (let v = 0; v < vSteps; v++) {
        const phi = (v / vSteps) * Math.PI * 2;
        const r = majorR + minorR * Math.cos(phi);
        vertices.push({
          x: r * Math.cos(theta),
          y: minorR * Math.sin(phi),
          z: r * Math.sin(theta),
        });
      }
    }
    for (let u = 0; u < uSteps; u++) {
      for (let v = 0; v < vSteps; v++) {
        const curr = u * vSteps + v;
        const nextU = ((u + 1) % uSteps) * vSteps + v;
        const nextV = u * vSteps + ((v + 1) % vSteps);
        edges.push([curr, nextU]);
        edges.push([curr, nextV]);
      }
    }
    return { vertices, edges };
  }

  if (type === 'geodesic') {
    // Golden Ratio Icosahedron + Inner Core
    const phi = (1 + Math.sqrt(5)) / 2;
    const scale = 110;
    const raw = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1],
    ];
    for (const [x, y, z] of raw) {
      vertices.push({ x: x * scale, y: y * scale, z: z * scale });
    }
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const dx = vertices[i].x - vertices[j].x;
        const dy = vertices[i].y - vertices[j].y;
        const dz = vertices[i].z - vertices[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < scale * 2.15) {
          edges.push([i, j]);
        }
      }
    }
    return { vertices, edges };
  }

  // Default 'gyroscope': 3 Intersecting 3D Orbital Rings + Central Core
  const ringSegments = 16;
  const radius = 185;
  // Ring 1 (XY plane)
  for (let i = 0; i < ringSegments; i++) {
    const a = (i / ringSegments) * Math.PI * 2;
    vertices.push({ x: Math.cos(a) * radius, y: Math.sin(a) * radius, z: 0 });
    edges.push([i, (i + 1) % ringSegments]);
  }
  // Ring 2 (XZ plane)
  const offset2 = ringSegments;
  for (let i = 0; i < ringSegments; i++) {
    const a = (i / ringSegments) * Math.PI * 2;
    vertices.push({ x: Math.cos(a) * radius * 0.82, y: 0, z: Math.sin(a) * radius * 0.82 });
    edges.push([offset2 + i, offset2 + ((i + 1) % ringSegments)]);
  }
  // Ring 3 (YZ tilted plane)
  const offset3 = ringSegments * 2;
  for (let i = 0; i < ringSegments; i++) {
    const a = (i / ringSegments) * Math.PI * 2;
    vertices.push({
      x: Math.sin(a) * radius * 0.45,
      y: Math.cos(a) * radius * 0.68,
      z: Math.sin(a) * radius * 0.68,
    });
    edges.push([offset3 + i, offset3 + ((i + 1) % ringSegments)]);
  }
  // Cross links between rings
  for (let i = 0; i < ringSegments; i += 4) {
    edges.push([i, offset2 + i]);
    edges.push([offset2 + i, offset3 + i]);
  }
  return { vertices, edges };
}

export const Scene3DBackground: React.FC<Scene3DBackgroundProps> = ({
  isDark,
  activeTab,
  categoryId,
  cluster,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  const config = getCategory3DConfig(activeTab, categoryId, cluster);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = width / 2;
      let clientY = height / 2;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      pointerRef.current.targetX = (clientX / width - 0.5) * 2;
      pointerRef.current.targetY = (clientY / height - 0.5) * 2;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    const { vertices, edges } = buildGeometryVertices(config.geometryType);

    // 3D Depth Particles flying in perspective space
    const particleCount = width < 640 ? 38 : 65;
    const particles: Particle3D[] = Array.from({ length: particleCount }, (_, i) => ({
      x: (Math.random() - 0.5) * 1400,
      y: (Math.random() - 0.5) * 1000,
      z: Math.random() * 900 + 80,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      vz: -Math.random() * 1.15 - 0.35,
      size: Math.random() * 2.4 + 1.1,
      colorIdx: i % 3,
      pulseOffset: Math.random() * Math.PI * 2,
    }));

    const colors = [config.primary, config.secondary, config.tertiary];
    let time = 0;

    const render = () => {
      time += 0.0085;
      ctx.clearRect(0, 0, width, height);

      // Smooth pointer interpolation
      pointerRef.current.x += (pointerRef.current.targetX - pointerRef.current.x) * 0.05;
      pointerRef.current.y += (pointerRef.current.targetY - pointerRef.current.y) * 0.05;

      const cx = width * 0.5 + pointerRef.current.x * 28;
      const cy = height * 0.44 + pointerRef.current.y * 22;
      const fov = width < 640 ? 460 : 580;
      const cameraZ = 480;

      // 1. Draw Perspective 3D Cyber Horizon Floor Grid at bottom
      const horizonY = height * 0.68;
      const gridAlpha = isDark ? 0.11 : 0.08;
      ctx.save();
      ctx.strokeStyle = config.primary;
      ctx.lineWidth = 1;

      // Radial perspective lines from vanishing point
      const numRays = width < 640 ? 10 : 16;
      for (let i = -numRays / 2; i <= numRays / 2; i++) {
        const spread = i * (width / (numRays * 0.45));
        ctx.globalAlpha = gridAlpha * (1 - Math.abs(i) / (numRays * 0.65));
        ctx.beginPath();
        ctx.moveTo(cx + i * 18, horizonY);
        ctx.lineTo(cx + spread, height + 40);
        ctx.stroke();
      }

      // Moving horizontal depth scanlines
      const scanOffset = (time * 40) % 1;
      for (let row = 0; row < 7; row++) {
        const progress = (row + scanOffset) / 7;
        const curvedProgress = Math.pow(progress, 2.1);
        const yPos = horizonY + curvedProgress * (height - horizonY + 20);
        ctx.globalAlpha = gridAlpha * curvedProgress * 1.3;
        ctx.beginPath();
        ctx.moveTo(0, yPos);
        ctx.lineTo(width, yPos);
        ctx.stroke();
      }
      ctx.restore();

      // 2. Rotate & Project 3D Polyhedron / Holographic Core
      const rotX = time * 0.55 + pointerRef.current.y * 0.45;
      const rotY = time * 0.75 + pointerRef.current.x * 0.55;
      const rotZ = time * 0.3;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosZ = Math.cos(rotZ);
      const sinZ = Math.sin(rotZ);

      const scaleFactor = width < 640 ? 0.78 : 1.08;

      const projected = vertices.map((v) => {
        let x = v.x * scaleFactor;
        let y = v.y * scaleFactor;
        let z = v.z * scaleFactor;

        // Rotate X
        const y1 = y * cosX - z * sinX;
        const z1 = y * sinX + z * cosX;
        y = y1;
        z = z1;

        // Rotate Y
        const x2 = x * cosY + z * sinY;
        const z2 = -x * sinY + z * cosY;
        x = x2;
        z = z2;

        // Rotate Z
        const x3 = x * cosZ - y * sinZ;
        const y3 = x * sinZ + y * cosZ;
        x = x3;
        y = y3;

        const depth = fov / (cameraZ + z + 120);
        return {
          px: cx + x * depth,
          py: cy + y * depth,
          z,
          depth,
        };
      });

      // Draw 3D Wireframe Edges with depth-based alpha
      ctx.save();
      for (let i = 0; i < edges.length; i++) {
        const [aIdx, bIdx] = edges[i];
        const a = projected[aIdx];
        const b = projected[bIdx];
        if (!a || !b) continue;

        const avgDepth = (a.depth + b.depth) * 0.5;
        const alpha = Math.min(
          isDark ? 0.28 : 0.22,
          Math.max(0.03, (avgDepth - 0.45) * (isDark ? 0.42 : 0.32))
        );

        ctx.strokeStyle = i % 3 === 0 ? config.primary : i % 3 === 1 ? config.secondary : config.tertiary;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = avgDepth * 1.35;
        ctx.beginPath();
        ctx.moveTo(a.px, a.py);
        ctx.lineTo(b.px, b.py);
        ctx.stroke();
      }

      // Draw Glowing 3D Vertex Nodes
      for (let i = 0; i < projected.length; i++) {
        const pt = projected[i];
        const nodeAlpha = Math.min(
          isDark ? 0.45 : 0.35,
          Math.max(0.06, (pt.depth - 0.4) * 0.55)
        );
        ctx.fillStyle = colors[i % 3];
        ctx.globalAlpha = nodeAlpha;
        ctx.beginPath();
        ctx.arc(pt.px, pt.py, Math.max(1.4, pt.depth * 2.6), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // 3. Draw 3D Streaming Depth Particles (Z-axis Starfield / Neural Nodes)
      ctx.save();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        if (p.z <= 25) {
          p.z = 920;
          p.x = (Math.random() - 0.5) * 1400;
          p.y = (Math.random() - 0.5) * 1000;
        }

        const scale = fov / (p.z + 60);
        const sx = cx + p.x * scale;
        const sy = cy + p.y * scale;

        if (sx < -40 || sx > width + 40 || sy < -40 || sy > height + 40) continue;

        const pulse = 0.75 + 0.25 * Math.sin(time * 3 + p.pulseOffset);
        const alpha = Math.min(isDark ? 0.55 : 0.4, (1 - p.z / 950) * 0.65 * pulse);

        ctx.fillStyle = colors[p.colorIdx];
        ctx.globalAlpha = Math.max(0.04, alpha);
        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(0.9, p.size * scale * 0.65), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, [isDark, activeTab, categoryId, cluster, config.geometryType, config.primary, config.secondary, config.tertiary]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dynamic Category-Reactive Ambient Volumetric Aura */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[96vw] max-w-[880px] h-[380px] rounded-full blur-[135px] transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${config.glowRgba} 0%, rgba(255,159,10,0.08) 55%, transparent 80%)`,
          opacity: isDark ? 1 : 0.85,
        }}
      />
      <div
        className="absolute bottom-[-120px] right-[-80px] w-[360px] h-[360px] rounded-full blur-[130px] transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${config.tertiary}22 0%, transparent 72%)`,
        }}
      />

      {/* Interactive 60FPS 3D Perspective Motion Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        aria-hidden="true"
      />
    </div>
  );
};
