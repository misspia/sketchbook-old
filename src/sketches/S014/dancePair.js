import * as THREE from 'three';

import Dancer from './dancer';

export default class DancePair {
  constructor() {
    this.male = new Dancer();
    this.female = new Dancer();

    this.group = new THREE.Group();
    this.group.add(this.male.mesh);
    this.group.add(this.female.mesh);
  }
  
  update() {

  }
}
