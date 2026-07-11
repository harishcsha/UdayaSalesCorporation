import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox, ContactShadows, Html } from "@react-three/drei";
import * as THREE from "three";

function shade(hex, amount) {
  // amount: -1 (darker) to 1 (lighter)
  const c = new THREE.Color(hex);
  if (amount >= 0) c.lerp(new THREE.Color("#ffffff"), amount);
  else c.lerp(new THREE.Color("#000000"), -amount);
  return c;
}

// A stylised front-view sewing machine — bed, pillar, arm, head and a
// needle that bobs up and down like it's mid-stitch.
function SewingMachineModel({ color }) {
  const needleRef = useRef();
  const wheelRef = useRef();
  const body = shade(color, 0);
  const bodyDark = shade(color, -0.35);
  const brass = "#C8703E";

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (needleRef.current) {
      // Needle bobs quickly, like it's stitching.
      needleRef.current.position.y = -0.02 - Math.abs(Math.sin(t * 4)) * 0.16;
    }
    if (wheelRef.current) {
      wheelRef.current.rotation.z = t * 4;
    }
  });

  return (
    <group rotation={[0.05, 0.5, 0]} position={[0, 0.05, 0]}>
      {/* bed / base plate */}
      <RoundedBox args={[2.3, 0.16, 1.05]} radius={0.05} smoothness={4} position={[-0.15, -0.62, 0]}>
        <meshStandardMaterial color={bodyDark} roughness={0.6} metalness={0.15} />
      </RoundedBox>
      {/* needle plate (bright, near where the needle lands) */}
      <RoundedBox args={[0.5, 0.02, 0.5]} radius={0.02} smoothness={2} position={[-0.85, -0.53, 0.15]}>
        <meshStandardMaterial color="#D8CBB0" roughness={0.4} metalness={0.3} />
      </RoundedBox>
      {/* pillar (right side, rises from the bed) */}
      <RoundedBox args={[0.4, 0.95, 0.55]} radius={0.12} smoothness={4} position={[0.85, -0.15, -0.05]}>
        <meshStandardMaterial color={body} roughness={0.45} metalness={0.2} />
      </RoundedBox>
      {/* arm (spans from the pillar to the head) */}
      <RoundedBox args={[1.75, 0.36, 0.48]} radius={0.16} smoothness={4} position={[0.1, 0.42, -0.05]}>
        <meshStandardMaterial color={body} roughness={0.45} metalness={0.2} />
      </RoundedBox>
      {/* head (front-left end, houses the needle mechanism) */}
      <RoundedBox args={[0.55, 0.62, 0.55]} radius={0.18} smoothness={4} position={[-0.85, 0.22, 0.02]}>
        <meshStandardMaterial color={bodyDark} roughness={0.4} metalness={0.25} />
      </RoundedBox>
      {/* brass trim strip along the arm */}
      <RoundedBox args={[1.5, 0.05, 0.05]} radius={0.02} smoothness={2} position={[0.05, 0.24, 0.2]}>
        <meshStandardMaterial color={brass} roughness={0.3} metalness={0.7} />
      </RoundedBox>
      {/* handwheel, right side */}
      <group ref={wheelRef} position={[1.06, 0.1, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <torusGeometry args={[0.22, 0.045, 12, 28]} />
          <meshStandardMaterial color={brass} roughness={0.25} metalness={0.75} />
        </mesh>
        <mesh>
          <cylinderGeometry args={[0.05, 0.05, 0.08, 16]} />
          <meshStandardMaterial color={bodyDark} roughness={0.4} metalness={0.3} />
        </mesh>
      </group>
      {/* needle bar + needle, animated */}
      <group ref={needleRef} position={[-0.85, -0.02, 0.15]}>
        <mesh position={[0, 0.28, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.4, 8]} />
          <meshStandardMaterial color="#EDEDED" roughness={0.3} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.012, 0.006, 0.24, 8]} />
          <meshStandardMaterial color="#C9C9C9" roughness={0.2} metalness={0.8} />
        </mesh>
      </group>
      {/* spool pin + thread spool on top of the arm */}
      <group position={[-0.15, 0.68, -0.05]}>
        <mesh>
          <cylinderGeometry args={[0.18, 0.18, 0.32, 20]} />
          <meshStandardMaterial color={"#2F7A6B"} roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.17, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.03, 20]} />
          <meshStandardMaterial color={bodyDark} roughness={0.5} />
        </mesh>
        <mesh position={[0, -0.17, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.03, 20]} />
          <meshStandardMaterial color={bodyDark} roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}

// Accessories are shown as a spool of thread with a couple of bobbins and a
// needle laid alongside it.
function AccessoryModel({ color }) {
  const base = shade(color, 0);
  const dark = shade(color, -0.3);

  return (
    <group rotation={[0.1, 0.5, 0]}>
      {/* main thread spool */}
      <group position={[0, 0.05, 0]}>
        <mesh>
          <cylinderGeometry args={[0.5, 0.5, 0.95, 24]} />
          <meshStandardMaterial color={base} roughness={0.55} />
        </mesh>
        {[0.42, 0.15, -0.15, -0.42].map((y, i) => (
          <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.51, 0.015, 8, 32]} />
            <meshStandardMaterial color={dark} roughness={0.5} />
          </mesh>
        ))}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.56, 0.56, 0.06, 24]} />
          <meshStandardMaterial color={dark} roughness={0.6} />
        </mesh>
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.56, 0.56, 0.06, 24]} />
          <meshStandardMaterial color={dark} roughness={0.6} />
        </mesh>
      </group>
      {/* small bobbin beside it */}
      <group position={[0.95, -0.35, 0.1]}>
        <mesh>
          <cylinderGeometry args={[0.22, 0.22, 0.22, 20]} />
          <meshStandardMaterial color="#C8703E" roughness={0.4} metalness={0.5} />
        </mesh>
        <mesh position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.03, 20]} />
          <meshStandardMaterial color="#8A651F" roughness={0.5} />
        </mesh>
        <mesh position={[0, -0.12, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.03, 20]} />
          <meshStandardMaterial color="#8A651F" roughness={0.5} />
        </mesh>
      </group>
      {/* needle laid across */}
      <mesh position={[-0.9, -0.55, 0.25]} rotation={[0, 0, Math.PI / 5]}>
        <cylinderGeometry args={[0.02, 0.02, 1.1, 8]} />
        <meshStandardMaterial color="#EDEDED" roughness={0.3} metalness={0.6} />
      </mesh>
    </group>
  );
}

export default function Product3DViewer({ category, colorHex, brand }) {
  return (
    <div className="relative aspect-square bg-surface overflow-hidden">
      <Canvas camera={{ position: [0, 0.6, 3.6], fov: 38 }} shadows dpr={[1, 1.5]}>
        <color attach="background" args={["#232327"]} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 5, 2]} intensity={1.1} castShadow />
        <directionalLight position={[-3, 2, -2]} intensity={0.4} />
        <Suspense fallback={null}>
          {category === "machines" ? (
            <SewingMachineModel color={colorHex} />
          ) : (
            <AccessoryModel color={colorHex} />
          )}
          <ContactShadows position={[0, -0.95, 0]} opacity={0.5} blur={2.4} scale={4} far={2} />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={2.2}
          minPolarAngle={Math.PI / 2.6}
          maxPolarAngle={Math.PI / 1.9}
        />
        <Html position={[0, -1.35, 0]} center transform={false}>
          <div className="font-tag text-[10px] uppercase tracking-widest text-mute whitespace-nowrap pointer-events-none">
            Drag to rotate 360°
          </div>
        </Html>
      </Canvas>
      <div className="absolute top-3 left-3 bg-ink/80 border border-brass/40 text-brass font-tag text-[11px] font-bold px-2.5 py-1 pointer-events-none">
        {brand?.toUpperCase()}
      </div>
    </div>
  );
}
