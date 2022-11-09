import * as THREE from 'three';
import utils from 'toolkit/utils';

import { DebrisNode } from './DebrisNode';

export class Debris {
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

  dispose() {
    this.debris.forEach(debris => debris.dispose());
  }

  init() {
    for(let i = 0; i < this.numNodes; i ++) {
      const { midrange } = this.context.spectrumStart;
      const freqIndex = utils.randomIntBetween(midrange, this.context.frequencyDataLength - 1);
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
