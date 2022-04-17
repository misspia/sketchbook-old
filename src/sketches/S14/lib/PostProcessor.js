import { EffectComposer } from './EffectComposer'
import { RenderPass } from "./RenderPass"

export default class PostProcessor {
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
