import * as THREE from 'three';
import vert from './vertex.glsl';
import frag from './fragment.glsl';

class Node {
  constructor(coord, freq = 0) {
    this.coord = coord;
    this.freq = freq;
    this.geometry = {};
    this.material = {};
    this.mesh = {};

    this.init();
    // return this.mesh;
  }
  init() {
    this.geometry = new THREE.SphereGeometry(1, 6, 6);
    this.material = new THREE.RawShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms: {
        uTime: { type: 'f', value: 0.6},
        uFreq: { type: 'f', value: this.freq }
      }
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    const { x, y, z } = this.coord;
    this.mesh.position.set(x, y, z);
  }
  update(freq) {
    this.freq = freq;
    this.material.uniforms.uFreq.value = this.freq;
    this.material.uniforms.uTime.value = Math.random();

    // console.log(this.material.uniforms)
  }
  updatePos() {

  }
  updateUniforms() {

  }

}

export default Node;
