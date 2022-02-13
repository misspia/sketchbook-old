import * as THREE from 'three'
import utils from '../utils'

export class Speck {
  constructor(freqIndex) {
    this.freqIndex = freqIndex
    this.position = { 
      x: utils.randomFloatBetween(0, 10),
      y: utils.randomFloatBetween(0, 10),
      z: utils.randomFloatBetween(0, 10),
    }

  }

  update() {

  }

}
