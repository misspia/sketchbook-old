import * as THREE from 'three';

import utils from '../utils';
import frag from './petal.frag';
import vert from './petal.vert';

const minRadius = 23;
const maxRadius = 35;
const minVelocity = 0.005;
const maxVelocity = 0.02;

export default class Petal {
  constructor(pivotCoord) {
    this.minY = -30;
    this.maxY = 10;

    this.centerCoord = {
      x: pivotCoord.x,
      y: utils.randomFloatBetween(this.minY, this.maxY),
      z: pivotCoord.z,
    };

    this.radius = utils.randomFloatBetween(minRadius, maxRadius);
    this.angle = utils.randomFloatBetween(0, 2 * Math.PI);
    this.yVelocity = utils.randomFloatBetween(minVelocity, maxVelocity);
    this.angleVelocity = utils.randomFloatBetween(minVelocity, maxVelocity);

    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.RawShaderMaterial({
      fragmentShader: frag,
      vertexShader: vert,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.setPosition(this.getInitialCoord())
  }
  getInitialCoord() {
    const { x, y, z } = this.centerCoord;
    return {
      x: x + this.radius * Math.cos(this.angle),
      y,
      z: z + this.radius * Math.sin(this.angle),
    }
  }
  updatePosition() {
    this.incrementCenterY();
    this.angle += this.angleVelocity;

    const { x, y, z } = this.centerCoord;
    const coord = {
      x: x + this.radius * Math.cos(this.angle),
      y,
      z: z + this.radius * Math.sin(this.angle),
    };
    this.setPosition(coord);
  }
  // refactor
  incrementCenterY() {
    if(
      this.centerCoord.y >= this.maxY ||
      this.centerCoord.y <= this.minY
    ) {
      this.yVelocity = -this.yVelocity;
    }
    this.centerCoord.y += this.yVelocity;
  }
  setPosition({ x, y, z }) {
    this.mesh.position.set(x, y, z);
  }
  setRotation() {

  }
};
