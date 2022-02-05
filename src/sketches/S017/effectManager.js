import { NodePass } from 'three/examples/jsm/nodes/postprocessing/NodePass';
import * as Nodes from 'three/examples/jsm/nodes/Nodes';
import PP from '../postProcessor';

export default class EffectManager {
  constructor(context) {
    this.context = context;
    this.spectrumStart = context.spectrumStart;
    this.beatManager = context.beatManager;
    this.pp = new PP(this.context);
    this.audio = context.audio;

    this.init();
  }

  init() {

  }

  update() {

  }

  render() {
    this.context.renderer.autoClear = false;
    this.context.renderer.clear();
    this.pp.render();
  }
}
