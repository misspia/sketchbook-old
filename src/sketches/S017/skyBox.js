import * as THREE from 'three'

export class SkyBox {
  constructor() {
    this.geometry = new THREE.BoxGeometry(50, 50, 100)
    this.material = new THREE.MeshBasicMaterial()
    this.mesh = new THREE.Mesh(this.geometry, this.material)
  }

  get position() {
    return this.mesh.position
  }

  update() {
    
  }
}
