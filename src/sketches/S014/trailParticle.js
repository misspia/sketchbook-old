import * as THREE from 'three'
import utils from "../utils"

export default class TrailParticle {
  constructor() {
    this.numPoints = 10
    this.positions = []
    this.colors = []
    this.alphas = []
    this.sizes = []

    this.centerCoord = { x: 0, y: 0, z: 0 }

    this.yMin = -utils.randomFloatBetween(3, 5)
    this.yMax = utils.randomFloatBetween(25, 30)
    
    this.yIncrementMin = utils.randomFloatBetween(0.000001, 0.000003)
    this.yIncrementMax = utils.randomFloatBetween(0.0005, 0.001)

    this.radiusMin = utils.randomFloatBetween(5, 7)
    this.radiusMax = this.radiusMin + utils.randomFloatBetween(20, 22)
    this.radius = utils.randomFloatBetween(this.radiusMin, this.radiusMax)

    this.minAngleIncrement = utils.randomFloatBetween(
      utils.toRadians(0.1),
      utils.toRadians(0.5)
    )
    this.maxAngleIncrement
      = this.minAngleIncrement +
      utils.randomFloatBetween(utils.toRadians(0.003), utils.toRadians(0.007))
    this.angle = utils.randomFloatBetween(0, Math.PI * 2)
    
    this.populateInitialAttributes()
  }

  get flattenedPositions() {
    const positions = []
    for(let i = 0; i < this.positions.length; i++) {
      const { x, y, z } = this.positions[i]
      positions.push(x, y, z)
    }
    return positions
  }

  get flattenedColors() {
    const colors = []
    for(let i = 0; i < this.colors.length; i++) {
      const { r, g, b } = this.colors[i]
      colors.push(r, g, b)
    }
    return colors
  }
  populateInitialAttributes() {
    let size = 2;
    const minSize = 0.5
    const sizeDecrement = (size - minSize) / this.numPoints

    for(let i = 0; i < this.numPoints; i++) {
      this.positions.push(new THREE.Vector3(0, 0, 0)) 
      this.colors.push(new THREE.Color().setRGB(1.0, 0.0, 0.0))
      this.alphas.push(1)
      this.sizes.push(size)

      size -= sizeDecrement;
    }
  }

  updatePositions(freq) {
    const newestPosition = this.calcNextPositon(freq)
    this.positions.unshift(newestPosition)

    if(this.positions.length > this.numPoints) {
      this.positions.pop()
    }
  }


  calcNextPositon(freq) {
    const newestPosition = this.positions[0]
    let y = newestPosition.y
    if(newestPosition.y >= this.yMax) {
      y = this.yMin
    } else {
      // y += utils.remapFreq(this.yMin, this.yMax, freq)
      y += 0.1
    }

    // const angleIncrement = utils.remapFreq(this.minAngleIncrement, this.maxAngleIncrement, freq)
    const angleIncrement = 0
    this.angle += angleIncrement

    const radius = utils.remap(
      this.yMin,
      this.yMax,
      this.radiusMin,
      this.radiusMax,
      this.yMax - newestPosition.y
    )
    return {
      x: this.centerCoord.x + radius * Math.cos(this.angle),
      y,
      z: this.centerCoord.z + radius * Math.sin(this.angle),

    }
  } 

  updateColors(freq) {

  }

  updateAlphas() {
    // const headPosition = this.positions[0]
    // let alpha = utils.remap(this.yMin, this.yMax, 0, 1, headPosition.y)
    // const alphaDecrement = 0.0001

    // const numCoords = this.positions.length / 3
    // this.alphas = []
    
    // for(let i = 0; i < numCoords; i ++) {
    //   this.alphas.push(alpha)

    //   if(alpha < 0) {
    //     alpha = 0
    //   } else {
    //     alpha -= alphaDecrement
    //   }
    // }
  }

  update(freq) {
    this.updatePositions(freq)
    this.updateColors(freq)
    this.updateAlphas(freq)
  }
}
