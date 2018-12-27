import * as THREE from 'three';
import utils from '../utils';
import frag from './fragment.glsl';
import vert from './vertex.glsl';

export default class Node {
  constructor(coord, rgb = []) {
    // this.geometry = new THREE.BoxGeometry(2, 2, 2);
    this.geometry = new THREE.TetrahedronGeometry(4, 1);
    this.material = new THREE.RawShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.shadowmap,
        {
          uTime: { type: 'f', value: 0.2 },
          uColor: { type: 'v3', value:  rgb },
          lightPosition: { type: 'v3', value: new THREE.Vector3(0, 50, -100) },
        },
      ])
    })
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

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
  shaderParse() {
    const regex = /\/\/\s?chunk\(\s?(\w+)\s?\);/g;
    return glsl.replace(regex, (a, b) => this.replaceThreeChunkFn(a, b));
  }
  replaceThreeChunkFn(a, b) {
    return `${THREE.ShaderChunk[b]}\n`;
  }
}