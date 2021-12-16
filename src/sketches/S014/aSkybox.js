import * as THREE from 'three'
import vertexShader from "./shaders/skybox.vert"
import fragmentShader from "./shaders/skybox.frag"

export default class Skybox {
  constructor() {
    this.geometry = new THREE.SphereGeometry(50, 32, 32)
    this.material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_freq: { value: 0 },
      },
      side: THREE.DoubleSide,
    })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
  }

  get position() {
    return this.mesh.position
  }

  update() {
    
  }
}
