import * as THREE from 'three';
import vert from './vertex.glsl';
import frag from './fragment.glsl';

class Node {
  constructor(coord, freq = 0, time) {
    this.geometry = new THREE.BoxGeometry(2.5, 3.5, 2.5);
    this.material = new THREE.RawShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms: {
        uTime: { type: 'f', value: time },
        uFreq: { type: 'f', value: freq }
      }
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    const { x, y, z } = coord;
    this.mesh.position.set(x, y, z);
  }
  update(freq, time) {
    this.material.uniforms.uFreq.value = freq;
    this.material.uniforms.uTime.value = time;
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }

  updatePos() {

  }
  updateUniforms() {

  }

}

export default Node;
