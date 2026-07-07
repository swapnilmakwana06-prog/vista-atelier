"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function CinematicCamera() {
  const { camera } = useThree();
  const basePos = useRef(new THREE.Vector3(0, 0.2, 7.2));

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    camera.position.x = basePos.current.x + Math.sin(t * 0.15) * 0.55;
    camera.position.y = basePos.current.y + Math.sin(t * 0.1) * 0.18;
    camera.position.z = basePos.current.z + Math.cos(t * 0.12) * 0.35;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function HeroMoon() {
  const moonRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!moonRef.current) return;
    const t = state.clock.elapsedTime;
    moonRef.current.position.y = 2.8 + Math.sin(t * 0.08) * 0.12;
  });

  return (
    <group ref={moonRef} position={[4.2, 2.8, -12]}>
      <mesh>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshStandardMaterial
          color="#e8edf8"
          emissive="#c8d4f0"
          emissiveIntensity={0.35}
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>
      <mesh scale={2.8}>
        <sphereGeometry args={[1.6, 16, 16]} />
        <meshBasicMaterial
          color="#5eead4"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh scale={4.5}>
        <sphereGeometry args={[1.6, 12, 12]} />
        <meshBasicMaterial
          color="#d4af7e"
          transparent
          opacity={0.03}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <pointLight position={[0, 0, 2]} intensity={2.2} color="#dce6ff" distance={18} />
    </group>
  );
}

function InteriorPortal() {
  const texture = useTexture("/hero-poster.jpg");
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = Math.sin(t * 0.12) * 0.22;
    groupRef.current.rotation.x = Math.sin(t * 0.08) * 0.06;
    groupRef.current.position.y = Math.sin(t * 0.18) * 0.08;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={groupRef}>
        <mesh position={[0, 0, -0.12]} scale={[1.04, 1.04, 1]}>
          <planeGeometry args={[6.4, 3.8]} />
          <meshStandardMaterial
            color="#0a0e18"
            metalness={0.4}
            roughness={0.6}
          />
        </mesh>
        <mesh position={[0, 0, -0.08]}>
          <planeGeometry args={[6.4, 3.8]} />
          <meshStandardMaterial
            color="#d4af7e"
            emissive="#d4af7e"
            emissiveIntensity={0.18}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        <mesh>
          <planeGeometry args={[6, 3.4]} />
          <meshStandardMaterial
            map={texture}
            metalness={0.2}
            roughness={0.7}
            emissive="#ffffff"
            emissiveIntensity={0.04}
          />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[6, 3.4]} />
          <meshBasicMaterial
            color="#5eead4"
            transparent
            opacity={0.05}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        <mesh position={[0, -2.2, 0.5]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[8, 6]} />
          <meshBasicMaterial
            color="#5eead4"
            transparent
            opacity={0.04}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <fog attach="fog" args={["#04060f", 8, 28]} />
      <CinematicCamera />
      <ambientLight intensity={0.28} color="#8b9dc8" />
      <spotLight
        position={[6, 5, 6]}
        angle={0.35}
        penumbra={0.8}
        intensity={2.5}
        color="#d4af7e"
        castShadow={false}
      />
      <pointLight position={[-5, -1, 4]} intensity={1.2} color="#5eead4" />
      <pointLight position={[0, -4, 3]} intensity={0.5} color="#8b5cf6" />
      <directionalLight position={[2, 4, 8]} intensity={0.6} color="#f0f4ff" />
      <Stars
        radius={80}
        depth={40}
        count={800}
        factor={2.2}
        saturation={0.15}
        fade
        speed={0.3}
      />
      <HeroMoon />
      <Suspense fallback={null}>
        <InteriorPortal />
      </Suspense>
    </>
  );
}

export function HeroCosmicScene() {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/hero-poster.jpg)" }}
      />
    );
  }

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0.2, 7.2], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}