import * as THREE from 'three'
import { Images } from '../../themes'


const TEXT = 'JoJo'
const FONT_URL = require('./font-shrikhand.json')

const onFontLoadProgess = (xhr) => {
  console.log(`Font ${(xhr.loaded / xhr.total * 100)}% loaded`);
}

const onFontLoadError = (err) => {
  console.debug('error loading font', err)
}

/**
 * https://github.com/mrdoob/three.js/blob/master/examples/webgl_modifier_tessellation.html
 */
export class Text {
  constructor(context) {
    this.context = context
    this.particles = []

    this.geometry = null
    this.mesh = null

    const gradientMap = new THREE.TextureLoader().load(Images.T017FiveTone) 
    this.material = new THREE.MeshToonMaterial({
      color: 0xeeee00,
      gradientMap,
    })

    this.group = new THREE.Group()

    this.font = new THREE.FontLoader().load(FONT_URL, (font) => {
      this.geometry = new THREE.TextGeometry(TEXT, {
        font,
        size: 8,
        height: 1.5,
        curveSegments: 5,
        bevelEnabled: true,
        bevelSegments: 2,
        bevelThickness: 0.1,
        bevelSize: 0.01,
      })
      this.geometry.center()


      this.mesh = new THREE.Mesh(
        this.geometry,
        this.material)
      this.mesh.receiveShadow = true

      this.group.add(this.mesh)
    },
      onFontLoadProgess,
      onFontLoadError
    )
  }

  get position() {
    return this.group.position
  }

  update() {

  }
}
