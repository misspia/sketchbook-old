import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';

export default class PostProcessor {
  constructor(context) {
    this.composer = new EffectComposer(context.renderer);
    this.addPass(new RenderPass(context.scene, context.camera));
  }

  resize() {
    this.composer.setSize(
      this.context.canvas.width,
      this.context.canvas.height,
    );
  }

  addPass(pass) {
    this.composer.addPass(pass);
  }

  render() {
    this.composer.render();
  }
}
