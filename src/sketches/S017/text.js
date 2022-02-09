import * as THREE from 'three'
import { TessellateModifier } from 'three/examples/jsm/modifiers/TessellateModifier'
import { Particle } from './particle'
import utils from '../utils'
import vertexShader from './shaders/toon.vert'
import fragmentShader from './shaders/toon.frag'


const TEXT = 'J o J o'
const FONT_URL = require('./font.json')

const getPointMultiplier = () => {
  return window.innerHeight / (2.0 * Math.tan(0.5 * 60.0 * Math.PI / 180.0))
}

const onFontLoadProgess = (xhr) => {
  console.log(`Font ${(xhr.loaded / xhr.total * 100)}% loaded`);
}

const onFontLoadError = (err) => {
  console.debug('error loading font', err)
}

/**
 * https://github.com/mrdoob/three.js/blob/master/examples/webgl_modifier_tessellation.html
 */
export class Text {
  constructor(context) {
    this.context = context
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
        pointMultiplier: {
          value: getPointMultiplier()
        }
      },
    })
    this.mesh = new THREE.Points(this.geometry, this.material)
    this.group = new THREE.Group()
    this.group.add(this.mesh)

    this.font = new THREE.FontLoader().load(FONT_URL, (font) => {
      const textGeometry = new THREE.TextGeometry(TEXT, {
        font,
        size: 8,
        height: 0,
        curveSegments: 2,
        bevelEnabled: false,
        bevelSegments: 2,
        bevelThickness: 0.7,
        bevelSize: 0.1,

      })

      const mesh = new THREE.Mesh(
        textGeometry,
        new THREE.MeshBasicMaterial({
          color: 0xeeee00,
          wireframe: true,
        }))

      textGeometry.center()
      textGeometry.computeBoundingBox()
      textGeometry.computeBoundingSphere()

      console.debug(textGeometry)
      this.group.add(mesh)

      this.createParticles(textGeometry.vertices)
    },
      onFontLoadProgess,
      onFontLoadError)

  }

  get position() {
    return this.group.position
  }

  createParticles(verticies) {
    verticies.forEach(({ x, y, z }) => {
      const freqIndex = utils.randomIntBetween(0, this.context.numFrequencyNodes)
      const particle = new Particle({ x, y, z }, freqIndex)

      this.particles.push(particle)
    })

    const positions = []
    const sizes = []
    this.particles.forEach((particle) => {
      const { x, y, z } = particle.position
      positions.push(x, y, z)
      sizes.push(particle.size)
    })

    console.debug(positions)
    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    this.geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1))
  }

  update() {

  }
}
