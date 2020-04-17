import * as THREE from 'three';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import SketchManagerThree from '../sketchManagerThree';

class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);
    this.directionalLight = {};

  }
  unmount() {

  }


  init() {
    this.createStats();

    this.setCameraPos(0, 0, 10);
    this.setClearColor(0xaaaaaa);
    this.lookAt(0, 0, 0);
    this.camera.updateProjectionMatrix();

    this.createEffects();
  }

  setupLights() {

  }

  createEffects() {

  }


  draw() {
    this.stats.begin();

    this.stats.end();

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
