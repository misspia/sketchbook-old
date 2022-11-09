import * as THREE from 'three';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { GodRaysFakeSunShader, GodRaysDepthMaskShader, GodRaysCombineShader, GodRaysGenerateShader } from 'three/examples/jsm/shaders/GodRaysShader.js';

import { PostProcessor } from './PostProcessor';
import { Layers } from "./constants"

/**
 * https://github.com/mrdoob/three.js/blob/master/examples/webgl_postprocessing_afterimage.html
 */

export class EffectManager {
  constructor(context) {
    this.context = context;
    this.pp = new PostProcessor(this.context);
    this.bloomPass = null;
    this.afterImagePass = null;
    this.init();
  }

  onResize(width, height) {
    this.pp.resize(width, height);
  }
  init() {
    this.afterImagePass = new AfterimagePass(0.6);
    this.pp.composer.addPass(this.afterImagePass);

    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    this.bloomPass.strength = 1.5;
    this.bloomPass.radius = 0;
    this.bloomPass.threshold = 0;
    this.pp.composer.addPass(this.bloomPass)

  }

  initGodRays() {
    // https://github.com/mrdoob/three.js/blob/master/examples/webgl_postprocessing_godrays.html
  }

  update() {

  }

  render() {
    this.context.renderer.autoClear = false;
    this.context.renderer.clear();

    this.context.camera.layers.set(Layers.AFTERIMAGE);
    this.pp.render();

    this.context.renderer.clearDepth();
    this.context.camera.layers.set(Layers.DEFAULT);


    this.context.renderer.render(this.context.scene, this.context.camera);
  }
}
