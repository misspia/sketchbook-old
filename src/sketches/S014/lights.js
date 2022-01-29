import * as THREE from 'three'

export default class Lights {
  constructor() {
    this.ambient = new THREE.AmbientLight( 0xffffff, 0.1 );
    this.spot = new THREE.SpotLight(0xffffff, 1, 100, 0.5)
    this.spot.castShadow = true
    this.spot.shadow.mapSize.width = 1024;
    this.spot.shadow.mapSize.height = 1024;

    this.spot.shadow.camera.near = 500;
    this.spot.shadow.camera.far = 4000;
    this.spot.shadow.camera.fov = 30;

    this.spotHelper = new THREE.SpotLightHelper(this.spot, 0x00ff00)
  }

  update() {

  }
}
