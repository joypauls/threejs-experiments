import * as THREE from "three";
import { ParametricGeometry } from 'https://unpkg.com/three@0.140.2/examples/jsm/geometries/ParametricGeometry.js';
import { OrbitControls } from 'https://unpkg.com/three@0.140.2/examples/jsm/controls/OrbitControls.js';
// import { TrackballControls } from "../node_modules/three/examples/jsm/controls/TrackballControls.js";



// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.6, 1200);
// camera.position.z = 7;
camera.position.set(-20, 30, 20)
// camera.position.x = 7;

// renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#233143");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls( camera, renderer.domElement );
controls.update();


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



// // const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
// const boxGeometry = new THREE.TorusGeometry( 2, 0.7, 16, 50 );
// var geo = new THREE.EdgesGeometry( boxGeometry ); // or WireframeGeometry( geometry )
// var mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 1 } );
// var boxMesh = new THREE.LineSegments( geo, mat );
// // boxMesh.rotation.set(40, 0, 40);
// scene.add( boxMesh );




// needs to accept and modify a Vector3 instead of returning a new one??
// look at constructor https://github.com/mrdoob/three.js/blob/master/examples/jsm/geometries/ParametricGeometry.js
const radialWave = function(u, v, target) {
  const r = 50;
  
  const x = Math.sin(u) * r;
  const z = Math.sin(v / 2) * 2 * r;
  const y = (Math.sin(u * 4 * Math.PI) + Math.cos(v * 2 * Math.PI)) * 2.8;
  
  // return new THREE.Vector3(x, y, z);
  return target.set(x, y, z);
};


function createMesh(geom) {
    // geom.applyMatrix4(new THREE.Matrix4().makeTranslation(-25, 0, -25));
    const meshMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x550000,
      metalness: 0.5
    })
    
    meshMaterial.side = THREE.DoubleSide;
    return new THREE.Mesh(geom, meshMaterial)
}

function basic(u, v, target) {
  return target.set( u, v, Math.cos( 2*u ) * Math.sin( 2*v ) )
}


let mesh = createMesh(new ParametricGeometry(radialWave, 8, 8));
// let mesh = createMesh(new ParametricGeometry(basic, 8, 8));
scene.add(mesh);




camera.lookAt(mesh.position);
controls.update();


function zoom(thing) {
  var correctForDepth = 1.3;
  // this.rotationSpeed = 0.01;
  // var scale = 1;

  // create a helper
  var helper = new THREE.BoundingBoxHelper(thing);
  helper.update();

  // get the bounding sphere
  var boundingSphere = helper.box.getBoundingSphere();

  // calculate the distance from the center of the sphere
  // and subtract the radius to get the real distance.
  var center = boundingSphere.center;
  var radius = boundingSphere.radius;

  var distance = center.distanceTo(camera.position) - radius;
  var realHeight = Math.abs(helper.box.max.y - helper.box.min.y);

  var fov = 2 * Math.atan(realHeight * correctForDepth / ( 2 * distance )) * ( 180 / Math.PI );

  camera.fov = fov;
  camera.updateProjectionMatrix();
}

zoom(mesh);




// const geometry = new THREE.ParametricGeometry( THREE.ParametricGeometries.klein, 25, 25 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const klein = new THREE.Mesh( geometry, material );
// scene.add( klein );



// simple light
const light = new THREE.PointLight(0xFFFFFF, 1, 100);
light.position.set(5, 5, 5);
scene.add(light);

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

  // rotate
  // boxMesh.rotation.y += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

// render scene
render_scene(scene, camera);
// renderer.render(scene, camera);














// (function init() {
//   window.addEventListener("resize", onResize, false);
//   const stats = initStats();

//   const renderer = initRenderer({
//      antialias: true
//   });

//  const camera = initCamera();
//  // camera.position.set(-20, 30, 20)
//  // camera.lookAt(new THREE.Vector3(0,0,-35))
 
//  const scene = new THREE.Scene()
 
//   const spotLight = new THREE.DirectionalLight();
//   spotLight.position = new THREE.Vector3(-20, 250, -50);
//   spotLight.target.position.x = 30;
//   spotLight.target.position.y = -40;
//   spotLight.target.position.z = -20;
//   spotLight.intensity = 0.3
//   scene.add(spotLight);
  
//   let step = 0;
  
//   radialWave = function(u, v) {
//      const r = 50;
     
//      const x = Math.sin(u) * r;
//      const z = Math.sin(v / 2) * 2 * r;
//      const y = (Math.sin(u * 4 * Math.PI) + Math.cos(v * 2 * Math.PI)) * 2.8;
     
//      return new THREE.Vector3(x, y, z);
//   };
  
//   let mesh = createMesh(new THREE.ParametricGeometry(radialWave, 120, 120, false));
//   scene.add(mesh);
  
//   render();

//   function createMesh(geom) {
//      geom.applyMatrix(new THREE.Matrix4().makeTranslation(-25, 0, -25));
//      const meshMaterial = new THREE.MeshStandardMaterial({
//         color: 0xffffff,
//         emissive: 0x550000,
//         metalness: 0.5
//      })
     
//      meshMaterial.side = THREE.DoubleSide;
//      return new THREE.Mesh(geom, meshMaterial)
//   }
  
//   function render() {
//      stats.update();
//      mesh.rotation.y = step += 0.01;
//      mesh.rotation.x = step;
//      requestAnimationFrame(render);
//      renderer.render(scene, camera);
//   }

//   function initStats() {
//      var stats = new Stats();
//      stats.setMode(0);
     
//      document.getElementById("stats").appendChild(stats.domElement);
//      return stats;
//   }

//   function onResize() {
//      width = window.innerWidth;
//      height = window.innerHeight;
//      camera.aspect = width / height;
//      camera.updateProjectionMatrix();
//      renderer.setSize(width, height);
//   }
// })();

// /**
// * Renderer initialization function
// *
// * @param Additional Properties to pass to renderer
// */
// function initRenderer(additionalProperties) {
//   const props =
//      typeof additionalProperties !== "undefined" && additionalProperties
//         ? additionalProperties
//         : {};
//   const renderer = new THREE.WebGLRenderer(props);

//   renderer.setClearColor(new THREE.Color(0x000000));
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   renderer.shadowMap.enabled = true;
//   document.getElementById("output").appendChild(renderer.domElement);
//   return renderer;
// }

// /**
// * Camera initialization functin
// *
// * @param {THREE.Vector3} [initialPosition]
// */
// function initCamera(initialPosition) {
//   const position =
//      initialPosition !== undefined
//         ? initialPosition
//         : new THREE.Vector3(-30, 40, 30);
//   const camera = new THREE.PerspectiveCamera(
//      45,
//      window.innerWidth / window.innerHeight,
//      0.1,
//      1000
//   );

//   camera.position.copy(position);
//   camera.lookAt(new THREE.Vector3(0, 0, 0));

//   return camera;
// }
