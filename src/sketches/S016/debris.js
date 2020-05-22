import * as THREE from 'three';
import DebrisNode from './debrisNode';

export default class Debris {
  constructor({ radius, numNodes = 10 }) {
    this.radius = radius;
    this.numNodes = numNodes;

    this.debris = [];

    this.pivot = new THREE.Group();
    this.init();
  }

  get position() {
    return this.pivot.position;
  }

  init() {
    for(let i = 0; i < this.numNodes; i ++) {
      const node = new DebrisNode({
        minRadius: 0.1,
        maxRadius: this.radius,
        minY: 0.5,
        maxY: 5,
      });

      this.debris.push(node);
      this.pivot.add(node.pivot);
    }
  }

  update() {
    this.debris.forEach((node) => node.update());
  }
}
