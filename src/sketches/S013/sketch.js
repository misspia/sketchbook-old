import * as THREE from 'three';

import Ray from './ray';
import Petal from './petal';
import Butterfly from './butterfly';
import EffectManager from './effectManager';

import SketchManagerThree from '../sketchManagerThree';

/**
 * http://learningthreejs.com/blog/2013/08/02/how-to-do-a-procedural-city-in-100lines/
 * https://steemit.com/utopian-io/@clayjohn/learning-3d-graphics-with-three-js-or-procedural-geometry
 */
 class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);

    this.cameraDistance = 100;
    this.sceneCenter = { x: 0, y: 0, z: 0 };

    this.numRays = 10;
    this.numPetals = 24;
    this.numButterflies = 5;
    this.rays = [];
    this.petals = [];
    this.butterflies = [];
  }

  unmount() {
    this.rays.forEach(ray => ray.dispose());
    this.petals.forEach(petal => petal.dispose());
    this.butterflies.forEach(butterfly => butterfly.dispose());
    this.clearScene();
  }

  init() {
    this.disableOrbitControls();
    this.setClearColor(0xffffff);
    this.setCameraPos(0, -this.cameraDistance, -this.cameraDistance);
    const { x, y, z } = this.sceneCenter;
    this.lookAt(x, y, z);
    this.createRays();
    this.createPetals();
    this.createButterflies();
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
  createButterflies() {
    for(let i = 0; i < this.numButterflies; i++) {
      const butterfly = new Butterfly(this.cameraDistance, this.sceneCenter);
      this.scene.add(butterfly.group);
      this.butterflies.push(butterfly);
    }
  }
  draw() {
    this.renderer.render(this.scene, this.camera);
    this.rays.forEach(ray => ray.update());
    this.petals.forEach(petal => petal.update());
    this.butterflies.forEach(butterfly => butterfly.update());

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
