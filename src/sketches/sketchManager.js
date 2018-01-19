class Sketch {
  constructor(canvas) {
    this.canvas = canvas;
    this.gl = canvas.getContext('webgl');
    this.program = {};
    this.vertShader = {};
    this.fragShader = {};
    this.mouse = {};
  }
  clear() {
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }
  resize(width, height) {
    this.gl.viewport(
      0, 0,
      this.gl.drawingBufferWidth,
      this.gl.drawingBufferHeight
    );
  }
  getRandomRange(min, max) {
    return Math.random() * (max - min) + min;
  }
  getSmallestDimmention() {
    return this.canvas.width > this.canvas.height ? this.canvas.width : this.canvas.height;
  }
  setMouseMoveListener(e) {
    this.canvas.addEventListener('mousemove', e => {
      this.mouse = {
        x: e.clientX ? e.clientX : 0.0,
        y: e.clientY ? e.clientY : 0.0
      }
    })
  }
  addMouseListener(e) {
    // window.addEventListener('mousemove', e);
  }
  createProgram(vertShader, fragShader) {
    const program = this.gl.createProgram();
    this.gl.attachShader(program, vertShader);
    this.gl.attachShader(program, fragShader);
    this.gl.linkProgram(program);
    this.gl.useProgram(program);
    return program;
  }
  compileShader(shaderSource, type) {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, shaderSource);
    this.gl.compileShader(shader);

    if(!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      throw `Failed to compile shader: ${this.gl.getShaderInfoLog(shader)}`
    }
    return shader;
  }
  getAttribLocation(program, name) {
    const attribLocation = this.gl.getAttribLocation(program, name);
    if(attribLocation === -1) {
      throw `Cannot find attribute ${name}`;
    }
    return attribLocation;
  }
  getUniformLocation(program, name) {
    const uniformLocation = this.gl.getUniformLocation(program, name);
    if(uniformLocation === -1) {
      throw `Cannot find uniform ${name}`;
    }
    return uniformLocation;
  }
}

export default Sketch;
