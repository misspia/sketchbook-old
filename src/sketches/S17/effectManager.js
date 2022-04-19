import * as THREE from 'three'
import PP from './lib/postProcessor';

import { OutlinePass }  from './lib/OutlinePass'

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
    this.outlinePass = new OutlinePass(
      new THREE.Vector2(this.context.canvas.width, this.context.canvas.height),
      this.context.scene,
      this.context.camera,
    )
    this.outlinePass.visibleEdgeColor.set('#111111') 
    this.outlinePass.hiddenEdgeColor.set('#ff0000') 
    this.outlinePass.edgeStrength = 10
    this.outlinePass.edgeThickness = 4

    this.pp.composer.addPass(this.outlinePass)
  }

  setOutlinedObjects(objects = []) {
    this.outlinePass.selectedObjects = objects
  }

  update() {

  }

  render() {
    this.context.renderer.autoClear = false;
    this.context.renderer.clear();
    this.pp.render();
  }
}
