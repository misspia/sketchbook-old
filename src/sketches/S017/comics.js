import * as THREE from 'three'
import { Comic } from './comic'
import { WIDTH, HEIGHT, DEPTH } from './skyBox'
import { Images } from '../../themes'

const images = [
  Images.T017JoJo6,
]
export class Comics {
  constructor(context) {
    this.context = context
    this.loader = new THREE.TextureLoader()
    this.init()

    this.leftWall = null 
    this.backWall = null

    this.group = new THREE.Group()
  }

  get position() {
    return this.group.position
  }

  async init() {
    await this.loadTextures()

    this.backWall = new Comic(
      WIDTH,
      HEIGHT,
      this.textures[0]
    )

    this.group.add(this.backWall.mesh)
    this.backWall.position.z = -DEPTH / 2 + 0.1
    this.backWall.position.y = HEIGHT * 0.5
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
    const average = this.context.beatManager.latestOverallAverage
    if(this.leftWall) {
      this.leftWall.update(average)
    }
    if(this.backWall) {
      this.backWall.update(average)
    }
  }
}
