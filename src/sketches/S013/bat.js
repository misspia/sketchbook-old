import * as THREE from 'three';
import utils from '../utils';

export default class Bat {
  constructor() {
    this.progressX = 0;
    this.progressY = 0;
    this.progressZ = 0;

    this.progressVelocityX = utils.randomFloatBetween(0.005, 0.01);
    this.progressVelocityY = utils.randomFloatBetween(0.005, 0.01);
    this.progressVelocityZ = utils.randomFloatBetween(0.005, 0.01);

    this.signX = utils.randomBool() ? 1 : -1;
    this.signY = utils.randomBool() ? 1 : -1;
    this.signZ = 1;

    this.startX = 0;
    this.endX = utils.randomFloatBetween(13, 15);

    this.startY = 0;
    this.endY = utils.randomFloatBetween(15, 20);

    this.startZ = 0;
    this.endZ = 100;


    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
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
      this.rightWing.rotation.x > this.endWingAngle ||
      this.rightWing.rotation.x < this.startWingAngle
    ) {
      this.wingVelocity = -this.wingVelocity;
    }
      this.leftWing.rotation.x -= this.wingVelocity;
      this.rightWing.rotation.x += this.wingVelocity;
  }

  getXPos() {
    return this.signX * utils.remap(0, 1, this.startX, this.endX, this.progressX);
  }

  getYPos() {
    return this.signY * utils.remap(0, 1, this.startY, this.endY, this.progressY);
  }

  getZPos() {
    return this.signZ * utils.remap(0, 1, this.startZ, this.endZ, this.progressZ);
  }

  update() {
    if(this.progressX < 1) {
      this.progressX += this.progressVelocityX;
    }
    if(this.progressY < 1) {
      this.progressY += this.progressVelocityY;
    }
    if(this.progressZ < 1) {
      this.progressZ += this.progressVelocityZ;
    }


    if(this.progressX >= 1 && this.progressY >= 1 && this.progressZ >= 1) {
      this.progressX = 0;
      this.progressY = 0;
      this.progressZ = 0;
    }

    this.position.x = this.getXPos();
    this.position.y = this.getYPos();
    this.position.z = this.getZPos();
  }
}
