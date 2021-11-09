import * as THREE from "three"
import Particle from "./particle"
import fragmentShader from "./shaders/particle.frag"
import vertexShader from "./shaders/particle.vert"

const ATTRIBUTE_POSITION = 'position'

/**
 * https://github.com/simondevyoutube/ThreeJS_Tutorial_ParticleSystems/blob/master/main.js
 * https://github.com/mrdoob/three.js/blob/master/examples/webgl_buffergeometry.html
 */
export default class Particles {
  constructor(numParticles) {
    this.particles = []
    this.geometry = new THREE.BufferGeometry()
    this.geometry.setAttribute(ATTRIBUTE_POSITION, new THREE.Float32BufferAttribute([], 3));

    // this.material = new THREE.RawShaderMaterial({
    //   vertexShader,
    //   fragmentShader,
    //   uniforms: {

    //   }
    // })
    this.material = new THREE.MeshPhongMaterial({
      color: 0xaaaaaa, specular: 0xffffff, shininess: 250,
      side: THREE.DoubleSide, vertexColors: true, transparent: true
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material)

    this.createParticles(numParticles)
  }

  createParticles(numParticles) {
    for (let i = 0; i < numParticles; i++) {
      const particle = new Particle()
      particles.push(particle)
    }
  }

  update() {
    const positions = []
    this.particles.forEach((particle) => {
      positions.push(
        particle.positions.x, 
        particle.positions.y, 
        particle.positions.z
      )
    })
    this.geometry.setAttribute(
      ATTRIBUTE_POSITION,
      new THREE.Float32BufferAttribute(positions, 3)
    )

    this.geometry.attributes[ATTRIBUTE_POSITION].needsUpdate = true;
  }
}
