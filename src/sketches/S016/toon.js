import * as THREE from 'three';

// https://medium.com/@markus.neuy/postprocessing-shader-mit-shadertoy-und-threejs-8164600c6c76
export default class Toon {
  constructor() {
    const material = new THREE.MeshNormalMaterial();
    const geometry = new THREE.SphereGeometry(3, 32, 32);
    this.mesh = new THREE.Mesh(geometry, material);
  }
  get material() {
    return this.mesh.material;
  }
  get geometry() {
    return this.mesh.geometry;
  }
}
