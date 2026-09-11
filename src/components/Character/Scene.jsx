import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";

const Scene = () => {
  const canvasDiv = useRef(null);
  const hoverDivRef = useRef(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  useEffect(() => {
    let isMounted = true;
    const containerEl = canvasDiv.current;
    if (!containerEl) return;

    // Clean up any leftover canvas before creating a new renderer
    while (containerEl.firstChild) {
      containerEl.removeChild(containerEl.firstChild);
    }

    const rect = containerEl.getBoundingClientRect();
    const width = rect.width || window.innerWidth;
    const height = rect.height || window.innerHeight;
    const aspect = width / (height || 1);
    const scene = sceneRef.current;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    containerEl.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
    camera.position.z = 10;
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();

    let headBone = null;
    let screenLight = null;
    let mixer = null;
    let loadedChar = null;

    const clock = new THREE.Clock();
    const light = setLighting(scene);
    const progress = setProgress((value) => setLoading(value));
    const { loadCharacter } = setCharacter(renderer, scene, camera);

    loadCharacter()
      .then((gltf) => {
        if (!isMounted) return;
        if (gltf) {
          const animations = setAnimations(gltf);
          if (hoverDivRef.current) {
            animations.hover(gltf, hoverDivRef.current);
          }
          mixer = animations.mixer;
          loadedChar = gltf.scene;
          scene.add(loadedChar);
          headBone = loadedChar.getObjectByName("spine006") || null;
          screenLight = loadedChar.getObjectByName("screenlight") || null;
          progress.loaded().then(() => {
            setTimeout(() => {
              if (!isMounted) return;
              light.turnOnLights();
              animations.startIntro();
            }, 2500);
          });
        }
      })
      .catch((err) => {
        console.warn("Character load notice:", err);
        progress.clear();
      });

    const onWindowResize = () => {
      if (isMounted) {
        handleResize(renderer, camera, canvasDiv, loadedChar);
      }
    };
    window.addEventListener("resize", onWindowResize);

    let mouse = { x: 0, y: 0 };
    let interpolation = { x: 0.1, y: 0.2 };

    const onMouseMove = (event) => {
      handleMouseMove(event, (x, y) => (mouse = { x, y }));
    };

    let debounceTimer;
    const onTouchStart = (event) => {
      const element = event.target;
      debounceTimer = setTimeout(() => {
        element?.addEventListener("touchmove", (e) =>
          handleTouchMove(e, (x, y) => (mouse = { x, y }))
        );
      }, 200);
    };

    const onTouchEnd = () => {
      handleTouchEnd((x, y, interpolationX, interpolationY) => {
        mouse = { x, y };
        interpolation = { x: interpolationX, y: interpolationY };
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    const landingDiv = document.getElementById("landingDiv");
    if (landingDiv) {
      landingDiv.addEventListener("touchstart", onTouchStart, { passive: true });
      landingDiv.addEventListener("touchend", onTouchEnd, { passive: true });
    }

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (headBone) {
        handleHeadRotation(
          headBone,
          mouse.x,
          mouse.y,
          interpolation.x,
          interpolation.y,
          THREE.MathUtils.lerp
        );
        if (screenLight) {
          light.setPointLight(screenLight);
        }
      }
      const delta = clock.getDelta();
      if (mixer) {
        mixer.update(delta);
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      isMounted = false;
      cancelAnimationFrame(animId);
      clearTimeout(debounceTimer);
      window.removeEventListener("resize", onWindowResize);
      document.removeEventListener("mousemove", onMouseMove);
      if (landingDiv) {
        landingDiv.removeEventListener("touchstart", onTouchStart);
        landingDiv.removeEventListener("touchend", onTouchEnd);
      }
      scene.clear();
      renderer.dispose();
      while (containerEl.firstChild) {
        containerEl.removeChild(containerEl.firstChild);
      }
    };
  }, [setLoading]);

  return (
    <div className="character-container">
      <div className="character-model" ref={canvasDiv}>
        <div className="character-rim"></div>
        <div className="character-hover" ref={hoverDivRef}></div>
      </div>
    </div>
  );
};

export default Scene;
