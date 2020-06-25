import * as THREE from 'three';

import Stairs from './stairs';

export default class Platform {
  constructor({
    numSteps = 5,
    width = 10,
  }) {
    this.width = width;
    this.geometry = new THREE.Geometry();
    this.stairs = new Stairs({ numSteps, width });
    this.addStairs();
    this.addPlatform();

    this.material = new THREE.MeshStandardMaterial({
      color: 0x0000ff,
      metalness: 0,
      roughness: 0,
    });
    this.pivot = new THREE.Mesh(this.geometry, this.material);
    this.bbox = new THREE.Box3().setFromObject(this.pivot);
  }

  get position() {
    return this.pivot.position;
  }

  get depth() {
    return this.bbox.max.z - this.bbox.min.z;
  }

  dispose() {

  }

  addPlatform() {
    const depth = 10;
    const geometry = new THREE.BoxGeometry(
      this.stairs.width,
      this.stairs.height,
      depth
    );
    const mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.set(0, this.stairs.height / 2, -depth / 2);

    mesh.updateMatrix();

    this.geometry.merge(mesh.geometry, mesh.matrix);
  }

  addStairs() {
    this.stairs.position.z += this.stairs.depth;
    this.stairs.updateMatrix();
    this.geometry.merge(this.stairs.geometry, this.stairs.matrix);
  }
}
