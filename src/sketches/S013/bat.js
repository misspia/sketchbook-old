import * as THREE from 'three';
import utils from '../utils';

export default class Bat {
  constructor() {
    this.velocity = utils.randomFloatBetween(0.1, 0.8);

    this.geometry = new THREE.Geometry();
    this.material = new THREE.MeshBasicMaterial({
      color: 0x000000,
    });
    this.pivot = new THREE.Mesh(this.geometry, this.material);
  }

  get position() {
    return this.pivot.position;
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }

  updatePosition() {

  }

  updateWings() {
    if(
      this.rightWing.rotation.x > this.maxWingAngle ||
      this.rightWing.rotation.x < this.minWingAngle
    ) {
      this.wingVelocity = -this.wingVelocity;
    }
      this.leftWing.rotation.x -= this.wingVelocity;
      this.rightWing.rotation.x += this.wingVelocity;
  }
  update() {

  }
}
