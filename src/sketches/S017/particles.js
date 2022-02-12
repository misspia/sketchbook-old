import * as THREE from 'three'
import { Particle } from './particle'

/**
 * https://tendril.ca/work/web-toys/
 */
export class Particles {
  constructor() {
    this.geometry = new THREE.BufferGeometry()
    this.material = new THREE.ACESFilmicToneMapping
    this.mesh = new THREE.Points(this.geometry, this.material)
  }

  get position() {

  }

  update() {
    
  }
}
