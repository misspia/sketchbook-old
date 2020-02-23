import { EffectComposer } from 'three/examples/js/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/js/postprocessing/RenderPass';

export default class PostProcessor {
  constructor(context) {
    this.composer = new EffectComposer(context.camera);
    this.add(new RenderPass(context.scene, context.camera));
  }

  add(pass) {
    this.composer.addPass(pass);
  }
}
