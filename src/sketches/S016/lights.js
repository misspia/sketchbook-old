import * as THREE from 'three';

export default class Lights {
  constructor() {
    this.ambient = new THREE.AmbientLight(0xffffff, 0.5);

    this.directional = new THREE.DirectionalLight(0xffffff, 1);
    this.directional.position.set(0, 20, 0);
  }
}
