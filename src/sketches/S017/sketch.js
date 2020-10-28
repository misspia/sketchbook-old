import * as THREE from 'three';
import SketchManagerThree from '../sketchManagerThree';
import utils from '../utils';

import frag from './boids.frag';
import vert from './boids.vert';

class Sketch extends SketchManagerThree {
  constructor(canavs) {
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
