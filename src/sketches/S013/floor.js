import * as THREE from 'three';

export default class Floor {
  constructor() {
    this.geometry = new THREE.PlaneGeometry(100, 100);
    this.material = new THREE.MeshStandardMaterial({
      color: 0x808080,
      roughness: 0,
      metalness: 0,
    });

    this.pivot = new THREE.Mesh(this.geometry, this.material);
    this.pivot.rotation.x -= Math.PI / 2;
  }

  get position() {
    return this.pivot.position;
  }

  get rotation() {
    return this.pivot.rotation;
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}
