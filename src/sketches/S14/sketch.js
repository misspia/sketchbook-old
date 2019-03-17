import * as THREE from 'three';

import SketchManagerThree from '../sketchManagerThree';

 class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);

 
  }
  unmount() {

  }
  init() {

  }
  draw() {

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
