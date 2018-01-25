import vert from './vertex.glsl'
import frag from './fragment.glsl'
import SketchManager from '../sketchManager.js'

class GradientBlobs extends SketchManager {
  constructor(canvas) {
    super(canvas);
    this.startTime = Date.now();
  }
  init() {
    this.initFragPlayground(vert, frag);
    this.getAPosition('a_position');
    this.getUResolution('u_resolution');

    this.setMouseMoveListener();
  }
  draw() {
    this.getUTime('u_time');
    this.getUMouse('u_mouse');

    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);

    requestAnimationFrame(() => this.draw());
  }
  render() {
    this.init();
    this.draw();
  }
}

export default GradientBlobs;