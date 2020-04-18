import * as THREE from 'three';
import utils from '../utils';
import Feather from './feather';
import WingBase from './wingBase';

export default class Wing {
  constructor(environment) {
    this.environment = environment;
    this.pivot = new THREE.Group();

    this.base = new WingBase(this.environment, {
      metalness: 0.1,
      roughness: 1,
      opacity: 1.0,
      sheen: 0xb5b5b5,
      color: 0xb5b5b5,
    });

    this.numFeathers = 15;
    this.feathers = [];
    this.feathersPivot = new THREE.Group();

    this.createFeathers();

    this.pivot.add(this.base.pivot);
    this.pivot.add(this.feathersPivot);
  }

  get position() {
    return this.pivot.position;
  }

  createFeathers() {
    for (let i = 0; i < this.numFeathers; i++) {
      const feather = new Feather({ color: 0xffffff });
      this.feathers.push(feather);
      this.feathersPivot.add(feather.pivot);
    }
  }
}
