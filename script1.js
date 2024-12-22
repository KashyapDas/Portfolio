import * as THREE from "https://cdn.skypack.dev/three@0.136.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";
import { UnrealBloomPass } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/UnrealBloomPass.js";
import { EffectComposer } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/RenderPass.js";

const box = document.querySelector(".box");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  box.clientWidth / box.clientHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(box.clientWidth, box.clientHeight);
box.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

camera.position.set(0, 0, 40);

const composer = new EffectComposer(renderer);

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
      400,
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

const headings = document.querySelectorAll(".optionHover");

headings.forEach((heading) => {
  heading.addEventListener("mouseover", () => {
    onDoubleClick();
  });
});

function onDoubleClick() {
  ribbons.forEach((ribbon) => {
    ribbon.material.color.set(Math.random() * 0xffffff);

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
      400,
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

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(box.clientWidth, box.clientHeight),
  0.5, // bloomStrength
  2, // bloomRadius
  0 // bloomThreshold
);
composer.addPass(bloomPass);

function animate() {
  requestAnimationFrame(animate);
  composer.render();
  ribbons.forEach((ribbon) => {
    ribbon.rotation.x += 0.01;
    ribbon.rotation.y += 0.01;
    ribbon.position.x += Math.sin(ribbon.rotation.x) * 0.01;
    ribbon.position.y += Math.cos(ribbon.rotation.y) * 0.01;
  });
}

animate();

// Handle box resize if needed
const resizeObserver = new ResizeObserver(() => {
  camera.aspect = box.clientWidth / box.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(box.clientWidth, box.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  composer.setSize(box.clientWidth, box.clientHeight);
});

resizeObserver.observe(box);
