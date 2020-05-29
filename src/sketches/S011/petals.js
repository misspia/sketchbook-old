import * as THREE from 'three';
import Petal from './petal';

export default class Petals {
  constructor({
    numPetals = 10,
  }) {
    this.numPetals = numPetals;

    this.petals = [];
    this.pivot = new THREE.Group();

    this.init();
  }

  init() {
    for(let i = 0; i < this.numPetals; i++) {
      const petal = new Petal({x: 0, y: 0, z: 0});
      this.petals.push(petal);
      this.pivot.add(petal.mesh);
    }
  }
  update() {
    this.petals.forEach(petal => petal.update());
  }
}
