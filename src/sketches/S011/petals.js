import * as THREE from 'three';
import Petal from './petal';

export default class Petals {
  constructor({
    numPetals = 10,
  }) {
    this.numPetals = numPetals;

    this.petals = [];
    this.pivot = new THREE.Group();

    this.createPetals();
  }

  createPetals() {
    for(let i = 0; i < this.numPetals; i++) {
      const petal = new Petal({x: 0, y: 0, z: 0});
      this.petals.push(petal);
      this.pivot.add(petal.pivot);
    }
  }
  update() {
    this.petals.forEach(petal => petal.update());
  }
}
