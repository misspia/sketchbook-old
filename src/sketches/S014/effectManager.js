import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass';
import PP from '../postProcessor';
import { Layers } from "./constants"


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
