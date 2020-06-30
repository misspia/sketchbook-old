import * as THREE from 'three';
import Bat from './bat';
import utils from '../utils';

export default class Bats {
  constructor() {
    this.numBats = utils.randomFloatBetween(5, 8);
    this.bats = [];

    this.pivot = new THREE.Group();
  }

  get position() {
    return this.pivot.position;
  }

  dispose() {
    this.bats.forEach(bat => bat.dispose());
  }

  createBats() {
    for(let i = 0; i < this.numBats; i++) {
      const bat = new Bat();
      this.pivot.add(bat.pivot);
      this.bats.push(bat);
    }
  }

  update() {
    this.bats.forEach(bat => bat.update());
  }
}
