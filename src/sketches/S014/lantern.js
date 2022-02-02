import * as THREE from 'three'
import utils from '../utils'

export default class Lantern {
  constructor(freqIndex) {
    this.freqIndex = freqIndex
    this.size = utils.randomFloatBetween(1, 5) 

    this.yMin = -90
    this.yMax = 60
    this.yMinIncrement = utils.randomFloatBetween(0.01, 0.05)
    this.yMaxIncrement = utils.randomFloatBetween(0.1, 0.5)

    this.position = { 
      x: utils.randomFloatBetween(-90, 90), 
      y: utils.randomFloatBetween(this.yMin, this.yMax), 
      z: 30 
    }
  }

  update(freq) {
    if(this.position.y >= this.yMax) {
      this.position.y = this.yMin
    } else {
      const yIncrement = utils.remapFreq(this.yMinIncrement, this.yMaxIncrement, freq)
      this.position.y += yIncrement
    }
  }
}
