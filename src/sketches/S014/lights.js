import * as THREE from 'three';

export default class Lights {
  constructor() {
    this.spot = new THREE.SpotLight(0xbbaaff, 0.5, 1000, 1.05, 0.3, 2);
    // this.spot = new THREE.SpotLight(0xff0000, 0.5, 1000, 1.05, 0.3, 2);
    this.spot.position.set(0, 150, 0);
    // this.spot.castShadow = true;

    this.directional = new THREE.DirectionalLight(0xffffff, 0.2);
    this.directional.position.set(0, 50, 0);

    this.ambient = new THREE.AmbientLight(0xffffff, 1);
  }

}
