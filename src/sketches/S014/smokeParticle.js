import * as THREE from "three"
import utils from "../utils"

/**
 * https://www.reddit.com/r/Simulated/comments/lo96rq/mr_meesseks_particles/?utm_medium=android_app&utm_source=share
 * https://threejs.org/examples/?q=trail#webgl_trails
 */
export default class SmokeParticle {
  constructor(freqIndex) {
    this.freqIndex = freqIndex
    this.size = utils.randomFloatBetween(8, 17)
    this.rotation = Math.random() * 2.0 * Math.PI
    this.rotationIncrementMin = utils.randomFloatBetween(0.0005, 0.007)
    this.rotationIncrementMax = this.rotationIncrementMin + utils.randomFloatBetween(0.0005, 0.007)
    this.rotationDirection = utils.randomSign()

    this.yMin = utils.randomFloatBetween(0, 9)
    this.yMax = this.yMin + utils.randomFloatBetween(0, 0)
    this.yIncrementMin = utils.randomFloatBetween(0.0001, 0.0003)
    this.yIncrementMax = utils.randomFloatBetween(0.05, 0.1)

    this.zMin = -60
    this.zMax = utils.randomFloatBetween(100, 150)
    this.zIncrementMin = utils.randomFloatBetween(0.01, 0.03)
    this.zIncrementMax = this.zIncrementMin + utils.randomFloatBetween(0.5, 0.8)

    this.position = new THREE.Vector3(
      utils.randomFloatBetween(-30, 30),
      utils.randomFloatBetween(this.yMin, this.yMax),
      utils.randomFloatBetween(this.zMin, this.zMax)
    )
    this.alpha = 0
  }

  updatePosition(freq) {
    let z = this.position.z
    // if (z >= this.zMax) {
      //     z = this.zMin
      //   } else {
      //     const increment = utils.remapFreq(this.zIncrementMin, this.zIncrementMax, freq)
      //     z += increment
      //   }
    if (z <= this.zMin) {
      z = this.zMax
    } else {
      const increment = utils.remapFreq(this.zIncrementMin, this.zIncrementMax, freq)
      z -= increment
    }
    this.position.z = z
  }

  updateAlpha(freq) {
    this.alpha = 0.5
  }

  updateRotation(freq) {
    this.rotation += this.rotationDirection * utils.remapFreq(this.rotationIncrementMin, this.rotationIncrementMax, freq)
  }


  update(freq, time) {
    const angleIncrement = utils.remapFreq(this.minAngleIncrement, this.maxAngleIncrement, freq)
    this.angle += angleIncrement


    this.updatePosition(freq)
    this.updateAlpha()
    this.updateRotation(freq)
  }
}
