import * as THREE from 'three';
import fragmentShader from './bar.frag';
import vertexShader from './bar.vert';

export default class Bar {
  constructor(coord) {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    this.material = new THREE.RawShaderMaterial({
      uniforms: {
        u_freq: { type: 'f', value: 0.0, },
      },
      fragmentShader,
      vertexShader,
    });
    this.mesh = new THREE.Mesh(geometry, this.material);
    this.setPosition(coord.x, coord.y, coord.z);
  }
  setPosition(x, y, z) {
    this.mesh.position.set(x, y, z);
  }
  update(freq) {
    this.material.uniforms.u_freq.value = freq;
  }
}