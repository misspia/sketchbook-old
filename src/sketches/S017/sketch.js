import * as THREE from 'three';
import SketchManagerThree from '../sketchManagerThree';
import utils from '../utils';

import frag from './boids.frag';
import vert from './boids.vert';

/**
 * https://eater.net/boids
 * https://www.pinterest.ca/pin/516295544779785194/
 */
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
