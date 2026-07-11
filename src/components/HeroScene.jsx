import { Suspense, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";

// The hero's signature piece — an animated 3D sewing machine that turns
// slowly on its own and dips its needle like it's mid-stitch. Lives inside a
// tilting card so the whole scene leans gently toward the cursor.
function StitchingMachine() {
  const group = useRef();
  const needle = useRef();
  const wheel = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) group.current.rotation.y = 0.5 + Math.sin(t * 0.35) * 0.28;
    if (needle.current) needle.current.position.y = -0.02 - Math.abs(Math.sin(t * 4)) * 0.17;
    if (wheel.current) wheel.current.rotation.z = t * 4;
  });

  const body = "#241812";
  const bodyLight = "#2E2015";
  const brass = "#C8703E";

  return (
    <group ref={group} rotation={[0.08, 0.5, 0]} position={[0, 0.05, 0]} scale={1.15}>
      <mesh position={[-0.15, -0.62, 0]}>
        <boxGeometry args={[2.3, 0.16, 1.05]} />
        <meshStandardMaterial color={body} roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[-0.85, -0.53, 0.15]}>
        <boxGeometry args={[0.5, 0.02, 0.5]} />
        <meshStandardMaterial color="#D8CBB0" roughness={0.35} metalness={0.3} />
      </mesh>
      <mesh position={[0.85, -0.15, -0.05]}>
        <boxGeometry args={[0.4, 0.95, 0.55]} />
        <meshStandardMaterial color={bodyLight} roughness={0.4} metalness={0.25} />
      </mesh>
      <mesh position={[0.1, 0.42, -0.05]}>
        <boxGeometry args={[1.75, 0.36, 0.48]} />
        <meshStandardMaterial color={bodyLight} roughness={0.4} metalness={0.25} />
      </mesh>
      <mesh position={[-0.85, 0.22, 0.02]}>
        <boxGeometry args={[0.55, 0.62, 0.55]} />
        <meshStandardMaterial color={body} roughness={0.35} metalness={0.3} />
      </mesh>
      <mesh position={[0.05, 0.24, 0.2]}>
        <boxGeometry args={[1.5, 0.05, 0.05]} />
        <meshStandardMaterial color={brass} roughness={0.25} metalness={0.8} />
      </mesh>
      <group ref={wheel} position={[1.06, 0.1, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <torusGeometry args={[0.22, 0.045, 12, 28]} />
          <meshStandardMaterial color={brass} roughness={0.2} metalness={0.85} />
        </mesh>
      </group>
      <group ref={needle} position={[-0.85, -0.02, 0.15]}>
        <mesh position={[0, 0.28, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.4, 8]} />
          <meshStandardMaterial color="#EDEDED" roughness={0.25} metalness={0.65} />
        </mesh>
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.012, 0.006, 0.24, 8]} />
          <meshStandardMaterial color="#C9C9C9" roughness={0.15} metalness={0.85} />
        </mesh>
      </group>
      <group position={[-0.15, 0.68, -0.05]}>
        <mesh>
          <cylinderGeometry args={[0.18, 0.18, 0.32, 20]} />
          <meshStandardMaterial color={"#2F7A6B"} roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.17, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.03, 20]} />
          <meshStandardMaterial color={body} roughness={0.5} />
        </mesh>
        <mesh position={[0, -0.17, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.03, 20]} />
          <meshStandardMaterial color={body} roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}

export default function HeroScene() {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 150,
    damping: 18,
  });
  const glowX = useTransform(mx, [-0.5, 0.5], ["30%", "70%"]);
  const glowY = useTransform(my, [-0.5, 0.5], ["30%", "70%"]);

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ perspective: 1200 }}
      className="relative w-full aspect-square max-w-[560px] mx-auto select-none"
    >
      {/* ambient glow that follows the cursor */}
      <motion.div
        className="absolute -inset-10 rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #C8703E 0%, transparent 65%)",
          left: glowX,
          top: glowY,
          x: "-50%",
          y: "-50%",
          width: 420,
          height: 420,
        }}
      />

      {/* floating tag badges */}
      <motion.div
        animate={{ y: [0, -14, 0], rotate: [-6, -3, -6] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-4 -left-4 sm:top-0 sm:left-0 bg-brass text-ink font-tag text-[11px] font-bold px-3 py-2 z-20 shadow-lg"
        style={{ clipPath: "polygon(0% 20%, 8% 0%, 100% 0%, 100% 80%, 92% 100%, 0% 100%)" }}
      >
        NEW STOCK
      </motion.div>
      <motion.div
        animate={{ y: [0, 12, 0], rotate: [4, 7, 4] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        className="absolute bottom-6 -right-2 sm:right-0 bg-ink border-2 border-brass text-brass font-tag text-[11px] font-bold px-3 py-2 z-20"
        style={{ clipPath: "polygon(0% 20%, 8% 0%, 100% 0%, 100% 80%, 92% 100%, 0% 100%)" }}
      >
        EMI AVAILABLE
      </motion.div>

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full h-full rounded-[28px] overflow-hidden border border-white/10 bg-surface"
      >
        <Canvas camera={{ position: [0, 0.5, 3.4], fov: 40 }} dpr={[1, 1.5]}>
          <color attach="background" args={["#232327"]} />
          <ambientLight intensity={0.75} />
          <directionalLight position={[3, 5, 2]} intensity={1.15} />
          <directionalLight position={[-3, 2, -2]} intensity={0.35} />
          <Suspense fallback={null}>
            <StitchingMachine />
            <ContactShadows position={[0, -0.95, 0]} opacity={0.5} blur={2.4} scale={4} far={2} />
          </Suspense>
        </Canvas>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent pointer-events-none" />
      </motion.div>
    </div>
  );
}
