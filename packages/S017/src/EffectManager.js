import * as THREE from 'three'
import { NodePass } from 'three/examples/jsm/nodes/postprocessing/NodePass';
import * as Nodes from 'three/examples/jsm/nodes/Nodes';
import { PostProcessor } from './PostProcessor';
import  { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'

/**
 * https://discourse.threejs.org/t/post-processing-outline-error/1081/2
 * https://discourse.threejs.org/t/why-outline-do-not-support-black-color/4993/6
 * https://github.com/mrdoob/three.js/blob/master/examples/jsm/postprocessing/OutlinePass.js
 * https://github.com/mrdoob/three.js/blob/master/examples/webgl_postprocessing_outline.html
 */
export class EffectManager {
  constructor(context) {
    this.context = context;
    this.spectrumStart = context.spectrumStart;
    this.beatManager = context.beatManager;
    this.pp = new PostProcessor(this.context);
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
