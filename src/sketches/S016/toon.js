import * as THREE from 'three';

// https://medium.com/@markus.neuy/postprocessing-shader-mit-shadertoy-und-threejs-8164600c6c76
export default class Toon {
  constructor() {
    // this.material = new THREE.RawShaderMaterial({

    // });
    this.material = new THREE.MeshNormalMaterial();

    this.geometry = new THREE.SphereGeometry(3, 32, 32);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }
}
