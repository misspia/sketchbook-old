import * as THREE from 'three'
import utils from '../utils'

export class JoJo {
  constructor(context, font, material) {
    this.context = context
    this.material = material
    this.geometry = new THREE.TextGeometry('JoJo', {
      font,
      size: 4,
      height: 3,
      curveSegments: 12,
      bevelEnabled: true,
      bevelSegments: 8,
      bevelThickness: 0.3,
      bevelSize: 0.5,
    })
    this.mesh = new THREE.Mesh(
      this.geometry,
      this.material
    )
    this.geometry.center()

    this.mesh.receiveShadow = true
    this.mesh.castShadow = true

    this.bbox = new THREE.Box3()

    this.yMinRotation = -utils.toRadians(30)
    this.yMaxRotation = utils.toRadians(30)
    this.yRotationDirection = utils.randomSign()

    this.yMinRotationIncrement = 0.0
    this.yMaxRotationIncrement = 0.015

    this.position.y = -0.2
  }

  get position() {
    return this.mesh.position
  }

  get rotation() {
    return this.mesh.rotation
  }

  get scale() {
    return this.mesh.scale
  }

  get min() {
    return this.bbox.setFromObject(this.mesh).min
  }

  get max() {
    return this.bbox.setFromObject(this.mesh).max
  }

  get width() {
    return Math.abs(this.max.x - this.min.x)
  }

  get height() {
    return Math.abs(this.max.y - this.min.y)
  }

  get depth() {
    return Math.abs(this.max.z - this.min.z)
  }

  update() {
    const {
      latestOverallAverage: overallAverage,
      latestBassAverage: bassAverage,
      latestMidrangeAverage: midrangeAverage,
      latestHighrangeAverage: highrangeAverage,
      maxBassFreq,
      maxMidrangeFreq,
      maxHighrangeFreq,
      maxOverallFreq,

    } = this.context.beatManager

    this.scale.x = utils.remapFreq(0.5, 3.0, maxMidrangeFreq - midrangeAverage)
    this.scale.y = utils.reverseRemapFreq(0.75, 2.1, maxHighrangeFreq - highrangeAverage);

    this.position.z = this.depth / 2

    if (
      this.rotation.y <= this.yMinRotation ||
      this.rotation.y >= this.yMaxRotation
    ) {
      this.yRotationDirection *= -1
    }
    const yRotationIncrement = utils.remapFreq(
      this.yMinRotationIncrement,
      this.yMaxRotationIncrement,
      maxBassFreq
    )
    this.rotation.y += this.yRotationDirection * yRotationIncrement
  }
}
