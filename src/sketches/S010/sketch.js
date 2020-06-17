import SketchManagerThree from '../sketchManagerThree';

import Mouse from './mouse';
import Lines from './lines';

class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);
    this.lines = new Lines({
      num: 10,
    });
    this.mouse = new Mouse(this);
  }

  unmount() {
    this.mouse.dispose();
    this.lines.dispose();
    this.clearScene();
  }

  init() {
    this.setClearColor(0x111111)
    this.setCameraPos(0, 0, -25);
    this.lookAt(0, 0, 0);

    this.scene.add(this.lines.pivot);
  }

  draw() {
    this.renderer.render(this.scene, this.camera);

    this.mouse.update();

    if(this.mouse.intersection) {
      this.lines.setTouching(this.mouse.intersection.object.uuid);
    } else {
      this.lines.setTouching(undefined);
    }

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
