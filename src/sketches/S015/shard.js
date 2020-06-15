import * as THREE from 'three';
import utils from '../utils';
import fragmentShader from './shard.frag';
import vertexShader from './shard.vert';

export default class Shard {
  constructor({
    minZ = 0,
    maxZ = 0,
  }) {
    this.minZ = minZ;
    this.maxZ = maxZ;
    this.positionZ = utils.randomFloatBetween(this.minZ, this.maxZ);

    this.radius = utils.randomFloatBetween(50, 100);
    this.angle = utils.randomFloatBetween(0, Math.PI * 2);
    const rotateSpeed = new THREE.Vector3(
      utils.randomSign() * utils.randomFloatBetween(20, 80),
      utils.randomSign() * utils.randomFloatBetween(20, 80),
      utils.randomSign() * utils.randomFloatBetween(20, 80)
    );
    const translateSpeed = new THREE.Vector3(
      utils.randomSign() * utils.randomFloatBetween(20, 80),
      utils.randomSign() * utils.randomFloatBetween(20, 80),
      utils.randomSign() * utils.randomFloatBetween(20, 80)
    );

    this.incrementSign = utils.randomSign();
    this.minRotationIncrement = utils.randomFloatBetween(
      utils.toRadians(0.0),
      utils.toRadians(0.0),
    );
    this.maxRotationIncrement = utils.randomFloatBetween(
      utils.toRadians(1.0),
      utils.toRadians(2),
    );
    this.minAngleIncrement = utils.randomFloatBetween(
      utils.toRadians(0.0),
      utils.toRadians(0.0),
    );
    this.maxAngleIncrement = utils.randomFloatBetween(
      utils.toRadians(1.0),
      utils.toRadians(2),
    );

    const size = utils.randomFloatBetween(0.1, 0.3);
    this.geometry = this.createGeometry(size);

    const rotation = new THREE.Vector3(
      this.getRandomAngle(),
      this.getRandomAngle(),
      this.getRandomAngle(),
    );

    this.material = new THREE.RawShaderMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      fragmentShader,
      vertexShader,
      uniforms: {
        u_freq: { type: 'f', value: 0 },
        u_time: { type: 'f', value: 0 },
        u_rotation: { type: 'v3', value: rotation },
        u_min_angle_increment: { type: 'f', value: this.minRotationIncrement },
        u_max_angle_increment: { type: 'f', value: this.maxRotationIncrement },
        u_increment_sign: { type: 'f', value: this.incrementSign },

        u_rotate_speed: { type: 'v3', value: rotateSpeed },
        u_translate_speed: { type: 'v3', value: translateSpeed },
        u_angle: { type: 'f', value: this.angle },
        u_radius: { type: 'f', value: this.radius },
        u_position_z: { type: 'f', value: this.positionZ },
      },
      side: THREE.DoubleSide,
      transparent: true,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }

  createGeometry(size = 1) {
    const petalShape = new THREE.Shape();
    petalShape.moveTo(0, 0);
    petalShape.bezierCurveTo(25, 50, -25, 50, 0, 0);

    const extrudeSettings = {
      depth: 1,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 15,
      bevelThickness: 0
    };
    const geometry = new THREE.ExtrudeGeometry(petalShape, extrudeSettings);
    geometry.scale(size, size, size);
    return geometry;
  }

  getRandomAngle() {
    return utils.randomFloatBetween(0, 2 * Math.PI);
  }
  remap(min1, max1, min2, max2, value) {
    return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
  }
  remapFreq(min, max, freq) {
    return this.remap(0, 255, min, max, freq);
  }
  frequencyToAngleIncrement(freq) {
    return this.remap(0, 255, this.minRotationIncrement, this.maxRotationIncrement, freq);
  }
  setPosition(x, y, z) {
    this.mesh.position.set(x, y, z);
  }
  update(freq, time) {
    this.material.uniforms.u_freq.value = freq;
    this.material.uniforms.u_time.value = time;
    this.material.uniforms.u_rotation.value.y += this.incrementSign * this.frequencyToAngleIncrement(freq);
    this.material.uniforms.u_rotation.value.z += this.incrementSign * this.frequencyToAngleIncrement(freq);
    this.material.uniforms.u_angle.value -= this.remapFreq(
      this.minAngleIncrement,
      this.maxAngleIncrement,
      freq
    );

    this.positionZ -= this.remapFreq(0.0, 1, freq);
    if(this.positionZ < this.minZ) {
      this.positionZ = this.maxZ;
    }
    this.material.uniforms.u_position_z.value = this.positionZ;

  }
}
