import * as THREE from 'three'
import Stairstep from './stairstep'

const NUM_STEPS = 10

export default class Staircase {
  constructor(context) {
    this.context = context;
    this.steps = [];
    this.mesh = new THREE.Group()
    this.bbox = new THREE.Box3().setFromObject(this.mesh)

    this.createSteps();
  }

  get position() {
    return this.mesh.position
  }

  get min() {
    return this.bbox.min
  }

  get max() {
    return this.bbox.max
  }

  createSteps() {
    const reductionFactor = 0.95
    let width = 5;
    let height = 1;
    let depth = 1;
    let yPosition = 0;   
    let zPosition = 0;   

    for(let i = 0; i < NUM_STEPS; i++) {
      const step = new Stairstep(width, height, depth)
      step.position.set(0, yPosition, zPosition)
      this.steps.push(step)
      this.mesh.add(step.mesh)

      yPosition += height
      zPosition -= depth
      width *= reductionFactor
      height *= reductionFactor
      depth *= reductionFactor
    }
  }

  update() {
    this.steps.forEach((step) => {
      step.update()
    })
  }
}
