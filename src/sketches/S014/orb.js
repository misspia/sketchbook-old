import * as THREE from 'three';

// https://threejs.org/examples/?q=material#webgl_materials_physical_reflectivity
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_materials_physical_reflectivity.html
export default class Orb {
  constructor(context) {
    this.context = context;
    this.beatManager = context.beatManager;
    
    this.geometry = new THREE.IcosahedronGeometry(2, 2);
    this.geometry.computeFlatVertexNormals();

    this.backMaterial = new THREE.MeshPhysicalMaterial({
      map: null,
      color: 0x0000ff,
      metalness: 1,
      roughness: 0,
      opacity: 0.5,
      side: THREE.BackSide,
      transparent: true,
      envMapIntensity: 5,
    })
    this.fronMaterial = new THREE.MeshPhysicalMaterial({
      map: null,
      color: 0x0000ff,
      metalness: 0,
      roughness: 0,
      opacity: 0.25,
      side: THREE.FrontSide,
      transparent: true,
      envMapIntensity: 10,
      premultipliedAlpha: true,
    })

    this.material = new THREE.MeshPhongMaterial();
    this.mesh = new THREE.Mesh(this.geometry, this.material)
  }

  get position() {
    return this.mesh.position;
  }

  get uniforms() {
    return this.material.uniforms;
  }

  mapFreqToAmp(freq) {

  }

  update(time) {
    
  }
}
