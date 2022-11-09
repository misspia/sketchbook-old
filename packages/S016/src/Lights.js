import * as THREE from 'three';

export class Lights {
  constructor() {
    this.ambient = new THREE.AmbientLight(0xffffff, 0.5);

    this.directionalTop = new THREE.DirectionalLight(0xffffff, 1);
    this.directionalTop.position.set(0, 20, 0);

    this.directionalSide = new THREE.DirectionalLight(0xffffff, 0.5);
    this.directionalSide.position.set(-10, 0, 10)
  }
}
