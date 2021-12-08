import * as THREE from "three"

export default class SmokeParticle {
  constructor() {
    this.position = new THREE.Vector3(
      Math.random(),
      Math.random(),
      Math.random(),
    )
    this.size = Math.random()
    this.color = new THREE.Color().setRGB(0.5, 0.1, 0.3) // 0x3498db,
    this.rotation = Math.random() * 2.0 * Math.PI
    this.velocity = new THREE.Vector3(0, -15, 0)
    this.life = (Math.random() * 0.75 + 0.25) * 10.0
  }

  update() {

  }
}
