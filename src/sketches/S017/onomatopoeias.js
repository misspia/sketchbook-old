import * as THREE from 'three'

export class Onomatopoeias {
  constructor() {

    this.group = new THREE.Group()
  }

  get position() {
    return this.group.position
  }

  update() {

  }
}
