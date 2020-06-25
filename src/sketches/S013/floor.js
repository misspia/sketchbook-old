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
    this.center = new THREE.Vector3();
    this.bbox.setFromObject(this.pivot).getCenter(this.center);
  }

  get min() {
    return this.bbox.setFromObject(this.pivot).min;
  }

  get max() {
    return this.bbox.setFromObject(this.pivot).max;
  }

  get width() {
    return Math.abs(this.max.x - this.min.x);
  }

  get height() {
    console.debug(this.max.z - this.min.z)
    return Math.abs(this.max.z - this.min.z);
  }

  getZCoord(percentage) {
    const offset = this.height * percentage;
    return this.min.z + offset;
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
