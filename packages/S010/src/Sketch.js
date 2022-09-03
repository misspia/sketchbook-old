import { SketchManager } from './SketchManager';

import { Mouse } from './Mouse';
import { Lines } from './Lines';

export class Sketch extends SketchManager {
  constructor(canvas) {
    super(canvas);
    this.lines = new Lines();
    this.mouse = new Mouse(this);
  }

  unmount() {
    this.mouse.dispose();
    this.lines.dispose();
    this.clearScene();
  }

  init() {
    this.disableOrbitControls();
    this.setClearColor(0x555555);
    this.setCameraPos(this.lines.width / 2, 3.2, 0.5);
    this.lookAt(0, 0, 0);

    this.scene.add(this.lines.pivot);
  }

  draw() {
    this.renderer.render(this.scene, this.camera);
    this.mouse.update();

    if(this.mouse.intersection) {
      this.lines.setActive(this.mouse.intersection.object.uuid);
    } else {
      this.lines.setActive(undefined);
    }
    this.lines.update();

    requestAnimationFrame(() => this.draw());
  }
}
