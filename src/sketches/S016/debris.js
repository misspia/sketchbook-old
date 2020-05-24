import * as THREE from 'three';
import DebrisNode from './debrisNode';
import utils from '../utils';

export default class Debris {
  constructor(context, { radius, numNodes = 10 }) {
    this.context = context;
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
      const { bass, midrange } = this.context.spectrumStart;
      const freqIndex = utils.randomIntBetween(bass, midrange);
      const node = new DebrisNode({
        freqIndex,
        minRadius: 0.1,
        maxRadius: this.radius,
        minY: 0.5,
        maxY: 5,
      });

      this.debris.push(node);
      this.pivot.add(node.pivot);
    }
  }

  update(frequencies) {
    this.debris.forEach((node) => (
      node.update(frequencies[node.freqIndex])
    ));
  }
}
