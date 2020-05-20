import * as THREE from 'three';
import utils from '../utils';

const palette = [
  0xaaaaaf,
  0x000000,
];

export default class DebrisNode {
  constructor() {
    this.centerCoord = new THREE.Vector3();
    this.radius = utils.randomFloatBetween(0.1, 5);
    this.angle = utils.randomFloatBetween(0, 2 * Math.PI);
    this.rotation = new THREE.Vector3();

    this.minY = 1;
    this.maxY = 3;
    this.yVelocity = utils.randomFloatBetween(0.001, 0.01);
    this.angleVelocity = utils.randomFloatBetween(0.001, 0.01);
    this.rotationVelocity = new THREE.Vector3(
      utils.randomFloatBetween(-0.01, 0.01),
      utils.randomFloatBetween(-0.01, 0.01),
      utils.randomFloatBetween(-0.01, 0.01),
    );

    this.geometry = new THREE.BoxGeometry(
      utils.randomFloatBetween(0.1, 1),
      utils.randomFloatBetween(0.1, 1),
      utils.randomFloatBetween(0.1, 1),
    );

    const paletteIndex = utils.randomIntBetween(0, palette.length - 1);
    this.material = new THREE.MeshBasicMaterial({
      color: palette[paletteIndex],
    });
    this.pivot = new THREE.Mesh(this.geometry, this.material);
    this.updatePosition();
  }

  get position() {
    return this.pivot.position;
  }

  updatePosition() {
    const pos = {
      x: this.centerCoord.x + this.radius * Math.cos(this.angle),
      y: this.centerCoord.y,
      z: this.centerCoord.z + this.radius * Math.sin(this.angle),
    };
    this.position.set(pos.x, pos.y, pos.z);
  }

  update() {
    if(this.centerCoord.y >= this.maxY) {
      this.centerCoord.y = this.minY;
    } else {
      this.centerCoord.y += this.yVelocity;
    }

    this.angle += this.angleVelocity;
    this.pivot.rotation.x += this.rotationVelocity.x;
    this.pivot.rotation.y += this.rotationVelocity.y;
    this.pivot.rotation.z += this.rotationVelocity.z;

    this.updatePosition();
  }
}
