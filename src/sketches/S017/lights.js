import * as THREE from 'three'

export class Lights {
  constructor() {

    this.directionalFrontLeft = new THREE.DirectionalLight(0xffffff, 0.7)
    this.directionalFrontLeft.position.set(-1, 0, 1).normalize()

    this.directionalFrontRight = new THREE.DirectionalLight(0xffffff, 0.7)
    this.directionalFrontRight.position.set(1, 0, 1).normalize()

    this.directionalTop = new THREE.DirectionalLight(0xffffff, 1.0)
    this.directionalTop.position.set(0, 1, 0).normalize()

    this.ambient = new THREE.AmbientLight(0x000000, 0.5)
    this.spot = new THREE.SpotLight(0xffffff, 3, 80, 0.5, 1)
    this.spotHelper = new THREE.SpotLightHelper(this.spot, 0xff0000)
    this.spot.shadow.bias = -0.0001
    this.spot.castShadow = true
    this.spot.shadow.mapSize.width = 512;
    this.spot.shadow.mapSize.height = 512;
    this.spot.shadow.camera.near = 0.5;
    this.spot.shadow.camera.far = 500;
    this.spot.shadow.focus = 1;
  }
}
