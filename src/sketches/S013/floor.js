import * as THREE from 'three';

export default class Floor {
  constructor({ width, height }) {
    this.geometry = new THREE.PlaneGeometry(width, height);
    this.material = new THREE.MeshStandardMaterial({
      color: 0x6fb0ff,
      roughness: 0,
      metalness: 0,
    });

    this.pivot = new THREE.Mesh(this.geometry, this.material);
    this.pivot.rotation.x -= Math.PI / 2;

    this.bbox = new THREE.Box3();
  }

  get min() {
    return this.bbox.setFromObject(this.pivot).min;
  }

  get max() {
    return this.bbox.setFromObject(this.pivot).max;
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
