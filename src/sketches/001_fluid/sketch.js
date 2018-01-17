import vert from './fluid.vert'
import frag from './fluid.frag'
import SketchManager from '../sketchManager.js'

class ParticleSystem extends SketchManager {
  constructor(canvas) {
    super(canvas);

    this.numParticles = 48000;
    this.particleVert = new Float32Array(this.numParticles * 2);
    this.startTime = Date.now();
  }
  init() {
    this.initParticles();

    const particleVertBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, particleVertBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.particleVert, this.gl.STATIC_DRAW);

    this.vertShader = this.compileShader(vert, this.gl.VERTEX_SHADER);
    this.fragShader = this.compileShader(frag, this.gl.FRAGMENT_SHADER);

    this.program = this.createProgram(this.vertShader, this.fragShader);

    const aVertex = this.gl.getAttribLocation(this.program,'a_vertex');
    this.gl.enableVertexAttribArray(aVertex);
    this.gl.vertexAttribPointer(particleVertBuffer, 2, this.gl.FLOAT, false, 4, 0);

    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA);

    this.gl.disable(this.gl.DEPTH_TEST);

    this.gl.clearColor(0,0,0,1);

  }
  initParticles() {
    let i = this.particleVert.length;
    while (i--) {
      this.particleVert[i] = 0;
      while (this.particleVert[i]*this.particleVert[i] < 0.3) {
        this.particleVert[i] = Math.random()*2-1;
      }
    }
  }
  draw() {
    const uTime = this.gl.getUniformLocation(this.program, 'u_time');
    const deltaTime = Date.now() - this.startTime;

    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.uniform1f(uTime, deltaTime / 30000.);
    this.gl.drawArrays(this.gl.POINTS, 0, this.numParticles);

    requestAnimationFrame(() => this.draw());

  }
  render() {
    console.log('========= Particle sim =========');
    this.init();
    this.draw();
  }
}


export default ParticleSystem;
