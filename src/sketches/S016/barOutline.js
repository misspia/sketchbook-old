import * as THREE from 'three';
import vertexShader from './barOutline.vert';
import fragmentShader from './barOutline.frag';

export default class BarOutline {
  constructor(coord, dimensions) {
    const { x, y, z } = coord;
    const verticies = thie.getVertices(dimensions);
    const geomertry = new THREE.Geometry();
    this.material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_freq: { type: 'f', value: 0.0 },
      },
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(geomertry, this.material);
  }
  getVertices(dimensions) {
    return [
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
    ];
  }
  update(freq) {
    this.material.uniforms.u_freq.value = freq;
  }
}