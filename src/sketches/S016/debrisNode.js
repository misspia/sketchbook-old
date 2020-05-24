import * as THREE from 'three';
import utils from '../utils';
import fragmentShader from './shaders/debris.frag';
import vertexShader from './shaders/debris.vert';

const palette = [
  new THREE.Vector3(0.3, 0.3, 0.31),
  new THREE.Vector3(0.67, 0.67, 0.69),
  new THREE.Vector3(0.95, 0.92, 0.92),
  new THREE.Vector3(0.07, 0.07, 0.07),
  new THREE.Vector3(0.0, 0.0, 0.0),
]

export default class DebrisNode {
  constructor({
    freqIndex = 0,
    minRadius = 1,
    maxRadius = 10,
    minY = 0,
    maxY = 5,
  }) {
    this.freqIndex = freqIndex;
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
    this.minYVelocity = utils.randomFloatBetween(0.001, 0.005);
    this.maxYVelocity = utils.randomFloatBetween(0.006, 0.01);

    this.angleVelocity = utils.randomFloatBetween(0.001, 0.01);
    this.minAgleVelocity = utils.randomFloatBetween(0.001, 0.005);
    this.maxAngleVelocity = utils.randomFloatBetween(0.006, 0.01);

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
    this.material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uColor: { value: palette[paletteIndex] },
        uFreq: { value: 0.0 },
      }
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

  update(freq) {
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

    this.material.uniforms.uFreq.value = freq;
  }
}
