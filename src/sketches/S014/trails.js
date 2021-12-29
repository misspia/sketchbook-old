import * as THREE from 'three'
import TrailParticle from './trailParticle'
import fragmentShader from "./shaders/trail.frag"
import vertexShader from "./shaders/trail.vert"
export default class Trails {
  constructor(context) {
    this.context = context
    this.numParticles = 1
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
        uResolution: {
          value: new THREE.Vector2(this.context.canvas.width, this.context.canvas.height)
        },
        uPointMultiplier: {
          value: window.innerHeight / (2.0 * Math.tan(0.5 * 60.0 * Math.PI / 180.0))
        }
      }
    })
    this.mesh = new THREE.Points(this.geometry, this.material)
    this.createParticles()
  }
  
  get uniforms() {
    return this.material.uniforms
  }

  onResize() {
    this.material.uniforms.uResolution.value.x = this.context.canvas.width
    this.material.uniforms.uResolution.value.y = this.context.canvas.height
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
    const sizes = []

    this.particles.forEach(particle => {
      particle.update()
      positions.push(...particle.flattenedPositions)
      colors.push(...particle.flattenedColors)
      alphas.push(...particle.alphas)
      sizes.push(...particle.sizes)
    })
    // console.debug(positions)
    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    this.geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1))
    this.geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    this.geometry.setAttribute('alpha', new THREE.Float32BufferAttribute(alphas, 1))
  }

  update() {
    this.updateAttributes()
    // console.debug('[UV]', this.geometry.attributes)
  }
}
