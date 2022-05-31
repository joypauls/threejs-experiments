import * as THREE from "three";
import { ParametricGeometry } from "https://unpkg.com/three@0.140.2/examples/jsm/geometries/ParametricGeometry.js";
import { OrbitControls } from "https://unpkg.com/three@0.140.2/examples/jsm/controls/OrbitControls.js";
// import { TrackballControls } from "../node_modules/three/examples/jsm/controls/TrackballControls.js";



// scene
const scene = new THREE.Scene();

// camera
// const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.6, 1200);
const aspect = window.innerWidth / window.innerHeight;
const FRUSTRUM_SIZE = 20;
const camera = new THREE.OrthographicCamera(
  FRUSTRUM_SIZE * aspect / - 2, 
  FRUSTRUM_SIZE * aspect / 2, 
  FRUSTRUM_SIZE / 2, 
  FRUSTRUM_SIZE / - 2, 
  1, 
  1000 
);

// camera.position.set(-20, 30, 20)
camera.position.set(50, 30, 20);


// renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#1a1c1b");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls( camera, renderer.domElement );
controls.update();


// helpers
const ADJUST_VISUALLY = 0;
const axesHelper = new THREE.AxesHelper(4);
axesHelper.position.set(0, ADJUST_VISUALLY, 0);
scene.add(axesHelper);

const helper = new THREE.GridHelper(20, 10);
// helper.rotation.x = Math.PI / 2;
scene.add( helper );




// listeners
// respond to resizing
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  const aspect = window.innerWidth / window.innerHeight;
  camera.left = FRUSTRUM_SIZE * aspect / - 2;
  camera.right = FRUSTRUM_SIZE * aspect / 2;
  camera.top = FRUSTRUM_SIZE / 2;
  camera.bottom = FRUSTRUM_SIZE / - 2;
  // camera.aspect = window.innerWidth / window.innerHeight;
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




// // needs to accept and modify a Vector3 instead of returning a new one??
// // look at constructor https://github.com/mrdoob/three.js/blob/master/examples/jsm/geometries/ParametricGeometry.js
// const radialWave = function(u, v, target) {
//   const r = 50;
  
//   const x = Math.sin(u) * r;
//   const z = Math.sin(v / 2) * 2 * r;
//   const y = (Math.sin(u * 4 * Math.PI) + Math.cos(v * 2 * Math.PI)) * 2.8;
  
//   // return new THREE.Vector3(x, y, z);
//   return target.set(x, y, z);
// }

// needs to accept and modify a Vector3 instead of returning a new one??
// look at constructor https://github.com/mrdoob/three.js/blob/master/examples/jsm/geometries/ParametricGeometry.js
function randomFlatSurface(u, v, target) {
  // For now, switching coordinates to match three.js default axes
  // let x = Math.random();
  // let y = Math.random();
  let y = (0.2 * Math.random()) - 0.1;
  return target.set( u, y, v )
}

// needs to accept and modify a Vector3 instead of returning a new one??
// look at constructor https://github.com/mrdoob/three.js/blob/master/examples/jsm/geometries/ParametricGeometry.js
function alpineFunction(u, v, target) {
  // domain needs to be [0, 10] X [0, 10]
  // there HAS to be a better way to do this
  let domainScale = 10
  let x = domainScale * u;
  let z = domainScale * v;
  // For now, switching coordinates to match three.js default axes
  let dampingFactor = 0.6;
  let y = dampingFactor * (Math.sqrt(x) * Math.sin(x)) * (Math.sqrt(z) * Math.sin(z));
  return target.set( x/domainScale, y/domainScale, z/domainScale )
}

function rippleFunction(u, v, target) {
  // domain needs to be [0, 10] X [0, 10]
  // there HAS to be a better way to do this
  let domainScale = 5
  let offset = 2.5
  let x = (domainScale * u) - offset;
  let z = (domainScale * v) - offset;
  // For now, switching coordinates to match three.js default axes
  // let dampingFactor = 0.4;

  let y = Math.sin(10*(x**2+z**2))/10
  // let y = dampingFactor * (Math.sqrt(x) * Math.sin(x)) * (Math.sqrt(z) * Math.sin(z));

  return target.set( x/domainScale, y/domainScale, z/domainScale )
  // return target.set( x, y, z )
}

function parabolicFunction(u, v, target) {
  // domain needs to be [0, 10] X [0, 10]
  // there HAS to be a better way to do this
  let domainScale = 8;
  let offset = 0.5;
  let x = (domainScale * u) - (offset*domainScale);
  let z = (domainScale * v) - (offset*domainScale);
  // For now, switching coordinates to match three.js default axes

  let dampingFactor = 0.2;
  let y = dampingFactor * (x**2 + z**2)
  // let y = dampingFactor * (Math.sqrt(x) * Math.sin(x)) * (Math.sqrt(z) * Math.sin(z));

  return target.set( x/domainScale + offset, y/domainScale, z/domainScale + offset )
  // return target.set( x, y, z )
}

function saddleFunction(u, v, target) {
  // domain needs to be [0, 10] X [0, 10]
  // there HAS to be a better way to do this
  let domainScale = 8;
  let offset = 0.5;
  let x = (domainScale * u) - (offset*domainScale);
  let z = (domainScale * v) - (offset*domainScale);
  // For now, switching coordinates to match three.js default axes

  let dampingFactor = 0.2;
  let y = dampingFactor * (x**2 - z**2)
  // let y = dampingFactor * (Math.sqrt(x) * Math.sin(x)) * (Math.sqrt(z) * Math.sin(z));

  return target.set( x/domainScale + offset, y/domainScale, z/domainScale + offset )
  // return target.set( x, y, z )
}

function kleinBottle(u, v, target) {

  u *= Math.PI;
  v *= 2 * Math.PI;

  u = u * 2;
  let x, z;
  if ( u < Math.PI ) {
    x = 3 * Math.cos(u) * ( 1 + Math.sin( u ) ) + ( 2 * ( 1 - Math.cos( u ) / 2 ) ) * Math.cos( u ) * Math.cos( v );
    z = - 8 * Math.sin(u) - 2 * ( 1 - Math.cos( u ) / 2 ) * Math.sin( u ) * Math.cos( v );
  } else {
    x = 3 * Math.cos(u) * ( 1 + Math.sin( u ) ) + ( 2 * ( 1 - Math.cos( u ) / 2 ) ) * Math.cos( v + Math.PI );
    z = - 8 * Math.sin(u);
  }
  let y = - 2 * ( 1 - Math.cos(u) / 2 ) * Math.sin( v );

  target.set(x, y, z);

}

function createMesh(geom) {
    // geom.applyMatrix4(new THREE.Matrix4().makeTranslation(-25, 0, -25));
    const meshMaterial = new THREE.MeshNormalMaterial({
      // color: 0xffffff,
      // emissive: 0xb848b6,
      // metalness: 
      // shininess: 25,
      transparent: true,
      // opacity: 0.7,
      flatShading: true
    });
    meshMaterial.side = THREE.DoubleSide;
    return new THREE.Mesh(geom, meshMaterial)
}


const SURFACE_SCALE = 15;

var parametricSurface = new ParametricGeometry(alpineFunction, 10, 10);
// var parametricSurface = new ParametricGeometry(saddleFunction, 10, 10);
// var parametricSurface = new ParametricGeometry(kleinBottle, 30, 30);
parametricSurface.scale(SURFACE_SCALE, SURFACE_SCALE, SURFACE_SCALE);
parametricSurface.translate(-(SURFACE_SCALE/2.0), 0, -(SURFACE_SCALE/2.0));
parametricSurface.rotateY(Math.PI);

let mesh = createMesh(parametricSurface);

// var edges = new THREE.EdgesGeometry( parametricSurface );
var edges = new THREE.WireframeGeometry( parametricSurface );
var lines = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 1 } );
var wireframeMesh = new THREE.LineSegments( edges, lines );
// // boxMesh.rotation.set(40, 0, 40);
// scene.add( surfaceMesh );
// surfaceMesh.position.set(-5, 0, -5);


// mesh.position.set(-5, 0, -5);
// wireframeMesh.position.set(-5, 0, -5);
scene.add(mesh);
scene.add(wireframeMesh);

// camera.lookAt(mesh.position);
controls.update();


// rescale
function adjustMeshScale() {

}






// // zoom on object
// var box3 = new THREE.Box3();
// var size = new THREE.Vector3(); // create once and reuse
// function zoom(thing) {
//   var correctForDepth = 5.3;
//   // this.rotationSpeed = 0.01;
//   // var scale = 1;


//   var boxHelper = new THREE.BoxHelper( mesh );
//   scene.add( boxHelper );

//   box3.setFromObject( boxHelper ); // or from mesh, same answer
//   // console.log( box3 );

//   box3.getSize( size ); // pass in size so a new Vector3 is not allocated
//   // console.log( size )

//   // // create a helper
//   // var helper = new THREE.BoundingBoxHelper(thing);
//   // console.log(helper);
//   // helper.update();

//   // get the bounding sphere
//   var boundingSphere = new THREE.Sphere()
//   box3.getBoundingSphere(boundingSphere);

//   // calculate the distance from the center of the sphere
//   // and subtract the radius to get the real distance.
//   var center = boundingSphere.center;
//   var radius = boundingSphere.radius;
//   console.log(radius);

//   var distance = center.distanceTo(camera.position) - radius;
//   var realHeight = Math.abs(box3.max.y - box3.min.y);

//   var fov = 2 * Math.atan(realHeight * correctForDepth / ( 2 * distance )) * ( 180 / Math.PI );

//   camera.fov = fov;
//   camera.updateProjectionMatrix();
// }

// zoom(mesh);




// const geometry = new THREE.ParametricGeometry( THREE.ParametricGeometries.klein, 25, 25 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const klein = new THREE.Mesh( geometry, material );
// scene.add( klein );



// simple light
const light = new THREE.PointLight(0xFFFFFF, 1, 100);
light.position.set(-10, 50, 50);
scene.add(light);


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









