import * as THREE from 'three'
import utils from 'toolkit/utils'

export const OFFSET_Y = -5

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

    this.bbox = new THREE.Box3().setFromObject(this.mesh)

    this.yMinRotation = -utils.toRadians(30)
    this.yMaxRotation = utils.toRadians(30)
    this.yRotationDirection = utils.randomSign()

    this.yMinRotationIncrement = 0.0
    this.yMaxRotationIncrement = 0.015

    this.position.y = this.height / 2 + OFFSET_Y
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

  reset() {
    if(this.scale.x === 1 && this.scale.y === 1 && this.rotation.y === 0) {
      return
    }
    if(this.scale.x > -1.1 && this.scale.x < 1.1) {
      this.scale.x = 1
    } else if(this.scale.x <= -1.1) {
      this.scale.x += 0.05
    } else {
      this.scale.x -= 0.05
    }

    this.position.y = 0
    if(this.scale.y > -1.1 && this.scale.y < 1.1) {
      this.scale.y = 1
    } else if(this.scale.y <= -1.1) {
      this.scale.y += 0.05
    } else {
      this.scale.y -= 0.05
    }
    this.position.y = this.height / 2 + OFFSET_Y

    if(this.rotation.y > -0.1 && this.rotation.y < 0.1) {
      this.rotation.y = 0
    } else if(this.rotation.y <= -0.1) {
      this.rotation.y += 0.05
    } else {
      this.rotation.y -= 0.05
    }
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
    } = this.context.beatManager

    if(overallAverage === 0) {
      this.reset()
      return
    }

    this.position.y = 0
    this.scale.x = utils.remapFreq(0.5, 3.0, maxMidrangeFreq - midrangeAverage)
    this.scale.y = utils.reverseRemapFreq(0.75, 2.1, maxHighrangeFreq - highrangeAverage);
    this.position.y = this.height / 2 + OFFSET_Y
    
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
