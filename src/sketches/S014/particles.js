import * as THREE from "three"
import Particle from "./particle"
import fragmentShader from "./shaders/particle.frag"
import vertexShader from "./shaders/particle.vert"

const ATTRIBUTE_POSITION = 'position'

/**
 * https://github.com/simondevyoutube/ThreeJS_Tutorial_ParticleSystems/blob/master/main.js
 * https://github.com/mrdoob/three.js/blob/master/examples/webgl_buffergeometry.html
 * https://threejs.org/examples/?q=buffergeometry
 * https://threejs.org/docs/#manual/en/introduction/How-to-update-things
 * https://jsfiddle.net/xvnctbL0/2/
 */
export default class Particles {
  constructor(context) {
    this.context = context
    this.particles = []
    this.geometry = new THREE.BufferGeometry()
    this.geometry.setAttribute(ATTRIBUTE_POSITION, new THREE.Float32BufferAttribute([], 3));
    this.createParticles()

    this.material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
      transparent: true,
      uniforms: {

      },
    })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
  }

  createParticles() {
    const numParticles = this.context.numFrequencyNodes
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
        color,
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
        color.x, color.y, color.z,
      )
    })
    const positionAttribute = new THREE.Float32BufferAttribute(positions, 3)
    const normalAttribute = new THREE.Int16BufferAttribute(colors, 3)
    const colorAttribute = new THREE.Uint8BufferAttribute(colors, 3)

    normalAttribute.normalized = true
    colorAttribute.normalized = true

    this.geometry.setAttribute('position', positionAttribute)
    this.geometry.setAttribute('normal', normalAttribute)
    this.geometry.setAttribute('color', colorAttribute)

    this.geometry.computeBoundingSphere()
  }

  update() {
    const colors = this.geometry.attributes.color
    // const colors = []

    this.particles.forEach((particle, index) => {
      particle.updateColor(this.context.audio.frequencyData[index])
    
    // colors[index * 3 + 0] = colorA.x
    // colors[index * 3 + 1] = colorA.x
    // colors[index * 3 + 2] = colorA.x
    })

    
    for (let i = 0; i < colors.count; i++) {
      
      colors[i * 3 + 0] = Math.random()
      colors[i * 3 + 1] = Math.random()
      colors[i * 3 + 2] = Math.random()
    }

    console.debug(colors)
    this.geometry.attributes.color.needsUpdate = true



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
