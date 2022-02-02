import * as THREE from "three"
import utils from "../utils"

export default class SmokeParticle {
  constructor(freqIndex) {
    this.freqIndex = freqIndex
    this.size = utils.randomFloatBetween(10, 16)
    this.rotation = Math.random() * 2.0 * Math.PI

    this.yMin = -utils.randomFloatBetween(0, 1)
    this.yMax = utils.randomFloatBetween(18, 23)
    
    this.yIncrementMin = utils.randomFloatBetween(0.0001, 0.0003)
    this.yIncrementMax = utils.randomFloatBetween(0.05, 0.1)

    this.radiusMin = utils.randomFloatBetween(5, 7)
    this.radiusMax = this.radiusMin + utils.randomFloatBetween(20, 22)
    this.radius = utils.randomFloatBetween(this.radiusMin, this.radiusMax)

    this.angle = utils.randomFloatBetween(0, Math.PI * 2)
    this.minAngleIncrement = utils.randomFloatBetween(
      utils.toRadians(0.01),
      utils.toRadians(0.05)
    )
    this.maxAngleIncrement
      = this.minAngleIncrement +
      utils.randomFloatBetween(utils.toRadians(0.3), utils.toRadians(0.7))

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
    // console.debug(this.yMax, this.position.y, this.yMax - this.position.y)
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
