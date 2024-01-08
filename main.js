import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Light Blue

const cube = new THREE.Mesh(new THREE.BoxGeometry(0,0,0), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
cube.position.set(-1.8, 1, -4);
scene.add(cube);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-10, 2, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // or try other shadow map types
document.getElementById('modelContainer').appendChild(renderer.domElement);

const loader = new GLTFLoader();
let roomObject;

loader.load(
  'models/room good.glb',
  function (gltf) {
    roomObject = gltf.scene;
    roomObject.receiveShadow = true;
    scene.add(roomObject);

    const box = new THREE.Box3().setFromObject(roomObject);
    const center = new THREE.Vector3();
    box.getCenter(center);
    roomObject.position.sub(center);

    const spotLight = new THREE.SpotLight(0xeedd82, 0.6, 0, 0.1, 1, 1, 1.5, 1);
    spotLight.position.set(-10, 15, 15);
    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;

    spotLight.target = cube;

    scene.add(spotLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.02);
    ambientLight.position.set(-10, 15, 15);
    scene.add(ambientLight);


    // const helper = new THREE.CameraHelper(spotLight.shadow.camera);
    // scene.add(helper);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error(error);
  }
);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enableRotate = false;
controls.enablePan = false;
controls.target = cube.position;

const initialCubePosition = new THREE.Vector3(-1.8, 1, -4);
const initialCameraPosition = new THREE.Vector3(-10, 2, 10);
const finalCameraPosition = new THREE.Vector3(-1.8, 1, -1);

const projects = document.querySelector('.projects')
const project1 = document.querySelector('.project1')
const project2 = document.querySelector('.project2')
const project3 = document.querySelector('.project3')
const project4 = document.querySelector('.project4')
const name231 = document.querySelector('.name231')
const headerTwo = document.querySelector('.headerTwo')
const homeButton = document.getElementById('homeButton')

const lookRightButton = document.getElementById('lookRightButton');
lookRightButton.addEventListener('click', () => {
  smoothTransition(cube.position, { x: 6, y: 0.5, z: 2.5 }, 1000); // Initial position

  screen2.style.animation = 'screenOff 0.2s ease forwards';
  vid.style.animation = 'screenOff 0.2s ease forwards';
  roundedBox2.style.animation = 'removeSectionOne 2s ease forwards';
  modelContainer.style.animation = 'readjustSectionOne 2s ease forwards';

  setTimeout(() => {
    projects.style.animation = 'appear 3s ease forwards';
    project1.style.animation = 'btnOneAppear 3s ease forwards';
    project2.style.animation = 'btnTwoAppear 3s ease forwards';
    project3.style.animation = 'btnThreeAppear 3s ease forwards';
    project4.style.animation = 'btnFourAppear 3s ease forwards';
    contactButton.style.animation = 'addBtn 1s ease forwards';
  }, 2000);
  setTimeout(() => {
    contactButton.style.animation = 'btnBobbing 2s linear infinite';
  }, 3000);

  smoothTransition(camera.position, { x: 4, y: 0.5, z: 2.5 }, 2000); // Initial camera position
});

const contactButton = document.getElementById('contactButton');
contactButton.addEventListener('click', () => {
  const newCubePosition = { x:-7, y:-1, z:5};
  const newCameraPosition = { x:-9, y:-1, z:6};
  
  projects.style.animation = 'disappear 3s ease forwards';
  project1.style.animation = 'btnOneDisappear 3s ease forwards';
  project2.style.animation = 'btnTwoDisappear 3s ease forwards';
  project3.style.animation = 'btnThreeDisappear 3s ease forwards';
  project4.style.animation = 'btnFourDisappear 3s ease forwards';
  contactButton.style.animation = 'removeBtn 3.5s ease forwards';

  setTimeout(() => {
    name231.style.animation = 'name231Slide 4s forwards';
    headerTwo.style.animation = 'contactSlide 4s forwards';
    homeButton.style.animation = 'addHomeBtn 4s forwards';
  }, 1500);
  
  setTimeout(() => {
    smoothTransition(cube.position, newCubePosition, 1000);
    smoothTransition(camera.position, newCameraPosition, 2000);
  }, 1000);
  
  
});

// setTimeout(() => {
//   name231.style.animation = 'name231SlideOut 4s forwards';
//   headerTwo.style.animation = 'contactSlideOut 3s forwards';
// }, 100000000);

 // Event listener for the homeButton click
 homeButton.addEventListener('click', () => {
  smoothTransition(cube.position, initialCubePosition, 1000);
  smoothTransition(camera.position, initialCameraPosition, 1000);
  name231.style.animation = 'name231SlideOut 2s forwards';
  headerTwo.style.animation = 'contactSlideOut 2s forwards';
  homeButton.style.animation = 'removeHomeBtn 2s forwards';
  roundedBox.style.animation = 'slideIn 5s forwards';
  modelContainer.style.animation = 'slideInModel 5s forwards';
  contentDiv.scrollTop = 0;
  content2.scrollTop = 0;
 });



const contentDiv = document.querySelector('.content');
const progressBar = document.querySelector('.progress');
const screen = document.querySelector('.screen');
const image = document.querySelector('.image');
const intro = document.querySelector('.intro');
const roundedBox = document.querySelector('.roundedBox');
const roundedBox2 = document.querySelector('.roundedBox2');
const modelContainer = document.getElementById('modelContainer');
const screen2 = document.querySelector('.screen2');
const vid = document.querySelector('.vid');
const content2 = document.querySelector('.content2');

let isAnimationStarted = false;

contentDiv.addEventListener('scroll', function () {
  const maxScroll = contentDiv.scrollHeight - contentDiv.clientHeight;
  const maxScrollFactor = 0.6;
  const normalizedScroll = Math.min(contentDiv.scrollTop / (maxScroll * maxScrollFactor), 1);
  const normalizedScroll2 = Math.min(contentDiv.scrollTop / (maxScroll * maxScrollFactor), 1.5);

  progressBar.style.height = normalizedScroll2 * 100 + '%';

  if (normalizedScroll === 1 && !isAnimationStarted) {
    isAnimationStarted = true;
    startAnimation();
  } else if (normalizedScroll < 1 && isAnimationStarted) {
    isAnimationStarted = false;
    resetAnimation();
  }

  if (normalizedScroll >= 0.5) {
    intro.style.animation = 'slideOut 0.2s ease forwards';
  } else if (normalizedScroll < 1) {
    intro.style.animation = 'slideIn2 0.2s ease forwards';
  }

  // Adjust the destination position based on the scroll position
  const scrollDestination = { x: -1.8, y: 1, z: -4 };
  const targetPosition = new THREE.Vector3().lerpVectors(
    cube.position,
    scrollDestination,
    normalizedScroll
  );
  smoothTransition(cube.position, targetPosition, 300); // Adjusted cube position transition

  const interpolatedPosition = new THREE.Vector3().lerpVectors(
    initialCameraPosition,
    finalCameraPosition,
    normalizedScroll
  );

  console.log(normalizedScroll2)

  if (normalizedScroll2 === 1.5) {
    roundedBox.style.animation = 'removeSection 5s ease forwards';
    roundedBox2.style.animation = 'addSectionOne 5s ease forwards';
    modelContainer.style.animation = 'moveSectionOne 5s ease forwards';
    image.style.animation = 'imgOff 0.3s ease forwards';
    screen.style.animation = 'screenOff 0.3s ease forwards';
    
    setTimeout(() => {
      screen2.style.animation = 'screenOn 0.3s ease forwards';
      vid.style.animation = 'screenOn 0.3s ease forwards';
    }, 3200); 
  }

  camera.position.copy(interpolatedPosition);
  camera.updateProjectionMatrix();
});

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function startAnimation() {
  setTimeout(() => {
    screen.style.animation = 'screenOn 0.2s ease forwards';
    image.style.animation = 'imgOn 0.3s ease forwards';
  }, 0); // Delay of 1 second (1000 milliseconds)
}

function resetAnimation() {
  screen.style.animation = 'screenOff 0.1s ease-in forwards';
  image.style.animation = 'imgOff 0.1s ease forwards';
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

function smoothTransition(target, destination, duration) {
  const start = { x: target.x, y: target.y, z: target.z };
  const timeStart = performance.now();

  function update() {
    const elapsed = performance.now() - timeStart;
    const progress = Math.min(1, elapsed / duration);

    target.x = start.x + (destination.x - start.x) * progress;
    target.y = start.y + (destination.y - start.y) * progress;
    target.z = start.z + (destination.z - start.z) * progress;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  update();
}

animate();
