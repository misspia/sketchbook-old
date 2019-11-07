import * as THREE from 'three';
import fragmentShader from './tile.frag';
import vertexShader from './tile.vert';

export default class Tile {
  constructor({
    width = 10,
  }) {
    this.geometry = new THREE.PlaneGeometry(width, width, 2, 2);
    this.material = new THREE.RawShaderMaterial({
      fragmentShader,
      vertexShader,
      side: THREE.DoubleSide,
      uniforms: {
        u_freq: { type: 'f', value: 0.0 },
      }
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x += Math.PI / 2;
  }
  setPosition(x, y, z) {
    this.mesh.position.set(x, y, z);
  }
  update(freq) {
    this.material.uniforms.u_freq.value = freq;
  }
}
