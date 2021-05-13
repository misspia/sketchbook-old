import * as THREE from 'three';
import fragmentShader from './shaders/wall.frag';
import vertexShader from './shaders/wall.vert';

export default class Wall {
  constructor() {
    this.geometry = THREE.PlaneGeometry(10, 10, 10)
    this.material = THREE.RawShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms: {
        u_time: { value: 0 },
        u_freq: { value: 0 },
      }
    });
    this.mesh = THREE.Mesh(this.geometry, this.material);
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
