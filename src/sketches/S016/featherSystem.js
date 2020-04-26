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

      const opacityThreeshold = (feather.maxX - feather.minX) * 0.8;
      const velocityOpacity = utils.remap(feather.maxX, feather.minX, 0, 1, feather.maxX - feather.minX);

      if (feather.position.x < opacityThreeshold) {
        feather.opacity = 1;
      } else {
        feather.opacity = feather.opacity - velocityOpacity;
      }
    });
  }

  createFeathers() {
    for (let i = 0; i < this.params.numFeathers; i++) {
      const translateVelocity = utils.randomFloatBetween(0.01, 0.06);
      const maxPos = utils.randomFloatBetween(4, 5);
      const minPos = utils.randomFloatBetween(0, 1);
      const feather = new Feather({
        color: 0xffffff,
        velocityRotateX: utils.randomFloatBetween(0.001, 0.1),
        velocityRotateY: utils.randomFloatBetween(0.05, 0.1),
        velocityRotateZ: utils.randomFloatBetween(0.001, 0.1),
        velocityTranslateX: translateVelocity,
        velocityTranslateY: translateVelocity,
        velocityTranslateZ: translateVelocity,
        minX: minPos,
        minY: minPos,
        minZ: 0,
        maxX: maxPos,
        maxY: maxPos,
        maxZ: maxPos,
      });
      feather.position.set(minPos, minPos, 0);

      this.feathers.push(feather);
      this.pivot.add(feather.pivot);
    }
  }
}
