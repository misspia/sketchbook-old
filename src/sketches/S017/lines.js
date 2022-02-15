import * as THREE from 'three'
import { Line } from './line'
import vertexShader from './shaders/line.vert'
import fragmentShader from './shaders/line.frag'

/**
 * https://www.pinterest.ca/pin/516295544792098058/
 * https://youtu.be/r2alNYImuM0?t=216
 */

export class Lines {
  constructor(context) {
    this.context = context
    this.geometry = new THREE.BufferGeometry()
    this.numLines = 30
    this.lines = []
    this.createLines()
    this.material = new THREE.RawShaderMaterial({
      transparent: true,
      fragmentShader,
      vertexShader
    })

    this.mesh = new THREE.LineSegments(this.geometry, this.material)
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
        line.positionStart.x,
        line.positionStart.y,
        line.positionStart.z,
        line.positionEnd.x,
        line.positionEnd.y,
        line.positionEnd.z,
      )
      freqs.push(this.context.audio.frequencyData[line.freqIndex])
    })

    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    this.geometry.setAttribute('freq', new THREE.Float32BufferAttribute(freqs, 1))
  }
}
