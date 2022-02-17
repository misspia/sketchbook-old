import * as THREE from 'three'
import { Comic } from './comic'
import { WIDTH, HEIGHT, DEPTH } from './skyBox'
import { Images } from '../../themes'
import utils from '../utils'


export class Comics {
  constructor(context) {
    this.context = context
    this.loader = new THREE.TextureLoader()
 
    this.textures = [
      this.loader.load(Images.T017JoJo1),
      this.loader.load(Images.T017JoJo2),
      this.loader.load(Images.T017JoJo3),
    ]
    this.floor = new Comic(
      WIDTH * 0.9,
      DEPTH * 0.4,
      this.textures[0]
    )

    this.group = new THREE.Group()
    this.group.add(this.floor.mesh)
    this.floor.rotation.x = utils.toRadians(90) 
    this.floor.position.z = DEPTH * 0.3 
  }

  get position() {
    return this.group.position()
  }

  update() {

  }
}
