import vert from './fluid.vert'
import frag from './fluid.frag'
import SketchManager from '../sketchManager.js'

class Fluid extends SketchManager {
  constructor(canvas) {
    super(canvas);

  }
  init() {
    this.vertShader = this.compileShader(vert, this.gl.VERTEX_SHADER);
    this.fragShader = this.compileShader(frag, this.gl.FRAGMENT_SHADER);
    this.program = this.createProgram(this.vertShader, this.fragShader);
  }
  render() {
    console.log('========= Fluid Sim =========');
  }
}

export default Fluid;
