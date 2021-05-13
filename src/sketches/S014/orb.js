import * as THREE from 'three';
import fragmentShader from './shaders/orb.frag';
import vertexShader from './shaders/orb.vert';

export default class Orb {
  constructor() {
    this.geometry = new THREE.IcosahedronGeometry(1, 2);
    this.geometry.computeFlatVertexNormals();
    this.material = new THREE.RawShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms: {
        u_time: { value: 0 },
        u_freq: { value: 0 },
      }
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material)
  }

  get position() {
    return this.mesh.position;
  }

  get uniforms() {
    return this.material.uniforms;
  }

  update(time) {
    this.uniforms.u_time.value = time;
  }
}
