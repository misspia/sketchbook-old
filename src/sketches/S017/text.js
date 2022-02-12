import * as THREE from 'three'
import { FlakesTexture } from 'three/examples/jsm/textures/FlakesTexture'
import { TessellateModifier } from 'three/examples/jsm/modifiers/TessellateModifier'

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

    this.envMap = new THREE.MeshStandardMaterial({
      color: 0x706c00,
      emissive: 0x000000,
      roughness: 1,
      metalness: 0,
      side: THREE.DoubleSide,
    });

    this.normalMap3 = new THREE.CanvasTexture( new FlakesTexture() );
    this.normalMap3.wrapS = THREE.RepeatWrapping;
    this.normalMap3.wrapT = THREE.RepeatWrapping;
    this.normalMap3.repeat.x = 10;
    this.normalMap3.repeat.y = 6;
    this.normalMap3.anisotropy = 16;

    this.material = new THREE.MeshPhysicalMaterial({
      color: 0xdaf604,
      // emissive: 0xff00ff,
      roughness: 0.5,
      metalness: 1,
      reflectivity: 1,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      flatShading: false,
      normalMap: this.normalMap3,
      normalScale: new THREE.Vector2( 0.15, 0.15 )
    })

    // this.material = new THREE.MeshStandardMaterial({
    //   color: 0x711772,
    //   emissive: 0x111111,
    //   roughness: 0.57,
    //   metalness: 1,
    // })
    this.material = new THREE.MeshPhongMaterial({
      color: 0xa8007b,
      emissive: 0x101010,
      // specular: 0x111111,
      specular: 0x292929,
      shininess: 100,
      combine: THREE.MultiplyOperation,
      reflectivity: 0,
      refractionRatio: 0,
    })

    this.group = new THREE.Group()

    this.font = new THREE.FontLoader().load(FONT_URL, (font) => {
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
