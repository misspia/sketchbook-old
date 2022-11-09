import * as THREE from 'three'

import vertexShader from './shaders/dot.vert'
import fragmentShader from './shaders/dot.frag'
import { DEPTH } from './SkyBox'

const getPointMultiplier = () => {
  return window.innerHeight / (2.0 * Math.tan(0.5 * 60.0 * Math.PI / 180.0))
}

export class Dots {
  constructor(context) {
    this.context = context
    this.geometry = new THREE.BufferGeometry()
    this.numDots = context.numFrequencyNodes
    this.dots = []
    this.createDots()

    this.material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      depthTest: true,
      depthWrite: false,
      transparent: true,
      vertexColors: true,
      uniforms: {
        pointMultiplier: {
          value: getPointMultiplier()
        }
      }
    })
    this.mesh = new THREE.Points(this.geometry, this.material)
  }

  get position() {
    return this.mesh.position
  }

  onResize() {
    this.material.uniforms.pointMultiplier.value = getPointMultiplier()
  }

  createDots() {
    const DOTS_PER_ROW = 23
    const ROW_GAP = 5.8
    const COL_GAP = 6.9
    const ROW_START_OFFSET = -78
    const EVEN_ROW_X_START = 0 + ROW_START_OFFSET
    const ODD_ROW_X_START = COL_GAP / 2 + ROW_START_OFFSET

    let x = EVEN_ROW_X_START
    let y = -5
    const z = -DEPTH / 2 + 1

    const positions = []

    for (let i = 0; i < this.numDots; i++) {

      const rowPos = i % DOTS_PER_ROW
      const colPos = Math.floor(i / DOTS_PER_ROW % DOTS_PER_ROW)

      if (rowPos === 0) {
        const isEvenRow = colPos % 2 === 0
        x = isEvenRow ? EVEN_ROW_X_START : ODD_ROW_X_START
        y += ROW_GAP
      } else {
        x += COL_GAP
      }
      positions.push(x, y, z)
    }
    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  }

  update() {
    const { bassAverages, midrangeAverages, highrangeAverages } = this.context.beatManager
    const { bass, midrange, highrange } = this.context.spectrumStart
    // console.debug(this.context.spectrumStart)
    const freqs = this.context.audio.frequencyData.map((freq, i) => {
      let averages = null
      if (i >= highrange) {
        averages = highrangeAverages
      } else if (i >= midrange) {
        averages = midrangeAverages
      } else {
        averages = bassAverages
      }
      const average = averages[averages.length - 1]
      const diff = freq - average
      const scale = 3
      return (diff <= 0 ? 0 : diff) * scale
    })
    this.geometry.setAttribute('freq', new THREE.Float32BufferAttribute(freqs, 1))
    // this.geometry.setAttribute('freq', new THREE.Float32BufferAttribute(this.context.audio.frequencyData, 1))
  }
}
