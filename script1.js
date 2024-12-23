import * as THREE from "https://cdn.skypack.dev/three@0.136.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";
import { UnrealBloomPass } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/UnrealBloomPass.js";
import { EffectComposer } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/RenderPass.js";

// Check for WebGL support
function checkWebGLSupport() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch(e) {
    return false;
  }
}

// Initialize scene only if WebGL is supported
if (!checkWebGLSupport()) {
  console.error('WebGL is not supported on this device');
  // Add fallback content or message for non-WebGL devices
  const box = document.querySelector(".box");
  box.innerHTML = '<p>Your device does not support WebGL. Please try on a different device.</p>';
} else {
  const box = document.querySelector(".box");
  const scene = new THREE.Scene();
  
  // Use window.innerWidth/Height for mobile viewport
  const camera = new THREE.PerspectiveCamera(
    75,
    box.clientWidth / box.clientHeight,
    0.1,
    1000
  );

  // Add WebGL2 support check
  const renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    powerPreference: "high-performance",
    failIfMajorPerformanceCaveat: true
  });
  
  // Set pixel ratio with a maximum to prevent performance issues on high-DPI devices
  const pixelRatio = Math.min(window.devicePixelRatio, 2);
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(box.clientWidth, box.clientHeight);
  box.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  // Add touch support
  controls.touches = {
    ONE: THREE.TOUCH.ROTATE,
    TWO: THREE.TOUCH.DOLLY_PAN
  };

  camera.position.set(0, 0, 40);

  // Create composer with proper pixel ratio
  const composer = new EffectComposer(renderer);
  composer.setPixelRatio(pixelRatio);

  let ribbons = [];
  const ribbonCount = 12;
  const group = new THREE.Group();
  scene.add(group);

  const light = new THREE.AmbientLight(0xff0000, 1);
  scene.add(light);

  const pointLight = new THREE.PointLight(0xff0000, 1, 100);
  pointLight.position.set(50, 50, 50);
  pointLight.castShadow = true;
  scene.add(pointLight);

  function createRibbons() {
    // Reduce geometry complexity for mobile
    const segments = window.innerWidth < 768 ? 200 : 400;
    
    for (let i = 0; i < ribbonCount; i++) {
      const geometry = new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(
          [
            new THREE.Vector3(-10, 0, 0),
            new THREE.Vector3(-5, 5, 5),
            new THREE.Vector3(0, 0, 10),
            new THREE.Vector3(5, -5, 5),
            new THREE.Vector3(10, 0, 0),
            new THREE.Vector3(5, 5, -5),
            new THREE.Vector3(0, 0, -10),
            new THREE.Vector3(-5, -5, -5),
            new THREE.Vector3(-10, 0, 0),
          ],
          true,
          "catmullrom",
          5
        ),
        segments,
        Math.random() * 0.5 + 0.1,
        Math.random() * 0.5 + 12,
        true
      );

      const material = new THREE.MeshBasicMaterial({
        color: Math.random() * 0xffffff,
        side: THREE.DoubleSide,
      });
      const ribbon = new THREE.Mesh(geometry, material);

      ribbon.position.set(
        -0.5 * (Math.random() * 10 - 5),
        -0.5 * (Math.random() * 10 - 5),
        -0.5 * (Math.random() * 10 - 5)
      );

      ribbon.rotation.set(
        Math.random() * 30 - 5,
        Math.random() * 30 - 5,
        Math.random() * 30 - 5
      );

      ribbons.push(ribbon);
      group.add(ribbon);
    }
  }
  createRibbons();

  // Add touch event listener for mobile
  const headings = document.querySelectorAll(".optionHover");
  headings.forEach((heading) => {
    heading.addEventListener("touchstart", onDoubleClick);
    heading.addEventListener("mouseover", onDoubleClick);
  });

  function onDoubleClick() {
    ribbons.forEach((ribbon) => {
      ribbon.material.color.set(Math.random() * 0xffffff);

      // Reduce geometry complexity for mobile
      const segments = window.innerWidth < 768 ? 200 : 400;
      
      const newGeometry = new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(
          [
            new THREE.Vector3(-10, 0, 0),
            new THREE.Vector3(-5, 5, 5),
            new THREE.Vector3(0, 0, 10),
            new THREE.Vector3(5, -5, 5),
            new THREE.Vector3(10, 0, 0),
            new THREE.Vector3(5, 5, -5),
            new THREE.Vector3(0, 0, -10),
            new THREE.Vector3(-5, -5, -5),
            new THREE.Vector3(-10, 0, 0),
          ],
          true,
          "catmullrom",
          5
        ),
        segments,
        Math.random() * 0.5 + 0.1,
        Math.random() * 0.5 + 12,
        true
      );

      ribbon.geometry.dispose();
      ribbon.geometry = newGeometry;
    });
  }

  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  // Reduce bloom intensity for better mobile performance
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(box.clientWidth, box.clientHeight),
    0.3, // reduced bloomStrength
    1.5, // reduced bloomRadius
    0.1 // increased bloomThreshold
  );
  composer.addPass(bloomPass);

  let animationFrameId;
  
  function animate() {
    animationFrameId = requestAnimationFrame(animate);
    composer.render();
    ribbons.forEach((ribbon) => {
      // Reduce rotation speed for better mobile performance
      const rotationSpeed = window.innerWidth < 768 ? 0.005 : 0.01;
      ribbon.rotation.x += rotationSpeed;
      ribbon.rotation.y += rotationSpeed;
      ribbon.position.x += Math.sin(ribbon.rotation.x) * rotationSpeed;
      ribbon.position.y += Math.cos(ribbon.rotation.y) * rotationSpeed;
    });
  }

  animate();

  // Improved resize handler
  const resizeObserver = new ResizeObserver(() => {
    // Cancel animation frame before resize
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }

    camera.aspect = box.clientWidth / box.clientHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(box.clientWidth, box.clientHeight);
    const newPixelRatio = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(newPixelRatio);
    
    composer.setSize(box.clientWidth, box.clientHeight);
    composer.setPixelRatio(newPixelRatio);

    // Restart animation
    animate();
  });

  resizeObserver.observe(box);

  // Clean up on page unload
  window.addEventListener('unload', () => {
    resizeObserver.disconnect();
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    renderer.dispose();
    composer.dispose();
  });
}