import * as THREE from 'three';

export default class Tile {
  constructor(size) {
    this.geometry = new THREE.BoxGeometry(size, 0.01, size);
    this.material = new THREE.MeshBasicMaterial({
      color: 0xd5d5d5,
    });

    this.pivot = new THREE.Mesh(this.geometry, this.material);
    this.bbox = new THREE.Box3().setFromObject(this.pivot);

    this.realignY();
  }

  get position() {
    return this.pivot.position;
  }

  get min() {
    return this.bbox.min;
  }

  get max() {
    return this.bbox.max;
  }

  get height() {
    return this.max.y - this.min.y;
  }

  getCenter(target) {
    this.bbox.getCenter(target)
  }

  realignY() {
    const yOffset = this.height / 2;
    this.position.y += yOffset;
  }

  update() {

  }
}
