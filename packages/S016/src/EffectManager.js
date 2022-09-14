import { NodePass } from 'three/examples/jsm/nodes/postprocessing/NodePass';
import * as Nodes from 'three/examples/jsm/nodes/Nodes';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';
import { PostProcessor } from './PostProcessor';

export class EffectManager {
  constructor(context) {
    this.context = context;
    this.spectrumStart = context.spectrumStart;
    this.beatManager = context.beatManager;
    this.pp = new PostProcessor(this.context);
    this.audio = context.audio;

    this.glitchPass = {};
    this.glitchThreshold = 24;
    this.isGlitchTriggered = false;

    this.nodePass = {};

    this.minContrast = 1;
    this.maxContrast = 2;
    this.contrast = {};
    this.contrastNode = {};

    this.minBrightness = 0;
    this.maxBrightness = 0.5;
    this.brightness = {};
    this.brightnessNode = {};

    this.blendThreshold = 170;
    this.dropThreshold = -4.2;

    this.init();
  }

  init() {
    this.glitchPass = new GlitchPass();
    this.pp.addPass(this.glitchPass);

    this.nodePass = new NodePass();

    const screen = new Nodes.ScreenNode();
    this.brightness = new Nodes.FloatNode(0);
    this.contrast = new Nodes.FloatNode(1);

    this.brightnessNode = new Nodes.ColorAdjustmentNode(screen, this.brightness, Nodes.ColorAdjustmentNode.BRIGHTNESS);
    this.contrastNode = new Nodes.ColorAdjustmentNode(this.brightnessNode, this.contrast, Nodes.ColorAdjustmentNode.CONTRAST);

    this.nodePass.input = this.contrastNode;
    this.pp.addPass(this.nodePass);

    this.contrast.value = 1;
    this.brightness.value = 0;
  }

  update() {
    this.updateGlitch();
    this.updateBlend();
    this.updateDrop();
  }

  updateGlitch() {
    const { bassAverages } = this.beatManager;
    if (bassAverages.length !== 0) {
      const currAvgIndex = bassAverages.length - 1;
      const delta = bassAverages[currAvgIndex] - bassAverages[currAvgIndex - 1];
      if (delta > this.glitchThreshold) {
        this.glitchPass.curF = 0;
        this.isGlitchTriggered = true;
      }

      // stop glitch
      if (this.glitchPass.curF >= 20 && this.isGlitchTriggered) {
        this.glitchPass.curF = 100; // no glitch at 100
      }
    }
  }

  updateBlend() {
    const { midrangeAverages } = this.beatManager;
    if (midrangeAverages.length === 0) {
      return;
    }

    const average = midrangeAverages[midrangeAverages.length - 1]
    if (average > this.blendThreshold) {
      this.contrast.value = 1, 5;
      this.brightness.value = 0.2;
    } else {
      this.contrast.value = 1;
      this.brightness.value = 0;
    }
  }

  updateDrop() {
    const { bassAverages } = this.beatManager;
    if (bassAverages.length === 0) {
      return;
    }
    const currIndex = bassAverages.length - 1;
    const delta = bassAverages[currIndex] - bassAverages[currIndex - 1];

    if(delta < this.dropThreshold) {
      this.brightness.value = 0;
      this.contrast.value = 0.1;
    }
  }

  render() {
    this.context.renderer.autoClear = false;
    this.context.renderer.clear();
    this.pp.render();
  }
}
