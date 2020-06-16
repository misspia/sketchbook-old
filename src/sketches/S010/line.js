import * as THREE from 'three';

export default class Line {
  constructor() {
    const points = [
      new THREE.Vector3(-10, 0, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(10, 0, 0),
    ];
    this.geometry = new THREE.BufferGeometry().setFromPoints(points);
    this.material = new THREE.LineBasicMaterial({
      color: 0xffffff,
    });
    this.pivot = new THREE.Line(this.geometry, this.material);
  }

  get position() {
    return this.pivot.position;
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }

  update() {

  }
}
