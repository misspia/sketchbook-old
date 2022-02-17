import * as THREE from 'three'
import { Symbol } from "./symbol"

export class Symbols {
  constructor(font, material) {
    this.group = new THREE.Group()
    this.numSymbols = 10
    this.symbols = []
    this.createSymbols(font, material)
  }

  get position() {
    return this.group.position
  }

  createSymbols(font, material) {
    for(let i = 0; i < this.numSymbols; i ++) {
      const symbol = new Symbol(font, material)
      this.symbols.push(symbol)
      this.group.add(symbol.mesh)
    }
  }

  update() {
    this.symbols.forEach((symbol) => {
      symbol.update()
    })
  }
}
