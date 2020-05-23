import PP from '../postProcessor';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';

export default class EffectManager {
  constructor(context) {
    this.context = context;
    this.spectrumStart = context.spectrumStart;
    this.pp = new PP(this.context);

    this.glitchPass = {};

    this.init();
  }

  init() {
    this.glitchPass = new GlitchPass();
    this.pp.addPass(this.glitchPass);
  }

  update() {
    // console.debug(this.glitchPass.curF)
    this.glitchPass.curF = 100;
    // this.context.audio.frequencyData.forEach(() => {

    // });
  }

  render() {
    this.update();

    this.context.renderer.autoClear = false;
    this.context.renderer.clear();
    this.pp.render();
  }

}
