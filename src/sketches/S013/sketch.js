import * as THREE from 'three';
import * as PP from 'postprocessing';
import glsl from 'glslify';

import Ray from './ray';
import Petal from './petal';
import Orb from './orb';

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

    this.clock = new THREE.Clock();
    this.composer = {};
    this.effect = {};
  }
  unmount() {

  }
  init() {
    // this.setClearColor(0xddeedd);
    this.setClearColor(0xeeeeff);
    this.setCameraPos(0, -100, -this.cameraDistance);
    // this.setCameraPos(0, -this.cameraDistance, 0);

    const { x, y, z } = this.sceneCenter;
    this.lookAt(x, y, z);
    this.createRays();
    this.createPetals();
    // this.createOrb();
    this.createEffects();
  }
  createEffects() {
    const light = new THREE.PointLight(0x0088ff, 0.01, 1);
    light.castShadow = true;
    this.scene.add(light);
  
    this.composer = new PP.EffectComposer(this.renderer);
    this.renderPass = new PP.RenderPass(this.scene, this.camera, 0x111111);   
  
    const options = { 
      density: 0.1,
      weight: 0.1,
      exposure: 0.5,
      // blendFunction: PP.BlendFunction.OVERLAY,
    };
    
    const godraysEffect = new PP.GodRaysEffect(
      this.scene,
      this.camera,
      light,
      options
    );
    const godraysPass = new PP.EffectPass(this.camera, godraysEffect);
    godraysPass.renderToScreen = true;
  
    this.composer.addPass(this.renderPass);
    this.composer.addPass(godraysPass);
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
    this.orb = new Orb();

    this.scene.add(this.orb.mesh)
  }
  draw() {
    this.composer.renderer.autoClear = true;
    this.composer.render(this.clock.getDelta());
    this.composer.renderer.autoClear = false;

    this.rays.forEach(ray => ray.update());
    this.petals.forEach(petal => petal.update())

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
