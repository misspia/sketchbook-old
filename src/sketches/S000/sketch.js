import vert from './vertex.glsl'
import frag from './fragment.glsl'
import SketchManager from '../sketchManager'

class Metaballs extends SketchManager {
  constructor(canvas) {
    super(canvas);
    this.metaballs = [];
    this.numMetaballs = 10;
  }
  init() {
    this.initFragPlayground(vert, frag);

    this.getUResolution('u_resolution');
    this.getAPosition('a_position');
    this.generateMetaballs();
  }
  generateMetaballs()  {
    const smallestDimmension = this.getSmallestDimmension();
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
}

export default Metaballs;
