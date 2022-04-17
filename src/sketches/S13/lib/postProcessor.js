import dynamic from 'next/dynamic'
const { EffectComposer } = dynamic(() => import('three/examples/jsm/postprocessing/EffectComposer'), {
  ssr: false,
})
const { RenderPass } = dynamic(() => import('three/examples/jsm/postprocessing/RenderPass'), {
ssr: false,
})

console.debug(EffectComposer)
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';

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
