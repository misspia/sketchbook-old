import * as THREE from 'three'

export class Lights {
  constructor() {
    this.directional = new THREE.DirectionalLight(0xffffff, 1)
    this.directional.castShadow = true

    this.ambient = new THREE.AmbientLight(0x000000, 5)
    this.spot = new THREE.SpotLight(0xffffff, 1, 80, 0.5, 1)
    this.spotHelper = new THREE.SpotLightHelper(this.spot, 0xff0000)
    this.spot.castShadow = true
    this.spot.shadow.mapSize.width = 512;
    this.spot.shadow.mapSize.height = 512;
    this.spot.shadow.camera.near = 0.5;
    this.spot.shadow.camera.far = 500;
    this.spot.shadow.focus = 1;

    this.point = new THREE.PointLight(0xffffff, 1, 800)
    this.pointHelper = new THREE.PointLightHelper(this.point, 1, 0x00ff00)
  }
}
