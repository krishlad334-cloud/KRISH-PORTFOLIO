import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

export function updateCameraForScreen(camera, width, height) {
  if (!camera) return;
  const aspect = width / (height || 1);
  camera.aspect = aspect;

  if (aspect < 0.6) {
    // Phone portrait: pull back and scale slightly to avoid blocking text
    camera.position.set(0, 12.6, 31);
    camera.zoom = 0.82;
  } else if (aspect < 1.0) {
    // Tablet portrait
    camera.position.set(0, 12.9, 27.5);
    camera.zoom = 0.95;
  } else {
    // Desktop widescreen
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
  }
  camera.updateProjectionMatrix();
}

export default function handleResize(renderer, camera, canvasDiv, character) {
  if (!canvasDiv || !canvasDiv.current || !renderer || !camera) return;
  const canvas3d = canvasDiv.current.getBoundingClientRect();
  const width = canvas3d.width || window.innerWidth;
  const height = canvas3d.height || window.innerHeight;
  renderer.setSize(width, height);
  updateCameraForScreen(camera, width, height);

  const workTrigger = ScrollTrigger.getById("work");
  ScrollTrigger.getAll().forEach((trigger) => {
    if (trigger !== workTrigger) {
      trigger.kill();
    }
  });
  if (character) {
    setCharTimeline(character, camera);
  }
  setAllTimeline();
}

