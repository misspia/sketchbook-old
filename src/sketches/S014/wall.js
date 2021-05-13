import * as THREE from 'three';
import fragmentShader from './shaders/wall.frag';
import vertexShader from './shaders/wall.vert';

export default class Wall {
  constructor() {
    this.geometry = new THREE.PlaneGeometry(10, 10, 1, 1)
    this.material = new THREE.RawShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms: {
        u_time: { value: 0 },
        u_freq: { value: 0 },
      }
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  get position() {
    return this.mesh.position;
  }

  get uniforms() {
    return this.material.uniforms;
  }

  update() {

  }
}
