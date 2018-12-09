import * as THREE from 'three';
import SketchManagerThree from '../sketchManagerThree.js';
import utils from '../utils.js';

class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);

  }
  unmount() {

  }
  init() {

  }
  draw() {

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;