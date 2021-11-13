import * as THREE from "three"
import utils from "../utils"

const n = 800, n2 = n / 2;	// triangles spread in the cube
const d = 12, d2 = d / 2;	// individual triangle size

const pA = new THREE.Vector3();
const pB = new THREE.Vector3();
const pC = new THREE.Vector3();

const cb = new THREE.Vector3();
const ab = new THREE.Vector3();

export default class Particle {
  constructor() {
    // this.position = new THREE.Vector3(
    //   utils.randomFloatBetween(0.5, 10) * utils.randomSign(),
    //   utils.randomFloatBetween(0.5, 10) * utils.randomSign(),
    //   utils.randomFloatBetween(0.5, 10) * utils.randomSign(),
    // )
    // this.normal = new THREE.Vector3()

    // this.color = new THREE.Color().setRGB(
    //   utils.randomFloatBetween(0, 1),
    //   utils.randomFloatBetween(0, 1),
    //   utils.randomFloatBetween(0, 1),
    // )
    // this.alpha = 1

    const x = Math.random() * n - n2;
    const y = Math.random() * n - n2;
    const z = Math.random() * n - n2;

    this.pointA = new THREE.Vector3(
      x + Math.random() * d - d2,
			y + Math.random() * d - d2,
			z + Math.random() * d - d2,
    )
    this.pointB = new THREE.Vector3(
      x + Math.random() * d - d2,
			y + Math.random() * d - d2,
			z + Math.random() * d - d2,
    )
    this.pointC = new THREE.Vector3(
      x + Math.random() * d - d2,
			y + Math.random() * d - d2,
			z + Math.random() * d - d2,
    )

    const cb = new THREE.Vector3()
    cb.subVectors(this.pointC, this.pointB)

    const ab = new THREE.Vector3()
    ab.subVectors(this.pointA, this.pointB)

    cb.cross(ab)
    cb.normalize()

    this.normalsA = new THREE.Vector3(cb.x, cb.y, cb.z)
    this.normalsB = new THREE.Vector3(cb.x, cb.y, cb.z)
    this.normalsC = new THREE.Vector3(cb.x, cb.y, cb.z)
    

    this.colorA = new THREE.Color().setRGB(
      utils.randomFloatBetween(0, 1),
      utils.randomFloatBetween(0, 1),
      utils.randomFloatBetween(0, 1),
    )
    this.colorB = new THREE.Color().setRGB(
      utils.randomFloatBetween(0, 1),
      utils.randomFloatBetween(0, 1),
      utils.randomFloatBetween(0, 1),
    )
    this.colorC = new THREE.Color().setRGB(
      utils.randomFloatBetween(0, 1),
      utils.randomFloatBetween(0, 1),
      utils.randomFloatBetween(0, 1),
    )
    this.alpha = 1


  }
  update() {

  }
}
