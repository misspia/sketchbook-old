import * as THREE from 'three';
import * as PP from 'postprocessing';
import SketchManagerThree from '../sketchManagerThree';

import haloFrag from './halo.frag';
import haloVert from './halo.vert';
import outlineFrag from './outline.frag';
import outlineVert from './outline.vert';
import utils from '../utils';
import Petal from './petal';

import Environment from './environment';
import Pyramid from './pyramid';
import EffectManager from './effectManager';

/**
 * Inspo: https://i.redd.it/5u2xbx7eo9721.jpg
 * https://twitter.com/mattdesl/status/1079879696978927616
 */

const config = {
  fog: new THREE.FogExp2(0x111111, 0.011),
}

 class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas, null, config);
    this.clock = new THREE.Clock();
    this.composer = {};

    this.environment = new Environment(this.renderer);
    this.pyramid = new Pyramid(this.environment);
    this.effectManager = new EffectManager(this);
    this.outlilneMaterial = {};

    this.halo = {};

    this.petals = [];
    this.numPetals = 25;
  }
  unmount() {

  }
  init() {
    this.setClearColor(0x111111);
    this.setCameraPos(-9, -17, 94);

    this.lookAt(0, 0, 0, 0);

    this.pyramid.position.set(0, 5, 0);
    this.scene.add(this.pyramid.pivot)

    this.createHalo();
    this.createPetals();
    this.createEffects();
  }
  createEffects() {
    this.composer = new PP.EffectComposer(this.renderer);
    this.renderPass = new PP.RenderPass(this.scene, this.camera, 0x111111);

    const bloomPass = new PP.EffectPass(this.camera, new PP.BloomEffect());
    bloomPass.renderToScreen = true;

    this.composer.addPass(this.renderPass);
    this.composer.addPass(bloomPass);
  }
  createHalo() {
    const geometry = new THREE.TorusGeometry( 45, 0.6, 15, 90 );
    geometry.computeFlatVertexNormals();
    this.haloMaterial = new THREE.RawShaderMaterial({
      uniforms: {
        uTime: { type: 'f', value: 0.0 },
        fogColor: { type: 'c', value: this.scene.fog.color },
        fogDensity: { type: 'f', value: this.scene.fog.density },
      },
      vertexShader: haloVert,
      fragmentShader: haloFrag,
      transparent: true,
    });
    this.halo = new THREE.Mesh(geometry, this.haloMaterial);
    this.halo.rotateX(utils.toRadians(90));

    this.halo.position.set(0, -25, 0);
    this.scene.add(this.halo);
  }

  createPetals() {
    for(let i = 0; i < this.numPetals; i++) {
      const petal = new Petal({x: 0, y: 0, z: 0}, this.composer);
      this.petals.push(petal);
      this.scene.add(petal.mesh);
    }
  }
  updatePetals() {
    this.petals.forEach(petal => petal.update());
  }
  draw() {
    // this.updatePetals();
    // this.haloMaterial.uniforms.uTime.value = this.clock.getElapsedTime();
    // this.pyramid.rotation.y += 0.001;

    this.effectManager.render();
    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
