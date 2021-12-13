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
    this.numParticles = 100;
    this.particles = []
    this.geometry = new THREE.BufferGeometry()
    this.createParticles()

    this.material = new THREE.RawShaderMaterial({
      blending: THREE.AdditiveBlending,
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
