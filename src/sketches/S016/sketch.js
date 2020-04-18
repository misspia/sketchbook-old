import SketchManagerThree from '../sketchManagerThree';

import Environment from './environment';
import Shard from './shard';
import Wing from './wing';

class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);
    this.directionalLight = {};
    const environment = new Environment(this.renderer);
    this.shard = new Shard(environment);
    this.wing = new Wing(environment);

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
    this.scene.add(this.wing.pivot);

    this.wing.position.set(1.8, -2, 0);
  }

  draw() {
    this.stats.begin();

    this.wing.update();
    this.stats.end();

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
