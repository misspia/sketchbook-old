import * as THREE from 'three'

const TEXT = 'JoJo'
const FONT_URL = require('./font.json')

export class Text {
  constructor() {
    this.geometry = null
    this.material = new THREE.MeshBasicMaterial({
      color: 0xeeee00,
      wireframe: true,
    })
    this.mesh = null
    this.group = new THREE.Group()

    this.font = new THREE.FontLoader().load(FONT_URL, (font) => {
      this.geometry = new THREE.TextGeometry(TEXT, {
        font,
        size: 8,
        height: 1,
        curveSegments: 1,
        bevelSegments: 1,
        bevelThickness: 0.7,
        bevelSize: 0.1,
        bevelEnabled: true

      })
      this.geometry.computeBoundingBox()
      console.debug(this.geometry.vertices)
      this.mesh = new THREE.Mesh(this.geometry, this.material)

      const bbox = new THREE.Box3().setFromObject(this.mesh)
      this.mesh.position.set(
        -(bbox.min.x + bbox.max.x) / 2,
        -(bbox.min.y + bbox.max.y) / 2,
        0
      )

      this.group.add(this.mesh)
    }, 
    (xhr) => {
      console.log( `Font ${(xhr.loaded / xhr.total * 100)}% loaded` );
    },
    (err) => {
      console.debug('error loading font', err)
    }
    )

  }

  init() {

  }
  get position() {
    return this.group.position
  }


  update() {

  }
}
