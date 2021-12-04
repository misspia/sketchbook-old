// import * as THREE from "three"
// import Particle from "./particle"
// import fragmentShader from "./shaders/particle.frag"
// import vertexShader from "./shaders/particle.vert"

// const ATTRIBUTE_POSITION = 'position'

// /**
//  * https://discourse.threejs.org/t/assign-different-colors-to-different-parts-of-buffergeometry/6604/13
//  * https://github.com/mrdoob/three.js/blob/master/examples/webgl_buffergeometry.html
//  * https://threejs.org/examples/?q=buffergeometry
//  * https://threejs.org/docs/#manual/en/introduction/How-to-update-things
//  * https://jsfiddle.net/xvnctbL0/2/
//  * https://threejs.org/docs/#api/en/core/BufferAttribute.updateRange
//  * https://github.com/mrdoob/three.js/issues/15652
//  * https://stackoverflow.com/questions/61501912/how-to-assign-different-color-for-each-vertex-in-a-buffer-geometry-three-js
//  */
// export default class Particles {
//   constructor(context) {
//     this.context = context
//     this.particles = []
//     this.geometry = new THREE.BufferGeometry()
//     this.createParticles()

//     this.material = new THREE.RawShaderMaterial({
//       vertexShader,
//       fragmentShader,
//       side: THREE.DoubleSide,
//       vertexColors: THREE.VertexColors,
//       transparent: true,
//       uniforms: {

//       },
//     })
//     this.mesh = new THREE.Mesh(this.geometry, this.material)
//   }

//   createParticles() {
//     const numParticles = this.context.numFrequencyNodes
//     for (let i = 0; i < numParticles; i++) {
//       const particle = new Particle()
//       this.particles.push(particle)
//     }
//     const positions = []
//     const normals = []
//     const colors = []
//     this.particles.forEach((particle) => {
//       const {
//         pointA, pointB, pointC,
//         normalsA, normalsB, normalsC,
//         color,
//         alpha,
//       } = particle
//       positions.push(
//         pointA.x, pointA.y, pointA.z,
//         pointB.x, pointB.y, pointB.z,
//         pointC.x, pointC.y, pointC.z,
//       )
//       normals.push(
//         normalsA.x, normalsA.y, normalsA.z,
//         normalsB.x, normalsB.y, normalsB.z,
//         normalsC.x, normalsC.y, normalsC.z,
//       )
//       colors.push(color.r, color.g, color.b)
//     })

//     this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
//     this.geometry.setAttribute('normal', new THREE.Int16BufferAttribute(normals, 3))
//     this.geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

//     this.geometry.computeBoundingSphere()
//   }

//   update() {
//     const colors = []
//     const frequencies = this.context.audio.frequencyData
//     this.particles.forEach((particle, index) => {
//       particle.update(frequencies[index])
//       colors.push(
//         particle.color.r,
//         particle.color.g,
//         particle.color.b,
//       )
//     })
//     this.geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

//     this.geometry.attributes.color.needsUpdate = true
//   }
// }


import * as THREE from "three"
import Particle from "./particle"
import fragmentShader from "./shaders/particle.frag"
import vertexShader from "./shaders/particle.vert"

const ATTRIBUTE_POSITION = 'position'

/**
 * https://discourse.threejs.org/t/assign-different-colors-to-different-parts-of-buffergeometry/6604/13
 * https://github.com/mrdoob/three.js/blob/master/examples/webgl_buffergeometry.html
 * https://threejs.org/examples/?q=buffergeometry
 * https://threejs.org/docs/#manual/en/introduction/How-to-update-things
 * https://jsfiddle.net/xvnctbL0/2/
 * https://threejs.org/docs/#api/en/core/BufferAttribute.updateRange
 * https://github.com/mrdoob/three.js/issues/15652
 * https://stackoverflow.com/questions/61501912/how-to-assign-different-color-for-each-vertex-in-a-buffer-geometry-three-js
 */
export default class Particles {
  constructor(context) {
    this.context = context
    this.particles = []
    this.geometry = new THREE.BufferGeometry()
    this.createParticles()

    this.material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
      vertexColors: THREE.VertexColors,
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
        geometry,
        points,
        color,
      } = particle

      positions.push(...points)
      normals.push(
        
      )
      colors.push(color.r, color.g, color.b)
    })

    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    this.geometry.setAttribute('normal', new THREE.Int16BufferAttribute(normals, 3))
    this.geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

    this.geometry.computeBoundingSphere()
  }

  update() {
    const colors = []
    const frequencies = this.context.audio.frequencyData
    this.particles.forEach((particle, index) => {
      particle.update(frequencies[index])
      colors.push(
        particle.color.r,
        particle.color.g,
        particle.color.b,
      )
    })
    this.geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

    this.geometry.attributes.color.needsUpdate = true
  }
}
