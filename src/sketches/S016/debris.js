import * as THREE from 'three';
import DebrisNode from './debrisNode';

export default class Debris {
  constructor() {
    this.numNodes = 10;

    this.debris = [];

    this.pivot = new THREE.Group();
    this.init();
  }

  get position() {
    return this.pivot.position;
  }

  init() {
    for(let i = 0; i < this.numNodes; i ++) {
      const node = new DebrisNode();

      this.debris.push(node);
      this.pivot.add(node.pivot);
    }
  }

  update() {

  }
}
