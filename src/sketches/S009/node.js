import * as THREE from 'three';
import utils from '../utils';
import frag from './fragment.glsl';
import vert from './vertex.glsl';

export default class Node {
  constructor(coord) {
    // this.geometry = new THREE.BoxGeometry(2, 2, 2);
    this.geometry = new THREE.TetrahedronGeometry(4, 1);
    this.material = new THREE.RawShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms: {
        uTime: { type: 'f', value: 0.2 },
      }
    })
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    const { x, y, z } = coord;
    this.mesh.position.set(x, y, z);

    const { rX, rY, rZ } = this.getRandRotation();
    this.mesh.rotation.set(rX, rY, rZ);
    
  }
  getRandRotation() {
    return {
      rX: utils.randomFloatBetween(0, Math.PI * 2),
      rY: utils.randomFloatBetween(0, Math.PI * 2),
      rZ: utils.randomFloatBetween(0, Math.PI * 2),
    };   
  }

}