import * as THREE from 'three'
import fragmentShader from './shaders/stairstep.frag'
import vertexShader from './shaders/stairstep.vert'

export default class Stairstep {
  constructor(width,  height, depth) {
    this.geometry = new THREE.BoxGeometry(width, height, depth)
    this.material = new THREE.RawShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms: {

      },
      transparent: true,
    })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
  }

  get position() {
    return this.mesh.position
  }
  
  get uniforms() {
    return this.material.uniforms
  }

  update(freq) {

  }
}
