import * as THREE from 'three';

export class Skybox {
  constructor({
    width = 100,
    height = 100,
    depth = 100,
    color = 0x000000,
    material,
  }) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.color = color;

    this.geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
    /**
     * remove top face
     */
    this.geometry.faces.splice(4, 2);
    /**
     * remove front face
     */
    this.geometry.faces.splice(6, 2);

    this.pivot = new THREE.Mesh(this.geometry, material);

    const bbox = new THREE.Box3().setFromObject(this.pivot);
    this.min = bbox.min;
    this.max = bbox.max;
  }

  get position() {
    return this.pivot.position;
  }

  dispose() {
    this.geometry.dispose();
  }

  getZCoord(percentage) {
    const offset = this.height * percentage;
    return this.min.z + offset;
  }
}
