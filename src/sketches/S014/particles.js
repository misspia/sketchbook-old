import * as THREE from "three"
import Particle from "./particle"
import fragmentShader from "./shaders/particle.frag"
import vertexShader from "./shaders/particle.vert"

const ATTRIBUTE_POSITION = 'position'

/**
 * https://github.com/simondevyoutube/ThreeJS_Tutorial_ParticleSystems/blob/master/main.js
 * https://github.com/mrdoob/three.js/blob/master/examples/webgl_buffergeometry.html
 * https://blog.mozvr.com/threejs-particles-recycling/
 * https://threejs.org/examples/?q=buffergeometry
 */
export default class Particles {
  constructor(numParticles = 200) {
    this.particles = []
    this.geometry = new THREE.BufferGeometry()
    this.geometry.setAttribute(ATTRIBUTE_POSITION, new THREE.Float32BufferAttribute([], 3));
    this.createParticles(numParticles)

    this.material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {

      }
    })
    this.material = new THREE.MeshPhongMaterial({
      color: 0xaaaaaa,
      specular: 0xffffff, 
      shininess: 250,
      side: THREE.DoubleSide, 
      vertexColors: true, 
      transparent: true,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material)
  }

  createParticles(numParticles) {
    for (let i = 0; i < numParticles; i++) {
      const particle = new Particle()
      this.particles.push(particle)
    }
    const positions = []
    const normals = []
    const colors = []
    this.particles.forEach((particle) => {
      const { 
        pointA, pointB, pointC,
        normalsA, normalsB, normalsC,
        colorA, colorB, colorC,
        alpha,  
      } = particle
      positions.push(
        pointA.x, pointA.y, pointA.z,
        pointB.x, pointB.y, pointB.z,
        pointC.x, pointC.y, pointC.z,
      )
      normals.push(
        normalsA.x, normalsA.y, normalsA.z,
        normalsB.x, normalsB.y, normalsB.z,
        normalsC.x, normalsC.y, normalsC.z,
      )
      colors.push(
        colorA.x, colorA.y, colorA.z, alpha,
        colorB.x, colorB.y, colorB.z, alpha,
        colorC.x, colorC.y, colorC.z, alpha,
      )
    })
    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    this.geometry.setAttribute('normal', new THREE.Float32BufferAttribute(colors, 3))
    this.geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 4))

    this.geometry.computeBoundingSphere()
  }

  update() {
    // const positions = []
    // this.particles.forEach((particle) => {
    //   positions.push(
    //     particle.positions.x, 
    //     particle.positions.y, 
    //     particle.positions.z
    //   )
    // })
    // this.geometry.setAttribute(
    //   ATTRIBUTE_POSITION,
    //   new THREE.Float32BufferAttribute(positions, 3)
    // )

    // this.geometry.attributes[ATTRIBUTE_POSITION].needsUpdate = true;
  }
}
