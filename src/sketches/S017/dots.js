import * as THREE from 'three'
import vertexShader from './shaders/dot.vert'
import fragmentShader from './shaders/dot.frag'

const getPointMultiplier = () => {
  return window.innerHeight / (2.0 * Math.tan(0.5 * 60.0 * Math.PI / 180.0))
}

/**
 * https://www.pinterest.ca/pin/288089707403666096/
 */
 
export class Dots {
  constructor(context) {
    this.context = context
    this.geometry = new THREE.BufferGeometry()
    this.numDots = context.numFrequencyNodes
    this.dots = []
    this.createDots()

    this.material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      depthTest: true,
      depthWrite: false,
      transparent: true,
      vertexColors: true,
      uniforms: {
        pointMultiplier: {
          value: getPointMultiplier()
        }
      }
    })
    this.mesh = new THREE.Points(this.geometry, this.material)
  }

  get position() {
    return this.mesh.position
  }

  onResize() {
    this.material.uniforms.pointMultiplier.value = getPointMultiplier()
  }

  createDots() {
    const DOTS_PER_ROW = 25
    const ROW_GAP = 3
    const COL_GAP = 3
    const ROW_START_OFFSET = -35
    const EVEN_ROW_X_START = 0 + ROW_START_OFFSET
    const ODD_ROW_X_START = COL_GAP / 2 + ROW_START_OFFSET

    let x = EVEN_ROW_X_START
    let y = -5
    const z = -10

    const positions = []

    for(let i = 0; i < this.numDots; i++) {

      const rowPos = i % DOTS_PER_ROW    
      const colPos = Math.floor(i / DOTS_PER_ROW % DOTS_PER_ROW)   
      
      if(rowPos === 0) {
        const isEvenRow = colPos % 2 === 0
        x = isEvenRow ? EVEN_ROW_X_START : ODD_ROW_X_START
        y += ROW_GAP
      } else {
        x += COL_GAP
      }
      positions.push(x, y, z)
    }
    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  }

  update() {
    this.geometry.setAttribute('freq', new THREE.Float32BufferAttribute(this.context.audio.frequencyData, 1))
  }

}
