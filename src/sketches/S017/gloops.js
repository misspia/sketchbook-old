import * as THREE from 'three'
import vertexShader from './shaders/gloop.vert'
import fragmentShader from './shaders/gloop.frag'
import { Gloop } from './gloop'

const getPointMultiplier = () => {
  return window.innerHeight / (2.0 * Math.tan(0.5 * 60.0 * Math.PI / 180.0))
}

export class Gloops {
  constructor(context) {
    this.context = context
    this.numGloops = 1
    this.gloops = []
    this.createGloops()

    this.geometry = new THREE.BufferGeometry()
    this.material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        pointMultiplier: {
          value: getPointMultiplier()
        }
      }
    })
    this.mesh = new THREE.Points(this.geometry, this.material)
  }

  get position() {
    return this.mesh.position
  }

  onResize() {
    this.material.uniforms.pointMultiplier.value = getPointMultiplier()
  }

  createGloops() {
    for(let i = 0; i < this.numGloops; i++) {
      const gloop = new Gloop()
      this.gloops.push(gloop)
    }
    console.debug(this.gloops)
  }

  update() {
    const positions = []
    const freqs = []
    this.gloops.forEach((gloop) => {
      gloop.update()

      positions.push(
        gloop.position.x,
        gloop.position.y,
        gloop.position.z,
      )
    })

    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    // this.geometry.setAttribute('freq', new THREE.Float32BufferAttribute(freqs, 1))
  }

}
