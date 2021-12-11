import * as THREE from "three"
import utils from "../utils"

export default class SmokeParticle {
  constructor() {
    this.position = new THREE.Vector3(
      //  (Math.random() * 2 - 1) * 1.0,
      //  (Math.random() * 2 - 1) * 1.0,
      //  (Math.random() * 2 - 1) * 1.0,
      utils.randomFloatBetween(-5, 5),
      utils.randomFloatBetween(-5, 5),
      utils.randomFloatBetween(-5, 5),
    )
    this.size = utils.randomFloatBetween(1, 6)
    this.color = new THREE.Color().setRGB(0.5, 0.1, 0.3) // 0x3498db,
    this.rotation = Math.random() * 2.0 * Math.PI
    this.velocity = new THREE.Vector3(0, -15, 0)
    this.life = (Math.random() * 0.75 + 0.25) * 10.0
  }

  update(time) {
    this.position.add(this.velocity.clone().multiplyScalar(time))
  }
}
