import * as THREE from 'three'
import Stairstep from './stairstep'

export default class Staircase {
  constructor(context) {
    this.context = context;
    this.steps = [];
    this.mesh = new THREE.Group()
    this.bbox = new THREE.Box3().setFromObject(this.mesh)

    this.NUM_STEPS = (this.context.numFrequencyNodes - this.context.spectrumStart.highrange) / 2

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
    let width = 15;
    const height = 0.8;
    const depth = 0.8;
    let yPosition = 0;
    let zPosition = 0;

    const frequencyIndicies = this.createFrequencySets()

    for (let i = 0; i < this.NUM_STEPS; i++) {
      const step = new Stairstep(width, height, depth, frequencyIndicies[i])
      step.position.set(0, yPosition, zPosition)
      this.steps.push(step)
      this.mesh.add(step.mesh)

      yPosition += height
      zPosition -= depth
      width *= reductionFactor
    }
  }

  createFrequencySets() {
    const { numFrequencyNodes } = this.context
    const { highrange } = this.context.spectrumStart
    const sets = []
    for (let i = highrange; i < numFrequencyNodes; i += 2) {
      sets.push([i, i + 1])
    }
    return sets
  }

  update() {
    const { frequencyData } = this.context.audio

    this.steps.forEach(step => {
      const [indexA, indexB] = step.frequencyIndicies
      const average = (frequencyData[indexA] + frequencyData[indexB]) / 2 
      step.update(average)
    })

  }
}
