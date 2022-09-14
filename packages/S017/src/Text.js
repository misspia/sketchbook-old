import * as THREE from 'three'
import { FlakesTexture } from 'three/examples/jsm/textures/FlakesTexture'

import { JoJo } from './Jojo'

import FONT_URL from './assets/font-shrikhand.json'

const onFontLoadProgess = (xhr) => {
  console.log(`Font ${(xhr.loaded / xhr.total * 100)}% loaded`);
}

const onFontLoadError = (err) => {
  console.debug('error loading font', err)
}

export class Text {
  constructor(context) {
    this.context = context

    this.jojo = null
    this.symbols = null

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
      this.jojo = new JoJo(this.context, font, this.material)
      this.group.add(this.jojo.mesh)
    },
      onFontLoadProgess,
      onFontLoadError
    )
  }

  get position() {
    return this.group.position
  }

  get rotation() {
    return this.group.rotation
  }

  update() {
    if(this.jojo) {
      this.jojo.update()
    }
  }
}
