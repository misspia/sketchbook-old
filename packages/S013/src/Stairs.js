import * as THREE from 'three';

export class Stairs {
  constructor({
    numSteps = 5,
    width = 10,
    material,
  }) {
    this.numSteps = numSteps;
    this.stepDepth = 2;
    this.stepHeight = 1.1;
    this.stepWidth = width;
    this.stepGeometry = new THREE.BoxGeometry(this.stepWidth, this.stepHeight, this.stepDepth);

    this.geometry = new THREE.Geometry();
    this.createSteps();

    this.material = material;

    this.pivot = new THREE.Mesh(this.geometry, this.material);
  }

  get position() {
    return this.pivot.position;
  }

  get width() {
    return this.stepWidth;
  }

  get height() {
    return this.numSteps * this.stepHeight;
  }

  get depth() {
    return this.numSteps * this.stepDepth - this.stepDepth / 2;
  }

  get matrix() {
    return this.pivot.matrix;
  }

  dispose() {
    this.geometry.dispose();
  }

  createSteps() {
    let y = this.stepHeight / 2;
    let z = 0;

    const stepMesh = new THREE.Mesh(this.stepGeometry, this.material);
    for (let i = 0; i < this.numSteps; i++) {
      const step = stepMesh.clone();
      step.position.set(0, y, z);

      step.updateMatrix();
      this.geometry.merge(step.geometry, step.matrix)

      y += this.stepHeight;
      z -= this.stepDepth;
    }
  }

  updateMatrix() {
    this.pivot.updateMatrix();
  }
}
