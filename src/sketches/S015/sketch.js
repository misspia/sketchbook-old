import * as THREE from 'three';
import SketchManagerThree from '../sketchManagerThree';
import utils from '../utils';


class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);


  }
  unmount() {

  }
  init() {
    this.setCameraPos(110, 105, -110);
    this.lookAt(0, 0, 0);
    this.setClearColor(0xddddff);

  }
  draw() {
    this.renderer.render(this.scene, this.camera);
   

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;