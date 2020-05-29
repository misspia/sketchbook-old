import { Vector2 } from 'three';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import PP from '../postProcessor';

export default class EffectManager {
  constructor(context) {
    this.context = context;
    this.pp = new PP(this.context);

    this.bloomPass = {};

    this.init();
  }

  resize() {
    this.pp.resize();
  }
  init() {
    this.createBloom();
  }

  createBloom() {
    const params = {
      exposure: 1,
      bloomStrength: 0.3,
      bloomThreshold: 0,
      bloomRadius: 0,
    };

    const { width, height } = this.context.canvas;
    const resolution = new Vector2(width, height);
    this.bloomPass = new UnrealBloomPass(resolution, 1.5, 0.4, 0.85);
    this.bloomPass.threshold = params.bloomThreshold;
    this.bloomPass.strength = params.bloomStrength;
    this.bloomPass.radius = params.bloomRadius;

    this.pp.composer.addPass(this.bloomPass);

  }

  render() {
    this.context.renderer.autoClear = false;
    this.context.renderer.clear();
    this.pp.render();
  }
}
