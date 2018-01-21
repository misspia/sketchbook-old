import vert from './vertex.glsl'
import frag from './fragment.glsl'
import SketchManager from '../sketchManager.js'

class RayMarch extends SketchManager {
  constructor(canvas) {
    super(canvas);
    this.startTime = Date.now();
  }
  init() {
    this.vertShader = this.compileShader(vert, this.gl.VERTEX_SHADER);
    this.fragShader = this.compileShader(frag, this.gl.FRAGMENT_SHADER);

    this.program = this.createProgram(this.vertShader, this.fragShader);
    const canvasVertices = [
      -1.0, 1.0,
      -1.0, -1.0,
      1.0, 1.0,
      1.0, -1.0
    ];
    const vertData = new Float32Array(canvasVertices);
    const vertDataBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertDataBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, vertData, this.gl.STATIC_DRAW);

    this.setStaticAttributes();
    this.setStaticUniforms();
  }
  setStaticAttributes() {
    this.getAPosition('a_position');
  }
  setStaticUniforms() {
    this.getUResolution('u_resolution');
  }
  draw() {
    this.getUTime('u_time');

    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(() => this.draw());
  }
  render() {
    this.init();
    this.draw();
  }
}

export default RayMarch;
