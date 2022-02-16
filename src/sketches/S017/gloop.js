
import * as THREE from 'three'
import utils from '../utils'

export class Gloop {
  constructor(freqIndexMin, freqIndexMax) {
    this.freqIndexMin = freqIndexMin
    this.freqIndexMax = freqIndexMax

    this.colorIndex = utils.randomIntBetween(0, 2)
    this.position = {
      x: 0,
      y: 0,
      z: 10
    }
    this.arcStart = {
      x: 0,
      y: 0,
      z: 0,
    }
    this.arcEnd = {
      x: 0,
      y: 0,
      z: 0,
    }
    this.arcProgress = 0
    this.arcProgressMin = 0
    this.arcProgressMax = utils.randomFloatBetween(0.01, 0.1)
  }

  updatePosition() {
    
  }

  calcArcPosition() {

  }

  update(freq) {
    if(this.arcProgress === 100) {
      this.arcProgress = 0
    } else {
      const arcIncrement = utils.remap(
        this.arcProgressMin,
        this.arcProgressMax,
        0,
        255,
        freq
      )
      this.arcProgress += arcIncrement
    }
  }

}
