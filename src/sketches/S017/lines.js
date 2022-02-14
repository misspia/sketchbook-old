import * as THREE from 'three'
import { Line } from './line'

/**
 * https://www.pinterest.ca/pin/516295544792098058/
 */

export class Lines {
  constructor(context) {
    this.context = context
    this.geometry = new THREE.BufferGeometry()
    this.numLines = 30
    this.lines = []
    this.createLines()
    this.material = new THREE.MeshBasicMaterial({})
    this.mesh = new THREE.Points()
  }

  get position() {
    return this.mesh.position
  }

  createLines() {
    for(let i = 0; i < this.numLines; i++) {
      const freqIndex = 0
      const line = new Line(freqIndex)

      this.lines.push(line)
    }
  }

  update() {
    const positions = []
    const freqs = []
    this.lines.forEach(line => {
      positions.push(
        line.position.x,
        line.position.y,
        line.position.z,
      )
      freqs.push(this.context.audio.frequencyData[line.freqIndex])
    })

    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    this.geometry.setAttribute('freq', new THREE.Float32BufferAttribute(freqs, 1))
  }
}
