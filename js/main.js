import * as THREE from "../node_modules/three/build/three.module.js";
// import { TrackballControls } from "../node_modules/three/examples/jsm/controls/TrackballControls.js";



// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.6, 1200);
camera.position.z = 7;

// renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#233143");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// respond to resizing
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
})


// construct inital scene

// cube

// const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
// // const boxMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
// const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
// const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
// // boxMesh.rotation.set(40, 0, 40);
// scene.add(boxMesh);

// const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
const boxGeometry = new THREE.TorusGeometry( 2, 0.7, 16, 50 );
var geo = new THREE.EdgesGeometry( boxGeometry ); // or WireframeGeometry( geometry )
var mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 1 } );
var boxMesh = new THREE.LineSegments( geo, mat );
// boxMesh.rotation.set(40, 0, 40);
scene.add( boxMesh );

// // simple light
// const light = new THREE.PointLight(0xFFFFFF, 1, 100);
// light.position.set(5, 5, 5);
// scene.add(light);

// // lights
// const lights = [];
// const lightValues = [
//   {colour: 0x14D14A, intensity: 8, dist: 12, x: 1, y: 0, z: 8},
//   {colour: 0xBE61CF, intensity: 6, dist: 12, x: -2, y: 1, z: -10},
//   {colour: 0x00FFFF, intensity: 3, dist: 10, x: 0, y: 10, z: 1},
//   {colour: 0x00FF00, intensity: 6, dist: 12, x: 0, y: -10, z: -1},
//   {colour: 0x16A7F5, intensity: 6, dist: 12, x: 10, y: 3, z: 0},
//   {colour: 0x90F615, intensity: 6, dist: 12, x: -10, y: -1, z: 0}
// ];
// for (let i=0; i<6; i++) {
//   lights[i] = new THREE.PointLight(
//     lightValues[i]["colour"], 
//     lightValues[i]["intensity"], 
//     lightValues[i]["dist"]);
//   lights[i].position.set(
//     lightValues[i]["x"], 
//     lightValues[i]["y"], 
//     lightValues[i]["z"]);
//   scene.add(lights[i]);
// }


// main rendering function
const render_scene = function() {
  // superior version of setInterval updating or something similar
  requestAnimationFrame(render_scene);
  // Constantly rotate cube
  // scene.rotation.z -= 0.005;
  // scene.rotation.x -= 0.01;
  boxMesh.rotation.y += 0.01;

  renderer.render(scene, camera);
}

// render scene
render_scene(scene, camera);
// renderer.render(scene, camera);





// import * as THREE from "../node_modules/three/build/three.module.js";

// // Scene
// const scene = new THREE.Scene();

// // Add a cube to the scene
// const geometry = new THREE.BoxGeometry(3, 1, 3); // width, height, depth
// const material = new THREE.MeshLambertMaterial({ color: 0xfb8e00 });
// const mesh = new THREE.Mesh(geometry, material);
// mesh.position.set(0, 0, 0);
// scene.add(mesh);

// // Set up lights
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
// directionalLight.position.set(10, 20, 0); // x, y, z
// scene.add(directionalLight);

// // Camera
// const width = 10;
// const height = width * (window.innerHeight / window.innerWidth);
// const camera = new THREE.OrthographicCamera(
//   width / -2, // left
//   width / 2, // right
//   height / 2, // top
//   height / -2, // bottom
//   1, // near
//   100 // far
// );

// camera.position.set(4, 4, 4);
// camera.lookAt(0, 0, 0);

// // Renderer
// const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.render(scene, camera);

// // Add it to HTML
// document.body.appendChild(renderer.domElement);



