import * as THREE from 'three';
import SketchManagerThree from '../sketchManagerThree';
import { Audio } from '../../themes/themes';
import Triangle from './triangle';
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
  }
  unmount() {

  }
  init() {
    this.createStats();

    this.setCameraPos(-32, 74, -77);
    this.lookAt(0, 0, 0);
    this.setClearColor(0xffffaa);

    const audioConfig = { fftSize: this.fftSize };
    this.initAudio(audioConfig);
    this.audio.volume(0.1);

    const triangle = new Triangle();
    this.scene.add(triangle.mesh);

    const bar = new Bar();
    this.scene.add(bar.mesh);

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