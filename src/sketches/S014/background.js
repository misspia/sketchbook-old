import * as THREE from 'three'
import vertexShader from "./shaders/background.vert"
import fragmentShader from "./shaders/background.frag"

export default class Background {
  constructor() {
    this.geometry = new THREE.PlaneGeometry(50, 50)
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

  update() {
    
  }
}
