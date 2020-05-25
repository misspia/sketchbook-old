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

    this.minYVelocity = utils.randomFloatBetween(0.001, 0.005);
    this.maxYVelocity = utils.randomFloatBetween(0.02, 0.05);

    this.minAgleVelocity = 0;
    this.maxAngleVelocity = utils.randomFloatBetween(0.001, 0.003);

    this.rotationVelocity = {
      x: 0,
      y: 0,
      z: 0,
    };
    const rotationSignX = utils.randomBool() ? -1 : 1;
    this.minRotationVelocityX = utils.randomFloatBetween(0.001, 0.01) * rotationSignX;
    this.maxRotationVelocityX = utils.randomFloatBetween(0.013, 0.018) * rotationSignX;
    const rotationSignY = utils.randomBool() ? -1 : 1;
    this.minRotationVelocityY = utils.randomFloatBetween(0.001, 0.01) * rotationSignY;
    this.maxRotationVelocityY = utils.randomFloatBetween(0.013, 0.018) * rotationSignY;
    const rotationSignZ = utils.randomBool() ? -1 : 1;
    this.minRotationVelocityZ = utils.randomFloatBetween(0.001, 0.01) * rotationSignZ;
    this.maxRotationVelocityZ = utils.randomFloatBetween(0.013, 0.018) * rotationSignZ;

    this.geometry = new THREE.BoxGeometry(
      utils.randomFloatBetween(0.03, 0.1),
      utils.randomFloatBetween(0.03, 0.1),
      utils.randomFloatBetween(0.03, 0.1),
    );

    const paletteIndex = utils.randomIntBetween(0, palette.length - 1);
    this.material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        // uColor: { value: palette[paletteIndex] },
        uColor: { value: new THREE.Vector3(0.6, 0.6, 0.6) },
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

  remapFreq(min, max, freq) {
    return utils.remap(0, 255, min, max, freq);
  }

  remapAngleVelocity(freq) {
    return this.remapFreq(
      this.minAgleVelocity,
      this.maxAngleVelocity,
      freq
    );
  }

  remapYVelocity(freq) {
    return this.remapFreq(
      this.minYVelocity,
      this.maxYVelocity,
      freq
    );
  }

  remapRotationVelocityX(freq) {
    return this.remapFreq(
      this.minRotationVelocityX,
      this.maxRotationVelocityX,
      freq
    );
  }

  remapRotationVelocityY(freq) {
    return this.remapFreq(
      this.minRotationVelocityY,
      this.maxRotationVelocityY,
      freq
    );
  }

  remapRotationVelocityZ(freq) {
    return this.remapFreq(
      this.minRotationVelocityZ,
      this.maxRotationVelocityZ,
      freq
    );
  }

  update(freq) {
    if(this.centerCoord.y >= this.maxY) {
      this.centerCoord.y = this.minY;
    } else {
      this.centerCoord.y += this.remapYVelocity(freq);
    }

    this.angle += this.remapAngleVelocity(freq);

    this.pivot.rotation.x += this.remapRotationVelocityX(freq);
    this.pivot.rotation.y += this.remapRotationVelocityY(freq);
    this.pivot.rotation.z += this.remapRotationVelocityZ(freq);

    this.updatePosition();
    this.updateScale();

    this.material.uniforms.uFreq.value = freq;
  }
}
