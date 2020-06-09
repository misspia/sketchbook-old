import * as THREE from 'three';
import Cloud from './cloud';

import { Images } from '../../themes';

export default class Clouds {
  constructor({
    numClouds = 10,
  }) {
    this.rotationVelocity = 0.001;
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

    const angleIncrement = Math.PI * 2 / this.numClouds;
    for(let i = 0; i < this.numClouds; i++) {
      const angle = i * angleIncrement;
      const cloud = new Cloud({
        shapeTexture,
        noiseTexture,
        centerCoord: this.position,
        angle,
      });

      this.clouds.push(cloud);
      this.pivot.add(cloud.pivot);
    }
  }

  update(uTime) {
    this.pivot.rotation.y += this.rotationVelocity;
    this.clouds.forEach(cloud => cloud.update(uTime));
  }
}
