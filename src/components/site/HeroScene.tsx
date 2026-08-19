import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef, Suspense } from "react";
import { Group, TextureLoader } from "three";
import { Sparkles } from "@react-three/drei";

function Terminal() {
  const group = useRef<Group>(null);
  const logoTexture = useLoader(TextureLoader, '/logo.png');

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    const { x, y } = state.pointer;
    group.current.rotation.y = -0.5 + x * 0.45 + Math.sin(t * 0.3) * 0.08;
    group.current.rotation.x = 0.22 - y * 0.25;
    group.current.position.y = Math.sin(t * 0.8) * 0.12;
  });

  return (
    <group ref={group}>
      {/* base */}
      <mesh position={[0, -1.05, 0]} castShadow>
        <boxGeometry args={[2.4, 0.18, 1.6]} />
        <meshStandardMaterial color="#1c1c1c" metalness={0.9} roughness={0.35} />
      </mesh>
      {/* stand */}
      <mesh position={[0, -0.6, -0.1]} rotation={[0.18, 0, 0]}>
        <boxGeometry args={[0.5, 0.9, 0.3]} />
        <meshStandardMaterial color="#232323" metalness={0.85} roughness={0.4} />
      </mesh>
      {/* screen body */}
      <mesh position={[0, 0.35, 0]} rotation={[-0.08, 0, 0]}>
        <boxGeometry args={[3.1, 2, 0.16]} />
        <meshStandardMaterial color="#101010" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* screen background (site golden) */}
      <mesh position={[0, 0.35, 0.085]} rotation={[-0.08, 0, 0]}>
        <planeGeometry args={[2.86, 1.78]} />
        <meshPhysicalMaterial 
          color="#D4AF37" 
          emissive="#D4AF37" 
          emissiveIntensity={0.45} 
          metalness={0.9} 
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
      {/* screen face (logo) */}
      <mesh position={[0, 0.35, 0.09]} rotation={[-0.08, 0, 0]}>
        <planeGeometry args={[2.86, 1.78]} />
        <meshBasicMaterial map={logoTexture} transparent={true} />
      </mesh>
      {/* card reader */}
      <mesh position={[1.9, -0.65, 0.35]} rotation={[0.35, -0.5, 0]}>
        <boxGeometry args={[0.75, 1.1, 0.12]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.3} />
      </mesh>
      {/* card reader logo */}
      <mesh position={[1.9, -0.5, 0.42]} rotation={[0.35, -0.5, 0]}>
        <planeGeometry args={[0.55, 0.42]} />
        <meshBasicMaterial map={logoTexture} transparent={true} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0.6, 6], fov: 42 }} dpr={[1, 1.8]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 5]} intensity={2.1} color="#ffd98a" />
      <directionalLight position={[-5, -2, -3]} intensity={0.7} color="#ffffff" />
      
      {/* 3D Background Particles */}
      <Sparkles count={200} scale={12} size={1.5} speed={0.4} opacity={0.3} color="#D4AF37" />
      <Sparkles count={150} scale={10} size={1.2} speed={0.2} opacity={0.2} color="#ffffff" />

      <Suspense fallback={null}>
        <Terminal />
      </Suspense>
    </Canvas>
  );
}
