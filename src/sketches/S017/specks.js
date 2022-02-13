import * as THREE from 'three'
import vertexShader from './shaders/speck.vert'
import fragmentShader from './shaders/speck.frag'
import { Speck } from './speck'
import utils from '../utils'

const getPointMultiplier = () => {
  return window.innerHeight / (2.0 * Math.tan(0.5 * 60.0 * Math.PI / 180.0))
}


export class Specks {
  constructor(context) {
    this.context = context
    this.geometry = new THREE.BufferGeometry()
    this.numSpecks = 20
    this.specks = []
    this.createSpecks()

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

  createSpecks() {
    const minFreq = this.context.spectrumStart.midrange;
    const maxFreq = this.context.numFrequencyNodes;

    for(let i = 0; i < this.numSpecks; i++) {
      const freqIndex = utils.randomIntBetween(minFreq, maxFreq)
      const speck = new Speck(freqIndex)
      this.specks.push(speck)
    }
  }

  update() {
    const positions = []
    const freqs = []

    this.specks.forEach(speck => {
      positions.push(
        speck.position.x,
        speck.position.y,
        speck.position.z,
      )
      freqs.push(this.context.audio.frequencyData[speck.freqIndex])
    })

    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    this.geometry.setAttribute('freq', new THREE.Float32BufferAttribute(freqs, 1))
  }

}
