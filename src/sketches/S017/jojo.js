import * as THREE from 'three'
import { TessellateModifier } from 'three/examples/jsm/modifiers/TessellateModifier'

const TEXT = 'JoJo'

export class JoJo {
  constructor(font, material) {
    this.material = material
    this.geometry = new THREE.TextGeometry(TEXT, {
      font,
      size: 8,
      height: 5,
      curveSegments: 15,
      bevelEnabled: true,
      bevelSegments: 10,
      bevelThickness: 0.1,
      bevelSize: 0.5,
    })
    this.geometry.center()
      // const modifier = new TessellateModifier(8)
      // modifier.modify(this.geometry)

      this.mesh = new THREE.Mesh(
        this.geometry,
        this.material
      )
      this.mesh.receiveShadow = true
      this.mesh.castShadow = true
  }
  get position() {
    return this.mesh.position
  }
  
  update() {

  }
}
