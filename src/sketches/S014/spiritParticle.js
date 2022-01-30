import * as THREE from 'three'
import utils from "../utils"

export default class SpiritParticle {
  constructor() {
    this.alpha = 0

    this.centerCoord = { x: 0, y: 0, z: 0 }

    this.yMin = utils.randomFloatBetween(3, 5)
    this.yMax = utils.randomFloatBetween(20, 25)

    this.yIncrementMin = utils.randomFloatBetween(0.0005, 0.0009)
    this.yIncrementMax = this.yIncrementMin + utils.randomFloatBetween(0.1, 0.5)

    this.zMin = -60
    this.zMax = utils.randomFloatBetween(100, 150)
    this.zIncrementMin = utils.randomFloatBetween(0.01, 0.03)
    this.zIncrementMax = this.zIncrementMin + utils.randomFloatBetween(0.5, 0.8)

    this.position = new THREE.Vector3(
      utils.randomFloatBetween(-30, 30),
      utils.randomFloatBetween(this.yMin, this.yMax),
      utils.randomFloatBetween(this.zMin, this.zMax)
    )
  }

  updatePosition(freq) {
    let z = this.position.z
    if (z <= this.zMin) {
      z = this.zMax
    } else {
      const increment = utils.remapFreq(this.zIncrementMin, this.zIncrementMax, freq)
      z -= increment
    }
    this.position.z = z
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

    // this.alpha = Math.min(posAlpha, freqAlpha)
    this.alpha = freqAlpha
  }

  update(freq) {
    this.updatePosition(freq)
    this.updateAlphas(freq)
  }
}
