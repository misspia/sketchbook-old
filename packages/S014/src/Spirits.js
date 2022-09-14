import * as THREE from 'three'
import utils from 'toolkit/utils'

import fragmentShader from "./shaders/spirit.frag"
import vertexShader from "./shaders/spirit.vert"
import { SpiritParticle } from './SpiritParticle'

const getPointMultiplier = () => window.innerHeight / (2.0 * Math.tan(0.5 * 60.0 * Math.PI / 180.0))

export class Spirits {
  constructor(context) {
    this.context = context
    this.numParticles = 60
    this.particles = []

    this.geometry = new THREE.BufferGeometry()
    this.material = new THREE.RawShaderMaterial({
      depthTest: true,
      depthWrite: false,
      transparent: true,
      vertexColors: true,
      vertexShader,
      fragmentShader,
      uniforms: {
        uPointMultiplier: {
          value: getPointMultiplier()
        }
      }
    })
    this.mesh = new THREE.Points(this.geometry, this.material)
    this.createParticles()
  }

  get position() {
    return this.mesh.position
  }
  
  get uniforms() {
    return this.material.uniforms
  }

  onResize() {
    this.uniforms.uPointMultiplier.value = getPointMultiplier()
  }

  createParticles() {
    for(let i = 0; i < this.numParticles; i++) {
      const freqIndex = utils.randomIntBetween(
        this.context.spectrumStart.midrange,
        this.context.spectrumStart.highrange,
      )
      const particle = new SpiritParticle(freqIndex)
      this.particles.push(particle)
      this.updateAttributes()
    }
  }

  updateAttributes() {
    if(!this.context.audio) {
      return
    }
    const positions = []
    const alphas = []
    const freqs = []

    this.particles.forEach((particle) => {
      const freq =  this.context.audio.frequencyData[particle.freqIndex]
      particle.update(freq)

      const { position } = particle
      positions.push(position.x, position.y, position.z)
      alphas.push(particle.alpha)
      freqs.push(freq)
    })
    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    this.geometry.setAttribute('alpha', new THREE.Float32BufferAttribute(alphas, 1))
    this.geometry.setAttribute('freq', new THREE.Float32BufferAttribute(freqs, 1))
  }

  update() {
    this.updateAttributes()
  }
}
