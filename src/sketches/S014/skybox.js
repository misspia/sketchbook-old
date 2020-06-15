import * as THREE from 'three';

export default class Skybox {
  constructor({ size = 1000 }) {
    this.geometry = new THREE.BoxGeometry(size, size, size);
    this.material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });
    this.pivot = new THREE.Mesh(this.geometry, this.material);
    this.pivot.receiveShadow = true;
    this.pivot.position.y = size / 2 - 3;
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}
