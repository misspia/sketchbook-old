import * as THREE from 'three';
import {
  GodRaysFakeSunShader,
  GodRaysDepthMaskShader,
  GodRaysCombineShader,
  GodRaysGenerateShader
} from 'three/examples/jsm/shaders/GodRaysShader';

import PP from '../postProcessor';

/**
 * https://github.com/mrdoob/three.js/blob/master/examples/webgl_postprocessing_godrays.html
 * http://learningthreejs.com/blog/2013/08/02/how-to-do-a-procedural-city-in-100lines/
 * https://steemit.com/utopian-io/@clayjohn/learning-3d-graphics-with-three-js-or-procedural-geometry
 */
export default class EffectManager {
  constructor(context) {
    this.context = context;
    this.pp = new PP(this.context);
  }

  init() {

  }

  update() {

  }

  render() {
    this.context.renderer.autoClear = false;
    this.context.renderer.clear();
    this.pp.render();
  }
}
