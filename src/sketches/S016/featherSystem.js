import * as THREE from 'three';
import Feather from './feather';
import utils from '../utils';

export default class FeatherSystem {
  constructor(params = {}) {
    this.params = {
      numFeathers: 15,

      ...params,
    };

    this.feathers = [];

    this.pivot = new THREE.Group();

    this.createFeathers();
  }

  get position() {
    return this.pivot.position;
  }

  get rotation() {
    return this.pivot.rotation;
  }

  get scale() {
    return this.pivot.scale;
  }

  update() {
    this.feathers.forEach(feather => {
      if (feather.position.x >= feather.maxX) {
        feather.position.x = feather.minX;
      } else {
        feather.position.x += feather.velocityTranslateX;
      }

      if (feather.position.y >= feather.maxY) {
        feather.position.y = feather.minY;
      } else {
        feather.position.y += feather.velocityTranslateY;
      }

      feather.rotation.x += feather.velocityRotateX;
      feather.rotation.y += feather.velocityRotateY;
      feather.rotation.z += feather.velocityRotateZ;

    });
  }

  createFeathers() {
    for (let i = 0; i < this.params.numFeathers; i++) {
      const feather = new Feather({
        color: 0xffffff,
        velocityRotateX: utils.randomFloatBetween(0.001, 0.1),
        velocityRotateY: utils.randomFloatBetween(0.001, 0.1),
        velocityRotateZ: utils.randomFloatBetween(0.001, 0.1),
        velocityTranslateX: utils.randomFloatBetween(0.01, 0.06),
        velocityTranslateY: utils.randomFloatBetween(0.001, 0.05),
        velocityTranslateZ: utils.randomFloatBetween(0.001, 0.1),
        minX: 0.5,
        minY: 0,
        minZ: 0,
        maxX: utils.randomFloatBetween(4, 5),
        maxY: utils.randomFloatBetween(4, 5),
        maxZ: utils.randomFloatBetween(4, 5),
      });
      this.feathers.push(feather);
      this.pivot.add(feather.pivot);
    }
  }
}
