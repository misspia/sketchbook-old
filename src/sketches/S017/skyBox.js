import * as THREE from 'three'

export class SkyBox {
  constructor() {
    this.geometry = new THREE.PlaneGeometry(200, 200)
    this.material = new THREE.MeshPhongMaterial({ 
      color: 0x808080, 
      dithering: true,
    } );
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.rotation.x = -Math.PI * 0.5
    this.mesh.receiveShadow = true
  }

  get position() {
    return this.mesh.position
  }

  update() {
    
  }
}
