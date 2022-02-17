import * as THREE from 'three'
import utils from '../utils'

const textPalette = [
  '!',
  '?',
  '^__^',
  '(ㆆ _ ㆆ)',
  '(˵ ͡° ͜ʖ ͡°˵)',
  '୧༼ಠ益ಠ╭∩╮༽',
  '≧◡≦',
  // '',
]
export class Symbol {
  constructor(font, material) {
    this.material = material.clone()

    const paletteIndex = utils.randomIntBetween(0, textPalette.length - 1)
    this.text = textPalette[paletteIndex]
    this.geometry = new THREE.TextGeometry(this.text, {
      font,
      size: utils.randomFloatBetween(1, 3),
      height: 0.5,
      curveSegments: 5,
      bevelEnabled: true,
      bevelSegments: 5,
      bevelThickness: 0.1,
      bevelSize: 0.5,
    })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
  }

  get position() {
    return this.group.position
  }

  update() {

  }
}
