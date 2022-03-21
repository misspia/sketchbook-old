import * as THREE from 'three'
import { HEIGHT, DEPTH, WIDTH } from './skyBox'
import utils from '../utils'

export const Side = {
  LEFT_SIDE: 0,
  RIGHT_SIDE: 1,
}

export class Line {
  constructor(freqIndex, side = Side.LEFT_SIDE) {
    this.freqIndex = freqIndex
    this.side = side

    this.minY = 0.5
    this.maxY = HEIGHT

    this.minZ = -DEPTH / 2
    this.maxZ = DEPTH / 2
    this.minIncrementZ = utils.randomFloatBetween(0.0, 0.0)
    this.maxIncrementZ = this.minIncrementZ + utils.randomFloatBetween(2.0, 2.7)

    const leftSideX = -WIDTH / 2 + 0.1 
    const rightSideX = WIDTH / 2 - 0.1

    this.minLength = 1
    this.maxLength = 4
    this.length = utils.randomFloatBetween(this.minLength, this.maxLength)
    this.tail = {
      x: side === Side.LEFT_SIDE ? leftSideX : rightSideX,
      y: utils.randomFloatBetween(this.minY, this.maxY),
      z: utils.randomFloatBetween(this.minZ, this.maxZ),
      
    }
    this.head = {
      ...this.tail,
      z: this.tail.z + this.length
    }
  }
  
  update(freq) {
    if(this.tail.z >= this.maxZ) {
      this.length = utils.randomFloatBetween(this.minLength, this.maxLength)
      this.head.z = this.minZ
      this.tail.z -= this.length

      const y = utils.randomFloatBetween(this.minY, this.maxY)
      this.tail.y = y
      this.head.y = y
    } else {
      const zIncrement = utils.remapFreq(this.minIncrementZ, this.maxIncrementZ, freq)
      this.head.z += zIncrement 
      this.tail.z += zIncrement 
    }
  }
}
