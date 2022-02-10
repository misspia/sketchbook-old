import * as THREE from 'three'
import { FlakesTexture } from 'three/examples/jsm/textures/FlakesTexture'
import { TessellateModifier } from 'three/examples/jsm/modifiers/TessellateModifier'
import { Images } from '../../themes'
import { Particle } from './particle'


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
      emissive: 0xff00ff,
      roughness: 0.5,
      metalness: 1,
      reflectivity: 1,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      flatShading: false,
      normalMap: this.normalMap3,
      normalScale: new THREE.Vector2( 0.15, 0.15 )
    })

    // this.material = new THREE.MeshPhongMaterial({
    //   color: 0xc204f6,
    //   emissive: 0x270c0c,
    //   specular: 0xffffff,
    //   shininess: 0,
    //   combine: THREE.MultiplyOperation,
    //   reflectivity: 0,
    //   refractionRatio: 0,
    // })

    this.group = new THREE.Group()

    this.font = new THREE.FontLoader().load(FONT_URL, (font) => {
      this.geometry = new THREE.TextGeometry(TEXT, {
        font,
        size: 8,
        height: 1.5,
        curveSegments: 15,
        bevelEnabled: true,
        bevelSegments: 2,
        bevelThickness: 0.1,
        bevelSize: 0.01,
      })
      this.geometry.center()
      const modifier = new TessellateModifier(8)
      modifier.modify(this.geometry)


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

  createParticles(positions) {
    positions.forEach((position) => {

    })
  }

  update() {

  }
}
