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

    this.leftWall = null 
    this.backWall = null

    this.group = new THREE.Group()
  }

  get position() {
    return this.group.position
  }

  async init() {
    await this.loadTextures()
    // this.leftWall = new Comic(
    //   DEPTH,
    //   HEIGHT,
    //   this.textures[5]
    // )

    // this.textures.forEach((texture) => {
    //   console.debug(texture.image.width / texture.image.height)
    // })

    // this.group.add(this.leftWall.mesh)
    // this.leftWall.rotation.y = -utils.toRadians(90)
    // this.leftWall.position.x = -WIDTH * 0.49
    // this.leftWall.position.y = HEIGHT * 0.5
    // this.leftWall.position.z = 0.3


    this.backWall = new Comic(
      WIDTH * 0.99,
      HEIGHT,
      this.textures[5]
    )

    this.group.add(this.backWall.mesh)
    this.backWall.position.z = -DEPTH * 0.49
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
