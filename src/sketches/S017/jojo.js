import * as THREE from 'three'
import utils from '../utils'

export class JoJo {
  constructor(context, font, material) {
    this.context = context
    this.material = material
    this.geometry = new THREE.TextGeometry('JoJo', {
      font,
      size: 4,
      height: 1,
      curveSegments: 12,
      bevelEnabled: true,
      bevelSegments: 8,
      bevelThickness: 0.1,
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

    this.yMinRotation = -utils.toRadians(20)
    this.yMaxRotation = utils.toRadians(20)
    this.yRotationDirection = utils.randomSign()

    this.yMinRotationIncrement = 0.0001
    this.yMaxRotationIncrement = 0.15
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

    this.scale.set(
      utils.remapFreq(1, 2.5, maxMidrangeFreq - midrangeAverage),
      utils.reverseRemapFreq(0.75, 2.0, maxMidrangeFreq - midrangeAverage),
      3
    )

    this.position.y = -0.2
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
      maxMidrangeFreq - midrangeAverage
    )
    // this.rotation.x += this.yRotationDirection * yRotationIncrement
    this.rotation.y += this.yRotationDirection * yRotationIncrement
  }
}
