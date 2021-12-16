import * as THREE from 'three';

const RED = 0xff0008
const BLUE = 0x0300ff

const COLOR = BLUE

// https://threejs.org/examples/?q=material#webgl_materials_physical_reflectivity
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_materials_physical_reflectivity.html
export default class Hextech {
  constructor(context) {
    this.context = context;
    this.beatManager = context.beatManager;

    this.geometry = new THREE.IcosahedronGeometry(2, 1);
    this.geometry.computeFlatVertexNormals();

    this.intensity = 5
    this.light = new THREE.PointLight(COLOR, this.intensity, 100)
    this.light.castShadow = true
    // this.light.shadow.bias = -0.005
    this.light.shadow.bias = -0.1

    this.innerMaterial = new THREE.MeshPhysicalMaterial({
      map: null,
      color: COLOR,
      metalness: 1,
      roughness: 0,
      opacity: 0.5,
      side: THREE.BackSide,
      transparent: true,
      envMapIntensity: 5,
      reflectivity: 1,
    })
    this.outerMaterial = new THREE.MeshPhysicalMaterial({
      map: null,
      color: COLOR,
      metalness: 0,
      roughness: 0,
      opacity: 0.25,
      side: THREE.FrontSide,
      transparent: true,
      envMapIntensity: 10,
      premultipliedAlpha: true,
      reflectivity: 1,
      // emissive: 0xffffff,
      // emissive: BLUE,
      // clearcoat: 1,
    })

    this.innerMaterial.color.multiplyScalar(this.intensity)
    this.outerMaterial.color.multiplyScalar(this.intensity)

    this.innerMesh = new THREE.Mesh(this.geometry, this.innerMaterial)
    this.outerMesh = this.innerMesh.clone()
    this.outerMesh.material = this.outerMaterial

    this.group = new THREE.Group()
    this.light.add(this.innerMesh)
    this.light.add(this.outerMesh)
    this.group.add(this.light)
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
