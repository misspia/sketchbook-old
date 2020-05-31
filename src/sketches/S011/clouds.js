import * as THREE from 'three';
import Cloud from './cloud';

import { Images } from '../../themes';

export default class Clouds {
  constructor({
    radius = 5,
    numClouds = 10,
    maxY = 0,
    minY = 0,
  }) {
    this.maxY = maxY;
    this.minY = minY;
    this.radius = radius;
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

    const { radius, maxY, minY } = this;

    for(let i = 0; i < this.numClouds; i++) {
      const cloud = new Cloud({
        shapeTexture,
        noiseTexture,
        centerCoord: this.position,
        radius,
        maxY,
        minY,
      });

      this.clouds.push(cloud);
      this.pivot.add(cloud.pivot);
    }
  }

  update(uTime) {
    this.clouds.forEach(cloud => cloud.update(uTime));
  }
}
