import * as THREE from 'three'


export default class SkyBox {
  constructor() {
    this.geometry = new THREE.BoxGeometry(120, 120, 120)
    this.material = new THREE.MeshPhongMaterial({ 
      color: 0x000000, 
      dithering: true,
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material)

    this.mesh.receiveShadow = true;
  }

  get position() {
    return this.mesh.position
  }
}
