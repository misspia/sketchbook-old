import * as THREE from 'three';
import glsl from 'glslify';

import Line from './line';
import Feather from './feather';

// https://codepen.io/alexandrejosephdev/pen/yVvqWr

import SketchManagerThree from '../sketchManagerThree';

 class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);

    this.cameraDistance = 100;

    this.numLines = 10;
    this.numFeathers = 15;
    this.lines = [];
    this.feathers = [];
  }
  unmount() {

  }
  init() {
    // this.setCameraPos(0, -100, -this.cameraDistance);
    this.setClearColor(0xddeedd);
    this.setCameraPos(0, -this.cameraDistance, 0);
    this.lookAt(0, 0, 0);
    this.createLines();
    this.createFeathers();
    this.createCenterPiece();
  }
  createLines() {
    const center = { x: 0, y: 0, z: 0 };

    for(let i = 0; i < this.numLines; i ++) {
      const line = new Line(this.cameraDistance, center);
      this.scene.add(line.mesh);
      this.lines.push(line);
    }
  }
  createFeathers() {
    for(let i = 0; i < this.numFeathers; i++) {
      const feather = new Feather(this.cameraDistance);
      this.scene.add(feather.mesh);
      this.feathers.push(feather);
    }
  }
  createCenterPiece() {

  }
  draw() {
    this.renderer.render(this.scene, this.camera);
    
    this.lines.forEach(line => line.update());
    this.feathers.forEach(feather => feather.update())

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
