import * as THREE from "three"
import SmokeParticle from "./smokeParticle"
import fragmentShader from "./shaders/particle.frag"
import vertexShader from "./shaders/particle.vert"
import { Images } from "../../themes"

const ATTRIBUTE_POSITION = 'position'

/**
 * https://github.com/simondevyoutube/ThreeJS_Tutorial_ParticleSystems/blob/master/main.js
 * https://youtu.be/OFqENgtqRAY
 * 
 * https://youtu.be/5f5wwQb22tE
 */
export default class Smoke {
  constructor(context) {
    this.context = context
    this.numParticles = 150;
    this.particles = []
    this.geometry = new THREE.BufferGeometry()
    this.createParticles()

    this.material = new THREE.RawShaderMaterial({
      // blending: THREE.AdditiveBlending,
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
          value: window.innerHeight / (2.0 * Math.tan(0.5 * 60.0 * Math.PI / 180.0))
        }
      },
    })

    this.mesh = new THREE.Points(this.geometry, this.material)
  }

  createParticles() {
    for(let i = 0; i < this.numParticles; i++) {
      const particle = new SmokeParticle()
      this.particles.push(particle)
    }
  }

  updatePositions(time) {
    const positions = []
    const size = []
    const colors = []
    const angles = []

    this.particles.forEach((particle) => {
      particle.update(time)
      positions.push(
        particle.position.x,
        particle.position.y,
        particle.position.z,
      )
      size.push(particle.size)
      colors.push(
        particle.color.r,
        particle.color.g,
        particle.color.b,
      )
      angles.push(particle.rotation)
    })

    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    this.geometry.setAttribute('size', new THREE.Float32BufferAttribute(size, 1))
    this.geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    this.geometry.setAttribute('angle', new THREE.Float32BufferAttribute(angles, 1))
  }

  update(time) {
    this.updatePositions(time)

    // this.geometry.attributes.color.needsUpdate = true
  }
}
