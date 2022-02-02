import * as THREE from 'three'
import utils from '../utils'
import Lantern from './lantern'
import fragmentShader from './shaders/lantern.frag'
import vertexShader from './shaders/lantern.vert'

const getPointMultiplier = () => {
  return window.innerHeight / (2.0 * Math.tan(0.5 * 60.0 * Math.PI / 180.0))
}

export default class Lanterns {
  constructor(context) {
    this.context = context
    this.numLanterns = 30
    this.lanterns = []

    this.geometry = new THREE.BufferGeometry()
    this.createLanterns()

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
    this.geometry.computeBoundingBox()
    this.geometry.computeBoundingSphere()
  }

  onResize() {
    this.material.uniforms.pointMultiplier.value = getPointMultiplier()
  }

  createLanterns() {
    const size = []
    const { spectrumStart, numFrequencyNodes } = this.context

    for(let i = 0; i < this.numLanterns; i ++) {
      const freqIndex = utils.randomIntBetween(spectrumStart.midrange, numFrequencyNodes)
      const lantern = new Lantern(freqIndex)

      this.lanterns.push(lantern)
      size.push(lantern.size)
    }
    this.geometry.setAttribute('size', new THREE.Float32BufferAttribute(size, 1))
  }

  update() {
    const positions = []
    const frequencies = []
    const { frequencyData } = this.context.audio

    this.lanterns.forEach(lantern => {
      lantern.update(frequencyData[lantern.freqIndex])
      positions.push(
        lantern.position.x, 
        lantern.position.y, 
        lantern.position.z
      )
      frequencies.push(frequencyData[lantern.freqIndex]) 
    })
    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    this.geometry.setAttribute('freq', new THREE.Float32BufferAttribute(frequencies, 1))
  }
}
