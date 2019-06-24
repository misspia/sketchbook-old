import * as THREE from 'three';
import SketchManagerThree from '../sketchManagerThree';
import { Audio } from '../../themes/themes.js';
import utils from '../utils';

class Sketch extends SketchManagerThree {
  constructor(canvas, audioElement) {
    super(canvas, audioElement);
    this.audioSrc = Audio.tester;
    this.fftSize = 512;
  }
  unmount() {

  }
  init() {
    this.createStats();

    this.setCameraPos(-32, 74, -77);
    this.lookAt(0, 0, 0);
    this.setClearColor(0xeefaee);

    const audioConfig = { fftSize: this.fftSize };
    this.initAudio(audioConfig);

  }
  
  draw() {
    this.stats.begin();

    this.audio.getByteFrequencyData();
    this.renderer.render(this.scene, this.camera);

    this.stats.end();

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;