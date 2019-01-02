import * as THREE from 'three';
import SketchManagerThree from '../sketchManagerThree';


class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);

  }
  unmount() {

  }
  init() {
    this.setClearColor(0xCCCFCC)
    this.setCameraPos(0, 50, -100);
  }
  
  draw() {
    this.renderer.render(this.scene, this.camera);
    
    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
