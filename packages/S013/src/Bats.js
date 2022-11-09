import * as THREE from 'three';
import { Bat } from './Bat';
import utils from 'toolkit/utils';

export class Bats {
  constructor() {
    this.numBats = utils.randomFloatBetween(8, 12);
    this.bats = [];

    this.pivot = new THREE.Group();
    this.createBats();
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
