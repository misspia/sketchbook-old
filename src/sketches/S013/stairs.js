import * as THREE from 'three';

export default class Stairs {
  constructor({
    numSteps = 5,
  }) {
    this.numSteps = numSteps;
    this.stepDepth = 2;
    this.stepHeight = 1;
    this.stepGeometry = new THREE.BoxGeometry(10, this.stepHeight, this.stepDepth);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
    this.stepMesh = new THREE.Mesh(this.stepGeometry, material);

    this.geometry = new THREE.Geometry();
    this.createSteps();

    this.material = new THREE.MeshStandardMaterial({
      color: 0x0000ff,
      metalness: 0,
      roughness: 0,
    });
    this.pivot = new THREE.Mesh(this.geometry, this.material);
  }

  get position() {
    return this.pivot.position;
  }

  createSteps() {
    let y = 0;
    let z = 0;

    for (let i = 0; i < this.numSteps; i++) {
      const step = this.stepMesh.clone();
      step.position.set(0, y, z);

      step.updateMatrix();
      this.geometry.merge(step.geometry, step.matrix)

      y += this.stepHeight;
      z -= this.stepDepth;
    }
  }
}
