import * as THREE from 'three';
import SketchManagerThree from '../sketchManagerThree';
import PostProcessor from '../postProcessor';
import { Audio } from '../../themes';
import Toon from './toon';

class Sketch extends SketchManagerThree {
  constructor(canvas, audioElement) {
    super(canvas, audioElement);
    this.pp = new PostProcessor(this);
    this.audioSrc = Audio.tester;
    this.fftSize = 512;
    this.toon = new Toon();
  }
  unmount() {

  }
  init() {
    this.createStats();

    this.setCameraPos(-10, 23, 5);
    this.setClearColor(0xffffaa);
    this.lookAt(0, 0, 0);

    // const audioConfig = { fftSize: this.fftSize, dataLength: 25 };
    // this.initAudio(audioConfig);

    this.scene.add(this.toon.mesh);
  }




  draw() {
    this.stats.begin();

    // this.audio.getByteFrequencyData();
    // this.audio.frequencyData.forEach((freq, index) => {
    // });
    this.renderer.render(this.scene, this.camera);

    this.stats.end();

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
