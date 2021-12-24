import * as THREE from 'three'
import TrailParticle from './trailParticle'

export default class Trails {
  constructor() {
    this.numParticles = 10
    this.particles = []

    this.geometry = new THREE.BufferGeometry()
    this.material = new THREE.MeshBasicMaterial({
      color: 0xeeaaff,
      side: THREE.DoubleSide,
    })

    this.createParticles()

    this.group = new THREE.Mesh(this.geometry, this.material)
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
      positions.push(...particle.positions)
      colors.push(...particle.colors)
      alphas.push(...particle.alphas)
    })
    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    this.geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    this.geometry.setAttribute('alpha', new THREE.Float32BufferAttribute(alphas, 1))
  }

  update() {
    this.updateAttributes()
  }
}
