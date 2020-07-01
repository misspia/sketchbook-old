import * as THREE from 'three';

export default class Lights {
  constructor() {
    this.ambient = new THREE.AmbientLight(0xffffff, 0.1);
    this.directional = new THREE.DirectionalLight(0xffffff, 0.15);
  }

  update() {

  }
}
