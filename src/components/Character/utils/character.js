import * as THREE from "three";
import { DRACOLoader, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (renderer, scene, camera) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc?v=2",
          "MyCharacter12"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        loader.load(
          blobUrl,
          async (gltf) => {
            const character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child) => {
              if (child.isMesh) {
                // Change clothing colors to match site theme
                if (child.material) {
                  if (child.name === "BODY.SHIRT") {
                    const newMat = child.material.clone();
                    newMat.color = new THREE.Color("#8B4513");
                    child.material = newMat;
                  } else if (child.name === "Pant") {
                    const newMat = child.material.clone();
                    newMat.color = new THREE.Color("#000000");
                    child.material = newMat;
                  }
                }

                child.castShadow = true;
                child.receiveShadow = true;
                child.frustumCulled = true;
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            const footR = character.getObjectByName("footR");
            if (footR) footR.position.y = 3.36;
            const footL = character.getObjectByName("footL");
            if (footL) footL.position.y = 3.36;

            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
