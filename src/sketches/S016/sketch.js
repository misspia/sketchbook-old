import * as THREE from 'three';
import SketchManagerThree from '../sketchManagerThree';
import { Audio } from '../../themes';

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

    this.setCameraPos(-10, 23, 5);
    this.setClearColor(0xffffaa);

    const audioConfig = { fftSize: this.fftSize, dataLength: 25 };
    this.initAudio(audioConfig);

  }



  draw() {
    this.stats.begin();

    this.audio.getByteFrequencyData();
    this.audio.frequencyData.forEach((freq, index) => {
    });
    this.renderer.render(this.scene, this.camera);

    this.stats.end();

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
