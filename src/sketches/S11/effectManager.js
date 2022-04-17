import * as THREE from 'three';
import { UnrealBloomPass }  from './lib/UnrealBloomPass'
import PP from './lib/PostProcessor';

export const Layers = {
  DEFAULT: 0,
  BLOOM: 1,
};

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
      bloomStrength: 0.7,
      bloomThreshold: 0,
      bloomRadius: 0,
    };

    const { width, height } = this.context.canvas;
    const resolution = new THREE.Vector2(width, height);
    this.bloomPass = new UnrealBloomPass(resolution, 1.5, 0.4, 0.85);
    this.bloomPass.threshold = params.bloomThreshold;
    this.bloomPass.strength = params.bloomStrength;
    this.bloomPass.radius = params.bloomRadius;

    this.pp.composer.addPass(this.bloomPass);
  }

  render() {
    this.context.renderer.autoClear = false;
    this.context.renderer.clear();

    this.context.camera.layers.set(Layers.BLOOM);
    this.pp.render();

    this.context.renderer.clearDepth();
    this.context.camera.layers.set(Layers.DEFAULT);
    this.context.renderer.render(this.context.scene, this.context.camera);
  }
}
