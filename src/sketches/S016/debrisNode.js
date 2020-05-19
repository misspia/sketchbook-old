import * as THREE from 'three';
import utils from '../utils';

export default class DebrisNode {
  constructor() {
    const sizeX = utils.randomFloatBetween(0.1, 1);
    const sizeY = utils.randomFloatBetween(0.1, 1);
    const sizeZ = utils.randomFloatBetween(0.1, 1);

    this.geometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ);
    this.material = new THREE.MeshBasicMaterial({
      color: 0xaaaaaf,
    });
    this.pivot = new THREE.Mesh(this.geometry, this.material);
  }

  get position() {
    return this.pivot.position;
  }

  update() {

  }
}
