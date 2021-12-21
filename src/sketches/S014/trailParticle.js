import * as THREE from 'three'
import utils from "../utils"

export class TrailParticle {
  constructor() {
    this.positionsMax = 10
    this.positions = []
    this.colors = []
    this.alphas = []

    this.newestPosition = { x: 0, y: 0, z: 0 }

    this.yMin = -utils.randomFloatBetween(0, 1)
    this.yMax = utils.randomFloatBetween(18, 23)
    
    this.yIncrementMin = utils.randomFloatBetween(0.000001, 0.000003)
    this.yIncrementMax = utils.randomFloatBetween(0.0005, 0.001)

    this.radiusMin = utils.randomFloatBetween(5, 7)
    this.radiusMax = this.radiusMin + utils.randomFloatBetween(20, 22)
    this.radius = utils.randomFloatBetween(this.radiusMin, this.radiusMax)

    this.minAngleIncrement = utils.randomFloatBetween(
      utils.toRadians(0.0001),
      utils.toRadians(0.0005)
    )
    this.maxAngleIncrement
      = this.minAngleIncrement +
      utils.randomFloatBetween(utils.toRadians(0.003), utils.toRadians(0.007))
  }

  updatePositions(freq) {
    const newestPosition = this.calcNextPositon(freq)
    this.positions.unshift(newestPosition)

    if(this.positions.length > this.positionsMax) {
      this.positions.pop()
    }
  }


  calcNextPositon(freq) {
    if(!this.positions.length) {
      // handle init case
    }

    const newestPosition = this.positions[0]
    let y = newestPosition.y
    if(newestPosition.y >= this.yMax) {
      y = this.yMin
    } else {
      y += utils.remapFreq(this.yMin, this.yMax, freq)
    }

    const angle = utils.remapFreq(this.minAngleIncrement, this.maxAngleIncrement)
    const radius = utils.remap(
      this.yMin,
      this.yMax,
      this.radiusMin,
      this.radiusMax,
      this.yMax - this.position.y
    )
    return {
      x: this.centerCoord.x + radius * Math.cos(angle),
      y,
      z: this.centerCoord.z + radius * Math.sin(angle),

    }
  } 

  updateColors() {

  }

  updateAlphas() {
    let alpha = 1
    const alphaDecrement = 0.0001

    const numCoords = this.positions.length / 3
    this.alphas = []
    
    for(let i = 0; i < numCoords; i ++) {
      this.alphas.push(alpha)

      alpha -= alphaDecrement
    }
  }

  

   
  
  update(freq) {
    this.updatePositions(freq)
    this.updateColors(freq)
    this.updateAlphas()
  }
}
