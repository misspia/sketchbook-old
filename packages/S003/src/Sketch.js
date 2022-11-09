import vert from './vertex.glsl'
import frag from './fragment.glsl'
import { SketchManager } from './SketchManager'

class RayMarch extends SketchManager {
  constructor(canvas) {
    super(canvas);
    this.startTime = Date.now();
  }
  init() {
    this.initFragPlayground(vert, frag);
    this.getAPosition('a_position');
    this.getUResolution('u_resolution');
  }
  draw() {
    this.getUTime('u_time');

    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(() => this.draw());
  }
}

export default RayMarch;
