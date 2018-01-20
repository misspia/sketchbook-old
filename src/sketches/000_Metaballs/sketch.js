import vert from './metaball.vert'
import frag from './metaball.frag'
import SketchManager from '../sketchManager.js'

class Metaballs extends SketchManager {
  constructor(canvas) {
    super(canvas);
    this.metaballs = [];
    this.numMetaballs = 10;
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
    this.generateMetaballs();
  }
  setStaticAttributes() {
    const aPosition = this.getAttribLocation(this.program, 'position');
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
  generateMetaballs()  {
    const smallestDimmension = this.getSmallestDimmention();
    const maxRadius = smallestDimmension * 0.10;
    const minRadius = smallestDimmension * 0.02;
    for(let i = 0; i < this.numMetaballs; i ++) {
      const radius = this.getRandomRange(minRadius, maxRadius);
      this.metaballs.push({
        x: this.getRandomRange(radius, this.canvas.width - 2),
        y: this.getRandomRange(radius, this.canvas.height - 2),
        velX: this.getRandomRange(2, 8),
        velY: this.getRandomRange(2, 8),
        r: radius
      })
    }
  }
  draw() {
    this.updateMetaballs()

    const vectorSize = 3;
    const flattenedMetaballs = new Float32Array(vectorSize * this.numMetaballs);

    this.metaballs.forEach((ball, index) => {
      const baseIndex = vectorSize * index;
      flattenedMetaballs[baseIndex + 0] = ball.x;
      flattenedMetaballs[baseIndex + 1] = ball.y;
      flattenedMetaballs[baseIndex + 2] = ball.r;
    })

    const uMetaballs = this.getUniformLocation(this.program, 'u_metaballs');
    this.gl.uniform3fv(uMetaballs, flattenedMetaballs);

    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(() => this.draw());
  };
  updateMetaballs() {
    this.metaballs.map(ball => {
      ball.x += ball.velX;
      ball.y += ball.velY;

      if(ball.x - ball.r < 0) {
        ball.x = ball.r + 1;
        ball.velX = Math.abs(ball.velX);
      } else if(ball.x + ball.r > this.canvas.width) {
        ball.x = this.canvas.width - ball.r;
        ball.velX = -Math.abs(ball.velX);
      }
      if(ball.y - ball.r < 0) {
        ball.y = ball.r + 1;
        ball.velY = Math.abs(ball.velY);
      } else if(ball.y + ball.r > this.canvas.height) {
        ball.y = this.canvas.height - ball.r;
        ball.velY = -Math.abs(ball.velY);
      }
    })
  }
  render() {
    this.init()
    this.draw();
  }
}

export default Metaballs;
