import * as THREE from "three"
import utils from "../utils"
import fragmentShader from "./shaders/particle.frag"
import vertexShader from "./shaders/particle.vert"

export default class Particle {
  constructor() {
    this.position = new THREE.Vector3(
      utils.randomFloatBetween(0.5, 10) * utils.randomSign(),
      utils.randomFloatBetween(0.5, 10) * utils.randomSign(),
      utils.randomFloatBetween(0.5, 10) * utils.randomSign(),
    )
  }
  update() {

  }
}
