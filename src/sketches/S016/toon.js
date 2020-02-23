import * as THREE from 'three';

export default class Toon {
  constructor() {
    // this.material = new THREE.RawShaderMaterial({

    // });
    this.material = new THREE.MeshNormalMaterial();

    this.geometry = new THREE.SphereGeometry(3, 32, 32);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }
}
