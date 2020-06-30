import * as THREE from 'three';

export default class Wall {
  constructor() {
    this.geometry = new THREE.PlaneGeometry(200, 200);
    this.material = new THREE.MeshBasicMaterial({
      color: 0x000000,
      size: THREE.DoubleSide,
    });
    this.pivot = new THREE.Mesh(this.geometry, this.material);
  }

  get position() {
    return this.pivot.position;
  }
}
