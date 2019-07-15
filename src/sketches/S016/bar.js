import * as THREE from 'three';
import Outline from './barOutline';

import fragmentShader from './bar.frag';
import vertexShader from './bar.vert';


export default class Bar {
  constructor(coord) {
    const dimmensions = { x: 2, y: 2, z: 2};
    this.geometry = new THREE.BoxGeometry(dimmensions.x, dimmensions.y, dimmensions.z);
    this.material = new THREE.RawShaderMaterial({
      uniforms: {
        u_freq: { type: 'f', value: 0.0, },
      },
      fragmentShader,
      vertexShader,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    
    this.outline = new Outline(dimmensions);

    this.setPosition(coord.x, coord.y, coord.z);
  }
  setPosition(x, y, z) {
    this.mesh.position.set(x, y, z);
    this.outline.setPosition(x, y, z);
  }
  update(freq) {
    this.material.uniforms.u_freq.value = freq;
    this.outline.update(freq);
  }
}