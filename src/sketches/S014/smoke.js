import * as THREE from "three"
import SmokeParticle from "./smokeParticle"
import fragmentShader from "./shaders/smoke.frag"
import vertexShader from "./shaders/smoke.vert"
import { Images } from "../../themes"

/**
 * https://github.com/simondevyoutube/ThreeJS_Tutorial_ParticleSystems/blob/master/main.js
 * https://youtu.be/OFqENgtqRAY
 * 
 * https://youtu.be/5f5wwQb22tE
 */

const getPointMultiplier = () => {
  return window.innerHeight / (2.0 * Math.tan(0.5 * 60.0 * Math.PI / 180.0))
}

export default class Smoke {
  constructor(context) {
    this.context = context
    this.numParticles = context.numFrequencyNodes;
    this.particles = []
    this.geometry = new THREE.BufferGeometry()
    this.createParticles()

    this.material = new THREE.RawShaderMaterial({
      depthTest: true,
      depthWrite: false,
      transparent: true,
      vertexColors: true,
      vertexShader,
      fragmentShader,
      uniforms: {
        diffuseTexture: {
          value: new THREE.TextureLoader().load(Images.T014),
        },
        pointMultiplier: {
          value: getPointMultiplier()
        }
      },
    })

    this.mesh = new THREE.Points(this.geometry, this.material)
    this.geometry.computeBoundingBox()
    this.geometry.computeBoundingSphere()
  }

  get position() {
    return this.mesh.position
  }

  get uniforms() {
    return this.material.uniforms
  }

  onResize() {
    this.material.uniforms.pointMultiplier.value = getPointMultiplier()
  }

  createParticles() {
    for (let i = 0; i < this.numParticles; i++) {
      const particle = new SmokeParticle()
      this.particles.push(particle)
    }
  }

  updateParticles(time) {
    const positions = []
    const size = []
    const angles = []
    const alphas = []

    this.particles.forEach((particle) => {
      particle.update(time)
      positions.push(
        particle.position.x,
        particle.position.y,
        particle.position.z,
      )
      size.push(particle.size)
      angles.push(particle.rotation)
      alphas.push(particle.alpha)
    })

    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    this.geometry.setAttribute('size', new THREE.Float32BufferAttribute(size, 1))
    this.geometry.setAttribute('angle', new THREE.Float32BufferAttribute(angles, 1))
    this.geometry.setAttribute('alpha', new THREE.Float32BufferAttribute(alphas, 1))
    this.geometry.setAttribute('freq', new THREE.Float32BufferAttribute(this.context.audio.frequencyData , 1))
  }

  update(time) {
    this.context.audio.frequencyData.forEach((freq) => {
      this.updateParticles(freq, time)
    })
  }
}
