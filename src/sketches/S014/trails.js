import * as THREE from 'three'
import TrailParticle from './trailParticle'
import fragmentShader from "./shaders/trail.frag"
import vertexShader from "./shaders/trail.vert"

export default class Trails {
  constructor() {
    this.numParticles = 1
    this.particles = []

    this.geometry = new THREE.BufferGeometry()
    this.material = new THREE.RawShaderMaterial({
      side: THREE.DoubleSide,
      vertexShader,
      fragmentShader,
      uniforms: {
        pointMultiplier: {
          value: window.innerHeight / (2.0 * Math.tan(0.5 * 60.0 * Math.PI / 180.0))
        }
      }
    })

    this.createParticles()

    this.mesh = new THREE.Mesh(this.geometry, this.material)
  }
  
  createParticles() {
    for(let i = 0; i < this.numParticles; i++) {
      const particle = new TrailParticle()
      this.particles.push(particle)
      this.updateAttributes()
    }
  }

  updateAttributes() {
    const positions = []
    const colors = []
    const alphas = []
    this.particles.forEach(particle => {
      particle.update()
      positions.push(...particle.flattenedPositions)
      colors.push(...particle.flattenedColors)
      alphas.push(...particle.alphas)
    })
    // console.debug(positions)
    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    this.geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    this.geometry.setAttribute('alpha', new THREE.Float32BufferAttribute(alphas, 1))
  }

  update() {
    this.updateAttributes()
  }
}
