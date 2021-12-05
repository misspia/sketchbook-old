import * as THREE from 'three';

const RED = 0xff0008
const BLUE = 0x0300ff

// https://threejs.org/examples/?q=material#webgl_materials_physical_reflectivity
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_materials_physical_reflectivity.html
export default class Orb {
  constructor(context) {
    this.context = context;
    this.beatManager = context.beatManager;
    
    // this.geometry = new THREE.TetrahedronGeometry(2, 1);
    this.geometry = new THREE.IcosahedronGeometry(2, 1);
    this.geometry.computeFlatVertexNormals();

    this.backMaterial = new THREE.MeshPhysicalMaterial({
      map: null,
      color:  RED,
      metalness: 1,
      roughness: 0,
      opacity: 0.5,
      side: THREE.BackSide,
      transparent: true,
      envMapIntensity: 5,
      reflectivity: 1,
    })
    this.frontMaterial = new THREE.MeshPhysicalMaterial({
      map: null,
      color:  RED,
      metalness: 0,
      roughness: 0,
      opacity: 0.25,
      side: THREE.FrontSide,
      transparent: true,
      envMapIntensity: 10,
      premultipliedAlpha: true,
      reflectivity: 1,
    })

    this.mesh = new THREE.Mesh(this.geometry, this.backMaterial)
    this.meshSecondary = this.mesh.clone()
    this.meshSecondary.material = this.frontMaterial

    this.group = new THREE.Group()
    this.group.add(this.mesh)
    this.group.add(this.meshSecondary)
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
