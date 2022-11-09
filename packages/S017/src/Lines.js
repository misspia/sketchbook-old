import * as THREE from 'three'
import { Line, Side } from './Line'
import { DEPTH } from './SkyBox'
import vertexShader from './shaders/line.vert'
import fragmentShader from './shaders/line.frag'
import utils from 'toolkit/utils'

const getPointMultiplier = () => {
  return window.innerHeight / (2.0 * Math.tan(0.5 * 60.0 * Math.PI / 180.0))
}

export class Lines {
  constructor(context) {
    this.context = context

    this.numLines = context.numFrequencyNodes - context.spectrumStart.midrange
    // this.numLines = 1;
    this.lines = []

    this.geometry = new THREE.BufferGeometry()
    this.createLines()

    this.material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      depthTest: true,
      depthWrite: false,
      transparent: true,
      vertexColors: true,
      linewidth: 1,
      uniforms: {
        pointMultiplier: {
          value: getPointMultiplier()
        },
        minZ: {
          value: -DEPTH / 2
        }
      }
    })
    this.mesh = new THREE.LineSegments(this.geometry, this.material)
  }
  
  get position() {
    return this.mesh.position
  }

  onResize() {
    this.material.uniforms.pointMultiplier.value = getPointMultiplier()
  }

  createLines() {
    const { midrange } = this.context.spectrumStart
    let freqIndex = midrange
    for(let i = 0; i < this.numLines; i ++) {
      const side = utils.randomBool() ? Side.RIGHT_SIDE : Side.LEFT_SIDE
      const line = new Line(freqIndex, side)
      this.lines.push(line)

      freqIndex++
    }
  }

  update() {
    const positions = []
    const freqs = []
    const { frequencyData } = this.context.audio
    
    this.lines.forEach((line) => {
      const freq = frequencyData[line.freqIndex]
      line.update(freq)

      positions.push(
        line.tail.x, 
        line.tail.y, 
        line.tail.z,
        line.head.x, 
        line.head.y, 
        line.head.z
      )
      freqs.push(freq)

    })
    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    this.geometry.setAttribute('freq', new THREE.Float32BufferAttribute(freqs, 1))
  }
}
