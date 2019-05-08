import * as THREE from 'three';
import utils from '../utils';
import vert from './bar.vert';
import frag from './bar.frag';

export default class Bar {
  constructor() {
    this.velocity = 0;
    
    const radius = 1.2;
    this.geometry = new THREE.CylinderGeometry(radius, radius, 8, 8);
    this.material = new THREE.RawShaderMaterial({
      uniforms: {
        u_freq: { type: 'f', value: 0.0 },
      },
      fragmentShader: frag,
      vertexShader: vert,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.castShadow = true;
    this.bbox = new THREE.Box3().setFromObject(this.mesh);
    this.size = new THREE.Vector3();
  }
  setPosition(x, y, z) {
    this.mesh.position.set(x, y, z);
  }
  update(frequency) {
    const scaleY = utils.remap(0, 255, 0.01, 2.5, frequency);
    this.mesh.scale.y = scaleY;
    
    this.bbox.setFromObject(this.mesh);
    this.bbox.getSize(this.size);
    this.mesh.position.y = this.size.y / 2;
    
    this.material.uniforms.u_freq.value = frequency;

  }
}