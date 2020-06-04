import * as THREE from 'three';
import Cloud from './cloud';

import { Images } from '../../themes';

export default class Clouds {
  constructor({
    numClouds = 10,
  }) {
    this.numClouds = numClouds;
    this.clouds = [];
    this.pivot = new THREE.Group();

    this.createClouds();
  }

  get position() {
    return this.pivot.position;
  }

  createClouds() {
    const loader = new THREE.TextureLoader();

    const shapeTexture = loader.load(Images.T011a);
    const noiseTexture = loader.load(Images.T011b);

    for(let i = 0; i < this.numClouds; i++) {
      const cloud = new Cloud({
        shapeTexture,
        noiseTexture,
        centerCoord: this.position,
      });

      this.clouds.push(cloud);
      this.pivot.add(cloud.pivot);
    }
  }

  update(uTime) {
    this.clouds.forEach(cloud => cloud.update(uTime));
  }
}
