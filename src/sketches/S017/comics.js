import * as THREE from 'three'
import { Comic } from './comic'
import { WIDTH, HEIGHT, DEPTH } from './skyBox'
import { Images } from '../../themes'
import utils from '../utils'

const images = [
  Images.T017JoJo1,
  Images.T017JoJo2,
  Images.T017JoJo3,
  Images.T017JoJo4,
  Images.T017JoJo5,
  Images.T017JoJo6,
]
export class Comics {
  constructor(context) {
    this.context = context
    this.loader = new THREE.TextureLoader()
    this.init()

    this.floor = null 

    this.group = new THREE.Group()
  }

  get position() {
    return this.group.position
  }

  async init() {
    await this.loadTextures()
    this.floor = new Comic(
      WIDTH * 0.9,
      DEPTH * 0.4,
      // this.textures[3]
      this.textures[5]
    )

    console.debug('screenRatio: ', (WIDTH * 0.9) / (DEPTH * 0.4))
    this.textures.forEach((texture) => {
      console.debug(texture.image.width / texture.image.height)
    })

    this.group.add(this.floor.mesh)
    this.floor.rotation.x = -utils.toRadians(90)
    this.floor.position.z = DEPTH * 0.3
  }

  async loadTextures() {
    const loadingTextures = images.map((image) => new Promise((resolve) => {
      this.loader.load(image, (texture) => {
        resolve(texture)
      })
    }))
    const textures = await Promise.all(loadingTextures)
    this.textures = [...textures]
  }

  update() {
    if(this.floor) {
      this.floor.update()
    }
  }
}
