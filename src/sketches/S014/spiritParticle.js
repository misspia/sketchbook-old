import * as THREE from 'three'
import utils from "../utils"

export default class SpiritParticle {
  constructor() {
    this.position = { x: 0, y: 0, z: 0 }
    this.alpha = 0

    this.centerCoord = { x: 0, y: 0, z: 0 }

    this.yMin = -utils.randomFloatBetween(3, 5)
    this.yMax = utils.randomFloatBetween(35, 40)

    this.yIncrementMin = utils.randomFloatBetween(0.0005, 0.0009)
    this.yIncrementMax = this.yIncrementMin + utils.randomFloatBetween(0.1, 0.5)

    this.radiusMin = utils.randomFloatBetween(1, 3)
    this.radiusMax = this.radiusMin + utils.randomFloatBetween(20, 40)

    this.minAngleIncrement = utils.randomFloatBetween(
      utils.toRadians(0.07),
      utils.toRadians(0.3)
    )
    this.maxAngleIncrement
      = this.minAngleIncrement +
      utils.randomFloatBetween(utils.toRadians(2.0), utils.toRadians(3.5))
    this.angle = utils.randomFloatBetween(0, Math.PI * 2)
  }

  updatePosition(freq) {
    let y = this.position.y
    if (this.position.y >= this.yMax) {
      y = this.yMin
    } else {
      y += utils.remapFreq(this.yIncrementMin, this.yIncrementMax, freq)
    }

    const angleIncrement = utils.remapFreq(this.minAngleIncrement, this.maxAngleIncrement, freq)
    this.angle += angleIncrement

    const radius = utils.remap(
      this.yMin,
      this.yMax,
      this.radiusMin,
      this.radiusMax,
      this.yMax - this.position.y
    )
    this.position = {
      x: this.centerCoord.x + radius * Math.cos(this.angle),
      y,
      z: this.centerCoord.z + radius * Math.sin(this.angle),

    }
  }

  updateAlphas(freq) {
    const positionPercentage = utils.remap(this.yMin, this.yMax, 0, 1, this.position.y)
    let posAlpha = utils.remap(
      this.yMin,
      this.yMax,
      0, 
      1,
    )
    if(positionPercentage > 0.5) {
      posAlpha = 1 - posAlpha
    }

    const freqAlpha = utils.remapFreq(0, 1, freq)

    this.alpha = Math.min(posAlpha, freqAlpha)
  }

  update(freq) {
    this.updatePosition(freq)
    this.updateAlphas(freq)
  }
}
