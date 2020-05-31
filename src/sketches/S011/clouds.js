import * as THREE from 'three';
import Cloud from './cloud';

import { Images } from '../../themes';

export default class Clouds {
  constructor() {

    this.numClouds = 20;
    this.clouds = [];
    this.pivot = new THREE.Group();

    this.createClouds();
  }

  createClouds() {
    const loader = new THREE.TextureLoader();

    const shapeTexture = loader.load(Images.T011a);
    const noiseTexture = loader.load(Images.T011b);

    for(let i = 0; i < this.numClouds; i++) {
      const cloud = new Cloud({
        shapeTexture,
        noiseTexture,
      });

      this.clouds.push(cloud);
      this.pivot.add(cloud.pivot);
    }
  }

  update(uTime) {
    this.clouds.forEach(cloud => cloud.update(uTime));
  }
}
