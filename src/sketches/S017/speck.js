import * as THREE from 'three'
import utils from '../utils'

/**
 * 
 * https://www.pinterest.ca/pin/288089707403666096/
 */
export class Speck {
  constructor(freqIndex) {
    this.freqIndex = freqIndex
    this.position = { 
      x: utils.randomSign() * utils.randomFloatBetween(0, 60),
      y: utils.randomFloatBetween(0, 70),
      z: utils.weightedRandomSign(0.3) * utils.randomFloatBetween(0, 30),
    }

  }

  update() {

  }

}
