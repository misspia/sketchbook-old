import * as THREE from 'three'
import utils from '../utils'

export default class Lantern {
  constructor(freqIndex) {
    this.freqIndex = freqIndex
    this.size = utils.randomFloatBetween(1, 5) 
    this.position = { 
      x: utils.randomFloatBetween(-90, 90), 
      y: utils.randomFloatBetween(-20, 70), 
      z: 30 
    }
  }

  update() {

  }
}
