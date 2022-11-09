import * as THREE from 'three';

import { Stairs } from './Stairs';

export class Platform {
  constructor({
    numSteps = 5,
    width = 10,
    material,
  }) {
    this.material = material;

    this.width = width;
    this.platformDepth = 20;
    this.geometry = new THREE.Geometry();
    this.stairs = new Stairs({
      numSteps,
      width,
      material: this.material,
    });
    this.addPlatform();
    this.addStairs();

    this.pivot = new THREE.Mesh(this.geometry, this.material);
    this.pivot.castShadow = true;
    this.pivot.receiveShadow = true;

    this.bbox = new THREE.Box3().setFromObject(this.pivot);
    this.min = this.bbox.min;
    this.max = this.bbox.max;
  }

  get position() {
    return this.pivot.position;
  }

  get depth() {
    return this.bbox.max.z - this.bbox.min.z;
  }

  get height() {
    return this.bbox.max.y - this.bbox.min.y;
  }

  dispose() {
    this.geometry.dispose();
    this.stairs.dispose();
  }

  addPlatform() {
    const geometry = new THREE.BoxGeometry(
      this.stairs.width,
      this.stairs.height,
      this.platformDepth,
    );
    const mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.set(0, this.stairs.height / 2, this.platformDepth / 2);

    mesh.updateMatrix();

    this.geometry.merge(mesh.geometry, mesh.matrix);
  }

  addStairs() {
    this.stairs.position.z += this.stairs.depth + this.platformDepth;
    this.stairs.updateMatrix();
    this.geometry.merge(this.stairs.geometry, this.stairs.matrix);
  }
}
