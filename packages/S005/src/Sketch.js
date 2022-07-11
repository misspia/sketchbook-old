import vert from './vertex.glsl'
import frag from './fragment.glsl'
import { SketchManager } from './SketchManager.js'

import { TextureA, TextureB } from './assets'

export class Sketch extends SketchManager {
  constructor(canvas) {
    super(canvas);
    this.startTime = Date.now();
  }
  init() {
    const imageSources = [TextureA, TextureB];
    this.loadImages(imageSources, () => this.renderImages());
  }
  renderImages() {
    this.vertShader = this.compileShader(vert, this.gl.VERTEX_SHADER);
    this.fragShader = this.compileShader(frag, this.gl.FRAGMENT_SHADER);
    this.program = this.createProgram(this.vertShader, this.fragShader);

    const positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);

    this.setRectangle(0, 0, this.canvas.width, this.canvas.height);

    this.getAPosition('a_position');
    this.getATexCoord('a_texCoord');

    this.getUResolution('u_resolution');
    this.getUImages(['u_image0', 'u_image1']);
    this.setMouseMoveListener();
    this.draw();
  }
  setRectangle(x, y, width, height) {
    const x1 = x;
    const x2 = x + width;
    const y1 = y;
    const y2 = y + height;
    const rectVertices = [
       x1, y1,  x2, y1,
       x1, y2,  x1, y2,
       x2, y1,  x2, y2,
    ];
    const vertData = new Float32Array(rectVertices);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, vertData, this.gl.STATIC_DRAW);
  }
  getATexCoord(name) {
    const texcoordLocation = this.getAttribLocation(this.program, name);
    const texcoordBuffer = this.gl.createBuffer();

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, texcoordBuffer);
    const textureVertices = [
        0.0,  0.0,    1.0,  0.0,
        0.0,  1.0,    0.0,  1.0,
        1.0,  0.0,    1.0,  1.0,
    ];
    const textureData = new Float32Array(textureVertices);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, textureData, this.gl.STATIC_DRAW);

    this.gl.enableVertexAttribArray(texcoordLocation);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, texcoordBuffer);

    this.gl.vertexAttribPointer(texcoordLocation, 2, this.gl.FLOAT, false, 0, 0)
  }
  getUImages(names) {
    let textures = [];

    this.images.forEach( image => {
      const texture = this.createTexture(image);
      textures.push(texture);
    })

    var uImage0Location = this.getUniformLocation(this.program, names[0]);
    var uImage1Location = this.getUniformLocation(this.program, names[1]);

    //set texture units
    this.gl.uniform1i(uImage0Location, 0);
    this.gl.uniform1i(uImage1Location, 1);

    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_2D, textures[0]);

    this.gl.activeTexture(this.gl.TEXTURE1);
    this.gl.bindTexture(this.gl.TEXTURE_2D, textures[1]);
  }
  createTexture(image) {
    const texture = this.gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
    return texture;
  }
  draw() {
    this.getUMouse('u_mouse');

    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);

    requestAnimationFrame(() => this.draw());
  }
  render() {
    this.init();
  }
}
