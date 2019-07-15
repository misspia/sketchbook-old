import * as THREE from 'three';
import SketchManagerThree from '../sketchManagerThree';
import { Audio } from '../../themes/themes';
import Bar from './bar';
import utils from '../utils';

/**
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
      this.scene.add(bar.outline.mesh);
      this.bars.push(bar);

      x += margin;
    }
  }
  draw() {
    this.stats.begin();

    this.audio.getByteFrequencyData();
    this.audio.frequencyData.forEach((freq, index) => this.bars[index].update(freq));
    this.renderer.render(this.scene, this.camera);

    this.stats.end();

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;