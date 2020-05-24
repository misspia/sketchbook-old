import PP from '../postProcessor';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';

export default class EffectManager {
  constructor(context) {
    this.context = context;
    this.spectrumStart = context.spectrumStart;
    this.beatManager = context.beatManager;
    this.pp = new PP(this.context);
    this.audio = context.audio;

    this.glitchPass = {};
    this.isGlitchTriggered = false;

    this.init();
  }

  init() {
    this.glitchPass = new GlitchPass();
    // this.pp.addPass(this.glitchPass);
  }

  update() {
    // this.updateGlitch();
  }

  updateGlitch() {
    const { bassAverages, bassThreshold } = this.beatManager;
    if(bassAverages.length !== 0) {
      const currAvgIndex = bassAverages.length - 1;
      const delta = bassAverages[currAvgIndex] - bassAverages[currAvgIndex - 1];
      if(delta > bassThreshold) {
        this.glitchPass.curF = 0;
        this.isGlitchTriggered = true;
      }

      // stop glitch
      if(this.glitchPass.curF >= 20 && this.isGlitchTriggered) {
        this.glitchPass.curF = 100; // no glitch at 100
      }
    }
  }

  render() {
    this.context.renderer.autoClear = false;
    this.context.renderer.clear();
    this.pp.render();
  }
}
