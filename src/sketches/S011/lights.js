import * as THREE from 'three';

export default class Lights {
  constructor() {
    this.ambient = new THREE.AmbientLight(0xffffff, 0.05);

    this.directionalSide = new THREE.DirectionalLight(0xffffff, 0.2);
    this.directionalSide.position.set(100, 70, 100);

    this.directionalBottom = new THREE.DirectionalLight(0xffffff, 0.1);
    this.directionalBottom.position.set(0, -100, 0);
  }
}
