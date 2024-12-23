import * as THREE from "https://cdn.skypack.dev/three@0.136.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";
import { UnrealBloomPass } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/UnrealBloomPass.js";
import { EffectComposer } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/RenderPass.js";

// DOM Elements
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
  0.5,
  2,
  0
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

// Handle box resize
const resizeObserver = new ResizeObserver(() => {
  camera.aspect = box.clientWidth / box.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(box.clientWidth, box.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  composer.setSize(box.clientWidth, box.clientHeight);
});

resizeObserver.observe(box);

// Responsive handling
const mobileScreen = window.matchMedia("(max-width: 639px)");
const desktopBox = document.querySelector(".box");
const mobileBox = document.querySelector(".box2");

function handleScreenChange(e) {
  if (e.matches) {
    // Mobile view
    mobileBox.style.display = "block";
    desktopBox.style.display = "none";
    // Initialize Shery.js effect for mobile
    Shery.imageEffect(".box2", {
      style: 4,
      config: {
        "uColor": {"value": true},
        "uSpeed": {"value": 0.6, "range": [0.1, 1], "rangep": [1, 10]},
        "uAmplitude": {"value": 2.18, "range": [0, 5]},
        "uFrequency": {"value": 0.4, "range": [0, 10]},
        "geoVertex": {"range": [1, 64], "value": 50.05},
        "zindex": {"value": "1000000", "range": [-9999999, 9999999]},
        "aspect": {"value": 0.8311273264528218},
        "ignoreShapeAspect": {"value": true},
        "shapePosition": {"value": {"x": 0, "y": 0}},
        "shapeScale": {"value": {"x": 0.5, "y": 0.5}},
        "shapeEdgeSoftness": {"value": 0, "range": [0, 0.5]},
        "shapeRadius": {"value": 0, "range": [0, 2]},
        "currentScroll": {"value": 0},
        "scrollLerp": {"value": 0.07},
        "gooey": {"value": false},
        "infiniteGooey": {"value": false},
        "growSize": {"value": 4, "range": [1, 15]},
        "durationOut": {"value": 1, "range": [0.1, 5]},
        "durationIn": {"value": 1.5, "range": [0.1, 5]},
        "displaceAmount": {"value": 0.5},
        "masker": {"value": true},
        "maskVal": {"value": 1.18, "range": [1, 5]},
        "scrollType": {"value": 0},
        "noEffectGooey": {"value": true},
        "onMouse": {"value": 0},
        "noise_speed": {"value": 0.2, "range": [0, 10]},
        "metaball": {"value": 0.2, "range": [0, 2]},
        "discard_threshold": {"value": 0.5, "range": [0, 1]},
        "antialias_threshold": {"value": 0.002, "range": [0, 0.1]},
        "noise_height": {"value": 0.5, "range": [0, 2]},
        "noise_scale": {"value": 10, "range": [0, 100]}
      }
    });
  } else {
    // Desktop view
    mobileBox.style.display = "none";
    desktopBox.style.display = "block";
  }
}

// Add listener for screen changes
mobileScreen.addEventListener("change", handleScreenChange);

// Initial check when page loads
handleScreenChange(mobileScreen);