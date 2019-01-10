import * as THREE from 'three';
import SketchManagerThree from '../sketchManagerThree';
import glsl from 'glslify';

import frag from './fragment.glsl';
import vert from './vertex.glsl';
import utils from '../utils';

/**
 * Inspo: https://i.redd.it/5u2xbx7eo9721.jpg
 * https://twitter.com/mattdesl/status/1079879696978927616
 */
class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);
    this.cubeCamera = {};
    this.composer = {};

    this.pyramid = {};
    this.material = {};
    this.geometry = {};
  }
  unmount() {

  }
  init() {
    // this.disableOrbitControls();
    this.setClearColor(0x111111)
    this.setCameraPos(0, 0, -100);
    this.lookAt(0, 0, 0);
  }
  createPyramid() {

  }
  draw() {
    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
