import SketchManagerThree from '../sketchManagerThree';

import Lines from './lines';

class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);
    this.cubeCamera = {};
    this.composer = {};

    this.lines = new Lines({
      num: 10,
    });
  }

  unmount() {
    this.lines.dispose();

    this.clearScene();
  }

  init() {
    this.setClearColor(0x111111)
    this.setCameraPos(0, 0, -10);
    this.lookAt(0, 0, 0);

    this.scene.add(this.lines.pivot);
  }

  draw() {
    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
