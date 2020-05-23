import * as THREE from 'three';
import utils from '../utils';

export default class Tile {
  constructor(size, freqIndex) {
    this.freqIndex = freqIndex;
    this.geometry = new THREE.BoxGeometry(size, 2, size);
    this.material = new THREE.MeshLambertMaterial({
      color: 0xd5d5d5,
    });

    this.pivot = new THREE.Mesh(this.geometry, this.material);
    this.pivot.receiveShadow = true;

    this.bbox = new THREE.Box3().setFromObject(this.pivot);
    this.size = new THREE.Vector3();

    this.height = 0.001;
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

  set height(scale) {
    this.pivot.scale.y = scale;
    this.realignY();
  }

  updateSize() {
    this.bbox.setFromObject(this.pivot);
    this.bbox.getSize(this.size);
  }

  getCenter(target) {
    this.bbox.getCenter(target)
  }

  realignY() {
    this.updateSize();
    this.position.y = this.size.y / 2;
  }

  remapFreq() {

  }

  update(freq) {
    this.height = utils.remap(0, 255, 0.001, 1, freq);
  }
}
