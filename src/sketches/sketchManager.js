// const Utils = {
//   createProgram: (vertShader, fragShader) => {
//     const program = gl.createProgram();
//     gl.attachShader(program, vertShader);
//     gl.attachShader(program, fragShader);
//     gl.linkProgram(program);
//     gl.useProgram(program);
//     return program;
//   },
//   compileShader: (shaderSource, type) => {
//     const shader = gl.createShader(type);
//     gl.shaderSource(shader, shaderSource);
//     gl.compileShader(shader);
//
//     if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
//       throw `Failed to compile shader: ${gl.getShaderInfoLog(shader)}`
//     }
//     return shader;
//   },
//   getAttribLocation(program, name) {
//     const attribLocation = gl.getAttribLocation(program, name);
//     if(attribLocation === -1) {
//       throw `Cannot find attribute ${name}`;
//     }
//     return attribLocation;
//   },
//   getUniformLocation(program, name) {
//     const uniformLocation = gl.getUniformLocation(program, name);
//     if(uniformLocation === -1) {
//       throw `Cannot find uniform ${name}`;
//     }
//     return uniformLocation;
//   }
// }


class Sketch {
  constructor(canvas) {
    this.canvas = canvas;
    this.gl = canvas.getContext('webgl');
    this.program = {};
    this.vertShader = {};
    this.fragShader = {};
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
