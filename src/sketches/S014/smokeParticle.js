import * as THREE from "three"
import utils from "../utils"

export default class SmokeParticle {
  constructor() {
    this.size = utils.randomFloatBetween(8, 14)
    // this.color = new THREE.Color().setRGB(0.2, 0.59, 0.86) // 0x3498db,
    this.color = new THREE.Color().setRGB(0.86, 0.2, 0.2) // 0x3498db,
    this.rotation = Math.random() * 2.0 * Math.PI

    this.yMin = -utils.randomFloatBetween(25, 30)
    this.yMax = utils.randomFloatBetween(1, 2)
    this.yIncrementMin = utils.randomFloatBetween(0.00001, 0.00003)
    this.yIncrementMax = utils.randomFloatBetween(0.0005, 0.001)

    this.radiusMin = utils.randomFloatBetween(0.05, 0.1)
    this.radiusMax = this.radiusMin + utils.randomFloatBetween(20, 22)
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
    if (y >= this.yMax) {
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

  updateAlpha() {
    const positionPercentage = utils.remap(this.yMin, this.yMax, 0, 1, this.position.y)
    if (positionPercentage < 0.5) {
      this.alpha = utils.remap(
        this.yMin,
        this.yMax,
        0,
        1,
        this.position.y
      )
    } else {
      this.alpha = 1 - utils.remap(
        this.yMin,
        this.yMax,
        0,
        1,
        this.position.y
      )
    }
  }

  updateRadius() {
    this.radius = utils.remap(
      this.yMin,
      this.yMax,
      this.radiusMin,
      this.radiusMax,
      this.yMax - this.position.y
    )
  }

  update(freq, time) {
    const angleIncrement = utils.remapFreq(this.minAngleIncrement, this.maxAngleIncrement, freq)
    this.angle += angleIncrement
    const { x, y, z } = this.calcCircleCoord(freq)
    this.position.set(x, y, z)

    this.updateAlpha()
    this.updateRadius(freq)
  }
}
