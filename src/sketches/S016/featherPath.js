import * as THREE from 'three';

export default class FeatherPath {
  constructor() {

    const points = this.generatePoints();
    this.pivot = new THREE.CatmullRomCurve3(points)
  }

  get currentPoint() {
    return this.pivot.currentPoint;
  }

  generatePoints() {
    return [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-60, 0, -22),
      new THREE.Vector3(-80, 0, 10),
      new THREE.Vector3(-30, 30, 60),
      new THREE.Vector3(15, 0, 70),
      new THREE.Vector3(35, 0, 60),
      new THREE.Vector3(50, 0, 22),
      new THREE.Vector3(0, 0, 0),
    ];
  }
}
