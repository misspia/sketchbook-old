import * as THREE from 'three';
import * as PP from 'postprocessing';
import SketchManagerThree from '../sketchManagerThree';
import { Audio } from '../../themes/themes';
import Bar from './bar';
import utils from '../utils';

/**
 * https://github.com/mattdesl/codevember/blob/gh-pages/src/21.js
 * https://www.pinterest.ca/pin/567101778077936381/
 * https://codepen.io/ykob/pen/qbwLaY?editors=0010
 * 
 * beat
 * https://codepen.io/mnmxmx/pen/mmZbPK?editors=1010
 * 
 * https://twitter.com/mattdesl/status/1096078717779169280
 */
class Sketch extends SketchManagerThree {
  constructor(canvas, audioElement) {
    super(canvas, audioElement);
    this.audioSrc = Audio.tester;
    this.fftSize = 512;
    this.bars = [];

    this.clock = new THREE.Clock();
    this.composer = {};
    this.effect = {};
  }
  unmount() {

  }
  init() {
    this.createStats();

    this.setCameraPos(-10, 23, 5);
    this.setClearColor(0xffffaa);

    const audioConfig = { fftSize: this.fftSize, dataLength: 25 };
    this.initAudio(audioConfig);
    this.audio.volume(0.8);

    this.initNodes();

    const centerIndex = Math.floor(this.bars.length / 2);
    const { x, y, z } = this.bars[centerIndex].mesh.position;
    this.lookAt(x, y, z);

    this.createEffects();
  }
  createEffects() {
    this.composer = new PP.EffectComposer(this.renderer);
    this.renderPass = new PP.RenderPass(this.scene, this.camera, 0xffffaa);

    const options = {
      blendFunction: PP.BlendFunction.SCREEN,
			edgeStrength: 2.5,
			pulseSpeed: 0.0,
			visibleEdgeColor: 0xffffff,
			hiddenEdgeColor: 0x22090a,
			blur: false,
			xRay: true
    };
    const outlineEffect = new PP.OutlineEffect(
      this.scene,
      this.camera,
      options,
    );
    const outlinePass = new PP.EffectPass(this.camera, outlineEffect);
    outlinePass.renderToScreen = true;

    outlineEffect.setSelection(this.scene.children);

    this.composer.addPass(this.renderPass);
    this.composer.addPass(outlinePass);
  }
  initNodes() {
    const margin = 3;
    const { length } = this.audio.frequencyData;
    const width = Math.sqrt(length);
    let x = 50, y = 0, z = -10;

    for(let i = 0; i < length; i++) {
      if(i % width == 0) {
        x = 0;
        z += margin;
      }
      const coord = { x, y, z };
      const bar = new Bar(coord);
      this.scene.add(bar.mesh);
      this.bars.push(bar);

      x += margin;
    }
  }
  draw() {
    this.stats.begin();

    this.composer.renderer.autoClear = true;
    this.composer.render(this.clock.getDelta());
    this.composer.renderer.autoClear = false;

    this.audio.getByteFrequencyData();
    this.audio.frequencyData.forEach((freq, index) => this.bars[index].update(freq));
    // this.renderer.render(this.scene, this.camera);

    this.stats.end();

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;