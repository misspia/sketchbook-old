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
  initFragPlayground(vert, frag) {
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

  // common attributes / uniforms
  getAPosition(name='a_position') {
    const aPosition = this.getAttribLocation(this.program, 'a_position');
    this.gl.enableVertexAttribArray(aPosition);
    this.gl.vertexAttribPointer(
      aPosition, 2,
      this.gl.FLOAT, this.gl.FALSE,
      2 * 4, 0
    )
  }
  getUResolution(name='u_resolution') {
    const uResolution = this.getUniformLocation(this.program, 'u_resolution');
    this.gl.uniform2f(uResolution, this.canvas.width, this.canvas.height);
  }
  getUTime(name='u_time') {
    const deltaTime = (Date.now() - this.startTime) / 1000.0;
    const uTime = this.getUniformLocation(this.program, 'u_time');
    this.gl.uniform1f(uTime, deltaTime);
  }
  getUMouse(name='u_mouse') { //   setMouseMoveListener
    const uMouse = this.getUniformLocation(this.program, 'u_mouse');
    this.gl.uniform2f(uMouse, this.mouse.x, this.mouse.y);
  }

}

export default Sketch;