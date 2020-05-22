import * as THREE from 'three';
import utils from '../utils';

const palette = [
  0x4c4c4e,
  0xaaaaaf,
  0xf1ebeb,
  0x111111,
  0x000000,
];

export default class DebrisNode {
  constructor({
    minRadius = 1,
    maxRadius = 10,
    minY = 0,
    maxY = 5,
  }) {
    this.minY = minY;
    this.maxY = maxY;
    this.centerCoord = new THREE.Vector3(
      0,
      utils.randomFloatBetween(this.minY, this.maxY),
      0,
    );
    this.radius = utils.randomFloatBetween(minRadius, maxRadius);
    this.angle = utils.randomFloatBetween(0, 2 * Math.PI);
    this.rotation = new THREE.Vector3();
    this.scale = 1;

    this.yVelocity = utils.randomFloatBetween(0.001, 0.01);
    this.angleVelocity = utils.randomFloatBetween(0.001, 0.01);
    this.rotationVelocity = new THREE.Vector3(
      utils.randomFloatBetween(-0.01, 0.01),
      utils.randomFloatBetween(-0.01, 0.01),
      utils.randomFloatBetween(-0.01, 0.01),
    );

    this.geometry = new THREE.BoxGeometry(
      utils.randomFloatBetween(0.05, 0.5),
      utils.randomFloatBetween(0.05, 0.5),
      utils.randomFloatBetween(0.05, 0.5),
    );

    const paletteIndex = utils.randomIntBetween(0, palette.length - 1);
    this.material = new THREE.MeshBasicMaterial({
      color: palette[paletteIndex],
    });
    this.pivot = new THREE.Mesh(this.geometry, this.material);
    this.updatePosition();
    this.updateScale();
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

  updateScale() {
    if(this.position.y >= 4) {
      const distanceToMax = this.maxY - this.position.y;
      this.scale = utils.remap(0, 1, 0.01, 1, distanceToMax);
    } else {
      const distanceToMin = Math.min(1, this.position.y - this.minY);
      this.scale = utils.remap(0, 1, 0.01, 1, distanceToMin);
    }
    this.pivot.scale.set(
      this.scale,
      this.scale,
      this.scale,
    );
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
    this.updateScale();
  }
}
