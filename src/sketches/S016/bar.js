import * as THREE from 'three';
import fragmentShader from './bar.frag';
import vertexShader from './bar.vert';

export default class Bar {
  constructor() {
    const geometry = new THREE.BoxGeometry(1, 2, 1);
    this.material = new THREE.RawShaderMaterial({
      uniforms: {

      },
      fragmentShader,
      vertexShader,
    });
    this.mesh = new THREE.Mesh(geometry, this.material);
  }
  update() {

  }
}