import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';

export class PostProcessor {
  constructor(context) {
    this.context = context;
    this.composer = new EffectComposer(context.renderer);
    this.addPass(new RenderPass(context.scene, context.camera));
  }

  resize(width, height) {
    this.composer.setSize(width, height);
  }

  addPass(pass) {
    this.composer.addPass(pass);
  }

  render() {
    this.composer.render();
  }
}
