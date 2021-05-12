import * as THREE from 'three';
import PostProcessor from '../postProcessor';
import BeatManager from '../beatManager';
import SketchManagerThree from '../sketchManagerThree';
import utils from '../utils';
import { Audio } from '../../themes';
import BeatDetector from './beatDetector';

import Lights from './lights';

// https://dribbble.com/shots/7033454-vinnexyuna
// https://www.pinterest.ca/search/pins/?rs=ac&len=2&q=teamlab&eq=teamla&etslf=7511&term_meta[]=teamlab%7Cautocomplete%7C0
class Sketch extends SketchManagerThree {
  constructor(canvas, audioElement) {
    super(canvas, audioElement);
    this.raycaster = {};
    this.audioSrc = Audio.tester;
    this.beat = new BeatDetector(this)

    this.spectrumStart = {
      bass: 0,
      midrange: 7,
      highrange: 68,
    }
    this.beatManager = new BeatManager(this)
    // this.audioSrc = Audio.S014;

    this.composer = {};
    this.pp = new PostProcessor(this);
    this.renderPass = {};
    this.clock = new THREE.Clock();

    this.fftSize = 512;
    this.numFrequencyNodes = 100;
    this.bars = [];

    this.lights = new Lights();

  }

  unmount() {
    this.audio.close();
    this.clearScene();
  }

  init() {
    this.renderer.xr.enabled = true;

    this.disableOrbitControls();
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.soft = true;

    // this.setCameraPos(110, 105, -110);
    this.setCameraPos(0, 0, 40);
    this.lookAt(0, 0, 0);
    this.setClearColor(0xffffff);

    const audioConfig = {
      fftSize: this.fftSize,
      dataLength: this.numFrequencyNodes,
    };
    this.initAudio(audioConfig);
    this.audio.setSmoothingTimeConstant(0.75);
    this.beat.onStart(this.audioSrc, this.audio.context)


    const X_OFFSET = -50;
    for(let i = 0; i < this.numFrequencyNodes; i++) {
      let color = null
      if(i < this.spectrumStart.midrange) {
        color = 0xeeaaaa;
      } else if(i < this.spectrumStart.highrange) {
        color = 0xaaeeaa;
      } else {
        color = 0xeeeeaa
      }
      const g = new THREE.BoxGeometry(1, 0.15, 1)
      const m = new THREE.MeshBasicMaterial({ color })
      const mesh = new THREE.Mesh(g, m);
      mesh.position.set(i + X_OFFSET, 0, 0);
      this.scene.add(mesh);
      this.bars.push(mesh)
    }
  }

  draw() {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.draw());
    this.audio.getByteFrequencyData();

    this.audio.frequencyData.forEach((freq, i) => {
      this.bars[i].scale.y = freq
    })
  }
}

export default Sketch;
