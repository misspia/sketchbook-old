import * as THREE from 'three';
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import SketchManagerThree from '../sketchManagerThree';

import Environment from './environment';
import Shard from './shard';
import Feather from './feather';

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
    this.setClearColor(0x111111);
    this.lookAt(0, 0, 0);
    this.camera.updateProjectionMatrix();

    this.scene.add(this.shard.pivot);

    const feather = new Feather({ color: 0xececbb });
    this.scene.add(feather.pivot);
    feather.position.set(2, 0, 0);

  }

  draw() {
    this.stats.begin();

    this.stats.end();

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
