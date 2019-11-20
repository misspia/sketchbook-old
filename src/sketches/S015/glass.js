import * as THREE from 'three';

export default class Glass {
  constructor() {
    this.geometry = new THREE.PlaneGeometry(50, 50, 2, 2);
    this.material = new THREE.MeshBasicMaterial({
      color: 0x000000,
    });
  }
  update() {

  }
}
