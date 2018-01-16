import vert from './fluid.vert'
import frag from './fluid.frag'
import SketchManager from '../sketchManager.js'

class Fluid extends SketchManager {
  constructor(canvas) {
    super(canvas);

  }
  init() {

  }
  render() {
    console.log('========= Fluid Sim =========');
  }
}

export default Fluid;
