import * as THREE from 'three';

const MIN_SCALE = 0.001;

export class Tile {
  constructor({ size, freqIndex, isActive, spectrum }) {
    this.spectrum = spectrum;
    this.isActive = isActive;
    this.freqIndex = freqIndex;
    this.geometry = new THREE.BoxGeometry(size, 0.023, size);
    this.material = new THREE.MeshLambertMaterial({
      color: 0xd5d5d5,
    });

    this.pivot = new THREE.Mesh(this.geometry, this.material);
    this.pivot.receiveShadow = true;

    this.bbox = new THREE.Box3().setFromObject(this.pivot);
    this.size = new THREE.Vector3();

    this.height = MIN_SCALE;
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

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
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

  update(freq, average) {
    if(!this.isActive) {
      return;
    }
    if(average === 0) {
      this.height = MIN_SCALE;
      return;
    }
    // this.height = Math.max(Math.abs(freq - average), MIN_SCALE);
    this.height = Math.max(freq - average, MIN_SCALE);
  }
}
