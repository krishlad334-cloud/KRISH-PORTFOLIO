import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
} from "@react-three/rapier";
import {
  FaHtml5,
  FaJs,
  FaReact,
  FaCss3Alt,
  FaGitAlt,
  FaRobot,
} from "react-icons/fa6";
import { TbBrandTailwind } from "react-icons/tb";
import { SiVite } from "react-icons/si";

const SKILLS_DATA = [
  { name: "HTML", color: "#E34F26", bg: "#2a1510", icon: FaHtml5, label: "Markup & Semantics" },
  { name: "JavaScript", color: "#F7DF1E", bg: "#2a2710", icon: FaJs, label: "ES6+ & Core JS" },
  { name: "React JS", color: "#61DAFB", bg: "#10232a", icon: FaReact, label: "Hooks & Component Architecture" },
  { name: "CSS", color: "#1572B6", bg: "#101d2a", icon: FaCss3Alt, label: "Responsive & Modern Layouts" },
  { name: "Tailwind CSS", color: "#38BDF8", bg: "#10252a", icon: TbBrandTailwind, label: "Utility-First Styling" },
  { name: "Git", color: "#F05032", bg: "#2a1510", icon: FaGitAlt, label: "Version Control" },
  { name: "Vite", color: "#646CFF", bg: "#18142a", icon: SiVite, label: "Next-Gen Frontend Tooling" },
  { name: "AI Tools", color: "#A855F7", bg: "#22102a", icon: FaRobot, label: "LLMs & AI-Powered Dev" },
];

function createSkillCanvasTexture(skill) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  // Background
  const gradient = ctx.createRadialGradient(256, 256, 40, 256, 256, 256);
  gradient.addColorStop(0, skill.bg);
  gradient.addColorStop(1, "#070b12");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);

  // Outer glowing ring
  ctx.strokeStyle = skill.color;
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(256, 256, 220, 0, Math.PI * 2);
  ctx.stroke();

  // Decorative inner border
  ctx.strokeStyle = "rgba(255,255,255,0.15)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(256, 256, 200, 0, Math.PI * 2);
  ctx.stroke();

  // Skill Name
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "bold 58px Geist, sans-serif";
  ctx.fillText(skill.name, 256, 256);

  // Subtitle / tag
  ctx.fillStyle = skill.color;
  ctx.font = "600 24px Geist, sans-serif";
  ctx.fillText("SKILL", 256, 330);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);
const spheres = [...Array(24)].map(() => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
}));

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}) {
  const api = useRef(null);

  useFrame((_state, delta) => {
    if (!isActive || !api.current) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

function Pointer({ vec = new THREE.Vector3(), isActive }) {
  const ref = useRef(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive || !ref.current) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const [showCanvas, setShowCanvas] = useState(
    typeof window !== "undefined" ? window.innerWidth > 1024 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setShowCanvas(window.innerWidth > 1024);
    };

    const handleScroll = () => {
      const workEl = document.getElementById("work");
      if (workEl) {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const threshold = workEl.getBoundingClientRect().top + scrollY;
        setIsActive(scrollY > threshold - 300);
      } else {
        setIsActive(true);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const materials = useMemo(() => {
    return SKILLS_DATA.map((skill) => {
      const texture = createSkillCanvasTexture(skill);
      return new THREE.MeshPhysicalMaterial({
        map: texture,
        emissive: "#ffffff",
        emissiveMap: texture,
        emissiveIntensity: 0.3,
        metalness: 0.4,
        roughness: 0.8,
        clearcoat: 0.2,
      });
    });
  }, []);

  return (
    <div className="techstack" id="skills">
      <div className="techstack-header">
        <div className="techstack-badge">
          <span>// 05. CORE COMPETENCIES</span>
        </div>
        <h2>Skills &amp; <span>Tech Stack</span></h2>
        <p className="techstack-subhead">
          Core frontend technologies and modern toolchain for responsive web development.
        </p>
      </div>

      <div className="skills-grid-container">
        <div className="skills-cards-grid">
          {SKILLS_DATA.map((skill) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.name}
                className="skill-card"
                style={{ "--cardAccent": skill.color }}
              >
                <div className="skill-card-icon" style={{ color: skill.color }}>
                  <Icon />
                </div>
                <div className="skill-card-info">
                  <div className="skill-card-top">
                    <h4>{skill.name}</h4>
                    <span className="skill-level-pill">Active</span>
                  </div>
                  <p>{skill.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showCanvas && (
        <Canvas
          shadows
          gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
          camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
          onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
          className="tech-canvas"
        >
          <ambientLight intensity={1} />
          <spotLight
            position={[20, 20, 25]}
            penumbra={1}
            angle={0.2}
            color="white"
            castShadow
            shadow-mapSize={[512, 512]}
          />
          <directionalLight position={[0, 5, -4]} intensity={2} />
          <Physics gravity={[0, 0, 0]}>
            <Pointer isActive={isActive} />
            {spheres.map((props, i) => (
              <SphereGeo
                key={i}
                {...props}
                material={materials[i % materials.length]}
                isActive={isActive}
              />
            ))}
          </Physics>
          <Environment
            files="/models/char_enviorment.hdr"
            environmentIntensity={0.5}
            environmentRotation={[0, 4, 2]}
          />
          <EffectComposer enableNormalPass={false}>
            <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
          </EffectComposer>
        </Canvas>
      )}
    </div>

  );
};

export default TechStack;
