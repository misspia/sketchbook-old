import geometry from './geometry.vert'
import texture from './texture.frag'

let gl;

const Utils = {
      compileShader: (shaderSource, type) => {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, shaderSource);
        gl.compileShader(shader);

        if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          throw `Failed to compile shader: ${gl.getShaderInfoLog(shader)}`
        }
        return shader;
      },
      getAttribLocation(program, name) {
        const attribLocation = gl.getAttribLocation(program, name);
        if(attribLocation === -1) {
          throw `Cannot find attribute ${name}`;
        }
        return attribLocation;
      },
      getUniformLocation(program, name) {
        const uniformLocation = gl.getUniformLocation(program, name);
        if(uniformLocation === -1) {
          throw `Cannot find uniform ${name}`;
        }
        return uniformLocation;
      }
}

const canvasVertices = [
  -1.0, 1.0,
  -1.0, -1.0,
  1.0, 1.0,
  1.0, -1.0
];
const numMetaballs = 10;

const Sketch = (canvas) => {

  gl = canvas.getContext('webgl');
  console.log('======== metaball sketch ========', gl)

  const vertShader = Utils.compileShader(geometry, gl.VERTEX_SHADER);
  const fragShader = Utils.compileShader(texture, gl.FRAGMENT_SHADER);

  const program = gl.createProgram();
  gl.attachShader(program, vertShader);
  gl.attachShader(program, fragShader);
  gl.linkProgram(program);
  gl.useProgram(program);

  const vertData = new Float32Array(canvasVertices);

  const vertDataBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertDataBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertData, gl.STATIC_DRAW);

  // pass position attrib to shader
  const aPosition = Utils.getAttribLocation(program, 'position');
  gl.enableVertexAttribArray(aPosition);
  gl.vertexAttribPointer(
    aPosition, 2,
    gl.FLOAT, gl.FALSE,
    2 * 4, 0
  )

  const uDimmensions = Utils.getUniformLocation(program, 'u_dimmensions');
  gl.uniform2f(uDimmensions, canvas.width, canvas.height);

  let metaballs = [];
  for(let i = 0; i < numMetaballs; i ++) {
    const radius = Math.random() * 60 + 10;
    metaballs.push({
      x: Math.random() * (canvas.width - 2 * radius) + radius,
      y: Math.random() * (canvas.height - 2 * radius) + radius,
      r: radius
    })
  }

  const flattenedMetaballs = new Float32Array(3 * numMetaballs);
  for(let i = 0; i < numMetaballs; i ++) {
    const baseIndex = 3 * i;
    const ball = metaballs[i];
    flattenedMetaballs[baseIndex + 0] = ball.x;
    flattenedMetaballs[baseIndex + 1] = ball.y;
    flattenedMetaballs[baseIndex + 2] = ball.r;
  }
  const uMetaballs = Utils.getUniformLocation(program, 'u_metaballs');
  gl.uniform3fv(uMetaballs, flattenedMetaballs);


  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

export default Sketch;
