import * as THREE from 'three';
import utils from '../utils';
import Feather from './feather';
import FeatherSystem from './featherSystem';
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
    this.featherSystem = new FeatherSystem({});

    // this.pivot.add(this.base.pivot);
    this.pivot.add(this.featherSystem.pivot);
  }

  get position() {
    return this.pivot.position;
  }

  update() {
    this.featherSystem.update();
  }
}
