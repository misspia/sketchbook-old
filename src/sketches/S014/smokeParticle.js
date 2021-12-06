import * as THREE from "three"

export default class SmokeParticle {
  constructor({ texture }) {
    this.geometry = new THREE.PlaneGeometry(5, 5)
    this.material = new THREE.MeshLambertMaterial({
      color: 0x3498db,
      map: texture,
      transparent: true,
    })
    this.mesh = new THREE.Mesh(this.geometry, this.material)

  }

  get position() {
    return this.mesh.position
  }

  update() {

  }
}
