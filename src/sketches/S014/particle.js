import * as THREE from "three"
import utils from "../utils"

const n = 800, n2 = n / 2;	// triangles spread in the cube
const d = 12, d2 = d / 2;	// individual triangle size




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

    const pA = new THREE.Vector3();
    const pB = new THREE.Vector3();
    const pC = new THREE.Vector3();

    pA.set(this.pointA.x, this.pointA.y, this.pointA.z);
    pB.set(this.pointB.x, this.pointB.y, this.pointB.z);
    pC.set(this.pointC.x, this.pointC.y, this.pointC.z);


    const cb = new THREE.Vector3()
    cb.subVectors(pC, pB)

    const ab = new THREE.Vector3()
    ab.subVectors(pA, pB)

    cb.cross(ab)
    cb.normalize()

    this.normalsA = new THREE.Vector3(
      cb.x * 32767,
      cb.y * 32767,
      cb.z * 32767
    )
    this.normalsB = new THREE.Vector3(
      cb.x * 32767,
      cb.y * 32767,
      cb.z * 32767
    )
    this.normalsC = new THREE.Vector3(
      cb.x * 32767,
      cb.y * 32767,
      cb.z
    )

    this.color = new THREE.Color().setRGB(
      Math.random(),
      Math.random(),
      Math.random(),
    )
    this.alpha = 1
  }

  updateColor(freq) {
    this.color = new THREE.Color().setRGB(
      Math.random(),
      Math.random(),
      Math.random(),
    )
    // this.colorA.setRGB(
    //   utils.remapFreq(0, 0.9, freq),
    //   utils.remapFreq(0, 0.4, freq),
    //   utils.remapFreq(0.5, 1.0, freq),
    // )
    // this.colorB.setRGB(
    //   utils.remapFreq(0, 0.9, freq),
    //   utils.remapFreq(0, 0.4, freq),
    //   utils.remapFreq(0.5, 1.0, freq),
    // )
    // this.colorC.setRGB(
    //   utils.remapFreq(0, 0.9, freq),
    //   utils.remapFreq(0, 0.4, freq),
    //   utils.remapFreq(0.5, 1.0, freq),
    // )
  }

  update() {

  }
}
