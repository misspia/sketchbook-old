import * as THREE from 'three';
import * as PP from 'postprocessing';

import Ray from './ray';
import Petal from './petal';
import Butterfly from './butterfly';

import SketchManagerThree from '../sketchManagerThree';

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

    this.clock = new THREE.Clock();
    this.composer = {};
    this.effect = {};
  }
  unmount() {

  }
  init() {
    this.disableOrbitControls();
    this.setClearColor(0xeeeeff);
    this.setCameraPos(0, -this.cameraDistance, -this.cameraDistance);
    const { x, y, z } = this.sceneCenter;
    this.lookAt(x, y, z);
    this.createRays();
    this.createPetals();
    this.createButterflies();
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
      exposure: 0.4,
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
  createButterflies() {
    for(let i = 0; i < this.numButterflies; i++) {
      const butterfly = new Butterfly(this.cameraDistance, this.sceneCenter);
      this.scene.add(butterfly.group);
      this.butterflies.push(butterfly);
    }
  }
  draw() {
    this.composer.renderer.autoClear = true;
    this.composer.render(this.clock.getDelta());
    this.composer.renderer.autoClear = false;

    this.rays.forEach(ray => ray.update());
    this.petals.forEach(petal => petal.update());
    this.butterflies.forEach(butterfly => butterfly.update());

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
