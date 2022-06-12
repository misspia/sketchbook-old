import vert from './vertex.glsl'
import frag from './fragment.glsl'
import { SketchManager } from './SketchManager'

export class Sketch extends SketchManager {
  constructor(canvas) {
    super(canvas);

    this.numParticles = 30000;
    this.particleVert = new Float32Array(this.numParticles * 2);
    this.particleVertBuffer = {};
    this.startTime = Date.now();
  }
  init() {
    this.generateParticles();

    this.particleVertBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.particleVertBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.particleVert, this.gl.STATIC_DRAW);

    this.vertShader = this.compileShader(vert, this.gl.VERTEX_SHADER);
    this.fragShader = this.compileShader(frag, this.gl.FRAGMENT_SHADER);
    this.program = this.createProgram(this.vertShader, this.fragShader);

    this.setStaticAttributes();

    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.disable(this.gl.DEPTH_TEST);

    this.gl.clearColor(0.1, 0.1, 0.12, 1.0);
  }
  generateParticles() {
    let i = this.particleVert.length;
    while (i--) {
      this.particleVert[i] = 0;
      while (Math.pow(this.particleVert[i], 2) < 0.3) {
        this.particleVert[i] = this.getRandomRange(-1, 1);
      }
    }
  }
  setStaticAttributes() {
    const aPosition = this.gl.getAttribLocation(this.program,'a_position');
    this.gl.enableVertexAttribArray(aPosition);
    this.gl.vertexAttribPointer(this.particleVertBuffer, 2, this.gl.FLOAT, false, 4, 0);
  }
  draw() {
    const deltaTime = (Date.now() - this.startTime) / 3000.0;

    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    const uTime = this.gl.getUniformLocation(this.program, 'u_time');
    this.gl.uniform1f(uTime, deltaTime);

    this.gl.drawArrays(this.gl.POINTS, 0, this.numParticles);

    requestAnimationFrame(() => this.draw());
  }
}
