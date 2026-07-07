"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function StarField() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 600;

  const { positions, phases, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 18 + Math.random() * 42;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      phases[i] = Math.random() * Math.PI * 2;
      sizes[i] = Math.random() * 1.8 + 0.4;
    }

    return { positions, phases, sizes };
  }, []);

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;

    const t = state.clock.elapsedTime;
    points.rotation.y = t * 0.008;
    points.rotation.x = Math.sin(t * 0.04) * 0.02;

    const material = points.material as THREE.ShaderMaterial;
    if (material.uniforms.uTime) {
      material.uniforms.uTime.value = t;
    }
  });

  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color("#dce6ff") },
          uGold: { value: new THREE.Color("#d4af7e") },
        },
        vertexShader: `
          attribute float aPhase;
          attribute float aSize;
          uniform float uTime;
          varying float vTwinkle;
          void main() {
            vTwinkle = 0.55 + sin(uTime * 1.2 + aPhase) * 0.45;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = aSize * (180.0 / -mvPosition.z) * vTwinkle;
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          uniform vec3 uGold;
          varying float vTwinkle;
          void main() {
            vec2 uv = gl_PointCoord - 0.5;
            float dist = length(uv);
            if (dist > 0.5) discard;
            float glow = smoothstep(0.5, 0.0, dist);
            vec3 color = mix(uColor, uGold, smoothstep(0.7, 1.0, vTwinkle) * 0.35);
            gl_FragColor = vec4(color, glow * vTwinkle * 0.85);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  return (
    <points ref={pointsRef} material={shaderMaterial}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
      </bufferGeometry>
    </points>
  );
}

export function CosmicStarParticles() {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 0], fov: 75 }}
      dpr={[1, 1.25]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      eventSource={undefined}
      eventPrefix="offset"
    >
      <StarField />
    </Canvas>
  );
}