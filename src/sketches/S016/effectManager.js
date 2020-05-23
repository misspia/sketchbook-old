import PP from '../postProcessor';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';

export default class EffectManager {
  constructor(context) {
    this.context = context;
    this.spectrumStart = context.spectrumStart;
    this.pp = new PP(this.context);
    this.audio = context.audio;

    this.glitchPass = {};
    this.bassAverages = [];
    this.bassThreshold = 24;
    this.isBassTriggered = false;

    this.init();
  }

  init() {
    this.glitchPass = new GlitchPass();
    this.pp.addPass(this.glitchPass);
  }

  update() {
    this.updateGlitch();
  }

  updateGlitch() {
    const { bass, midrange } = this.spectrumStart;

    let avg = 0;
    for(let i = bass; i < midrange; i++) {
      avg += this.context.audio.frequencyData[i];
    }
    avg /= (midrange - bass);

    this.bassAverages.push(avg);

    if(this.bassAverages.length !== 0) {
      const currAvgIndex = this.bassAverages.length - 1;
      const delta = this.bassAverages[currAvgIndex] - this.bassAverages[currAvgIndex - 1];
      if(delta > this.bassThreshold) {
        // console.debug('[BEAT]', delta);
        this.glitchPass.curF = 0;
        this.isBassTriggered = true;
      }

      // stop glitch
      if(this.glitchPass.curF >= 20 && this.isBassTriggered) {
        this.glitchPass.curF = 100; // no glitch at 100
      }
    }
  }

  render() {
    this.update();

    this.context.renderer.autoClear = false;
    this.context.renderer.clear();
    this.pp.render();
  }

}
