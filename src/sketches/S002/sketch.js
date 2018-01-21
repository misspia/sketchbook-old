import vert from './vertex.glsl'
import frag from './fragment.glsl'
import SketchManager from '../sketchManager.js'

class PaintSwirls extends SketchManager {
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

    this.setMouseMoveListener();
  }
  setStaticAttributes() {
    const aPosition = this.getAttribLocation(this.program, 'a_position');
    this.gl.enableVertexAttribArray(aPosition);
    this.gl.vertexAttribPointer(
      aPosition, 2,
      this.gl.FLOAT, this.gl.FALSE,
      2 * 4, 0
    )
  }
  setStaticUniforms() {
    const uResolution = this.getUniformLocation(this.program, 'u_resolution');
    this.gl.uniform2f(uResolution, this.canvas.width, this.canvas.height);
  }
  draw() {
    const deltaTime = (Date.now() - this.startTime) / 1000.0;
    const uTime = this.getUniformLocation(this.program, 'u_time');
    this.gl.uniform1f(uTime, deltaTime);

    const uMouse = this.getUniformLocation(this.program, 'u_mouse');
    this.gl.uniform2f(uMouse, this.mouse.x, this.mouse.y);

    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);

    requestAnimationFrame(() => this.draw());
  }
  render() {
    this.init();
    this.draw();
  }
}

export default PaintSwirls;
