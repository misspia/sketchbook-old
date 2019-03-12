import * as THREE from 'three';
import glsl from 'glslify';

import Ray from './ray';
import Petal from './petal';

// https://codepen.io/alexandrejosephdev/pen/yVvqWr

import SketchManagerThree from '../sketchManagerThree';

 class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);

    this.cameraDistance = 100;
    this.sceneCenter = { x: 0, y: 0, z: 0 };

    this.numRays = 10;
    this.numPetals = 20;
    this.rays = [];
    this.petals = [];
  }
  unmount() {

  }
  init() {
    // this.setCameraPos(0, -100, -this.cameraDistance);
    this.setClearColor(0xddeedd);
    this.setCameraPos(0, -this.cameraDistance, 0);

    const { x, y, z } = this.sceneCenter;
    this.lookAt(x, y, z);
    this.createRays();
    this.createPetals();
    this.createOrb();
  }
  createRays() {
    for(let i = 0; i < this.numRays; i ++) {
      const ray = new Ray(this.cameraDistance, this.sceneCenter);
      this.scene.add(ray.mesh);
      this.rays.push(ray);
    }
  }
  createPetals() {
    for(let i = 0; i < this.numPetals; i++) {
      const petal = new Petal(this.cameraDistance, this.sceneCenter);
      this.scene.add(petal.mesh);
      this.petals.push(petal);
    }
  }
  createOrb() {

  }
  draw() {
    this.renderer.render(this.scene, this.camera);
    
    this.rays.forEach(ray => ray.update());
    this.petals.forEach(petal => petal.update())

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
