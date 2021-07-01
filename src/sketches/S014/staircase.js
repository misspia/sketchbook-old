import * as THREE from 'three'
import Stairstep from './stairstep'

const NUM_STEPS = 10

export default class Staircase {
  constructor(context) {
    this.context = context;
    this.steps = [];
    this.group = new THREE.Group()

    this.createSteps();
  }

  createSteps() {
    for(let i = 0; i < NUM_STEPS; i++) {
      const step = new Stairstep()
      step.position(0, i, 0)
      this.steps.push(step)
      this.group.add(step.mesh)
    }
  }

  update() {
    this.steps.forEach((step) => {
      step.update()
    })
  }
}
