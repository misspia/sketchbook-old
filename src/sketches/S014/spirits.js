import * as THREE from 'three'
import SpiritParticle from './spiritParticle'
import fragmentShader from "./shaders/spirit.frag"
import vertexShader from "./shaders/spirit.vert"

const getPointMultiplier = () => window.innerHeight / (2.0 * Math.tan(0.5 * 60.0 * Math.PI / 180.0))
export default class Spirits {
  constructor(context) {
    this.context = context
    this.numParticles = context.numFrequencyNodes
    // this.numParticles = 1
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
      const particle = new SpiritParticle()
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
    const sizes = []

    this.particles.forEach((particle, index) => {
      const freq = this.context.audio.frequencyData[index]
      particle.update(freq)
      positions.push(...particle.flattenedPositions)
      alphas.push(...particle.alphas)
      sizes.push(...particle.sizes)
    })
    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    this.geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1))
    this.geometry.setAttribute('alpha', new THREE.Float32BufferAttribute(alphas, 1))
    this.geometry.setAttribute('freq', new THREE.Float32BufferAttribute(this.context.audio.frequencyData, 1))
  }

  update() {
    this.updateAttributes()
  }
}
