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
    this.minIncrementZ = utils.randomFloatBetween(0.01, 0.03)
    this.maxIncrementZ = this.minIncrementZ + utils.randomFloatBetween(2.0, 2.7)

    const leftSideX = -WIDTH / 2 + 0.1 
    const rightSideX = WIDTH / 2 - 0.1
    this.position = {
      x: side === Side.LEFT_SIDE ? leftSideX : rightSideX,
      y: utils.randomFloatBetween(this.minY, this.maxY),
      z: utils.randomFloatBetween(this.minZ, this.maxZ),
    }
    
  }
  
  update(freq) {
    if(this.position.z >= this.maxZ) {
      this.position.z = this.minZ
      this.position.y = utils.randomFloatBetween(this.minY, this.maxY)
    } else {
      this.position.z += utils.remapFreq(this.minIncrementZ, this.maxIncrementZ, freq)
    }
  }
}
