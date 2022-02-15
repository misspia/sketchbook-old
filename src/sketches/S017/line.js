import * as THREE from 'three'
import utils from '../utils'
export class Line {
  constructor(freqIndex) {
    this.freqIndex = freqIndex
    this.radius = utils.randomFloatBetween(5, 8)
    const angle = utils.randomFloatBetween(-Math.PI / 2, Math.PI / 2)
    const startRadius = utils.randomFloatBetween(8, 10) 
    const endRadius = startRadius + utils.randomFloatBetween(5, 9) 
    this.positionStart = this.getCircleCoord(
      {
        x: 0,
        y: 0,
        z: 0,
      },
      startRadius,
      angle
    )

    this.positionEnd = this.getCircleCoord(
      {
        x: 0,
        y: 0,
        z:  utils.randomFloatBetween(5, 8),
      },
      endRadius,
      angle
    )

    this.rotation = 0
  }

  getCircleCoord(centerCoord, radius, angle) {
    return {
      x: centerCoord.x + radius * Math.sin(angle),
      y: centerCoord.y + radius * Math.cos(angle),
      z: centerCoord.z,
    }
  }

  update() {
    
  }
}
