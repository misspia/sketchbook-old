import * as THREE from 'three';
import utils from '../utils';
import frag from './leaf.frag';
import vert from './leaf.vert';

export default class Leaf {
  constructor() {
    this.minAngleIncrement = utils.randomFloatBetween(
      utils.toRadians(0.01),
      utils.toRadians(0.1),
    );
    this.maxAngleIncrement = utils.randomFloatBetween(
      utils.toRadians(0.5),
      utils.toRadians(3),
    );


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
    const geometry = this.createGeometry(0.1);
    this.material = new THREE.RawShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms: {
        u_freq: { type: 'f', value: 0 },
        u_time: { type: 'f', value: 0 },
        u_rotate_speed: { type: 'v3', value: rotateSpeed },
        u_translate_speed: { type: 'v3', value: translateSpeed },
        u_angle: { type: 'f', value: 0 },
        u_radius: { type: 'f', value: 50 },
      },
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(geometry, this.material);
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
  remap(min1, max1, min2, max2, value) {
    return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
  }
  update(uFreq, uTime) {
    this.material.uniforms.u_time.value = uTime;
    this.material.uniforms.u_freq.value = uFreq;
    this.material.uniforms.u_angle.value += this.frequencyToAngleIncrement(uFreq);
  }
}
