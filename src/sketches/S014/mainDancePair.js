import * as THREE from 'three';

import Tsar from './tsar';
import Anastasia from './anastasia'

export default class MainDancePair {
  constructor() {
    this.male = new Tsar();
    this.female = new Anastasia();

    this.group = new THREE.Group();
    this.group.add(this.male.mesh);
    this.group.add(this.female.mesh);
  }
  
  update() {

  }
}
