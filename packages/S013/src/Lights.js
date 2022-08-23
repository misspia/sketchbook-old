import * as THREE from 'three';

export class Lights {
  constructor() {
    this.ambient = new THREE.AmbientLight(0xffffff, 0.05);
    this.directional = new THREE.DirectionalLight(0xffffff, 0.2);
    this.directional.position.set(0, 50, 0);
  }

  update() {

  }
}
