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


