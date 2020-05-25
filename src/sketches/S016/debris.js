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
      const { bass, midrange, highrange } = this.context.spectrumStart;
      const freqIndex = utils.randomIntBetween(midrange, this.context.frequencyDataLength - 1);
      // const freqIndex = utils.randomIntBetween(highrange, this.context.frequencyDataLength - 1);
      const node = new DebrisNode({
        freqIndex,
        minRadius: this.radius * 0.3,
        maxRadius: this.radius,
        minY: 2,
        maxY: 8,
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
