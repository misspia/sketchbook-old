import * as THREE from 'three'

export class Lights {
  constructor() {
    this.ambient = new THREE.AmbientLight(0x000000, 0.5)
    this.spot = new THREE.SpotLight(0xffffff, 5, 70, 0.4, 1, 1)
    this.spotHelper = new THREE.SpotLightHelper(this.spot, 0xff0000)

    this.spot.castShadow = true
  }
}
