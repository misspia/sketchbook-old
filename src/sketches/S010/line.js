import * as THREE from 'three';
import utils from '../utils';
import glsl from 'glslify';

import vertexShader from './shaders/line.vert';
import fragmentShader from './shaders/line.frag';


export default class Line {
  constructor({ points= [] }) {
    this.isActive = false;
    this.noise = new THREE.Vector3(0, 0, 0);
    this.maxNoise = utils.randomFloatBetween(1.2, 1.5);
    this.noiseIncrement = utils.randomFloatBetween(0.01, 0.05);

    this.amp = 0;
    this.maxAmp = utils.randomFloatBetween(1.2, 1.7);
    this.ampIncrement = utils.randomFloatBetween(0.005, 0.01);

    this.time = 0;
    this.timeIncrement = 1 / 16;

    const width = 20;
    const height = 1;
    const segmentRatio = 1.2;
    this.geometry = new THREE.PlaneGeometry(
      width,
      height,
      width * segmentRatio,
      height * segmentRatio
      );
    this.material = new THREE.RawShaderMaterial({
      fragmentShader: glsl(fragmentShader),
      vertexShader: glsl(vertexShader),
      uniforms: {
        uNoise: { type: 'v3', value: this.noise },
        uTime: { type: 'f', value: 0 },
        uAmp: { type: 'f', value: this.amp },
      },
      side: THREE.DoubleSide,
      flatShading: true,
    });
    this.pivot = new THREE.Mesh(this.geometry, this.material);
    this.pivot.rotation.x += Math.PI;

  }

  get uuid() {
    return this.pivot.uuid;
  }

  get position() {
    return this.pivot.position;
  }

  get uniforms() {
    return this.material.uniforms;
  }

  setActive(isActive) {
    this.isActive = isActive;
  }
  updateMatrix() {
    this.pivot.updateWorldMatrix()
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }

  update(time) {
    if(this.isActive) {
      const noise = Math.min(this.maxNoise, this.noise.y + this.noiseIncrement);
      this.noise.set(noise, noise, noise);

      this.amp = Math.min(this.maxAmp, this.amp + this.ampIncrement);

      this.time += this.timeIncrement;
    } else {
      const val = Math.max(0, this.noise.y - this.noiseIncrement);
      this.noise.set(val, val, val);

      this.amp = Math.max(0, this.amp - this.ampIncrement);

      this.time = Math.max(0, this.time - this.timeIncrement);
    }
    this.uniforms.uTime.value = this.time;
    this.uniforms.uNoise.value = this.noise;
    this.uniforms.uAmp.value = this.amp;
  }
}
