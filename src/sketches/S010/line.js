import * as THREE from 'three';
import utils from '../utils';

import vertexShader from './shaders/line.vert';
import fragmentShader from './shaders/line.frag';


export default class Line {
  constructor({ points= [] }) {
    this.isActive = false;
    this.noise = 0;
    this.maxNoise = utils.randomFloatBetween(3, 5);
    this.noiseIncrement = utils.randomFloatBetween(0.01, 0.05);

    this.geometry = new THREE.BufferGeometry().setFromPoints(points);
    // this.geometry = new THREE.PlaneGeometry(15, 15, 10, 10)
    this.material = new THREE.RawShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms: {
        uNoise: { value: new THREE.Vector3(1, 1, 1) },
        uTime: { value: 0 },
        uAmp: { value: 5 },
      },
      side: THREE.DoubleSide,
    });
    this.pivot = new THREE.Line(this.geometry, this.material);
    // this.pivot = new THREE.Mesh(this.geometry, this.material);
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
      this.noise = Math.min(this.maxNoise, this.noise + this.noiseIncrement);
    } else {
      this.noise = Math.max(0, this.noise - this.noiseIncrement);
    }
    // console.debug(this.noise, time)
    this.uniforms.uNoise.value = this.noise;
    this.uniforms.uTime.value = time;
  }
}
