import * as THREE from 'three';

export default class Line {
  constructor({ points= [] }) {
    this.geometry = new THREE.BufferGeometry().setFromPoints(points);
    this.material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      linewidth: 0.5,
    });
    this.pivot = new THREE.Line(this.geometry, this.material);
  }

  get uuid() {
    return this.pivot.uuid;
  }

  get position() {
    return this.pivot.position;
  }

  updateMatrix() {
    this.pivot.updateWorldMatrix()
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }

  update() {

  }
}
