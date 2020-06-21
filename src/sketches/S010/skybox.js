import * as THREE from 'three';

export default class Skybox {
  constructor({ size, clippingPlanes }) {
    this.geometry = new THREE.BoxGeometry(size, size, size);
    this.material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      clipIntersection: true,
      side: THREE.BackSide,
      clippingPlanes,
    });
    this.pivot = new THREE.Mesh(this.geometry, this.material);
    this.bbox = new THREE.Box3().setFromObject(this.pivot);

    this.position.z += this.height / 2;
  }

  get position() {
    return this.pivot.position;
  }

  get height() {
    return this.bbox.max.y - this.bbox.min.y;
  }

  get min() {
    return this.bbox.min;
  }

  get max() {
    return this.bbox.max;
  }

  update() {

  }
}
