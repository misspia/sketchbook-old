import * as THREE from 'three';
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import SketchManagerThree from '../sketchManagerThree';

import Environment from './environment';
import Shard from './shard';

class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);
    this.directionalLight = {};
    const environment = new Environment(this.renderer);
    this.shard = new Shard(environment);

  }
  unmount() {

  }


  init() {
    this.createStats();
    this.setCameraPos(0, 0, 10);
    this.setClearColor(0xf1ebeb);
    this.lookAt(0, 0, 0);
    this.camera.updateProjectionMatrix();

    this.scene.add(this.shard.pivot);

    this.createEffects();
  }

  setupLights() {

  }

  createEffects() {

  }


  draw() {
    this.stats.begin();

    this.stats.end();

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
