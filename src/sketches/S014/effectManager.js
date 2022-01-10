// import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass';
import PP from '../postProcessor';
import { Layers } from "./constants"
import { AfterimagePass } from "./afterimagePass"

/**
 * https://github.com/mrdoob/three.js/blob/master/examples/webgl_postprocessing_afterimage.html
 */

export default class EffectManager {
  constructor(context) {
    this.context = context;
    this.pp = new PP(this.context);
    this.bloomPass = {};

    this.init();
  }

  onResize(width, height) {
    this.pp.resize(width, height);
  }
  init() {
    this.createAfterImage();
  }

  createAfterImage() {
    this.afterImagePass = new AfterimagePass();

    // this.afterImagePass.uniforms["damp"].value = 0.5

    this.pp.composer.addPass(this.afterImagePass);
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
