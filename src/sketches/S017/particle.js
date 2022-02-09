import * as THREE from 'three'

export class Particle {
  constructor(
    initialPosition = { x: 0, y: 0, z: 0 },
    freqIndex = 0
  ) {
    this.position = initialPosition
    this.freqIndex = freqIndex
    this.size = 1
  }

  update() {

  }
}
