import * as THREE from 'three';

export default class Boid {
  constructor() {
    this.velocity = 0;

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0xeeaaee,
    });
    this.mesh = new THREE.Mesh(geometry, material);
  }
  setPosition(x, y, z) {
    this.mesh.position.set(x, y, z);
  }
  update() {

  }
  computeAlignment() {

  }
  computeCohesion() {

  }
  computeSeperation() {

  }
}