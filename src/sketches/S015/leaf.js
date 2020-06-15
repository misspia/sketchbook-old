import * as THREE from 'three';
import utils from '../utils';
import fragmentShader from './leaf.frag';
import vertexShader from './leaf.vert';

export default class Leaf {
  constructor({
    radius = 0,
    angle = 0,
  }) {
    this.radius = radius;
    this.angle = angle;

    this.minAngleIncrement = utils.randomFloatBetween(
      utils.toRadians(0.0),
      utils.toRadians(0.0),
    );
    this.maxAngleIncrement = utils.randomFloatBetween(
      utils.toRadians(0.5),
      utils.toRadians(3),
    );

    this.geometry = this.createGeometry(0.1);
    const materialConfig = this.createMaterialConfig();
    this.material = new THREE.RawShaderMaterial(materialConfig);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }

  createMaterialConfig() {
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

    return {
      transparent: true,
      vertexShader,
      fragmentShader,
      uniforms: {
        u_freq: { type: 'f', value: 0 },
        u_time: { type: 'f', value: 0 },
        u_rotate_speed: { type: 'v3', value: rotateSpeed },
        u_translate_speed: { type: 'v3', value: translateSpeed },
        u_angle: { type: 'f', value: this.angle },
        u_radius: { type: 'f', value: this.radius },
      },
      side: THREE.DoubleSide,
    };
  }
  createGeometry(size = 1) {
    const petalShape = new THREE.Shape();
    petalShape.moveTo(0, 0);
    petalShape.bezierCurveTo(50, 100, -50, 100, 0, 0);

    const extrudeSettings = {
      depth: 1,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 15,
      bevelThickness: 0.5
    };
    const geometry = new THREE.ExtrudeGeometry(petalShape, extrudeSettings);
    geometry.scale(size, size, size);

    return geometry;
  }
  frequencyToAngleIncrement(freq) {
    return this.remap(0, 255, this.minAngleIncrement, this.maxAngleIncrement, freq);
  }
  fequencyToRotationSpeed(freq) {

  }
  remap(min1, max1, min2, max2, value) {
    return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
  }
  update(uFreq, uTime) {
    this.material.uniforms.u_time.value = uTime;
    this.material.uniforms.u_freq.value = uFreq;
    this.material.uniforms.u_angle.value += this.frequencyToAngleIncrement(uFreq);
  }
}
