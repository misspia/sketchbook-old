import * as THREE from 'three';

export default class Tiles {
  constructor(size) {
    this.geometry = new THREE.BoxGeometry(size, 0.1, size);
    this.material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    this.pivot = new THREE.Mesh(this.geometry, this.material);
  }

  get position() {
    return this.pivot.position;
  }

  update() {

  }
}
