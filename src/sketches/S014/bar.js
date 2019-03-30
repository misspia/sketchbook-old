import * as THREE from 'three';
import utils from '../utils';
import vert from './bar.vert';
import frag from './bar.frag';

export default class Bar {
  constructor() {
    this.velocity = 0;
    this.geometry = new THREE.CylinderGeometry(1, 1, 8, 8);
    this.material = new THREE.RawShaderMaterial({
      color: 0xeeaaee,
      uniforms: {
        u_freq: { type: 'f', value: 0.0 },
      },
      fragmentShader: frag,
      vertexShader: vert,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.bbox = new THREE.Box3().setFromObject(this.mesh);
  }
  setPosition(x, y, z) {
    this.mesh.position.set(x, y, z);
  }
  update(frequency) {
    const scaleY = utils.remap(0, 255, 0, 2, frequency);
    this.mesh.scale.y = scaleY;
    
    this.bbox.setFromObject(this.mesh);
    const size = this.bbox.getSize();
    this.mesh.position.y = size.y / 2;
    
    const normalizedFreq = utils.remap(0, 255, 0, 1, frequency);
    this.material.uniforms.u_freq.value = normalizedFreq;

  }
}