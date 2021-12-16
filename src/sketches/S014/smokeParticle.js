import * as THREE from "three"
import utils from "../utils"

export default class SmokeParticle {
  constructor() {
    
    this.size = utils.randomFloatBetween(10, 12)
    this.color = new THREE.Color().setRGB(0.2, 0.59, 0.86) // 0x3498db,
    this.rotation = Math.random() * 2.0 * Math.PI
    this.velocity = new THREE.Vector3(0, -15, 0)
    this.life = (Math.random() * 0.75 + 0.25) * 10.0

    this.radius = utils.randomFloatBetween(10, 25)
    this.angle = utils.randomFloatBetween(0, Math.PI * 2)
    this.angleIncrement = utils.randomFloatBetween(0, utils.toRadians(0.2))
    this.centerCoord = new THREE.Vector3(0, 0, 0)

    const { x, y, z } = this.calcCircleCoord()
    this.position = new THREE.Vector3(x, y, z)
  }

  calcCircleCoord() {
    return {
      x: this.centerCoord.x + this.radius * Math.cos(this.angle),
      y: this.centerCoord.y + this.radius * Math.sin(this.angle),
      z: 0,
    }
  }

  update(time) {
    this.angle += this.angleIncrement
    const { x, y, z } = this.calcCircleCoord()
    this.position.set(x, y, z)
  }
}
