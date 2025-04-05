import * as THREE from 'https://cdn.skypack.dev/three@0.154.0';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.154.0/examples/jsm/loaders/GLTFLoader.js';

const canvas = document.getElementById("game-canvas");
const startButton = document.getElementById("start-button");
const startScreen = document.getElementById("start-screen");

startButton.addEventListener("click", () => {
  startScreen.style.display = "none";
  canvas.style.display = "block";
  startGame();
});

function startGame() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 1, 1).normalize();
  scene.add(light);

  const loader = new GLTFLoader();
  let car;

  loader.load('models/r32.glb', (gltf) => {
    car = gltf.scene;
    car.scale.set(2, 2, 2);
    scene.add(car);
  });

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);
    if (car) car.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  animate();
}
