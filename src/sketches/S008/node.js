import * as THREE from 'three';
import vert from './vertex.glsl';
import frag from './fragment.glsl';

class Node {
  constructor(pos) {
    this.pos = pos;
    this.geometry = {};
    this.material = {};
    this.mesh = {};

    this.init();
    return this.mesh;
    console.log('NODES')
  }
  init() {
    this.geometry = new THREE.BufferGeometry();
    this.material = new THREE.RawShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms: {
        u_time: { type: 'f', value: 0}
      }
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    console.log(this.mesh)
  }
  updatePos() {

  }
  updateColor() {

  }
  updateUniforms() {

  }

}

export default Node;
