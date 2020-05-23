import * as THREE from 'three';
import utils from '../utils';

export default class Tile {
  constructor(size) {
    const height = utils.randomFloatBetween(0.01, 1);

    // this.geometry = new THREE.BoxGeometry(size, 0.01, size);
    this.geometry = new THREE.BoxGeometry(size, height, size);
    this.material = new THREE.MeshLambertMaterial({
      color: 0xd5d5d5,
      // color: 0xff0000,
    });

    this.pivot = new THREE.Mesh(this.geometry, this.material);
    this.pivot.receiveShadow = true;

    this.bbox = new THREE.Box3().setFromObject(this.pivot);

    // this.pivot.scale.y = 0.01;
    // this.realignY();
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
    console.debug(yOffset)
    this.position.y += yOffset;
  }

  update() {

  }
}
