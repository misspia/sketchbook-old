import * as THREE from "three"
import utils from "../utils"

export default class SmokeParticle {
  constructor() {
    this.size = utils.randomFloatBetween(8, 14)
    this.color = new THREE.Color().setRGB(0.2, 0.59, 0.86) // 0x3498db,
    this.rotation = Math.random() * 2.0 * Math.PI
    this.velocity = new THREE.Vector3(0, -15, 0)
    this.life = (Math.random() * 0.75 + 0.25) * 10.0


    this.yMin = -utils.randomFloatBetween(15, 20)
    this.yMax = utils.randomFloatBetween(1, 2)
    this.yIncrementMin = utils.randomFloatBetween(0.0001, 0.0003)
    this.yIncrementMax = utils.randomFloatBetween(0.0005, 0.001)

    this.radiusMin = utils.randomFloatBetween(2, 5)
    this.radiusMax = this.radiusMin + utils.randomFloatBetween(10, 15)
    this.radius = utils.randomFloatBetween(10, 25)
    
    this.angle = utils.randomFloatBetween(0, Math.PI * 2)
    this.minAngleIncrement = utils.randomFloatBetween(
        utils.toRadians(0.0001), 
        utils.toRadians(0.0005)
    )
    this.maxAngleIncrement 
      = this.minAngleIncrement + 
      utils.randomFloatBetween(utils.toRadians(0.003), utils.toRadians(0.007))

    this.centerCoord = new THREE.Vector3(0, 0, 0)

    const { x, y, z } = this.calcCircleCoord()
    this.position = new THREE.Vector3(x, y, z)
    this.alpha = 0
  }

  calcCircleCoord(freq) {
    const yPrev 
      = this.position && this.position.y ? 
      this.position.y :
      utils.randomFloatBetween(this.yMin, this.yMax)
    let y = yPrev
    if(y >= this.yMax) {
      y = this.yMin
    } else {
      const increment = utils.remapFreq(this.yIncrementMin, this.yIncrementMax, freq)
      y += increment
    }
    return {
      x: this.centerCoord.x + this.radius * Math.cos(this.angle),
      y,
      z: this.centerCoord.z + this.radius * Math.sin(this.angle),
    }
  }

  updateAlpha(freq) {
    this.alpha = utils.remap(this.yMin, this.yMax, 0, 1, this.position.y)
  }

  updateRadius() {
    // flip this
    this.radius = utils.remap(this.yMin, this.yMax, this.radiusMin, this.radiusMax, this.position.y)
  }

  update(freq, time) {
    const angleIncrement = utils.remapFreq(this.minAngleIncrement, this.maxAngleIncrement, freq)
    this.angle += angleIncrement
    const { x, y, z } = this.calcCircleCoord(freq)
    this.position.set(x, y, z)

    this.updateAlpha(freq)
    this.updateRadius(freq)
  }
}
