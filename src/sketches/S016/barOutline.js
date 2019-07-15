import * as THREE from 'three';
import vertexShader from './barOutline.vert';
import fragmentShader from './barOutline.frag';

/**
 * https://github.com/mrdoob/three.js/pull/3075/files
 */
export default class BarOutline {
  constructor({x, y, z}) {
    console.log(x, y, z)
    const geometry = new THREE.BoxGeometry(x, y, z);
    this.material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_freq: { type: 'f', value: 0.0 },
      },
      side: THREE.DoubleSide,
      transparent: true,
    });
    this.mesh = new THREE.Mesh(geometry, this.material);
  }
  setPosition(x, y, z) {
    this.mesh.position.set(x, y, z);
  }
  update(freq) {
    this.material.uniforms.u_freq.value = freq;
  }
}